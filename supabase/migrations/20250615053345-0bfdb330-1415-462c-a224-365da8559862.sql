
-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "simple_insert" ON public.events;

-- Create a new permissive INSERT policy that allows anyone (including unauthenticated users) to insert events
CREATE POLICY "allow_public_insert" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (true);
