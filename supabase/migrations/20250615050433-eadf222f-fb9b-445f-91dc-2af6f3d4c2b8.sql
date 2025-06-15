
-- First, let's drop all existing policies to start fresh
DROP POLICY IF EXISTS "events_insert_policy" ON public.events;
DROP POLICY IF EXISTS "events_select_approved" ON public.events;
DROP POLICY IF EXISTS "events_select_all_authenticated" ON public.events;
DROP POLICY IF EXISTS "events_update_authenticated" ON public.events;
DROP POLICY IF EXISTS "events_delete_authenticated" ON public.events;
DROP POLICY IF EXISTS "Anyone can view approved events" ON public.events;
DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;
DROP POLICY IF EXISTS "Allow updates for admin operations" ON public.events;
DROP POLICY IF EXISTS "Allow admin to delete events" ON public.events;

-- Create a simple policy that allows anyone to insert events
CREATE POLICY "allow_anonymous_insert" 
  ON public.events 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Allow everyone to view approved events
CREATE POLICY "allow_select_approved" 
  ON public.events 
  FOR SELECT 
  TO anon, authenticated
  USING (status = 'approved');

-- Allow authenticated users (admins) to see all events
CREATE POLICY "allow_admin_select_all" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update any event
CREATE POLICY "allow_admin_update" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Allow authenticated users to delete any event
CREATE POLICY "allow_admin_delete" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);
