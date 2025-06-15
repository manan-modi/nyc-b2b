
-- Drop old policies
DROP POLICY IF EXISTS "Allow public insert" ON public.event_submissions;
DROP POLICY IF EXISTS "Allow public select" ON public.event_submissions;
DROP POLICY IF EXISTS "Admin full access" ON public.event_submissions;

-- Allow anonymous users (role = anon) to insert pending events
CREATE POLICY "Allow anonymous insert" 
  ON public.event_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (status = 'pending');

-- Allow anonymous users to select only approved events
CREATE POLICY "Allow anonymous select" 
  ON public.event_submissions 
  FOR SELECT 
  TO anon 
  USING (status = 'approved');

-- Allow authenticated users full access
CREATE POLICY "Admin full access"
  ON public.event_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
