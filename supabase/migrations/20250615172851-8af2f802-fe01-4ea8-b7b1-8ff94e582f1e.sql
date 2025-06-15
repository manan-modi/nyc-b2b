
-- Drop both tables to start fresh
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.event_submissions CASCADE;

-- Recreate event_submissions with clean schema
CREATE TABLE public.event_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text,
  description text,
  date date,
  time time,
  location text,
  image_url text,
  category text DEFAULT 'Networking',
  price text DEFAULT 'Free',
  host_organization text DEFAULT 'TBA',
  expected_attendees text DEFAULT 'TBA',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0
);

-- Enable row-level security
ALTER TABLE public.event_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can insert 'pending' submissions
CREATE POLICY "Allow public insert" 
  ON public.event_submissions 
  FOR INSERT 
  TO public 
  WITH CHECK (status = 'pending');

-- Public can select only 'approved' events
CREATE POLICY "Allow public select" 
  ON public.event_submissions 
  FOR SELECT 
  TO public 
  USING (status = 'approved');

-- Authenticated users (admins) have full access
CREATE POLICY "Admin full access"
  ON public.event_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
