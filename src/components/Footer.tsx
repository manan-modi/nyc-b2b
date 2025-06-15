
import { Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png"
                  alt="NYC B2B Logo"
                  className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">NYC B2B</span>
                <div className="text-xs text-gray-400">Est. 2024</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Connecting NYC's B2B ecosystem through events and community. 
              Built by founders, for founders.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Community</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li><Link to="/events" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Events</Link></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Newsletter</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</Link></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-4">
          <p>&copy; 2024 NYC B2B. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>Contact: newyorkcityventures@gmail.com</p>
            <p>Made with ❤️ in NYC</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
