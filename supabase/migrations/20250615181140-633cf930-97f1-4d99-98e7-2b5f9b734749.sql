
-- Drop existing policies and recreate them with proper permissions
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.event_submissions;
DROP POLICY IF EXISTS "Allow anonymous select approved" ON public.event_submissions;
DROP POLICY IF EXISTS "Admin full access" ON public.event_submissions;

-- Allow anonymous users to insert pending events (more permissive)
CREATE POLICY "Allow anonymous insert" 
  ON public.event_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous users to select only approved events
CREATE POLICY "Allow anonymous select approved" 
  ON public.event_submissions 
  FOR SELECT 
  TO anon, authenticated
  USING (status = 'approved');

-- Allow authenticated users (admins) full access to all records
CREATE POLICY "Admin full access"
  ON public.event_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
