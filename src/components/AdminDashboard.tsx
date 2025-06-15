
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Briefcase } from "lucide-react";
import { JobManagement } from "./admin/JobManagement";
import { BlogManagement } from "./admin/BlogManagement";
import { fetchAllJobs } from "@/lib/jobService";
import { fetchAllArticles } from "@/lib/blogService";

export const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobsData, articlesData] = await Promise.all([
        fetchAllJobs(),
        fetchAllArticles()
      ]);
      
      setJobs(jobsData);
      setArticles(articlesData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const pendingJobs = jobs.filter(job => job.status === 'pending').length;
  const publishedArticles = articles.filter(article => article.status === 'published').length;
  const draftArticles = articles.filter(article => article.status === 'draft').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your NYC B2B platform content and submissions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingJobs}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedArticles}</div>
              <p className="text-xs text-muted-foreground">Live on blog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftArticles}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Jobs Management
              {pendingJobs > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingJobs}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog Management
              {draftArticles > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {draftArticles}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <JobManagement jobs={jobs} setJobs={setJobs} />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement articles={articles} setArticles={setArticles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
