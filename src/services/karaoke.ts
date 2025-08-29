/* eslint-disable @typescript-eslint/no-explicit-any */
import getSupabase from '../lib/supabaseClient'

export type Venue = 'manor' | 'hippie'

export type SlotStatus = 'available' | 'held' | 'booked'

export interface BoothSummary {
  id: string
  name: string
  capacity: number
}

export interface TimeSlot {
  start_time: string // HH:MM
  end_time: string   // HH:MM
  status: SlotStatus
}

export interface AvailabilityResponse {
  date: string
  venue: Venue
  booths: Array<{
    booth: BoothSummary
    slots: TimeSlot[]
  }>
}

export interface CreateHoldInput {
  venue: Venue
  booth_id: string
  booking_date: string // YYYY-MM-DD
  start_time: string   // HH:MM
  end_time: string     // HH:MM
}

export interface CreateHoldResult {
  hold_id: string
  expires_at: string // ISO
}

export interface ConfirmBookingInput {
  hold_token?: string
  holdId?: string
  customer_name: string
  customer_email?: string
  customer_phone?: string
  party_size?: number
  payment_token?: string
}

export interface ConfirmBookingResult {
  booking_id: string
  reference_code?: string
}

export function getSessionId(): string {
  try {
    const key = 'karaoke_session_id'
    let val = localStorage.getItem(key)
    if (!val) {
      val = crypto.randomUUID()
      localStorage.setItem(key, val)
    }
    return val
  } catch {
    // Fallback random
    return Math.random().toString(36).slice(2)
  }
}

export async function fetchKaraokeAvailability(params: { venue: Venue; date: string; partySize?: number }): Promise<AvailabilityResponse> {
  const supabase = getSupabase()
  const payload: Record<string, unknown> = {
    venue: params.venue,
    date: params.date,
    booking_date: params.date,
    bookingDate: params.date,
    minCapacity: params.partySize ?? 2,
    partySize: params.partySize ?? 2,
    party_size: params.partySize ?? 2
  }
  const { data, error } = await supabase.functions.invoke('karaoke-availability', { body: payload })
  if (error) {
    const details = (error as any)?.context?.body || (error as any)?.context || undefined
    throw new Error(`Availability error: ${error.message}${details ? ` | ${JSON.stringify(details)}` : ''}`)
  }
  const raw = (data as any)?.data ?? data
  return await normalizeAvailability(raw, { date: params.date, venue: params.venue })
}

export interface SlotBooth {
  id: string
  name: string
  capacity: number
  hourly_rate?: number
}

export async function fetchBoothsForSlot(params: { venue: Venue; bookingDate: string; startTime: string; endTime: string; minCapacity: number }): Promise<SlotBooth[]> {
  const supabase = getSupabase()
  const payload: Record<string, unknown> = {
    action: 'boothsForSlot',
    venue: params.venue,
    bookingDate: params.bookingDate,
    booking_date: params.bookingDate,
    startTime: params.startTime,
    start_time: params.startTime,
    endTime: params.endTime,
    end_time: params.endTime,
    minCapacity: params.minCapacity,
    min_capacity: params.minCapacity
  }
  const { data, error } = await supabase.functions.invoke('karaoke-availability', {
    body: payload,
    headers: { 'x-action': 'boothsForSlot' }
  })
  if (error) {
    const details = (error as any)?.context?.body || (error as any)?.context || undefined
    throw new Error(`BoothsForSlot error: ${error.message}${details ? ` | ${JSON.stringify(details)}` : ''}`)
  }
  const raw = (data as any) || {}
  const res = raw.availableBooths || raw.data?.availableBooths || []
  return res as SlotBooth[]
}

