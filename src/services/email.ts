import { getSupabase } from '../lib/supabaseClient'
import { format } from 'date-fns'

// NOTE: Do not initialize Resend client in the browser; calls are proxied via Edge Function

export interface EmailTemplateData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  referenceCode: string
  venue: string
  venueArea: string
  venueAreaName?: string
  bookingDate: string
  startTime: string
  endTime: string
  guestCount: number
  specialRequests?: string
}

export interface EmailEvent {
  bookingId: string
  recipientEmail: string
  template: string
  status: 'queued' | 'sent' | 'failed'
  error?: string
  metadata?: Record<string, unknown>
}

/**
 * Log email event to database
 */
async function logEmailEvent(event: EmailEvent): Promise<void> {
  const supabase = getSupabase()
  
  try {
    // Skip logging in tests with mock booking UUIDs to avoid FK violations
    if (event.bookingId?.startsWith('00000000-0000-0000-0000-0000000000')) {
      console.warn('Skipping email_events log for mock bookingId (test mode)')
      return
    }
    const { error } = await supabase
      .from('email_events')
      .insert({
        booking_id: event.bookingId,
        recipient_email: event.recipientEmail,
        template: event.template,
        status: event.status,
        error: event.error,
        metadata: event.metadata
      })

    if (error) {
      // Don't fail the email send if logging fails (especially for test data)
      console.warn('Failed to log email event (non-critical):', error.message)
    }
  } catch (err) {
    // Don't fail the email send if logging fails
    console.warn('Error logging email event (non-critical):', err)
  }
}

/**
 * Generate venue booking confirmation email HTML
 */
function toDisplayNameFromCode(code: string): string {
  return code
    .replace(/_/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function generateVenueBookingEmailHTML(data: EmailTemplateData): string {
  const formattedDate = format(new Date(data.bookingDate), 'EEEE, MMMM do, yyyy')
  const venueDisplayName = data.venue === 'manor' ? 'Manor' : 'Hippie'
  const areaDisplayName = data.venueAreaName || toDisplayNameFromCode(data.venueArea)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Manor Perth</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #8B4513;
          margin-bottom: 10px;
        }
        .reference-code {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 2px solid #dee2e6;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin: 25px 0;
        }
        .reference-code-label {
          font-size: 14px;
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .reference-code-value {
          font-size: 24px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: #495057;
          letter-spacing: 2px;
        }
        .booking-details {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #495057;
        }
        .detail-value {
          color: #6c757d;
        }
        .message {
          background: #e7f3ff;
          border-left: 4px solid #007bff;
          padding: 20px;
          margin: 25px 0;
          border-radius: 0 8px 8px 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #6c757d;
          font-size: 14px;
        }
        .contact-info {
          margin-top: 15px;
        }
        .contact-info a {
          color: #007bff;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MANOR</div>
          <h1 style="margin: 0; color: #333; font-size: 24px;">Booking Enquiry Received</h1>
        </div>

        <p>Hi ${data.customerName},</p>

        <p>Thank you for your venue booking enquiry with Manor Perth! We've received your request and our team will review it within the next two business days.</p>

        <div class="reference-code">
          <div class="reference-code-label">Reference Code</div>
          <div class="reference-code-value">${data.referenceCode}</div>
        </div>

        <div class="booking-details">
          <h3 style="margin-top: 0; color: #333;">Booking Details</h3>
          <div class="detail-row">
            <span class="detail-label">Venue:</span>
            <span class="detail-value">${venueDisplayName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Area:</span>
            <span class="detail-value">${areaDisplayName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Time:</span>
            <span class="detail-value">${data.startTime} - ${data.endTime}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Guests:</span>
            <span class="detail-value">${data.guestCount} people</span>
          </div>
          ${data.specialRequests ? `
          <div class="detail-row">
            <span class="detail-label">Special Requests:</span>
            <span class="detail-value">${data.specialRequests}</span>
          </div>
          ` : ''}
        </div>

        <div class="message">
          <strong>What happens next?</strong><br>
          Our team will review your enquiry and get in touch within the next two business days to discuss availability, pricing, and confirm your booking details.
        </div>

        <p>Please keep your reference code handy for any future correspondence about this booking.</p>

        <div class="footer">
          <p><strong>Manor Perth</strong></p>
          <div class="contact-info">
            <p>📍 123 Murray Street, Perth WA 6000</p>
            <p>📧 <a href="mailto:bookings@manorperth.com.au">bookings@manorperth.com.au</a></p>
            <p>📞 <a href="tel:+61812345678">(08) 1234 5678</a></p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #adb5bd;">
            This email was sent to ${data.customerEmail} in response to your booking enquiry.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Send venue booking confirmation email via Supabase Edge Function
 */
export async function sendVenueBookingConfirmation(
  bookingId: string,
  data: EmailTemplateData
): Promise<{ success: boolean; error?: string }> {
  // Log email event as queued
  await logEmailEvent({
    bookingId,
    recipientEmail: data.customerEmail,
    template: 'venue_booking_confirmation',
    status: 'queued',
    metadata: {
      venue: data.venue,
      venueArea: data.venueArea,
      bookingDate: data.bookingDate,
      guestCount: data.guestCount
    }
  })

  try {
    // Call Supabase Edge Function to send email (avoids CORS issues)
    const supabase = getSupabase()
    let result: { success: boolean; error?: string; data?: { id?: string } } = { success: true }

    // Customer confirmation (only if we have an email)
    if (data.customerEmail) {
      const sendCustomer = await supabase.functions.invoke('send-email', {
        body: { template: 'venue-confirmation', data }
      })
      result = (sendCustomer.data as { success: boolean; error?: string; data?: { id?: string } }) || { success: false, error: sendCustomer.error?.message }
    }

    // Internal notification is sent within the edge function when using
    // template 'venue-confirmation', so no separate invocation here.

    // If the sendCustomer invocation returned an error object, handle it
    if (!result.success) {
      // Log failed email
      await logEmailEvent({
        bookingId,
        recipientEmail: data.customerEmail,
        template: 'venue_booking_confirmation',
        status: 'failed',
        error: result.error ?? 'Unknown error',
        metadata: {
          venue: data.venue,
          venueArea: data.venueArea,
          bookingDate: data.bookingDate,
          guestCount: data.guestCount
        }
      })
      return { success: false, error: result.error ?? 'Unknown error' }
    }

    // Log successful email
    await logEmailEvent({
      bookingId,
      recipientEmail: data.customerEmail,
      template: 'venue_booking_confirmation',
      status: 'sent',
      metadata: {
        venue: data.venue,
        venueArea: data.venueArea,
        bookingDate: data.bookingDate,
        guestCount: data.guestCount,
        resendId: (result as { data?: { id?: string } }).data?.id
      }
    })

    return { success: true }
  } catch (error: unknown) {
    // Log failed email
    await logEmailEvent({
      bookingId,
      recipientEmail: data.customerEmail,
      template: 'venue_booking_confirmation',
      status: 'failed',
      error: error instanceof Error ? error.message : String(error),
      metadata: {
        venue: data.venue,
        venueArea: data.venueArea,
        bookingDate: data.bookingDate,
        guestCount: data.guestCount
      }
    })

    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

/**
 * Get email events for a booking
 */
export async function getEmailEvents(bookingId: string): Promise<Record<string, unknown>[]> {
  const supabase = getSupabase()
  
  const { data, error } = await supabase
    .from('email_events')
    .select('*')
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch email events:', error)
    return []
  }

  return data || []
}
