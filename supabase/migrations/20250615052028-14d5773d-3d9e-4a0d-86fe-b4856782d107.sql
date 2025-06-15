
-- Complete RLS reset with the simplest possible policies
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies completely
DROP POLICY IF EXISTS "allow_all_inserts" ON public.events;
DROP POLICY IF EXISTS "allow_view_approved" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_view_all" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_update" ON public.events;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON public.events;

-- Re-enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible policies
-- 1. Anyone can insert events (no restrictions at all)
CREATE POLICY "simple_insert" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (true);

-- 2. Anyone can view approved events
CREATE POLICY "simple_select_approved" 
  ON public.events 
  FOR SELECT 
  USING (status = 'approved');

-- 3. Authenticated users can view all events
CREATE POLICY "simple_select_all" 
  ON public.events 
  FOR SELECT 
  TO authenticated
  USING (true);

-- 4. Authenticated users can update events
CREATE POLICY "simple_update" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- 5. Authenticated users can delete events
CREATE POLICY "simple_delete" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (true);
