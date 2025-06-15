
-- First, let's completely reset the RLS policies for the events table
DROP POLICY IF EXISTS "allow_public_insert" ON public.events;
DROP POLICY IF EXISTS "simple_insert" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;

-- Create a fresh, permissive INSERT policy that allows unauthenticated users
CREATE POLICY "public_event_submissions" 
  ON public.events 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
