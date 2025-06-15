
-- Drop the existing anonymous submission policy
DROP POLICY IF EXISTS "Allow anonymous event submission" ON public.events;

-- Create a new policy that allows anonymous users to insert events without status restriction
CREATE POLICY "Allow anonymous event submission" 
  ON public.events 
  FOR INSERT 
  TO anon
  WITH CHECK (true);
