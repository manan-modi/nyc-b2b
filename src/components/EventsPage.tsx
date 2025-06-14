import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SimpleSubmitEventDialog } from "./SimpleSubmitEventDialog";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import { fetchApprovedEvents, Event } from "@/lib/eventStorage";
import { addDays, addMonths, isAfter, isBefore, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

const EventsPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Time");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const approvedEvents = await fetchApprovedEvents();
        setEvents(approvedEvents);
        setFilteredEvents(approvedEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.fields['Event Title'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.fields['Event Description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.fields['Host Organization'].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(event => event.fields.Category === selectedCategory);
    }

    // Filter by date
    if (selectedDateFilter !== "All Time") {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.fields.Date);
        
        switch (selectedDateFilter) {
          case "This Week":
            return isAfter(eventDate, startOfWeek(now)) && isBefore(eventDate, endOfWeek(now));
          case "This Month":
            return isAfter(eventDate, startOfMonth(now)) && isBefore(eventDate, endOfMonth(now));
          case "Next Month":
            const nextMonth = addMonths(now, 1);
            return isAfter(eventDate, startOfMonth(nextMonth)) && isBefore(eventDate, endOfMonth(nextMonth));
          case "Next 3 Months":
            return isAfter(eventDate, now) && isBefore(eventDate, addMonths(now, 3));
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory, selectedDateFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedDateFilter("All Time");
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "All Categories" || selectedDateFilter !== "All Time";

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
              <Link to="/events" className="text-green-600 font-semibold hover:scale-105 transition-all duration-200">Events</Link>
              <Link to="/about" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">About</Link>
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
                className="block text-green-600 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
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

      {/* Events Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold nyc-gradient-text mb-4">
            NYC B2B Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and connect at the best B2B events happening in New York City
          </p>
        </div>

        {/* Filters */}
        <EventFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg border border-gray-200">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="mb-6 text-gray-600">
              Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              {hasActiveFilters && ` (filtered from ${events.length} total)`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {hasActiveFilters ? 'No events match your filters' : 'No events found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? 'Try adjusting your search criteria or clearing the filters.'
                  : 'Check back soon for upcoming events or submit your own!'
                }
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
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
                  {/* Social icons could be added here */}
                </div>
                <div className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  {/* Social icons could be added here */}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Community</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li><Link to="/events" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Events</Link></li>
                <li><a href="https://nycb2b.beehiiv.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Newsletter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About</Link></li>
                <li><a href="mailto:newyorkcityventures@gmail.com" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
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
    </div>
  );
};

export default EventsPage;
