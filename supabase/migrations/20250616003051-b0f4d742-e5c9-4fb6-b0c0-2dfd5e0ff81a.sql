
-- Complete RLS policy reset for events table
-- Drop ALL existing policies on the events table to prevent any conflict
DROP POLICY IF EXISTS "Allow all anonymous inserts" ON public.events;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.events;
DROP POLICY IF EXISTS "Enable select for approved events" ON public.events;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.events;
DROP POLICY IF EXISTS "Allow anonymous event submission" ON public.events;
DROP POLICY IF EXISTS "Allow public to view approved events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.events;
DROP POLICY IF EXISTS "simple_insert" ON public.events;
DROP POLICY IF EXISTS "simple_select_approved" ON public.events;
DROP POLICY IF EXISTS "simple_select_all" ON public.events;
DROP POLICY IF EXISTS "simple_update" ON public.events;
DROP POLICY IF EXISTS "simple_delete" ON public.events;
DROP POLICY IF EXISTS "allow_all_inserts" ON public.events;
DROP POLICY IF EXISTS "allow_view_approved" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_view_all" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_update" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON public.events;
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

-- Ensure RLS is enabled
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create only 3 clean, non-conflicting policies

-- 1. Allow anonymous users to insert events with status = 'pending'
CREATE POLICY "anonymous_event_submission" 
  ON public.events 
  FOR INSERT 
  TO anon
  WITH CHECK (status = 'pending');

-- 2. Allow everyone to view approved events
CREATE POLICY "public_view_approved_events" 
  ON public.events 
  FOR SELECT 
  TO public
  USING (status = 'approved');

-- 3. Allow authenticated users (admins) full access to all events
CREATE POLICY "authenticated_full_access" 
  ON public.events 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);
