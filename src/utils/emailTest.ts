import { sendVenueBookingConfirmation } from '../services/email'

/**
 * Test function to send a sample venue booking confirmation email
 * This is for development/testing purposes only
 */
export async function testVenueBookingEmail(customEmail?: string) {
  console.log('Testing email sending...')
  
  try {
    // Use mock data for testing email functionality only
    const emailData = {
      customerName: 'John Smith',
      customerEmail: customEmail || 'test@example.com',
      referenceCode: 'MAN-25-TEST01',
      venue: 'manor' as const,
      venueArea: 'downstairs' as const,
      bookingDate: '2025-01-15',
      startTime: '19:00',
      endTime: '23:00',
      guestCount: 25,
      specialRequests: 'Birthday party setup with decorations'
    }

    // Use a mock booking ID for testing
    const mockBookingId = '00000000-0000-0000-0000-000000000001'

    console.log('Sending test venue booking email...')
    const result = await sendVenueBookingConfirmation(mockBookingId, emailData)
    
    if (result.success) {
      console.log('✅ Test email sent successfully!')
    } else {
      console.error('❌ Test email failed:', result.error)
    }
  } catch (error) {
    console.error('❌ Test email error:', error)
  }
}

/**
 * Test function to send a sample venue booking confirmation email with different data
 */
export async function testVenueBookingEmailHippie(customEmail?: string) {
  console.log('Testing Hippie email sending...')
  
  try {
    // Use mock data for testing email functionality only
    const emailData = {
      customerName: 'Jane Doe',
      customerEmail: customEmail || 'test@example.com',
      referenceCode: 'MAN-25-TEST02',
      venue: 'hippie' as const,
      venueArea: 'full_venue' as const,
      bookingDate: '2025-02-20',
      startTime: '18:00',
      endTime: '02:00',
      guestCount: 50,
      specialRequests: 'Corporate event with AV setup'
    }

    // Use a mock booking ID for testing
    const mockBookingId = '00000000-0000-0000-0000-000000000002'

    console.log('Sending test Hippie venue booking email...')
    const result = await sendVenueBookingConfirmation(mockBookingId, emailData)
    
    if (result.success) {
      console.log('✅ Test Hippie email sent successfully!')
    } else {
      console.error('❌ Test Hippie email failed:', result.error)
    }
  } catch (error) {
    console.error('❌ Test Hippie email error:', error)
  }
}
