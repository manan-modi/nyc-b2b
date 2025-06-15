
import { supabase } from "@/integrations/supabase/client";

export interface Job {
  id: string;
  title: string;
  company: string;
  role?: string;
  location?: string;
  description?: string;
  job_url: string;
  salary_range?: string;
  employment_type?: string;
  experience_level?: string;
  industry?: string;
  company_size?: string;
  funding_stage?: string;
  company_logo?: string;
  status: string | null;
  posted_date?: string;
  created_at: string;
  updated_at: string;
}

export const fetchAllJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }

  return data || [];
};

export const updateJobStatus = async (jobId: string, status: 'approved' | 'rejected'): Promise<void> => {
  const { error } = await supabase
    .from('jobs')
    .update({ status })
    .eq('id', jobId);

  if (error) {
    console.error('Error updating job status:', error);
    throw new Error(`Failed to update job status: ${error.message}`);
  }
};

export const deleteJob = async (jobId: string): Promise<void> => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId);

  if (error) {
    console.error('Error deleting job:', error);
    throw new Error(`Failed to delete job: ${error.message}`);
  }
};
