
-- Add role column to the jobs table
ALTER TABLE public.jobs 
ADD COLUMN role text;
