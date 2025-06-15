
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, Search, ExternalLink, Building2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubmitJobDialog } from "@/components/SubmitJobDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo?: string;
  location?: string;
  experience_level?: string;
  industry?: string;
  job_url: string;
  description?: string;
  salary_range?: string;
  employment_type?: string;
  company_size?: string;
  posted_date: string;
}

const industries = [
  "Sales & Marketing Tech",
  "Fintech & Payments",
  "HR & Recruiting",
  "Customer Success & Support",
  "DevTools & Infrastructure",
  "Data & Analytics",
  "Security & Compliance",
  "Productivity & Collaboration",
  "E-commerce & Retail Tech",
  "Healthcare Tech",
  "Legal Tech",
  "Real Estate Tech",
  "Supply Chain & Logistics",
  "Education Tech",
  "Other B2B SaaS"
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStartup, setSelectedStartup] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleJoinCommunityClick = () => {
    window.open('https://nycb2b.beehiiv.com', '_blank');
  };

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
        description: "Please refresh the page to try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole === "all" || 
      job.title.toLowerCase().includes(selectedRole.toLowerCase());
    
    const matchesStartup = selectedStartup === "all" || 
      job.company.toLowerCase().includes(selectedStartup.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "all" || 
      job.industry === selectedIndustry;

    return matchesSearch && matchesRole && matchesStartup && matchesIndustry;
  });

  const getTypeColor = (type: string) => {
    return type === "Full-time" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation onJoinCommunityClick={handleJoinCommunityClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Briefcase className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC B2B Jobs</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find your next opportunity at NYC's hottest B2B startups. New positions added daily.
          </p>
          <SubmitJobDialog />
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="engineer">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data">Data</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStartup} onValueChange={setSelectedStartup}>
              <SelectTrigger>
                <SelectValue placeholder="Startup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Startups</SelectItem>
                {/* This will be populated dynamically from job data */}
                {Array.from(new Set(jobs.map(job => job.company))).map(company => (
                  <SelectItem key={company} value={company.toLowerCase()}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getTypeColor(job.employment_type || 'Full-time')}>
                      {job.employment_type || 'Full-time'}
                    </Badge>
                    <div className="text-sm text-gray-500">{formatDate(job.posted_date)}</div>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                    {job.company_size && ` • ${job.company_size} employees`}
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
                    {job.industry && (
                      <div className="text-xs">
                        <Badge variant="outline">{job.industry}</Badge>
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
        )}

        {/* Submit Job CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Hiring? Post Your Job</h2>
              <p className="text-xl mb-6 opacity-90">
                Reach thousands of qualified candidates in NYC's B2B startup ecosystem. Get quality applications from top talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SubmitJobDialog />
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobsPage;
