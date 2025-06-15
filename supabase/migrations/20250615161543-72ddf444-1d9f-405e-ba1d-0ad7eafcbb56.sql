
-- Add all necessary columns for event details and management to the event_submissions table
ALTER TABLE public.event_submissions
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS date DATE,
ADD COLUMN IF NOT EXISTS "time" TIME,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS price TEXT,
ADD COLUMN IF NOT EXISTS host_organization TEXT,
ADD COLUMN IF NOT EXISTS expected_attendees TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN,
ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Set sensible defaults for new and existing columns to ensure data integrity
ALTER TABLE public.event_submissions
ALTER COLUMN category SET DEFAULT 'Networking',
ALTER COLUMN price SET DEFAULT 'Free',
ALTER COLUMN host_organization SET DEFAULT 'TBA',
ALTER COLUMN expected_attendees SET DEFAULT 'TBA',
ALTER COLUMN featured SET DEFAULT FALSE,
ALTER COLUMN display_order SET DEFAULT 0,
ALTER COLUMN status SET DEFAULT 'pending',
ALTER COLUMN submitted_at SET DEFAULT now(),
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

-- Enforce NOT NULL constraints on critical columns
ALTER TABLE public.event_submissions
ALTER COLUMN status SET NOT NULL,
ALTER COLUMN submitted_at SET NOT NULL,
ALTER COLUMN created_at SET NOT NULL;
