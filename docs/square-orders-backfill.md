## Square Orders Backfill and Transformation

This doc explains how we backfill Square Orders into our database and transform them into `revenue_event_items`. Use this when running ad‑hoc backfills or when wiring up a scheduled job.

### Overview
- Edge Function: `backfill-square-orders`
- Source: Square Orders API (`/v2/orders/search`)
- Target table: `public.square_orders_raw` (raw JSON per order)
- Follow‑up transform (SQL): explode order `line_items` into `public.revenue_event_items`

### Prerequisites
- Supabase project URL/key available to the caller (we use anon key from client or server env).
- Square tokens configured:
  - Production: `SQUARE_PRODUCTION_ACCESS_TOKEN` (or pass via header per request)
  - Sandbox: `SQUARE_SANDBOX_ACCESS_TOKEN` (optional; used for sandbox runs)
- Location ID available (can be provided by header or `SQUARE_LOCATION_ID` secret).

### Edge Function: backfill-square-orders
Endpoint:
```
POST https://<PROJECT_REF>.supabase.co/functions/v1/backfill-square-orders
```

Headers (required):
- `apikey`: Supabase anon key
- `Authorization`: `Bearer <SUPABASE_ANON_KEY>`
- `Content-Type`: `application/json`
- `x-square-env`: `production` | `sandbox`
- `x-square-location-id`: Square Location ID (e.g., `LGRBM02D8PCNM`)

Headers (optional):
- `x-square-token`: Overrides Square token for the run; if not provided, the function uses the corresponding secret (`SQUARE_PRODUCTION_ACCESS_TOKEN` or `SQUARE_SANDBOX_ACCESS_TOKEN`).

Body (JSON):
```
{
  "start_date": "YYYY-MM-DD",   // optional; uses created_at >= start
  "end_date":   "YYYY-MM-DD",   // optional; uses created_at <= end 23:59:59Z
  "limit": 200,                   // optional; per-page (1..500), default 200
  "dryRun": false                 // if true, fetch only (no DB writes)
}
```

Response (example):
```
{
  "success": true,
  "env": "production",
  "location_id": "LGRBM02D8PCNM",
  "fetchedOrders": 7547,
  "insertedOrders": 7547,
  "failures": [],
  "date_range": { "start_date": "2025-08-01", "end_date": "2025-08-31" },
  "dryRun": false
}
```

Notes:
- The function paginates via `/v2/orders/search` and upserts into `public.square_orders_raw` using `order_id` as the key.
- `x-square-location-id` must be exact; mis‑spelling leads to 403 from Square.
- If you see 403/401 errors, validate the token against `GET /v2/locations` and a minimal `POST /v2/orders/search` in Postman first.

### Quick Postman recipe
1) Test token sees the location
   - GET `https://connect.squareup.com/v2/locations`
   - Headers: `Authorization: Bearer <PROD_TOKEN>`, `Square-Version: 2025-07-16`
2) Test Orders API
   - POST `https://connect.squareup.com/v2/orders/search`
   - Headers: above + `Content-Type: application/json`
   - Body: `{ "location_ids": ["<LOCATION_ID>"], "limit": 1 }`
3) Run the backfill function
   - POST `.../functions/v1/backfill-square-orders`
   - Headers: `apikey`, `Authorization`, `Content-Type`, `x-square-env: production`, `x-square-token: <PROD_TOKEN>`, `x-square-location-id: <LOCATION_ID>`
   - Body month window, e.g. `{ "start_date": "2025-08-01", "end_date": "2025-08-31", "limit": 200, "dryRun": false }`

### Transform: Orders → revenue_event_items (SQL)

The following SQL transforms everything currently present in the raw tables into `revenue_event_items`. It is idempotent (skips events that already have items).

```
WITH candidates AS (
  SELECT
    re.id AS event_id,
    (spr.raw_response->>'order_id') AS order_id
  FROM public.revenue_events re
  JOIN public.square_payments_raw spr
    ON spr.square_payment_id = re.square_payment_id
  WHERE re.revenue_type = 'door'
    AND re.square_payment_id IS NOT NULL
    AND (spr.raw_response ? 'order_id')
    AND NOT EXISTS (
      SELECT 1 FROM public.revenue_event_items i WHERE i.event_id = re.id
    )
),
items AS (
  SELECT
    c.event_id,
    li->>'name'                                      AS name,
    NULL::text                                       AS category,
    GREATEST(1, COALESCE((li->>'quantity')::int, 1)) AS quantity,
    NULLIF((li->'base_price_money'->>'amount'), '')::int AS unit_amount_cents,
    NULLIF((li->'total_money'->>'amount'), '')::int      AS total_amount_cents,
    false AS is_comp,
    false AS is_refund
  FROM candidates c
  JOIN public.square_orders_raw sor
    ON sor.order_id = c.order_id
  CROSS JOIN LATERAL jsonb_array_elements(sor.raw_response->'line_items') li
)
INSERT INTO public.revenue_event_items (
  event_id, name, category, quantity, unit_amount_cents, total_amount_cents, is_comp, is_refund
)
SELECT event_id, name, category, quantity, unit_amount_cents, total_amount_cents, is_comp, is_refund
FROM items;
```

Optional indexes (one‑time):
```
CREATE INDEX IF NOT EXISTS idx_revenue_event_items_event_id ON public.revenue_event_items(event_id);
CREATE INDEX IF NOT EXISTS idx_square_orders_raw_order_id   ON public.square_orders_raw(order_id);
CREATE INDEX IF NOT EXISTS idx_revenue_events_square_payment ON public.revenue_events(square_payment_id);
```

### Scheduling (cron) – outline
When automating, run two steps monthly:
1) Backfill Orders for last month (production, single location per call):
   - Call `backfill-square-orders` with `start_date` and `end_date` set to the previous month boundaries.
2) Transform:
   - Execute the SQL above (can be issued via Supabase SQL API or a `postgres` job). It is safe to run repeatedly.

Recommended safeguards:
- Use `dryRun: true` first to confirm fetched count.
- Log `fetchedOrders`/`insertedOrders` and failures.
- Alert on Square API 4xx/5xx responses.

### Troubleshooting
- 403 from function: usually auth or wrong `x-square-location-id`. Verify with Square API directly.
- 200 with zero inserts: check that the date window matches order `created_at` and that the location is correct.
- Transform inserts nothing: verify `revenue_events` have `revenue_type='door'` and joinable `square_payment_id`, and that the corresponding payment rows in `square_payments_raw` contain `order_id`.


