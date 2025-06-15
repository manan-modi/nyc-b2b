
-- Step 1: Completely reset RLS policies for events table
-- Disable RLS temporarily to ensure clean slate
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies (using IF EXISTS to avoid errors)
DROP POLICY IF EXISTS "allow_anonymous_insert" ON public.events;
DROP POLICY IF EXISTS "allow_select_approved" ON public.events;
DROP POLICY IF EXISTS "allow_admin_select_all" ON public.events;
DROP POLICY IF EXISTS "allow_admin_update" ON public.events;
DROP POLICY IF EXISTS "allow_admin_delete" ON public.events;
DROP POLICY IF EXISTS "events_insert_policy" ON public.events;
DROP POLICY IF EXISTS "events_select_approved" ON public.events;
DROP POLICY IF EXISTS "events_select_all_authenticated" ON public.events;
DROP POLICY IF EXISTS "events_update_authenticated" ON public.events;
DROP POLICY IF EXISTS "events_delete_authenticated" ON public.events;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.events;
DROP POLICY IF EXISTS "Enable select for approved events" ON public.events;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.events;

-- Re-enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create the most permissive insert policy possible for anonymous users
CREATE POLICY "allow_all_inserts" 
  ON public.events 
  FOR INSERT 
  TO anon, authenticated, public
  WITH CHECK (true);

-- Allow everyone to view approved events
CREATE POLICY "allow_view_approved" 
  ON public.events 
  FOR SELECT 
  TO anon, authenticated, public
  USING (status = 'approved');

-- Allow authenticated users (admins) to see all events
CREATE POLICY "allow_authenticated_view_all" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update and delete events
CREATE POLICY "allow_authenticated_update" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "allow_authenticated_delete" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);
