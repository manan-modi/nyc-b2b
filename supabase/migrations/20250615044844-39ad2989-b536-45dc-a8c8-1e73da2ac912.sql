
-- First, let's check if RLS is enabled and see what policies exist
-- Then we'll ensure the policies work correctly for anonymous submissions

-- Make sure RLS is enabled on the events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can view approved events" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;
DROP POLICY IF EXISTS "Allow updates for admin operations" ON public.events;
DROP POLICY IF EXISTS "Allow admin to delete events" ON public.events;

-- Create a policy that allows ANYONE (including anonymous users) to insert events
-- This policy uses 'true' as the condition, making it permissive for all inserts
CREATE POLICY "Enable insert for all users" 
  ON public.events 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow anyone to view approved events
CREATE POLICY "Enable select for approved events" 
  ON public.events 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- Allow authenticated users (admins) to view all events
CREATE POLICY "Enable select for authenticated users" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update events
CREATE POLICY "Enable update for authenticated users" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to delete events
CREATE POLICY "Enable delete for authenticated users" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);
