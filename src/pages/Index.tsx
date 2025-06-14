import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Building2, TrendingUp, Calendar as CalendarIcon, Coffee, Clock, Menu, X, Star, ExternalLink, ChevronRight, Zap, Target, Heart, Mail, MessageCircle, ArrowRight, CheckCircle, Globe, Lightbulb, Network, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { SimpleSubmitEventDialog } from "@/components/SimpleSubmitEventDialog";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { number: "5,000+", label: "Community Members" },
    { number: "200+", label: "Events This Year" },
    { number: "1,500+", label: "Job Connections" },
    { number: "100+", label: "Partner Companies" }
  ];

  const features = [
    {
      title: "Curated Events",
      description: "Discover the best startup events in NYC, from pitch nights to workshops.",
      icon: CalendarIcon
    },
    {
      title: "Job Board",
      description: "Find your next role at a fast-growing startup or post a job opening.",
      icon: Users
    },
    {
      title: "Startup Directory",
      description: "Explore NYC's most innovative companies and connect with founders.",
      icon: Building2
    },
    {
      title: "Community Forum",
      description: "Share insights, ask questions, and connect with fellow entrepreneurs.",
      icon: MessageCircle
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      title: "Founder, Startup X",
      quote: "NYC Startup Hub has been instrumental in helping us connect with investors and talent.",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Sarah Kim",
      title: "Head of Marketing, Company Y",
      quote: "The events and resources provided by NYC Startup Hub are invaluable for any startup in the city.",
      image: "photo-1494790108755-2616b612b632"
    },
    {
      name: "Marcus Rodriguez",
      title: "CEO, Innovation Labs",
      quote: "I've met some of my closest advisors and collaborators through the NYC Startup Hub community.",
      image: "photo-1507003211169-0a1dd7228f2d"
    }
  ];

  const ctaFeatures = [
    {
      title: "Submit Your Event",
      description: "Get your event featured on our platform and reach thousands of startup enthusiasts.",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Post a Job",
      description: "Find the perfect candidate for your startup by posting a job on our job board.",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "List Your Startup",
      description: "Increase your startup's visibility by listing it in our startup directory.",
      icon: Lightbulb,
      color: "text-orange-600"
    },
    {
      title: "Join the Community",
      description: "Connect with fellow entrepreneurs, investors, and mentors in our community forum.",
      icon: Network,
      color: "text-purple-600"
    }
  ];

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've signed up for our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold nyc-gradient-text">NYC Startup Hub</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/events" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Events</Link>
              <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Blog</Link>
              <a 
                href="https://venture.angellist.com/nyc-ventures/syndicate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105"
              >
                Invest
              </a>
              <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin</Link>
              <SimpleSubmitEventDialog />
              <Button size="sm" className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white" onClick={() => document.getElementById('email-signup')?.scrollIntoView({ behavior: 'smooth' })}>
                Join Community
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/events" 
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  to="/blog" 
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <a 
                  href="https://venture.angellist.com/nyc-ventures/syndicate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Invest
                </a>
                <Link 
                  to="/admin" 
                  className="block text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <div className="py-2">
                  <SimpleSubmitEventDialog />
                </div>
                <Button 
                  size="sm" 
                  className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 text-white mt-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('email-signup')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Join Community
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to NYC's Startup Ecosystem
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            Your go-to platform for discovering events, finding jobs, and connecting with the NYC startup community.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white">
              Explore Events
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 hover:scale-105 transition-all duration-200">
              Find a Job
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold nyc-gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Explore the NYC Startup Ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${testimonial.image}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-500">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Get Involved
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ctaFeatures.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mx-auto mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="email-signup" className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Stay Up-to-Date with the NYC Startup Scene
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Sign up for our newsletter to receive the latest news, events, and opportunities in the NYC startup ecosystem.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            <Button
              type="submit"
              className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} NYC Startup Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
