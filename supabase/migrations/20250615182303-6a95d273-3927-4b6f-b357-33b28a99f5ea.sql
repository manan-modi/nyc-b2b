
-- Completely reset RLS policies for event_submissions table
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.event_submissions;
DROP POLICY IF EXISTS "Allow anonymous select approved" ON public.event_submissions;
DROP POLICY IF EXISTS "Admin full access" ON public.event_submissions;

-- Create the most permissive insert policy possible for anonymous users
CREATE POLICY "Enable insert for all users" 
  ON public.event_submissions 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow everyone to view approved events
CREATE POLICY "Enable select for approved events" 
  ON public.event_submissions 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- Allow authenticated users (admins) to view all events
CREATE POLICY "Enable select for authenticated users" 
  ON public.event_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update events
CREATE POLICY "Enable update for authenticated users" 
  ON public.event_submissions 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to delete events
CREATE POLICY "Enable delete for authenticated users" 
  ON public.event_submissions 
  FOR DELETE 
  TO authenticated
  USING (true);
