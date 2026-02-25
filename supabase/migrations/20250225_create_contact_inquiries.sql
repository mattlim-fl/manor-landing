-- Create contact_inquiries table for multi-venue contact form submissions
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue VARCHAR(20) NOT NULL CHECK (venue IN ('manor', 'hippie', 'daisys')),
  category VARCHAR(30) NOT NULL CHECK (category IN ('lost_property', 'skantech', 'function_inquiry', 'business_hours', 'something_else')),
  reference_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry_data JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by venue and status
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_venue ON contact_inquiries(venue);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_category ON contact_inquiries(category);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_reference_code ON contact_inquiries(reference_code);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_contact_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_inquiries_updated_at();

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from authenticated and anon users (contact form is public)
CREATE POLICY "Allow public inserts" ON contact_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow select for service role only (admin access)
CREATE POLICY "Service role can read all" ON contact_inquiries
  FOR SELECT
  USING (auth.role() = 'service_role');
