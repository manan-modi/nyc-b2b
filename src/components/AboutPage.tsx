import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Target, Heart, Mail, MessageCircle, TrendingUp, ExternalLink, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SimpleSubmitEventDialog } from "./SimpleSubmitEventDialog";
import { useState } from "react";

const AboutPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { number: "8,500+", label: "Newsletter Subscribers" },
    { number: "60%", label: "Average Open Rate" },
    { number: "10%+", label: "Click-Through Rate" },
    { number: "1,500+", label: "Active Slack Members" }
  ];

  const backedFounders = [
    "a16z", "Accel", "Antler", "Hustle Fund"
  ];

  const operatorCompanies = [
    "Hebbia", "Ramp", "Brex", "Rho"
  ];

  const investors = [
    "GV", "Lightspeed", "CRV", "Work-Bench", "Primary", "Foundation", "2048", "Forum Ventures"
  ];

  const newsletterSponsors = [
    "Notion", "Gamma (Accel-backed)", "Deel", "Nike", "Artisan (YC-backed)", "Confluence VC"
  ];

  const eventSponsors = [
    {
      name: "Composer",
      description: "Seed-stage FinTech backed by Left Lane, First Round, AVG, and Not Boring Capital"
    },
    {
      name: "Redrob.io",
      description: "Raised $4M seed round in 2024"
    },
    {
      name: "Dealroom Media",
      description: "Brand agency for Primary VC, Claim, and more"
    },
    {
      name: "Riviera Partners",
      description: "Leading executive search firm for VC-backed companies"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <img 
                  src="/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png"
                  alt="NYC B2B Logo"
                  className="h-8 w-8 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold nyc-gradient-text">NYC B2B</span>
                <div className="text-xs text-gray-500 font-medium hidden sm:block">Powered by community</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
              <Link to="/events" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Events</Link>
              <Link to="/about" className="text-green-600 font-semibold hover:scale-105 transition-all duration-200">About</Link>
              <a 
                href="https://venture.angellist.com/nyc-ventures/syndicate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105"
              >
                Invest
              </a>
              <SimpleSubmitEventDialog />
              <Button size="sm" className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white" asChild>
                <a href="https://nycb2b.beehiiv.com" target="_blank" rel="noopener noreferrer">
                  Join Community
                </a>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-100 py-4 space-y-3">
              <Link 
                to="/events" 
                className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/about" 
                className="block text-green-600 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
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
              <div className="pt-2">
                <SimpleSubmitEventDialog />
              </div>
              <Button 
                size="sm" 
                className="nyc-gradient hover:opacity-90 text-white w-full mt-2"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="https://nycb2b.beehiiv.com" target="_blank" rel="noopener noreferrer">
                  Join Community
                </a>
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">About NYC B2B</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Built by and for NYC's top B2B founders, operators, and investors.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              NYC B2B exists to power the future of enterprise technology from the heart of New York City. 
              As the city rises to challenge San Francisco as the top startup ecosystem in the world, NYC B2B 
              brings together the people building the next generation of B2B companies—those turning ideas into 
              products, companies into movements, and momentum into scale.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is simple: connect the best minds in B2B, create world-class opportunities, 
              and accelerate the growth of NYC's startup economy.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What We've Built</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold nyc-gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">High-Signal B2B Newsletter</h3>
                <p>Our newsletter delivers the most relevant insights to NYC's B2B community with industry-leading engagement rates.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Curated WhatsApp Communities</h3>
                <p>Vertical-focused channels for FinTech, HealthTech, Bootstrapped SaaS, Pre-Seed & Seed stage founders, and more.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-center">Backed Founders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-center">Founders from companies backed by:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {backedFounders.map((fund, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {fund}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-center">Elite Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-center">Operators at breakout startups like:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {operatorCompanies.map((company, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {company}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-center">Leading Investors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-center">Investors from top-tier firms:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {investors.map((investor, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {investor}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trusted by Top Brands */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Trusted by Top Brands</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              We've partnered with and been sponsored by companies that share our belief in NYC's potential to lead.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Newsletter Sponsors</h3>
                <div className="flex flex-wrap gap-2">
                  {newsletterSponsors.map((sponsor, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium">
                      {sponsor}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Sponsors</h3>
                <div className="space-y-3">
                  {eventSponsors.map((sponsor, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900">{sponsor.name}</h4>
                      <p className="text-sm text-gray-600">{sponsor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 border border-gray-100 shadow-sm text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Future of Enterprise</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              Whether you're building your first B2B company, scaling an enterprise SaaS startup, or investing 
              in the next breakout vertical, NYC B2B is your home base. Join us at our next event, subscribe 
              to the newsletter, or plug into one of our private group chats.
            </p>
            <p className="text-xl font-semibold text-gray-900 mb-8">
              Let's build the future of enterprise together—from NYC.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="nyc-gradient hover:opacity-90 text-white" asChild>
                <a href="https://nycb2b.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 h-5 w-5" />
                  Subscribe to Newsletter
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50" asChild>
                <a href="https://chat.whatsapp.com/KqjrPrn3dv5I2ARCwvGpmD" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 h-5 w-5" />
                  Join WhatsApp Community
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <Card className="nyc-gradient border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl mb-6 opacity-90">
                Contact us anytime for partnerships, questions, or just to say hello.
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                <a href="mailto:newyorkcityventures@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  newyorkcityventures@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
