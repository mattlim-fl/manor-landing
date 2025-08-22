import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, apikey, x-api-key, x-client-info, x-action",
}


type TemplatePayload = {
  template?: string
  data?: Record<string, unknown>
  to?: string
  subject?: string
  from?: string
  replyTo?: string
  // legacy support
  emailData?: Record<string, unknown>
  html?: string
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

function get(data: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, data)
}

function render(template: string, data: Record<string, unknown>): string {
  // Handle conditional sections: {{#key}}...{{/key}}
  template = template.replace(/\{\{#\s*([\w.]+)\s*\}\}([\s\S]*?)\{\{\/\s*\1\s*\}\}/g, (_m, key: string, inner: string) => {
    const value = get(data, key)
    const isTruthy = !!value && value !== 'false' && value !== '0'
    return isTruthy ? inner : ''
  })

  // Simple variable replacement: {{key}}
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, key: string) => {
    const value = get(data, key)
    return value === undefined || value === null ? '' : String(value)
  })
}

async function loadTemplate(name: string): Promise<string> {
  const url = new URL(`./templates/${name}.html`, import.meta.url)
  return await Deno.readTextFile(url)
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders })
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405)

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
    if (!RESEND_API_KEY) return json({ success: false, error: "RESEND_API_KEY is not configured" }, 500)

    const body = (await req.json()) as TemplatePayload

    // Normalize legacy shape
    const payload: TemplatePayload = {
      template: body.template ?? "venue-confirmation",
      data: body.data ?? body.emailData ?? {},
      to: body.to,
      subject: body.subject,
      from: body.from,
      replyTo: body.replyTo,
      html: body.html,
    }

    // Derive recipient from data.customerEmail when not explicitly provided
    if (!payload.to) {
      const derived = get(payload.data || {}, 'customerEmail') as string | undefined
      if (derived && typeof derived === 'string' && derived.includes('@')) {
        payload.to = derived
      }
    }

    if (!payload.to) return json({ success: false, error: "Missing recipient email" }, 400)

    const subject = payload.subject ?? "Booking Confirmation - Manor Perth"
    const from = payload.from ?? "Manor Perth <bookings@getproductbox.com>"
    const replyTo = payload.replyTo

    // Prepare HTML
    let html = payload.html ?? ""
    if (!html) {
      const tpl = await loadTemplate(payload.template!)
      html = render(tpl, payload.data || {})
    }
    if (!html) return json({ success: false, error: "Missing email HTML content" }, 400)

    // Send customer email first
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: payload.to,
        subject,
        html,
        reply_to: replyTo,
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error("Resend error:", result)
      return json(
        { success: false, error: result?.error?.message || result?.message || JSON.stringify(result) },
        res.status,
      )
    }

    // Optional: internal notification for venue-confirmation
    let internalStatus: "sent" | "skipped" | "failed" = "skipped"
    if ((payload.template ?? "") === "venue-confirmation") {
      try {
        const internalTo = "matt@getproductbox.com" // TODO: move to secret later
        const internalTpl = await loadTemplate("venue-internal-notification")
        const internalData = payload.data || {}
        const internalHtml = render(internalTpl, internalData)
        const internalSubject = `New Venue Enquiry: ${String(get(internalData, "customerName") || "Customer")} (${String(get(internalData, "referenceCode") || "ref")})`

        const res2 = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: internalTo,
            subject: internalSubject,
            html: internalHtml,
            reply_to: replyTo ?? String(get(internalData, "customerEmail") || ""),
          }),
        })
        if (!res2.ok) {
          const r2 = await res2.json().catch(() => ({}))
          console.error("Internal email send failed:", r2)
          internalStatus = "failed"
        } else {
          internalStatus = "sent"
        }
      } catch (e) {
        console.error("Internal email error:", e)
        internalStatus = "failed"
      }
    }

    return json({ success: true, data: result, internal: internalStatus }, 200)
  } catch (err) {
    console.error("send-email error:", err)
    const message = err instanceof Error ? err.message : String(err)
    return json({ success: false, error: message }, 500)
  }
})

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'npm:resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { emailData } = await req.json()
    
    // Initialize Resend with API key from environment
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    
    // Generate email HTML (simplified version)
    const htmlContent = `
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

          <p>Hi ${emailData.customerName},</p>

          <p>Thank you for your venue booking enquiry with Manor Perth! We've received your request and our team will review it within the next two business days.</p>

          <div class="reference-code">
            <div class="reference-code-label">Reference Code</div>
            <div class="reference-code-value">${emailData.referenceCode}</div>
          </div>

          <div class="booking-details">
            <h3 style="margin-top: 0; color: #333;">Booking Details</h3>
            <div class="detail-row">
              <span class="detail-label">Venue:</span>
              <span class="detail-value">${emailData.venue === 'manor' ? 'Manor' : 'Hippie'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Area:</span>
              <span class="detail-value">${emailData.venueArea === 'downstairs' ? 'Downstairs' : 
                                        emailData.venueArea === 'upstairs' ? 'Upstairs' : 'Full Venue'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date(emailData.bookingDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${emailData.startTime} - ${emailData.endTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Guests:</span>
              <span class="detail-value">${emailData.guestCount} people</span>
            </div>
            ${emailData.specialRequests ? `
            <div class="detail-row">
              <span class="detail-label">Special Requests:</span>
              <span class="detail-value">${emailData.specialRequests}</span>
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
              This email was sent to ${emailData.customerEmail} in response to your booking enquiry.
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Manor Perth <onboarding@resend.dev>',
      to: [emailData.customerEmail],
      subject: `Booking Enquiry Confirmation - ${emailData.referenceCode}`,
      html: htmlContent,
      reply_to: 'onboarding@resend.dev'
    })

    if (result.error) {
      return new Response(
        JSON.stringify({ success: false, error: result.error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data: result.data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

