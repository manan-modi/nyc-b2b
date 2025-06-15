
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {  Check, X, Calendar, ExternalLink, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { JobsStatsCards } from "./JobsStatsCards";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  job_url: string;
  description: string | null;
  salary_range: string | null;
  employment_type: string | null;
  experience_level: string | null;
  industry: string | null;
  company_size: string | null;
  funding_stage: string | null;
  status: string | null;
  posted_date: string | null;
  created_at: string;
  updated_at: string;
}

interface JobManagementProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
}

export const JobManagement = ({ jobs, setJobs }: JobManagementProps) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const updateJobStatus = async (jobId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId);

    if (error) {
      console.error('Error updating job status:', error);
      throw error;
    }
  };

  const handleJobStatusUpdate = async (jobId: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus(jobId);
    try {
      await updateJobStatus(jobId, status);
      
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, status }
          : job
      ));

      toast({
        title: `Job ${status}`,
        description: `The job has been ${status} successfully.`,
      });
    } catch (error) {
      console.error('Failed to update job status:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the job status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="space-y-6">
      <JobsStatsCards jobs={jobs} />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Submissions</h2>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {job.company} {job.location && `• ${job.location}`}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(job.status || 'pending')}>
                  {job.status || 'pending'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  {job.salary_range && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Salary:</span> {job.salary_range}
                    </div>
                  )}
                  {job.employment_type && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Type:</span> {job.employment_type}
                    </div>
                  )}
                  {job.experience_level && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Experience:</span> {job.experience_level}
                    </div>
                  )}
                  {job.industry && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Industry:</span> {job.industry}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {job.company_size && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Company Size:</span> {job.company_size}
                    </div>
                  )}
                  {job.funding_stage && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Funding Stage:</span> {job.funding_stage}
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Submitted:</span> {formatDate(job.created_at)}
                  </div>
                  {job.posted_date && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Posted:</span> {formatDate(job.posted_date)}
                    </div>
                  )}
                </div>
              </div>

              {job.description && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Description:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {job.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-gray-300"
                >
                  <a 
                    href={job.job_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Job Posting
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                {job.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleJobStatusUpdate(job.id, 'approved')}
                      disabled={updatingStatus === job.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {updatingStatus === job.id ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleJobStatusUpdate(job.id, 'rejected')}
                      disabled={updatingStatus === job.id}
                    >
                      <X className="mr-2 h-4 w-4" />
                      {updatingStatus === job.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No job submissions yet</h3>
            <p className="text-gray-600">Job postings will appear here once users start submitting them.</p>
          </div>
        )}
      </div>
    </div>
  );
};
