
-- Drop the existing problematic RLS policy for events
DROP POLICY IF EXISTS "public_event_submissions" ON public.events;
DROP POLICY IF EXISTS "allow_public_insert" ON public.events;
DROP POLICY IF EXISTS "simple_insert" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view approved events" ON public.events;

-- Create policies that exactly match the jobs table pattern
CREATE POLICY "Anyone can view approved events" 
  ON public.events 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Anyone can submit events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (status = 'pending');

-- Ensure RLS is enabled
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
