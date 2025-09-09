export const SQUARE_APPLICATION_ID = 'sandbox-sq0idb-3EXjbaqIhbUVudgyl44spQ'
export const SQUARE_LOCATION_ID = 'LNNPG8BZ4VVMP'

// Use the sandbox SDK when the app ID is a sandbox one
export const SQUARE_SCRIPT_SRC = SQUARE_APPLICATION_ID.startsWith('sandbox-')
  ? 'https://sandbox.web.squarecdn.com/v1/square.js'
  : 'https://web.squarecdn.com/v1/square.js'

// Enquiry configuration
export const ENABLE_WHATSAPP_ENQUIRY = import.meta.env.VITE_ENABLE_WHATSAPP_ENQUIRY !== 'false'
export const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE ?? ''
export const WHATSAPP_TEMPLATE = import.meta.env.VITE_WHATSAPP_TEMPLATE ?? "Hi! I'd like to enquire about a birthday or special occasion at Manor."

export const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE ?? '' // e.g., manorleederville or @manorleederville
export const FACEBOOK_PAGE_URL = import.meta.env.VITE_FACEBOOK_PAGE_URL ?? '' // e.g., https://www.facebook.com/manorleederville
export const ENABLE_SOCIAL_ENQUIRY = import.meta.env.VITE_ENABLE_SOCIAL_ENQUIRY !== 'false'

