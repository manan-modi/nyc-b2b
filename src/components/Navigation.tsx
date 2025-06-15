
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  onJoinCommunityClick: () => void;
}

export const Navigation = ({ onJoinCommunityClick }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 hover:opacity-80 transition-opacity" onClick={handleNavClick}>
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
            <Link to="/jobs" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105" onClick={handleNavClick}>Jobs</Link>
            <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105" onClick={handleNavClick}>Blog</Link>
            <Link to="/about" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105" onClick={handleNavClick}>About</Link>
            <a 
              href="https://venture.angellist.com/nyc-ventures/syndicate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105"
            >
              Invest
            </a>
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
              to="/jobs" 
              className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
              onClick={handleNavClick}
            >
              Jobs
            </Link>
            <Link 
              to="/blog" 
              className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
              onClick={handleNavClick}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
              onClick={handleNavClick}
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
            <Button 
              size="sm" 
              className="nyc-gradient hover:opacity-90 text-white w-full mt-2"
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinCommunityClick();
              }}
            >
              Join Community
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
