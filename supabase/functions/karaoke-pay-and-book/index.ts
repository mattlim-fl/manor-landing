// @ts-expect-error - Deno remote import types are not available in this toolchain
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Minimal declaration for Deno global used for env access in Edge Functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Deno: any

type PayAndBookRequest = {
  holdId: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  guestCount?: number
  bookingDate: string
  venue: string
  startTime: string
  endTime: string
  boothId: string
  paymentToken: string
}

type JsonBody = Record<string, unknown>

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info, x-action",
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

async function fetchBoothHourlyRate(boothId: string, supabaseUrl: string, supabaseKey: string): Promise<number> {
  const res = await fetch(`${supabaseUrl}/rest/v1/karaoke_booths?id=eq.${encodeURIComponent(boothId)}&select=hourly_rate`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: 'application/json',
    }
  })
  if (!res.ok) throw new Error(`Failed to fetch booth rate (${res.status})`)
  const rows = await res.json() as Array<{ hourly_rate: number | null }>
  const rate = rows?.[0]?.hourly_rate
  if (!rate || rate <= 0) throw new Error('Invalid booth hourly rate')
  return Number(rate)
}

async function chargeSquare(amountCents: number, token: string, idempotencyKey: string, locationId: string, accessToken: string): Promise<{ paymentId: string }> {
  const res = await fetch('https://connect.squareupsandbox.com/v2/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      source_id: token,
      location_id: locationId,
      amount_money: { amount: amountCents, currency: 'AUD' }
    })
  })
  const body = await res.json()
  if (!res.ok) {
    const message = body?.errors?.[0]?.detail || body?.message || 'Square charge failed'
    throw new Error(message)
  }
  const paymentId = body?.payment?.id
  if (!paymentId) throw new Error('Missing Square payment id')
  return { paymentId }
}

async function createBooking(payload: Omit<PayAndBookRequest, 'paymentToken'> & { totalAmount: number; squarePaymentId: string }, supabaseUrl: string, supabaseKey: string) {
  const row: Record<string, unknown> = {
    customer_name: payload.customerName,
    customer_email: payload.customerEmail || null,
    customer_phone: payload.customerPhone || null,
    booking_type: 'karaoke',
    venue: payload.venue,
    booking_date: payload.bookingDate,
    start_time: payload.startTime,
    end_time: payload.endTime,
    guest_count: payload.guestCount ?? null,
    karaoke_booth_id: payload.boothId,
    status: 'confirmed',
    payment_status: 'paid',
    total_amount: payload.totalAmount,
    square_payment_id: payload.squarePaymentId,
    payment_attempted_at: new Date().toISOString(),
    payment_completed_at: new Date().toISOString(),
    booking_source: 'website_direct',
    reference_code: generateReferenceCode()
  }
  const res = await fetch(`${supabaseUrl}/rest/v1/bookings?select=id,reference_code`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(row)
  })
  const body = await res.json()
  if (!res.ok) {
    const message = body?.message || JSON.stringify(body)
    throw new Error(`Failed to create booking: ${message}`)
  }
  const id = body?.id
  const reference = body?.reference_code || ''
  if (!id) throw new Error('Missing booking id')
  return { bookingId: String(id), referenceCode: String(reference || '') }
}

function generateReferenceCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `K-${code}`
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY')
    const SQUARE_ACCESS_TOKEN = Deno.env.get('SQUARE_SANDBOX_ACCESS_TOKEN') || Deno.env.get('SQUARE_ACCESS_TOKEN')
    const SQUARE_LOCATION_ID = Deno.env.get('SQUARE_LOCATION_ID') || 'L0XWHCW89KK4V'

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return json({ success: false, error: 'Supabase env not configured' }, 500)
    if (!SQUARE_ACCESS_TOKEN) return json({ success: false, error: 'Square access token not configured' }, 500)

    const body = (await req.json()) as JsonBody
    const input: PayAndBookRequest = {
      holdId: String(body.holdId || ''),
      customerName: String(body.customerName || ''),
      customerEmail: body.customerEmail ? String(body.customerEmail) : undefined,
      customerPhone: body.customerPhone ? String(body.customerPhone) : undefined,
      guestCount: body.guestCount != null ? Number(body.guestCount) : undefined,
      bookingDate: String(body.bookingDate || ''),
      venue: String(body.venue || 'manor'),
      startTime: String(body.startTime || ''),
      endTime: String(body.endTime || ''),
      boothId: String(body.boothId || ''),
      paymentToken: String(body.paymentToken || '')
    }

    if (!input.holdId) return json({ success: false, error: 'Missing holdId' }, 400)
    if (!input.boothId) return json({ success: false, error: 'Missing boothId' }, 400)
    if (!input.paymentToken) return json({ success: false, error: 'Missing payment token' }, 400)

    // Fetch booth hourly rate
    const hourlyRate = await fetchBoothHourlyRate(input.boothId, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const amountCents = Math.round(Number(hourlyRate) * 100)

    // Idempotency key based on hold + booth + date/time
    const idempotencyKey = `${input.holdId}:${input.boothId}:${input.bookingDate}:${input.startTime}-${input.endTime}`

    // Charge with Square first
    const { paymentId } = await chargeSquare(amountCents, input.paymentToken, idempotencyKey, SQUARE_LOCATION_ID, SQUARE_ACCESS_TOKEN)

    // Create booking as confirmed/paid
    const booking = await createBooking({
      ...input,
      totalAmount: amountCents / 100,
      squarePaymentId: paymentId,
    }, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    return json({ success: true, bookingId: booking.bookingId, referenceCode: booking.referenceCode, paymentId })
  } catch (err) {
    console.error('karaoke-pay-and-book error:', err)
    const message = err instanceof Error ? err.message : String(err)
    return json({ success: false, error: message }, 400)
  }
})


