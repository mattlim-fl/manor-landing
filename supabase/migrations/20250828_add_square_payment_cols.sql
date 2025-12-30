-- Add Square payment tracking columns and defaults
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS square_payment_id VARCHAR(255) UNIQUE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_attempted_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMPTZ;

-- Ensure payment_status defaults to pending for new rows
ALTER TABLE bookings ALTER COLUMN payment_status SET DEFAULT 'pending';

-- Backfill nulls to pending
UPDATE bookings SET payment_status = 'pending' WHERE payment_status IS NULL;


