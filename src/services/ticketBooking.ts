import getSupabase from '../lib/supabaseClient'

export type Venue = 'manor' | 'hippie'

// Generate a user-friendly reference code for tickets
const generateTicketReferenceCode = (): string => {
  // Generate a random 6-character alphanumeric string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const shortId = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  // Add current year
  const year = new Date().getFullYear().toString().slice(-2)
  // Format: TIX-YY-XXXXXX (e.g., TIX-25-A1B2C3)
  return `TIX-${year}-${shortId}`
}

export interface CreateTicketBookingInput {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  venue: Venue
  bookingDate: string // YYYY-MM-DD
  ticketQuantity: number
  specialRequests?: string
}

export async function createTicketBooking(input: CreateTicketBookingInput) {
  const supabase = getSupabase()

  if (!input.customerEmail && !input.customerPhone) {
    throw new Error('Either email or phone is required')
  }

  const row: any = {
    customer_name: input.customerName.trim(),
    customer_email: input.customerEmail?.trim() || null,
    customer_phone: input.customerPhone?.trim() || null,
    booking_type: 'vip_tickets',
    venue: input.venue,
    booking_date: input.bookingDate,
    ticket_quantity: input.ticketQuantity,
    special_requests: input.specialRequests?.trim() || null,
    status: 'pending',
    payment_status: 'unpaid',
    booking_source: 'website_direct',
    reference_code: generateTicketReferenceCode()
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert(row)
    .select('id, reference_code')
    .single()

  if (error) throw new Error(error.message)
  
  // Send confirmation email
  try {
    await supabase.functions.invoke('send-email', {
      body: {
        template: 'priority-ticket-confirmation',
        data: {
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          referenceCode: data.reference_code,
          venue: input.venue === 'manor' ? 'Manor' : 'Hippie',
          bookingDate: new Date(input.bookingDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          ticketQuantity: input.ticketQuantity
        }
      }
    })
  } catch (e) {
    console.warn('Non-blocking: failed to send priority ticket confirmation email', e)
  }
  
  return data
}

export interface TicketAvailabilityQuery {
  date: string
  venue: Venue
}

export async function fetchTicketAvailability(query: TicketAvailabilityQuery) {
  const supabase = getSupabase()
  
  const { data, error } = await supabase
    .from('bookings')
    .select('ticket_quantity, status')
    .eq('booking_date', query.date)
    .eq('venue', query.venue)
    .eq('booking_type', 'vip_tickets')
    .neq('status', 'cancelled')

  if (error) {
    console.error('Failed to fetch ticket availability:', error)
    return { available: true, totalBooked: 0 }
  }

  const totalBooked = data?.reduce((sum, booking) => sum + (booking.ticket_quantity || 0), 0) || 0
  
  // For now, assume unlimited availability
  // In the future, you could add capacity limits per venue/date
  return { available: true, totalBooked }
}
