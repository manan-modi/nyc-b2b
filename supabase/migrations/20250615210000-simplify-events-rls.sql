
-- Drop existing policies
DROP POLICY IF EXISTS "Allow all anonymous inserts" ON public.events;
DROP POLICY IF EXISTS "Allow viewing approved events" ON public.events;
DROP POLICY IF EXISTS "Allow admin full access" ON public.events;

-- Create simple, consistent policies like the jobs table
CREATE POLICY "Allow anonymous event submission" 
  ON public.events 
  FOR INSERT 
  TO anon
  WITH CHECK (status = 'pending');

-- Allow everyone to view approved events
CREATE POLICY "Allow public to view approved events" 
  ON public.events 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- Allow authenticated users (admins) to manage all events
CREATE POLICY "Allow authenticated users full access" 
  ON public.events 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);