async function normalizeAvailability(raw: any, meta: { date: string; venue: Venue }): Promise<AvailabilityResponse> {
  // Handle shape: { slots: [{ startTime, endTime, available }] }
  if (raw && Array.isArray(raw.slots)) {
    const slots = raw.slots.map((s: any) => ({
      start_time: s.startTime || s.start_time || '',
      end_time: s.endTime || s.end_time || '',
      status: s.available ? 'available' : 'booked'
    }))
    const defaultBooth: BoothSummary = {
      id: 'default',
      name: 'Karaoke Booth',
      capacity: Math.max(...(raw.slots.map((s: any) => (s.capacities?.[0] ?? s.capacity ?? 6)) || [6]))
    }
    return {
      date: meta.date,
      venue: meta.venue,
      booths: [{ booth: defaultBooth, slots }]
    }
  }
  if (raw && Array.isArray(raw.booths) && raw.booths.length && (raw.booths[0].booth || raw.booths[0].slots)) {
    const booths = raw.booths.map((b: any) => ({
      booth: normalizeBooth(b.booth || b.boothInfo || b),
      slots: normalizeSlots(b.slots || b.timeSlots || b.timeslots || [])
    }))
    return { date: raw.date || meta.date, venue: raw.venue || meta.venue, booths }
  }
  if (Array.isArray(raw)) {
    const booths = raw.map((item: any) => ({
      booth: normalizeBooth(item.booth || item.boothInfo || item),
      slots: normalizeSlots(item.slots || item.timeSlots || item.timeslots || [])
    }))
    return { date: meta.date, venue: meta.venue, booths }
  }
  return { date: meta.date, venue: meta.venue, booths: [] }
}

function normalizeBooth(src: any): BoothSummary {
  return {
    id: String(src?.id || src?.booth_id || src?.boothId || ''),
    name: String(src?.name || src?.booth_name || src?.boothName || 'Booth'),
    capacity: Number(src?.capacity || src?.max_capacity || src?.maxCapacity || 0)
  }
}

function normalizeSlots(slots: any[]): TimeSlot[] {
  return (slots || []).map((s: any) => ({
    start_time: s.start_time || s.startTime || s.start || '',
    end_time: s.end_time || s.endTime || s.end || '',
    status: (s.status as SlotStatus) || (s.available ? 'available' : 'booked') || 'available'
  }))
}

export async function createKaraokeHold(input: CreateHoldInput): Promise<CreateHoldResult> {
  const supabase = getSupabase()
  const sessionId = getSessionId()
  const base = {
    boothId: input.booth_id,
    venue: input.venue,
    bookingDate: input.booking_date,
    startTime: input.start_time,
    endTime: input.end_time,
    sessionId,
  }

  const { data, error } = await supabase.functions.invoke('karaoke-holds', {
    body: base,
    headers: { 'x-action': 'create' }
  })

  if (error) {
    const details = (error as any)?.context?.body || (error as any)?.context || undefined
    throw new Error(`Create hold error: ${error.message}${details ? ` | ${JSON.stringify(details)}` : ''}`)
  }

  const res: any = (data as any) || {}
  const holdId = res.holdId || res.id || res.hold?.id
  const expiresAt = res.expires_at || res.hold?.expires_at
  if (!holdId) throw new Error('Invalid hold response')
  return { hold_id: holdId, expires_at: expiresAt }
}

export async function releaseKaraokeHold(holdId: string): Promise<{ success: boolean }> {
  const supabase = getSupabase()
  const sessionId = getSessionId()
  const { data, error } = await supabase.functions.invoke('karaoke-holds', {
    body: { holdId, sessionId },
    headers: { 'x-action': 'release' }
  })
  if (error) throw new Error(error.message)
  return (data as { success: boolean }) || { success: true }
}

