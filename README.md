
# Manor Landing

A modern, responsive website for Manor nightclub built with React, TypeScript, and Tailwind CSS.

## Project Features

- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Video background hero section
- Multiple pages (Home, Services, Contact)
- Component-based architecture using shadcn/ui

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd <YOUR_PROJECT_NAME>
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Deployment

This project can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project with `npm run build` and deploy the `dist` folder.

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
