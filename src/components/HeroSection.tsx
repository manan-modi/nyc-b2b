
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, TrendingUp } from "lucide-react";

export const HeroSection = () => {
  const handleJoinCommunityClick = () => {
    window.open('https://nycb2b.beehiiv.com', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2322c55e" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/b424aa23-7160-40e1-9b14-7a7b86f7c0b2.png" 
              alt="NYC B2B" 
              className="h-20 sm:h-24 lg:h-32 w-auto"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            The Ultimate <span className="nyc-gradient-text">B2B Community</span><br />
            in New York City
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto font-light leading-relaxed">
            Join NYC's premier B2B community. Access curated job opportunities, connect with industry leaders, 
            and accelerate your career in the heart of NYC's business district.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 text-sm sm:text-base">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100">
              <Users className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-900">8,500+ Members</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">500+ Job Opportunities</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">$2B+ in Funding</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="nyc-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleJoinCommunityClick}
            >
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a href="/jobs">
                Browse Jobs
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-gray-500 text-sm sm:text-base">
            <p className="mb-2">Trusted by founders from</p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-medium">
              <span>Y Combinator</span>
              <span>•</span>
              <span>Techstars</span>
              <span>•</span>
              <span>500 Startups</span>
              <span>•</span>
              <span>Entrepreneur First</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
};
