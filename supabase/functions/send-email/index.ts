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

