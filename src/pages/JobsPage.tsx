
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, Search, ExternalLink, Building2 } from "lucide-react";
import { SubmitJobDialog } from "@/components/SubmitJobDialog";

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  // Mock data for now - will be replaced with real data from Supabase
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "Fintech Startup",
      companySize: "50-100",
      description: "Build the future of payments with React, TypeScript, and modern web technologies",
      location: "NYC (Hybrid)",
      salary: "$140k - $180k",
      type: "Full-time",
      experience: "5+ years",
      posted: "2 days ago",
      industry: "Fintech & Payments",
      link: "https://jobs.example.com/frontend-engineer"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "E-commerce Scale-up",
      companySize: "100-200",
      description: "Lead product strategy for our B2B marketplace serving 10k+ businesses",
      location: "Manhattan",
      salary: "$120k - $160k",
      type: "Full-time",
      experience: "3+ years",
      posted: "1 day ago",
      industry: "E-commerce & Retail Tech",
      link: "https://jobs.example.com/product-manager"
    },
    {
      id: 3,
      title: "Growth Marketing Lead",
      company: "SaaS Startup",
      companySize: "20-50",
      description: "Drive user acquisition and retention for our fast-growing SaaS platform",
      location: "Remote/NYC",
      salary: "$100k - $140k",
      type: "Full-time",
      experience: "4+ years",
      posted: "3 days ago",
      industry: "Sales & Marketing Tech",
      link: "https://jobs.example.com/growth-marketing"
    }
  ];

  const industries = [
    "all",
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
    "Education Tech"
  ];

  const locations = ["all", "Manhattan", "Brooklyn", "Remote", "Hybrid"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || job.title.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesLocation = selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || job.industry === selectedIndustry;
    return matchesSearch && matchesRole && matchesLocation && matchesIndustry;
  });

  const getTypeColor = (type: string) => {
    return type === "Full-time" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
            <Input
              placeholder="Role (e.g. Frontend Engineer)"
              value={selectedRole === "all" ? "" : selectedRole}
              onChange={(e) => setSelectedRole(e.target.value || "all")}
            />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry === "all" ? "All Industries" : industry}
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
                  <Badge className={getTypeColor(job.type)}>
                    {job.type}
                  </Badge>
                  <div className="text-sm text-gray-500">{job.posted}</div>
                </div>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  {job.company} • {job.companySize} employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {job.experience} experience
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Job CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Hiring? Post Your Job</h2>
              <p className="text-xl mb-6 opacity-90">
                Reach 5,000+ qualified candidates in NYC's startup ecosystem. Get quality applications from top talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SubmitJobDialog />
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  View Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
