
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, Search, ExternalLink, Building2 } from "lucide-react";
import { SubmitJobDialog } from "@/components/SubmitJobDialog";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  company_size: string | null;
  description: string | null;
  location: string | null;
  salary_range: string | null;
  employment_type: string | null;
  experience_level: string | null;
  industry: string | null;
  job_url: string;
  posted_date: string | null;
}

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'approved')
        .order('posted_date', { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error loading jobs",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    "Frontend Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "Product Manager",
    "Designer",
    "Marketing",
    "Sales",
    "Data Scientist",
    "DevOps Engineer"
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = !selectedRole || job.title.toLowerCase().includes(selectedRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const getTypeColor = (type: string) => {
    return type === "Full-time" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently posted";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return "1 day ago";
      if (diffDays <= 7) return `${diffDays} days ago`;
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString();
    } catch {
      return "Recently posted";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Briefcase className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC Startup Jobs</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Find your next opportunity at NYC's hottest startups. New positions added daily.
          </p>
          <SubmitJobDialog />
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getTypeColor(job.employment_type || "Full-time")}>
                    {job.employment_type || "Full-time"}
                  </Badge>
                  <div className="text-sm text-gray-500">{formatDate(job.posted_date)}</div>
                </div>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  {job.company}{job.company_size && ` • ${job.company_size} employees`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {job.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                )}
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  )}
                  {job.salary_range && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {job.salary_range}
                    </div>
                  )}
                  {job.experience_level && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {job.experience_level} experience
                    </div>
                  )}
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              {jobs.length === 0 
                ? "No jobs have been approved yet. Check back soon!" 
                : "Try adjusting your search criteria."}
            </p>
          </div>
        )}

        {/* Submit Job CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Hiring? Post Your Job</h2>
              <p className="text-xl mb-6 opacity-90">
                Reach 5,000+ qualified candidates in NYC's startup ecosystem. Get quality applications from top talent.
              </p>
              <SubmitJobDialog />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
