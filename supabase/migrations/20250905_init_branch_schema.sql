-- Initialize core schema for preview/dev branches
-- This migration mirrors production tables (structure only) so new branches
-- have the same schema and can run Edge Functions immediately.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- Reference tables / raw stores
-- =========================

-- Locations synced from Square (metadata)
CREATE TABLE IF NOT EXISTS public.square_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  square_location_id text UNIQUE,
  location_name text,
  address text,
  business_name text,
  country text,
  currency text,
  environment text DEFAULT 'sandbox',
  is_active boolean DEFAULT true,
  synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.square_locations ENABLE ROW LEVEL SECURITY;

-- Raw Square Payments (as returned by Payments API)
CREATE TABLE IF NOT EXISTS public.square_payments_raw (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  square_payment_id text UNIQUE,
  raw_response jsonb NOT NULL,
  synced_at timestamptz DEFAULT now()
);
ALTER TABLE public.square_payments_raw ENABLE ROW LEVEL SECURITY;

-- Raw Square Orders store
CREATE TABLE IF NOT EXISTS public.square_orders_raw (
  order_id text PRIMARY KEY,
  raw_response jsonb NOT NULL,
  location_id text,
  synced_at timestamptz DEFAULT now()
);

-- Optional curated orders snapshot (aggregated)
CREATE TABLE IF NOT EXISTS public.orders (
  order_id text PRIMARY KEY,
  payment_id text,
  location_id text,
  venue text,
  status text,
  order_created_at timestamptz,
  order_updated_at timestamptz,
  total_money_cents int,
  door_ticket_qty int DEFAULT 0,
  line_items jsonb,
  synced_at timestamptz DEFAULT now()
);

-- =========================
-- Revenue events and items (order headers/items)
-- =========================

CREATE TABLE IF NOT EXISTS public.revenue_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  square_payment_id text UNIQUE,
  venue text NOT NULL,
  revenue_type text NOT NULL CHECK (revenue_type = ANY (ARRAY['bar','door','other'])),
  amount_cents int NOT NULL,
  currency text DEFAULT 'USD',
  payment_date timestamptz NOT NULL,
  payment_hour int CHECK (payment_hour >= 0 AND payment_hour <= 23),
  payment_day_of_week int CHECK (payment_day_of_week >= 0 AND payment_day_of_week <= 6),
  status text DEFAULT 'completed',
  processed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.revenue_events ENABLE ROW LEVEL SECURITY;

-- FK from revenue_events to square_payments_raw by square_payment_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'revenue_events' AND c.conname = 'revenue_events_square_payment_id_fkey'
  ) THEN
    ALTER TABLE public.revenue_events
      ADD CONSTRAINT revenue_events_square_payment_id_fkey
      FOREIGN KEY (square_payment_id) REFERENCES public.square_payments_raw(square_payment_id);
  END IF;
END$$;

-- Items exploded from orders into reporting-friendly rows
CREATE TABLE IF NOT EXISTS public.revenue_event_items (
  id bigserial PRIMARY KEY,
  event_id uuid NOT NULL,
  name text,
  category text,
  quantity int DEFAULT 1,
  unit_amount_cents int,
  total_amount_cents int,
  is_comp boolean DEFAULT false,
  is_refund boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  occurred_at timestamptz
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'revenue_event_items' AND c.conname = 'revenue_event_items_event_id_fkey'
  ) THEN
    ALTER TABLE public.revenue_event_items
      ADD CONSTRAINT revenue_event_items_event_id_fkey
      FOREIGN KEY (event_id) REFERENCES public.revenue_events(id);
  END IF;
END$$;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_revenue_event_items_event_id ON public.revenue_event_items(event_id);
CREATE INDEX IF NOT EXISTS idx_revenue_event_items_occurred_at ON public.revenue_event_items(occurred_at);

-- =========================
-- Karaoke & bookings
-- =========================

CREATE TABLE IF NOT EXISTS public.karaoke_booths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  venue text NOT NULL CHECK (venue = ANY (ARRAY['manor','hippie'])),
  capacity int DEFAULT 8,
  hourly_rate numeric DEFAULT 25.00,
  is_available boolean DEFAULT true,
  maintenance_notes text,
  operating_hours_start time DEFAULT '10:00:00',
  operating_hours_end time DEFAULT '23:00:00',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text,
  booking_type text NOT NULL CHECK (booking_type = ANY (ARRAY['venue_hire','vip_tickets','karaoke_booking'])),
  venue text NOT NULL CHECK (venue = ANY (ARRAY['manor','hippie'])),
  venue_area text CHECK (venue_area = ANY (ARRAY['upstairs','downstairs','full_venue','karaoke'])),
  booking_date date NOT NULL,
  start_time time,
  end_time time,
  duration_hours int,
  guest_count int DEFAULT 1,
  ticket_quantity int,
  special_requests text,
  status text DEFAULT 'pending' CHECK (status = ANY (ARRAY['pending','confirmed','cancelled','completed'])),
  total_amount numeric,
  payment_status text DEFAULT 'unpaid' CHECK (payment_status = ANY (ARRAY['unpaid','deposit_paid','paid','refunded'])),
  exported_to_megatix boolean DEFAULT false,
  export_date timestamptz,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  staff_notes text,
  karaoke_booth_id uuid,
  booking_source text DEFAULT 'website_direct',
  reference_code text,
  ticket_checkins jsonb,
  square_payment_id text,
  payment_attempted_at timestamptz,
  payment_completed_at timestamptz,
  CONSTRAINT bookings_karaoke_booth_id_fkey FOREIGN KEY (karaoke_booth_id) REFERENCES public.karaoke_booths(id)
);

CREATE TABLE IF NOT EXISTS public.karaoke_booth_holds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booth_id uuid NOT NULL,
  venue text NOT NULL CHECK (venue = ANY (ARRAY['manor','hippie'])),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  session_id text NOT NULL,
  customer_email text,
  status text DEFAULT 'active' CHECK (status = ANY (ARRAY['active','released','consumed','expired'])),
  expires_at timestamptz DEFAULT (now() + interval '10 minutes'),
  booking_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT karaoke_booth_holds_booth_id_fkey FOREIGN KEY (booth_id) REFERENCES public.karaoke_booths(id),
  CONSTRAINT karaoke_booth_holds_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id)
);
ALTER TABLE public.karaoke_booth_holds ENABLE ROW LEVEL SECURITY;

-- =========================
-- Email events & templates
-- =========================

CREATE TABLE IF NOT EXISTS public.email_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid,
  recipient_email text NOT NULL,
  template text NOT NULL,
  status text CHECK (status = ANY (ARRAY['queued','sent','failed'])),
  error text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT email_events_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id)
);

CREATE TABLE IF NOT EXISTS public.email_templates (
  name text PRIMARY KEY,
  subject text,
  html text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- =========================
-- Customers / staff
-- =========================

CREATE TABLE IF NOT EXISTS public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.staff_profiles (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT staff_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_bookings_karaoke_booth_id ON public.bookings(karaoke_booth_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_date ON public.bookings(booking_date);

-- NOTE: Edge Functions are not created via SQL migrations. Ensure your
-- supabase/functions directory is present in the repo. Preview branches will
-- include those files, and you can deploy them with `supabase functions deploy`
-- in your CI for the branch.


