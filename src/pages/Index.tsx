
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, Calendar, MapPin, Users, MessageCircle, Mail, TrendingUp, ChevronRight, Globe, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { fetchApprovedEvents, Event } from "@/lib/eventStorage";

const Index = () => {
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchApprovedEvents();
      // Get first 6 events for homepage display
      setEvents(data.slice(0, 6));
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you updates about NYC B2B events.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thanks for joining!",
      description: "You'll receive our next update with the hottest NYC B2B events.",
    });
    setEmail("");
  };

  const stats = [
    { number: "5,000+", label: "Community Members", icon: Users, growth: "+12%" },
    { number: "200+", label: "Events This Year", icon: Calendar, growth: "+45%" },
    { number: "150+", label: "Articles Published", icon: Users, growth: "+23%" },
    { number: "100+", label: "Partner Companies", icon: TrendingUp, growth: "+67%" }
  ];

  const investors = [
    { name: "Andreessen Horowitz", shortName: "a16z" },
    { name: "Sequoia Capital", shortName: "Sequoia" },
    { name: "Union Square Ventures", shortName: "USV" },
    { name: "Lightspeed Venture Partners", shortName: "Lightspeed" },
    { name: "Accel", shortName: "Accel" },
    { name: "Insight Partners", shortName: "Insight Partners" },
    { name: "Bessemer Venture Partners", shortName: "Bessemer" },
    { name: "FJ Labs", shortName: "FJ Labs" },
    { name: "NEA", shortName: "NEA" },
    { name: "RRE Ventures", shortName: "RRE" },
    { name: "FirstMark Capital", shortName: "FirstMark" },
    { name: "Lerer Hippeau", shortName: "Lerer Hippeau" }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Networking": "bg-blue-100 text-blue-700",
      "Finance": "bg-green-100 text-green-700",
      "AI/ML": "bg-purple-100 text-purple-700",
      "Workshop": "bg-orange-100 text-orange-700",
      "Community": "bg-pink-100 text-pink-700",
      "Blockchain": "bg-yellow-100 text-yellow-700",
      "SaaS": "bg-indigo-100 text-indigo-700",
      "Marketing": "bg-red-100 text-red-700",
      "Sales": "bg-teal-100 text-teal-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  const getDefaultImage = (category: string) => {
    const images = {
      "Networking": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop&crop=center",
      "Finance": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&crop=center",
      "AI/ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center",
      "Workshop": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&crop=center",
      "Community": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop&crop=center",
      "Blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center"
    };
    return images[category] || "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop&crop=center";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png"
                  alt="NYC B2B Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold nyc-gradient-text">NYC B2B</span>
                <div className="text-xs text-gray-500 font-medium">Powered by community</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/events" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Events</Link>
              <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Blog</Link>
              <Link to="/about" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">About</Link>
              <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin</Link>
              <Button size="sm" className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-yellow-600/5 to-green-600/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="animate-fade-in">
            <Badge className="mb-8 bg-gradient-to-r from-green-50 to-yellow-50 text-green-800 border-green-200/50 px-4 py-2 text-sm font-semibold shadow-sm">
              🚀 NYC's Premier B2B Community · 5,000+ Members
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Connect. Build.{" "}
              <span className="nyc-gradient-text animate-pulse">
                Scale.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Your gateway to NYC's most exclusive B2B events and insights. 
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
                    className="w-full sm:w-96 h-14 border-gray-200 focus:border-green-500 rounded-xl text-lg px-6 shadow-sm focus:shadow-lg transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-xl nyc-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                </div>
                <Button type="submit" size="lg" className="nyc-gradient hover:opacity-90 px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white">
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
              <Button size="lg" variant="outline" className="border-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <Mail className="mr-3 h-5 w-5" />
                Weekly Newsletter
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-white to-green-50/30 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Loved by <span className="nyc-gradient-text">10X founders</span> in NYC
            </h2>
            <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
              Trusted by nearly 10,000+ founders, operators, and investors as the premier B2B startup community in NYC.
            </p>
            
            <div className="mb-8">
              <p className="text-lg font-semibold text-gray-700 mb-8">Founders backed by</p>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full max-w-6xl mx-auto"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {investors.map((investor, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 group hover:scale-105">
                          <div className="flex items-center justify-center h-16">
                            <span className="text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors duration-200 text-center">
                              {investor.shortName}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
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
                    <div className="p-3 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <stat.icon className="h-8 w-8 text-green-600" />
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
              <div className="p-3 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight">Upcoming Events</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Connect with NYC's most innovative B2B minds at exclusive networking events and workshops. 
              Build meaningful relationships that drive your career forward.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {events.map((event) => (
                <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
                  <div className="aspect-[2/1] relative overflow-hidden bg-gray-100">
                    <img 
                      src={event.fields['Image URL'] || getDefaultImage(event.fields.Category)} 
                      alt={event.fields['Event Title']}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(event.fields.Category)}>
                        {event.fields.Category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="text-sm font-semibold text-gray-900">{formatDate(event.fields.Date)}</div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      {formatTime(event.fields.Time)}
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                      {event.fields['Event Title']}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {event.fields['Event Description']}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {event.fields.Location}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          {event.fields['Expected Attendees']} expected attendees
                        </div>
                        <div className="font-semibold text-green-600">{event.fields.Price}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Hosted by {event.fields['Host Organization']}
                      </div>
                    </div>
                    
                    <Button className="w-full nyc-gradient hover:opacity-90 rounded-xl group-hover:scale-105 transition-all duration-200 shadow-lg text-white" asChild>
                      <a href={event.fields['Event URL']} target="_blank" rel="noopener noreferrer">
                        Register Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl px-8 py-4 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 nyc-gradient relative overflow-hidden">
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
            Join NYC's most connected B2B community. Get exclusive access to events and resources 
            that accelerate your career and business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-8 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
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
                  <img 
                    src="/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png"
                    alt="NYC B2B Logo"
                    className="h-9 w-9 object-contain"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold">NYC B2B</span>
                  <div className="text-xs text-gray-400">Est. 2024</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting NYC's B2B ecosystem through events and community. 
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
                <li><Link to="/events" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Events</Link></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">WhatsApp Group</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Newsletter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/blog" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</Link></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Founder Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Market Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</Link></li>
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
