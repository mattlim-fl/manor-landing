## Square Payments – Switch from Sandbox to Production

This short guide explains how to take our Square integration live. It covers the frontend app ID/location, the Supabase Edge Function secrets, deployment, and a quick validation checklist.

### 1) Prepare production credentials in Square
- Create a Production Square application (or open the existing one).
- Create/identify the Production Location you want to use (e.g., your venue).
- Collect:
  - Application ID (production)
  - Access Token (production)
  - Location ID (production)

Keep these secure; never commit tokens to the repo.

### 2) Frontend – point to production app/location
File: `src/lib/config.ts`

Update the two constants to the production values:

```ts
export const SQUARE_APPLICATION_ID = '<PRODUCTION_APP_ID>'
export const SQUARE_LOCATION_ID = '<PRODUCTION_LOCATION_ID>'
```

Notes:
- The Square script URL is chosen automatically based on the app ID prefix. If it does not start with `sandbox-`, we load the production SDK endpoint.
- Redeploy the frontend/site after this change.

### 3) Backend – set production secrets for the Edge Function
In Supabase (Project → Edge Functions → Secrets), set the production secrets:

- `SQUARE_ACCESS_TOKEN` = <PRODUCTION_ACCESS_TOKEN>
- `SQUARE_LOCATION_ID` = <PRODUCTION_LOCATION_ID>

You can keep the sandbox secrets in place for future testing:

- `SQUARE_SANDBOX_ACCESS_TOKEN` (optional)
- `SQUARE_SANDBOX_LOCATION_ID` (optional)

### 4) Backend – switch the function to use production
File: `supabase/functions/karaoke-pay-and-book/index.ts`

This function currently enforces sandbox-only tokens. To go live, change the token/ID sourcing to use production by default (or make it environment-driven). Replace the sandbox-only section with:

```ts
// Use production by default; fall back to sandbox if not present
const SQUARE_ACCESS_TOKEN = Deno.env.get('SQUARE_ACCESS_TOKEN') || Deno.env.get('SQUARE_SANDBOX_ACCESS_TOKEN')
const SQUARE_LOCATION_ID = Deno.env.get('SQUARE_LOCATION_ID') || Deno.env.get('SQUARE_SANDBOX_LOCATION_ID')
```

Then redeploy the function (see step 5). If you prefer a switch, add a secret like `SQUARE_ENV=production|sandbox` and branch accordingly.

### 5) Deploy the Edge Function
From the project root with Supabase CLI:

```bash
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>
supabase functions deploy karaoke-pay-and-book
```

### 6) Quick validation checklist (production)
- Frontend shows the production app ID and location (inspect `SQUARE_APPLICATION_ID` / `SQUARE_LOCATION_ID` at runtime if needed).
- The payment form shows “Postcode” (AU) and accepts valid AU postcodes.
- A small-value real card test succeeds (Square production does not support test cards). Refund immediately in the Square Dashboard.
- In the Square Dashboard → Payments and Orders, the payment has:
  - Two order line items (Karaoke Booth, Venue Tickets)
  - The correct total amount
- In Supabase `bookings`:
  - One row with `booking_type = karaoke_booking` and `square_payment_id` set
  - One row with `booking_type = vip_tickets` (no `square_payment_id`, the ID stored in `staff_notes`)

### 7) Rollback to Sandbox (optional)
- Revert `src/lib/config.ts` to the sandbox app/location.
- Ensure `SQUARE_SANDBOX_ACCESS_TOKEN` and `SQUARE_SANDBOX_LOCATION_ID` are set.
- Revert the function env sourcing back to sandbox or toggle the env switch, then redeploy the function.

### 8) Common issues
- Still seeing “ZIP code”: verify the frontend location ID is production AU and the function is charging the same AU location ID. Hard refresh to reload the Square SDK.
- “Field must not be greater than 45 length”: idempotency key must be ≤45 chars (handled in code via hashing).
- “Duplicate square_payment_id”: only the karaoke booking row stores the payment ID; tickets row omits it by design.

---
If you run into anything unexpected, share the function response body (we return `{ success: false, error }` on errors) and the Square Dashboard order/payment IDs.



