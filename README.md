# Manor Perth Nightlife UI

Booking and payment system for Manor nightclub in Perth, Australia.

## Features
- Venue hire enquiries (downstairs, upstairs, full venue)
- Karaoke booth bookings with real-time availability
- VIP table ticket sales
- Group occasion bookings with shareable links
- Square payment processing
- Email confirmations via Resend

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Payments**: Square Web Payments SDK
- **Email**: Resend
- **UI**: Tailwind CSS + shadcn/ui

## Quick Start
```sh
npm install
npm run dev  # http://localhost:8080
```

## Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview and data flow
- [DATA_MODEL.md](./DATA_MODEL.md) - Database schema reference
- [docs/email-system.md](./docs/email-system.md) - Email system details
- [docs/square-payments-go-live.md](./docs/square-payments-go-live.md) - Production deployment
- [docs/square-orders-backfill.md](./docs/square-orders-backfill.md) - Revenue sync
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md) - Known issues

## Environment Setup
See [ARCHITECTURE.md](./ARCHITECTURE.md#environment-variables) for required environment variables.

## Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── service-page/   # Service page components
├── pages/              # Page components (routes)
├── services/           # Business logic and API calls
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and config
└── integrations/       # Third-party integrations (Supabase)
```

## Deployment
This project is deployed to Netlify. Build with `npm run build` and deploy the `dist` folder.

The `public/_redirects` file handles SPA routing.

## WhatsApp Enquiry (Birthdays & Occasions)

Configure the Enquire button on `/birthdays-occasions` to open WhatsApp with a prefilled message.

- Add the following environment variables (e.g., in `.env.local`):

```
VITE_ENABLE_WHATSAPP_ENQUIRY=true
VITE_WHATSAPP_PHONE=61412345678
VITE_WHATSAPP_TEMPLATE=Hi! I'd like to enquire about a birthday or special occasion at Manor.
```

- `VITE_WHATSAPP_PHONE` must be the international number without `+` or spaces.
- To test with your own number, set `VITE_WHATSAPP_PHONE` to your digits-only E.164 number; swap to the business number later without code changes.
- If the feature is disabled or phone is missing, the Enquire button falls back to the existing booking modal.

## Social Enquiry (Instagram / Messenger)

To use Instagram DM and Facebook Messenger instead of WhatsApp on `/birthdays-occasions`:

- Add to `.env.local` (and optionally `.env`):

```
VITE_ENABLE_SOCIAL_ENQUIRY=true
VITE_INSTAGRAM_HANDLE=@manorleederville
VITE_FACEBOOK_PAGE_URL=https://www.facebook.com/manorleederville
```

- The page will render two CTAs: “Enquire via Instagram” (links to `ig.me/m/<handle>`) and “Enquire via Messenger” (links to `m.me/<page-username>` derived from the FB page URL).
- If either value is missing, that respective CTA is hidden. If both are missing and WhatsApp is enabled, it falls back to WhatsApp; otherwise, it falls back to the booking modal.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
