
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, MapPin, Users, Briefcase, BookOpen, MessageCircle, Mail, Building2, TrendingUp, Network } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you updates about NYC startup events and opportunities.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thanks for joining!",
      description: "You'll receive our next update with the hottest NYC startup events and job opportunities.",
    });
    setEmail("");
  };

  const featuredEvents = [
    {
      title: "NYC Tech Meetup",
      date: "Dec 18, 2024",
      location: "WeWork SoHo",
      attendees: "250+",
      category: "Networking"
    },
    {
      title: "FinTech Founders Dinner",
      date: "Dec 20, 2024",
      location: "Midtown East",
      attendees: "50+",
      category: "Finance"
    },
    {
      title: "AI Startup Showcase",
      date: "Dec 22, 2024",
      location: "Brooklyn Navy Yard",
      attendees: "180+",
      category: "AI/ML"
    }
  ];

  const featuredJobs = [
    {
      title: "Senior Frontend Engineer",
      company: "Fintech Startup",
      location: "NYC (Hybrid)",
      salary: "$140k - $180k",
      type: "Full-time"
    },
    {
      title: "Product Manager",
      company: "E-commerce Scale-up",
      location: "Manhattan",
      salary: "$120k - $160k",
      type: "Full-time"
    },
    {
      title: "Growth Marketing Lead",
      company: "SaaS Startup",
      location: "Remote/NYC",
      salary: "$100k - $140k",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">NYC Startup Hub</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-gray-600 hover:text-blue-600 transition-colors">Events</a>
              <a href="#jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Jobs</a>
              <a href="#blog" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              🚀 NYC's Premier Startup Community
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect. Build. 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Scale.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your gateway to NYC's most exclusive startup events, job opportunities, and resources. 
              Join 5,000+ founders, developers, and innovators building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <form onSubmit={handleEmailSignup} className="flex gap-2 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-80 h-12 border-gray-300 focus:border-blue-500"
                />
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                  Join Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-2 border-green-500 text-green-700 hover:bg-green-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Community
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50">
                <Mail className="mr-2 h-5 w-5" />
                Weekly Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Events This Year</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,500+</div>
              <div className="text-gray-600">Job Opportunities</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with NYC's most innovative minds at exclusive networking events and workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-blue-100 text-blue-800">{event.category}</Badge>
                    <div className="text-sm text-gray-500">{event.date}</div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-700 hover:bg-blue-50">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Briefcase className="h-8 w-8 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900">Hot Jobs</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Land your dream role at NYC's fastest-growing startups. New opportunities added daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-green-100 text-green-800">{job.type}</Badge>
                    <div className="text-sm font-semibold text-green-600">{job.salary}</div>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="text-gray-600">{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-2 border-green-500 text-green-700 hover:bg-green-50">
              Browse All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900">Resources & Insights</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay ahead with curated content, founder stories, and market insights from NYC's startup ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <Badge className="w-fit bg-purple-100 text-purple-800">Founder Story</Badge>
                <CardTitle className="text-xl">From Idea to $10M ARR</CardTitle>
                <CardDescription>How Sarah built her fintech startup from her Brooklyn apartment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-purple-600 hover:text-purple-700">
                  Read Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <Badge className="w-fit bg-blue-100 text-blue-800">Market Report</Badge>
                <CardTitle className="text-xl">NYC Tech Funding Q4 2024</CardTitle>
                <CardDescription>Latest trends and investment patterns in NYC's startup scene</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-blue-600 hover:text-blue-700">
                  View Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <Badge className="w-fit bg-orange-100 text-orange-800">Guide</Badge>
                <CardTitle className="text-xl">Hiring in NYC Startups</CardTitle>
                <CardDescription>Best practices for building your team in the competitive NYC market</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="p-0 text-orange-600 hover:text-orange-700">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Level Up Your Startup Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join NYC's most connected startup community. Get exclusive access to events, jobs, and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="mr-2 h-5 w-5" />
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">NYC Startup Hub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting NYC's startup ecosystem through events, opportunities, and community.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp Group</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Founder Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NYC Startup Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
