export interface WhatsAppUrlOptions {
  phone: string;
  message: string;
}

export function sanitizeE164WithoutPlus(phone: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

export function buildWhatsAppMessage(template: string, context?: Record<string, string>): string {
  if (!template) return "";
  if (!context) return encodeURIComponent(template);

  let message = template;
  for (const [key, value] of Object.entries(context)) {
    const token = new RegExp(`\\{${key}\\}`, "g");
    message = message.replace(token, value ?? "");
  }
  return encodeURIComponent(message);
}

export function getWhatsAppEnquiryUrl(options: WhatsAppUrlOptions): string | null {
  const phone = sanitizeE164WithoutPlus(options.phone);
  if (!phone) return null;

  const text = encodeURIComponent(options.message ?? "");
  return `https://wa.me/${phone}?text=${text}`;
}


