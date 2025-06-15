
-- Create event_submissions table for storing submitted events
CREATE TABLE public.event_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Metadata fields that admin can edit
  title text,
  description text,
  date date,
  time time,
  location text,
  image_url text,
  category text DEFAULT 'Networking',
  price text DEFAULT 'Free',
  host_organization text,
  expected_attendees text DEFAULT 'TBA',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0
);

-- Enable row-level security
ALTER TABLE public.event_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert pending events
CREATE POLICY "Allow anonymous insert" 
  ON public.event_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (status = 'pending');

-- Allow anonymous users to select only approved events
CREATE POLICY "Allow anonymous select approved" 
  ON public.event_submissions 
  FOR SELECT 
  TO anon 
  USING (status = 'approved');

-- Allow authenticated users (admins) full access
CREATE POLICY "Admin full access"
  ON public.event_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_event_submissions_status ON public.event_submissions (status);
CREATE INDEX idx_event_submissions_approved_date ON public.event_submissions (status, date) WHERE status = 'approved';
CREATE INDEX idx_event_submissions_featured ON public.event_submissions (featured, display_order) WHERE status = 'approved' AND featured = true;

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_event_submissions_updated_at
  BEFORE UPDATE ON public.event_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
