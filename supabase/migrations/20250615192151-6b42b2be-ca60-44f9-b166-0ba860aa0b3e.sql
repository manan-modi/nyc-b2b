
-- Create the events table that matches the eventService interface
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_url TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  host_organization TEXT NOT NULL,
  expected_attendees INTEGER NOT NULL DEFAULT 50,
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

-- Policy to allow anyone to insert events (they start as pending)
CREATE POLICY "Anyone can submit events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow everyone to view approved events
CREATE POLICY "Anyone can view approved events" 
  ON public.events 
  FOR SELECT 
  USING (status = 'approved');

-- Policy to allow authenticated users (admins) to see all events
CREATE POLICY "Authenticated users can view all events" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to update events
CREATE POLICY "Authenticated users can update events" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to delete events
CREATE POLICY "Authenticated users can delete events" 
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
