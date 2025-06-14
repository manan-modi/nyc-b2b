import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, MapPin, Users, Briefcase, BookOpen, MessageCircle, Mail, Building2, TrendingUp, Network, Star, ChevronRight, Zap, Target, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you updates about NYC B2B events and opportunities.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thanks for joining!",
      description: "You'll receive our next update with the hottest NYC B2B events and job opportunities.",
    });
    setEmail("");
  };

  const featuredEvents = [
    {
      title: "NYC Tech Meetup",
      date: "Dec 18, 2024",
      location: "WeWork SoHo",
      attendees: "250+",
      category: "Networking",
      status: "Featured",
      price: "Free"
    },
    {
      title: "FinTech Founders Dinner",
      date: "Dec 20, 2024",
      location: "Midtown East",
      attendees: "50+",
      category: "Finance",
      status: "Premium",
      price: "$85"
    },
    {
      title: "AI Startup Showcase",
      date: "Dec 22, 2024",
      location: "Brooklyn Navy Yard",
      attendees: "180+",
      category: "AI/ML",
      status: "New",
      price: "Free"
    }
  ];

  const featuredJobs = [
    {
      title: "Senior Frontend Engineer",
      company: "Fintech Startup",
      location: "NYC (Hybrid)",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "2 days ago",
      isHot: true
    },
    {
      title: "Product Manager",
      company: "E-commerce Scale-up",
      location: "Manhattan",
      salary: "$120k - $160k",
      type: "Full-time",
      posted: "1 week ago",
      isHot: false
    },
    {
      title: "Growth Marketing Lead",
      company: "SaaS Startup",
      location: "Remote/NYC",
      salary: "$100k - $140k",
      type: "Full-time",
      posted: "3 days ago",
      isHot: true
    }
  ];

  const stats = [
    { number: "5,000+", label: "Community Members", icon: Users, growth: "+12%" },
    { number: "200+", label: "Events This Year", icon: Calendar, growth: "+45%" },
    { number: "1,500+", label: "Job Opportunities", icon: Briefcase, growth: "+23%" },
    { number: "100+", label: "Partner Companies", icon: Building2, growth: "+67%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Building2 className="h-9 w-9 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">NYC B2B</span>
                <div className="text-xs text-gray-500 font-medium">Powered by community</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">Events</a>
              <a href="#jobs" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">Jobs</a>
              <a href="#blog" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">Resources</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium hover:scale-105">About</a>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-green-600/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="animate-fade-in">
            <Badge className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-blue-200/50 px-4 py-2 text-sm font-semibold shadow-sm">
              🚀 NYC's Premier B2B Community · 5,000+ Members
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Connect. Build.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 animate-pulse">
                Scale.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Your gateway to NYC's most exclusive B2B events, job opportunities, and resources. 
              Join founders, developers, and innovators building the future of technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <form onSubmit={handleEmailSignup} className="flex gap-3 w-full sm:w-auto group">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-96 h-14 border-gray-200 focus:border-blue-500 rounded-xl text-lg px-6 shadow-sm focus:shadow-lg transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                </div>
                <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  Join Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <MessageCircle className="mr-3 h-5 w-5" />
                WhatsApp Community
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <Mail className="mr-3 h-5 w-5" />
                Weekly Newsletter
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in group hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="bg-white rounded-2xl p-8 shadow-sm group-hover:shadow-xl transition-all duration-200 border border-gray-100">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium mb-2">{stat.label}</div>
                  <div className="text-sm text-green-600 font-semibold flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight">Upcoming Events</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Connect with NYC's most innovative B2B minds at exclusive networking events and workshops. 
              Build meaningful relationships that drive your career forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredEvents.map((event, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <Badge className={`${
                        event.status === 'Featured' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' :
                        event.status === 'Premium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                        'bg-gradient-to-r from-green-400 to-green-500 text-white'
                      } border-0 shadow-sm`}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{event.price}</div>
                      <div className="text-xs text-gray-500">{event.date}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{event.attendees} attendees</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl group-hover:scale-105 transition-all duration-200 shadow-lg">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl px-8 py-4 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="jobs" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight">Hot Jobs</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Land your dream role at NYC's fastest-growing B2B companies. New opportunities added daily 
              with competitive packages and equity upside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <Badge className={`${
                        job.type === 'Full-time' ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' :
                        'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                      } border-0 shadow-sm`}>
                        {job.type}
                      </Badge>
                      {job.isHot && (
                        <Badge className="bg-gradient-to-r from-red-400 to-red-500 text-white border-0 shadow-sm">
                          🔥 Hot
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{job.salary}</div>
                      <div className="text-xs text-gray-500">{job.posted}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-200">{job.title}</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl group-hover:scale-105 transition-all duration-200 shadow-lg">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl px-8 py-4 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg">
              Browse All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="blog" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight">Resources & Insights</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Stay ahead with curated content, founder stories, and market insights from NYC's B2B ecosystem. 
              Learn from those who've scaled successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
              <CardHeader className="pb-4">
                <Badge className="w-fit bg-gradient-to-r from-purple-400 to-purple-500 text-white border-0 shadow-sm mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Founder Story
                </Badge>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-200">
                  From Idea to $10M ARR
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  How Sarah built her fintech startup from her Brooklyn apartment to serving 50,000+ customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all duration-200">
                  Read Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
              <CardHeader className="pb-4">
                <Badge className="w-fit bg-gradient-to-r from-blue-400 to-blue-500 text-white border-0 shadow-sm mb-4">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Market Report
                </Badge>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                  NYC Tech Funding Q4 2024
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  Latest trends and investment patterns in NYC's startup scene with $2.1B+ deployed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all duration-200">
                  View Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
              <CardHeader className="pb-4">
                <Badge className="w-fit bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0 shadow-sm mb-4">
                  <Target className="h-3 w-3 mr-1" />
                  Guide
                </Badge>
                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-200">
                  Hiring in NYC Startups
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  Best practices for building your team in the competitive NYC market with proven frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-orange-600 hover:text-orange-700 group-hover:translate-x-1 transition-all duration-200">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center text-white relative">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to Level Up Your B2B Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 font-light leading-relaxed max-w-3xl mx-auto">
            Join NYC's most connected B2B community. Get exclusive access to events, jobs, and resources 
            that accelerate your career and business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <MessageCircle className="mr-3 h-5 w-5" />
              Join WhatsApp Community
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 backdrop-blur-sm hover:scale-105 transition-all duration-200">
              <Mail className="mr-3 h-5 w-5" />
              Subscribe to Newsletter
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Building2 className="h-9 w-9 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <span className="text-xl font-bold">NYC B2B</span>
                  <div className="text-xs text-gray-400">Est. 2024</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting NYC's B2B ecosystem through events, opportunities, and community. 
                Built by founders, for founders.
              </p>
              <div className="flex gap-4">
                <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">WhatsApp Group</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Newsletter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Founder Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Market Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 NYC B2B. All rights reserved.</p>
            <p className="text-sm mt-4 md:mt-0">Made with ❤️ in NYC</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
