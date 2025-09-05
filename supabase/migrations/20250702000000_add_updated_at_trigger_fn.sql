-- Ensure the generic updated_at trigger function exists before any triggers reference it
-- This must run BEFORE migrations that call EXECUTE FUNCTION public.update_updated_at_column()

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;


