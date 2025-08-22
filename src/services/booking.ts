import getSupabase from '../lib/supabaseClient'
import { sendVenueBookingConfirmation, type EmailTemplateData } from './email'

export type Venue = 'manor' | 'hippie'
export type VenueArea = 'upstairs' | 'downstairs' | 'full_venue'

// Generate a user-friendly reference code
const generateReferenceCode = (): string => {
  // Generate a random 6-character alphanumeric string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const shortId = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  // Add current year
  const year = new Date().getFullYear().toString().slice(-2)
  // Format: MAN-YY-XXXXXX (e.g., MAN-25-A1B2C3)
  return `MAN-${year}-${shortId}`
}

export interface CreateVenueBookingInput {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  venue: Venue
  venueArea: VenueArea
  bookingDate: string // YYYY-MM-DD
  startTime?: string  // HH:MM
  endTime?: string    // HH:MM
  guestCount: number
  specialRequests?: string
}

export async function createVenueBooking(input: CreateVenueBookingInput) {
  const supabase = getSupabase()

  if (!input.customerEmail && !input.customerPhone) {
    throw new Error('Either email or phone is required')
  }

  const row: any = {
    customer_name: input.customerName.trim(),
    customer_email: input.customerEmail?.trim() || null,
    customer_phone: input.customerPhone?.trim() || null,
    booking_type: 'venue_hire',
    venue: input.venue,
    venue_area: input.venueArea,
    booking_date: input.bookingDate,
    start_time: input.startTime || null,
    end_time: input.endTime || null,
    guest_count: input.guestCount,
    special_requests: input.specialRequests?.trim() || null,
    status: 'pending',
    payment_status: 'unpaid',
    booking_source: 'website_direct',
    reference_code: generateReferenceCode()
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert(row)
    .select('id, reference_code')
    .single()

  if (error) throw new Error(error.message)
  
  // Send confirmation email if customer provided an email
  if (input.customerEmail) {
    try {
      const emailData: EmailTemplateData = {
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        referenceCode: data.reference_code,
        venue: input.venue,
        venueArea: input.venueArea,
        bookingDate: input.bookingDate,
        startTime: input.startTime || '',
        endTime: input.endTime || '',
        guestCount: input.guestCount,
        specialRequests: input.specialRequests
      }

      const emailResult = await sendVenueBookingConfirmation(data.id, emailData)
      
      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error)
        // Don't throw error - booking was successful, email failure shouldn't break the flow
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't throw error - booking was successful, email failure shouldn't break the flow
      }
  }
  
  return data
}

export interface AvailabilityQuery {
  date: string
  venue: Venue
  venueArea: VenueArea
}

export async function fetchVenueAvailability(q: AvailabilityQuery) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('bookings')
    .select('start_time,end_time')
    .eq('booking_date', q.date)
    .eq('venue', q.venue)
    .eq('venue_area', q.venueArea)
    .neq('status', 'cancelled')

  if (error) throw new Error(error.message)
  return data || []
}


