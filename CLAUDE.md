# Manor Website - Development Guidelines

## Project Context

This is the Manor nightclub website - a promotional and booking platform for a Perth, WA nightclub with a leopard print / disco aesthetic.

**Venue:** `manor`

## Tech Stack

- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for base components
- React Router v6 for navigation
- Supabase for backend (PostgreSQL + Edge Functions)
- Square Web Payments SDK for payment processing

## Brand Colors

Use the `manor` color tokens defined in `tailwind.config.ts`:

```
manor.gold         - #E59D50 (primary accent, text highlights)
manor.coral        - #D04E2B (buttons, CTAs)
manor.coral-dark   - #CD3E28 (hover states)
manor.coral-darker - #C63D1E (active states)
manor.coral-bright - #FF3B1F (navigation highlights)
manor.brown        - #271308 (dark backgrounds)
manor.black        - #000000
manor.white        - #FFFFFF
manor.gray         - #CCCCCC
```

Also available as CSS variables: `--manor-gold`, `--manor-coral`, `--manor-brown`

## Typography

- **Headings/Display:** `font-blur` (FF Blur)
- **Body:** `font-blur` or `font-acumin` (Acumin Variable)

## File Structure

```
src/
├── components/
│   ├── homepage/     # Index page components (NavigationButtons, OpeningHours, etc.)
│   ├── service-page/ # Service page components (DescriptionSection)
│   ├── layout/       # Header, Footer, MobileNav
│   └── ui/           # shadcn/ui components
├── pages/            # Route page components
├── services/         # API client functions (Supabase Edge Functions)
├── hooks/            # Custom React hooks
└── lib/              # Utilities (config, supabaseClient, utils)
```

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Index | Landing page with venue images |
| `/services` | Services | Services overview |
| `/downstairs` | Downstairs | Downstairs venue hire |
| `/upstairs` | Upstairs | Upstairs venue hire |
| `/full-venue` | FullVenue | Full venue hire |
| `/karaoke` | Karaoke | Karaoke booth booking |
| `/vip-tables` | VipTables | VIP table booking |
| `/guest-list` | GuestList | Guest list signup |
| `/birthdays-occasions` | BirthdaysOccasions | Birthday packages |
| `/special-events` | SpecialEvents | Special events info |
| `/priority-entry` | PriorityEntry | Priority entry booking |
| `/contact` | Contact | Contact information |
| `/group/:token` | GroupTicketPage | Group ticket purchase |
| `/occasion/buy/:token` | OccasionBuyPage | Guest ticket purchase |
| `/occasion/:token` | OccasionOrganiserPage | Organizer guest list |

## Background Style

The site uses a leopard print background pattern:
- CSS class: `leopard-bg` (defined in `index.css`)
- Uses `/leopard-pattern-bg.png` with overlay effects

## Component Patterns

**Page Structure:**
```tsx
<div className="min-h-screen leopard-bg text-white">
  <Header />
  <main>{/* content */}</main>
  <Footer />
</div>
```

**Button Styles:**
- Primary: `manor-pill-btn manor-pill-btn-coral`
- Secondary: `manor-pill-btn manor-pill-btn-outline`

## Environment Variables

Required in `.env.local`:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

## Coding Conventions

1. Use TypeScript for all components
2. Prefer Tailwind classes over inline styles
3. Use the `manor.*` color tokens, not hex codes
4. Follow mobile-first responsive design
5. Keep components small and focused