export async function confirmKaraokeBooking(input: ConfirmBookingInput): Promise<ConfirmBookingResult> {
  const supabase = getSupabase()
  const sessionId = getSessionId()
  const body = {
    holdId: input.holdId || input.hold_token,
    sessionId,
    customerName: input.customer_name,
    customerEmail: input.customer_email,
    customerPhone: input.customer_phone,
    guestCount: input.party_size,
    paymentToken: input.payment_token
  }
  const { data, error } = await supabase.functions.invoke('karaoke-book', { body })
  if (error) {
    const details = (error as any)?.context?.body || (error as any)?.context || undefined
    throw new Error(`Confirm booking error: ${error.message}${details ? ` | ${JSON.stringify(details)}` : ''}`)
  }
  const raw: Record<string, unknown> = ((data as unknown as { data?: unknown })?.data ?? data) as Record<string, unknown>
  const bookingId: string = String((raw as any).bookingId || (raw as any).booking_id)
  const referenceCode: string | undefined = (raw as any).reference_code || (raw as any).referenceCode

  // Fetch booking details to populate email (edge function may not return all fields)
  let bookingRow: any | null = null
  try {
    const { data: b } = await supabase
      .from('bookings')
      .select('venue, booking_date, start_time, end_time, guest_count, karaoke_booth_id, reference_code')
      .eq('id', bookingId)
      .single()
    bookingRow = b || null
  } catch (err) {
    console.debug('Failed to fetch booking row for email payload', err)
  }

  // Resolve booth name if possible
  let boothName = 'Karaoke Booth'
  try {
    const boothId = (bookingRow as any)?.karaoke_booth_id
    if (boothId) {
      const { data: booth } = await supabase
        .from('karaoke_booths')
        .select('name')
        .eq('id', boothId)
        .single()
      boothName = (booth as any)?.name || boothName
    }
  } catch (err) {
    console.debug('Failed to resolve booth name for email payload', err)
  }

  // Fire-and-forget: send customer confirmation email via Edge Function templates
  try {
    await supabase.functions.invoke('send-email', {
      body: {
        template: 'karaoke-confirmation',
        data: {
          customerName: input.customer_name,
          customerEmail: input.customer_email,
          customerPhone: input.customer_phone,
          referenceCode: (bookingRow as any)?.reference_code || referenceCode || '',
          venue: String((bookingRow as any)?.venue || 'Manor'),
          boothName,
          bookingDate: String((bookingRow as any)?.booking_date || ''),
          startTime: String((bookingRow as any)?.start_time || ''),
          endTime: String((bookingRow as any)?.end_time || ''),
          guestCount: Number((bookingRow as any)?.guest_count || input.party_size || 0)
        }
      }
    })
  } catch (e) {
    console.warn('Non-blocking: failed to send karaoke confirmation email', e)
  }
  return { booking_id: bookingId, reference_code: referenceCode }
}

export interface PayAndBookInput {
  holdId: string
  customer_name: string
  customer_email?: string
  customer_phone?: string
  party_size?: number
  venue: Venue
  booking_date: string
  start_time: string
  end_time: string
  booth_id: string
  payment_token: string
}

export async function payAndBookKaraoke(input: PayAndBookInput): Promise<{ booking_id: string; reference_code?: string; payment_id: string }> {
  const supabase = getSupabase()
  const sessionId = getSessionId()
  const body = {
    holdId: input.holdId,
    customerName: input.customer_name,
    customerEmail: input.customer_email,
    customerPhone: input.customer_phone,
    guestCount: input.party_size,
    bookingDate: input.booking_date,
    venue: input.venue,
    startTime: input.start_time,
    endTime: input.end_time,
    boothId: input.booth_id,
    paymentToken: input.payment_token,
    sessionId,
  }
  const { data, error } = await supabase.functions.invoke('karaoke-pay-and-book', { body })
  if (error) {
    const details = (error as any)?.context?.body || (error as any)?.context || undefined
    throw new Error(`Pay and book error: ${error.message}${details ? ` | ${JSON.stringify(details)}` : ''}`)
  }
  const raw: any = (data as any)?.data ?? data
  if (!raw?.success) {
    throw new Error(String(raw?.error || 'Payment failed'))
  }
  return { booking_id: String(raw.bookingId), reference_code: String(raw.referenceCode || ''), payment_id: String(raw.paymentId) }
}

export async function fetchBookingReferenceCode(bookingId: string): Promise<string | null> {
  const supabase = getSupabase()
  try {
    const { data } = await supabase.from('bookings').select('reference_code').eq('id', bookingId).single()
    return (data as any)?.reference_code || null
  } catch {
    return null
  }
}


