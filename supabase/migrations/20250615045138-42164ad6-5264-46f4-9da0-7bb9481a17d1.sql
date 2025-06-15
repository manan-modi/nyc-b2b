
-- Disable RLS temporarily to ensure clean slate
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to ensure no conflicts
DROP POLICY IF EXISTS "Enable insert for all users" ON public.events;
DROP POLICY IF EXISTS "Enable select for approved events" ON public.events;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Anyone can view approved events" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;
DROP POLICY IF EXISTS "Allow updates for admin operations" ON public.events;
DROP POLICY IF EXISTS "Allow admin to delete events" ON public.events;

-- Create the most permissive insert policy possible
-- This allows ANYONE (authenticated or anonymous) to insert events
CREATE POLICY "events_insert_policy" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (true);

-- Allow everyone to view approved events
CREATE POLICY "events_select_approved" 
  ON public.events 
  FOR SELECT 
  USING (status = 'approved');

-- Allow authenticated users (admins) to see all events
CREATE POLICY "events_select_all_authenticated" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update any event
CREATE POLICY "events_update_authenticated" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users to delete any event
CREATE POLICY "events_delete_authenticated" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);
