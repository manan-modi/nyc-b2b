
-- Create the events table with all fields optional except the essential ones
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  event_url TEXT NOT NULL,
  date DATE,
  time TIME,
  location TEXT,
  category TEXT,
  price TEXT,
  host_organization TEXT,
  expected_attendees INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  display_order INTEGER DEFAULT 999,
  featured BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for anonymous event submission and admin management
CREATE POLICY "Allow anonymous event submission" 
  ON public.events 
  FOR INSERT 
  TO anon
  WITH CHECK (status = 'pending');

-- Allow everyone (including anonymous users) to view approved events
CREATE POLICY "Allow public to view approved events" 
  ON public.events 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- Allow authenticated users (admins) to see all events
CREATE POLICY "Allow admins to view all events" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update events
CREATE POLICY "Allow admins to update events" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to delete events
CREATE POLICY "Allow admins to delete events" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX idx_events_approved ON public.events (status, date ASC) WHERE status = 'approved';
CREATE INDEX idx_events_featured ON public.events (featured, display_order) WHERE status = 'approved' AND featured = true;
CREATE INDEX idx_events_category ON public.events (category, date ASC) WHERE status = 'approved';

-- Trigger to update updated_at column
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
