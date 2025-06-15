
-- First, let's check what policies exist and then fix them
-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Anyone can view approved events" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;

-- Recreate the policies with proper configuration
-- Policy to allow everyone to view approved events
CREATE POLICY "Anyone can view approved events" 
  ON public.events 
  FOR SELECT 
  USING (status = 'approved');

-- Policy to allow anyone to submit events (they start as pending)
-- This policy should allow inserts without authentication
CREATE POLICY "Anyone can submit events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (status = 'pending');

-- Also add a policy for updating events (for admin functionality)
CREATE POLICY "Allow updates for admin operations" 
  ON public.events 
  FOR UPDATE 
  USING (true);

-- Policy for admin to delete events
CREATE POLICY "Allow admin to delete events" 
  ON public.events 
  FOR DELETE 
  USING (true);
