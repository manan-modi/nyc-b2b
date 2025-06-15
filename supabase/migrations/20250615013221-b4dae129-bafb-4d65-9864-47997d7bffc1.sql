
-- Create a table for jobs
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  location TEXT,
  experience_level TEXT,
  industry TEXT,
  job_url TEXT NOT NULL,
  description TEXT,
  salary_range TEXT,
  employment_type TEXT DEFAULT 'Full-time',
  company_size TEXT,
  funding_stage TEXT,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to view approved jobs
CREATE POLICY "Anyone can view approved jobs" 
  ON public.jobs 
  FOR SELECT 
  USING (status = 'approved');

-- Policy to allow anyone to submit jobs (they start as pending)
CREATE POLICY "Anyone can submit jobs" 
  ON public.jobs 
  FOR INSERT 
  WITH CHECK (status = 'pending');

-- Add an index for better performance on approved jobs
CREATE INDEX idx_jobs_approved ON public.jobs (status, posted_date DESC) WHERE status = 'approved';

-- Add an index for search functionality
CREATE INDEX idx_jobs_search ON public.jobs (company, title, industry) WHERE status = 'approved';
