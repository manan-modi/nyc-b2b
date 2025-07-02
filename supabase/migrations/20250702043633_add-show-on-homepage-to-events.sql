-- Add show_on_homepage boolean column to events table
ALTER TABLE public.events ADD COLUMN show_on_homepage BOOLEAN NOT NULL DEFAULT false;

-- (No RLS changes needed unless you want to restrict updates to this field)
