
-- Drop all indexes related to events
DROP INDEX IF EXISTS idx_events_approved;
DROP INDEX IF EXISTS idx_events_featured;
DROP INDEX IF EXISTS idx_events_category;

-- Drop the trigger for updating updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;

-- Drop the events table completely
DROP TABLE IF EXISTS public.events CASCADE;
