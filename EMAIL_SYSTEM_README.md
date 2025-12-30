# Manor Perth Email Notification System

## Overview
This document describes the email notification system for Manor Perth. Emails are sent via a Supabase Edge Function that calls Resend. HTML templates live in the database, so deployments don’t need to bundle template files.

## 🚀 Features Implemented

### ✅ Core Email Functionality
- **Resend Integration**: Edge Function calls Resend using `RESEND_API_KEY` (server-only)
- **DB-backed Templates**: Templates stored in `public.email_templates` (no file packaging)
- **Events Logging**: Optional logs to `email_events` from the frontend service
- **Reference Codes**: Saved in `bookings.reference_code` and included in emails

### ✅ Email Template Features (per template)
- **Professional Design**: Clean, modern email template with Manor branding
- **Responsive Layout**: Works on desktop and mobile devices
- **Booking Details**: Booking information displayed clearly
- **Reference Code Display**: Prominent reference code with styling
- **Contact Information**: Manor Perth contact details included
- **Next Steps**: Clear explanation of what happens after booking

### ✅ Database Integration
- **email_templates**: name, subject, html (used by Edge Function)
- **email_events**: optional client-side log of queued/sent/failed attempts
- **bookings**: source of reference codes and karaoke details

## 📁 Files Created/Modified

### Key Files
- `supabase/functions/send-email/index.ts` - Edge Function (DB templates → Resend)
- `src/services/email.ts` - Venue booking email client (invokes Edge Function)
- `src/services/booking.ts` - Venue flow; triggers email after insert
- `src/services/karaoke.ts` - Karaoke flow; triggers `karaoke-confirmation`
- `src/components/EmailEventsDebug.tsx` - Debug UI (optional)
- `EMAIL_SYSTEM_README.md` - This document

### Modified Files
- `src/services/booking.ts` - Added email sending integration
- `src/App.tsx` - Added email test route
- `.env` - Added Resend API key configuration

## 🔧 Configuration

### Environment Variables
- Supabase Project Settings → Functions → Secrets:
  - `RESEND_API_KEY`: Resend API key (from your Resend account)
  - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (present by default in Edge)
- Frontend uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only.

## 🧪 Testing the System

Optional test page is available at `/email-test` if present.

### 2. Test Email Functionality
- Enter your email address in the test form
- Click "Test Manor Email" or "Test Hippie Email"
- Check your inbox for the confirmation email
- View email events in the debug section below

### 3. Test Real Booking Flow
1. Go to the Services page
2. Click "ENQUIRE" on any venue section
3. Fill out the booking form with your email
4. Submit the booking
5. Check your email for the confirmation

### 4. Debug Email Events
- Use the Email Events Debug section to view all email attempts
- Enter a booking ID to see email events for that specific booking
- Check status, errors, and metadata for each email event

## 📧 Email Template Details

### Venue Confirmation Template Structure (summary)
```
┌─────────────────────────────────────┐
│              MANOR                  │
│        Booking Enquiry Received     │
├─────────────────────────────────────┤
│ Hi [Customer Name],                 │
│                                     │
│ Thank you for your venue booking... │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │         Reference Code          │ │
│ │        MAN-25-XXXXXX            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Booking Details          │ │
│ │ Venue: Manor                    │ │
│ │ Area: Downstairs                │ │
│ │ Date: Monday, January 15, 2025  │ │
│ │ Time: 19:00 - 23:00             │ │
│ │ Guests: 25 people               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        What happens next?       │ │
│ │ Our team will review your...    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Contact Information      │ │
│ │ Manor Perth                     │ │
│ │ 📍 123 Murray Street, Perth     │ │
│ │ 📧 bookings@manorperth.com.au   │ │
│ │ 📞 (08) 1234 5678               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Email Defaults
- **From**: `Manor Perth <bookings@getproductbox.com>` (update later)
- **Reply-To**: customer email when available
- **Responsive Design**: Works on all devices
- **Brand Colors**: Manor Perth branding throughout

## 🔍 Monitoring & Debugging

### Email Events Table (optional)
If enabled, `email_events` tracks:
- `booking_id`: Associated booking
- `recipient_email`: Email address sent to
- `template`: Email template used
- `status`: queued/sent/failed
- `error`: Error message if failed
- `metadata`: Additional context (venue, date, etc.)
- `created_at`: Timestamp

### Debug Tools
- **Email Events Debug Component**: View email events by booking ID
- **Console Logging**: Detailed logs for email operations
- **Error Handling**: Graceful fallbacks if email fails

## 🚀 Production Deployment

### Before Going Live
1. Verify sending domain in Resend
2. Check `RESEND_API_KEY` secret is set
3. Review `email_templates` rows (subject/html)
4. Update from-address in Edge Function when ready
5. Test venue and karaoke flows end-to-end

### Monitoring
- Monitor email delivery rates in Resend dashboard
- Check email events table for failed deliveries
- Set up alerts for email failures
- Review email templates periodically

## 🔄 Future Enhancements

### Potential Additions
- More templates: VIP tickets, reminders
- Admin UI for editing `email_templates`
- SMS via Twilio for ticket confirmations
- Email analytics, follow-ups

### Next Booking Types
- **Karaoke Booth Bookings**: Similar email flow for karaoke bookings
- **VIP Table Bookings**: Email confirmations for VIP table reservations
- **Event Bookings**: Special event booking confirmations

## 🛠️ Troubleshooting

### Common Issues
1. Email not sending: check `RESEND_API_KEY`, Resend domain verification
2. Template errors: confirm template exists in `email_templates`
3. DB errors: verify Supabase secrets in Edge Function
4. CORS: Edge Function handles it; frontend must call `supabase.functions.invoke`

### Debug Steps
1. Check browser console for errors
2. Verify email events in database
3. Test with email test page
4. Check Resend dashboard for delivery status
5. Review email event logs for specific errors

## 📞 Support

For issues with the email system:
1. Check the email events table for error details
2. Review Resend dashboard for delivery status
3. Test with the email test page
4. Check environment variable configuration

---

**System Status**: ✅ Venue + Karaoke confirmations live
**Last Updated**: August 2025
**Version**: 1.1.0

