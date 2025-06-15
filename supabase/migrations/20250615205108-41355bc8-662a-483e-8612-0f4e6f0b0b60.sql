
-- Drop ALL existing policies on the events table
DROP POLICY IF EXISTS "Allow anonymous event submission" ON public.events;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.events;
DROP POLICY IF EXISTS "Enable select for approved events" ON public.events;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.events;

-- Create a completely permissive insert policy for anonymous users
CREATE POLICY "Allow all anonymous inserts" 
  ON public.events 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow anyone to view approved events
CREATE POLICY "Allow viewing approved events" 
  ON public.events 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Allow admin full access" 
  ON public.events 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);
