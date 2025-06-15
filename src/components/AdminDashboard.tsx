
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { fetchAllEventSubmissions, EventSubmission } from "@/lib/eventService";
import { fetchAllArticles, type BlogArticle } from "@/lib/blogService";
import { supabase } from "@/integrations/supabase/client";
import { logout } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventSubmissionManagement } from "./admin/EventSubmissionManagement";
import { BlogManagement } from "./admin/BlogManagement";
import { JobManagement } from "./admin/JobManagement";

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
  company_logo: string | null;
  status: string | null;
  posted_date: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [eventSubmissions, setEventSubmissions] = useState<EventSubmission[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [submissionsData, articlesData, jobsData] = await Promise.all([
        fetchAllEventSubmissions(),
        fetchAllArticles(),
        fetchAllJobs()
      ]);
      setEventSubmissions(submissionsData);
      setArticles(articlesData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({
        title: "Failed to Load Data",
        description: "There was an error loading the data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllJobs = async (): Promise<Job[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    return data || [];
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage event submissions, blog articles, jobs, and website content
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Event Submissions</TabsTrigger>
            <TabsTrigger value="blog">Blog Articles</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventSubmissionManagement 
              submissions={eventSubmissions} 
              setSubmissions={setEventSubmissions} 
            />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement 
              articles={articles} 
              setArticles={setArticles} 
              onReloadData={loadData} 
            />
          </TabsContent>

          <TabsContent value="jobs">
            <JobManagement jobs={jobs} setJobs={setJobs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
