import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Clock, ExternalLink, Users } from "lucide-react";
import { fetchApprovedEvents, Event } from "@/lib/eventService";
import { SimpleSubmitEventDialog } from "@/components/SimpleSubmitEventDialog";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await fetchApprovedEvents();
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = events.filter(event =>
      (event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (event.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (event.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const formatDateHeader = (dateString: string) => {
    if (dateString === "TBD") return "Date TBD";
    try {
      const date = new Date(dateString);
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      return `${month}/${day}`;
    } catch {
      return dateString;
    }
  };

  const formatTimeEST = (timeString: string | null) => {
    if (!timeString) return "Time TBD";
    try {
      const [hour, minute] = timeString.split(":");
      const date = new Date();
      date.setHours(Number(hour), Number(minute), 0, 0);
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" }) + " EST";
    } catch {
      return timeString;
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NYC B2B Events - Professional Networking Events",
    "description": "Discover the best B2B networking events, conferences, and meetups in New York City. Connect with fellow professionals and grow your network.",
    "url": `${window.location.origin}/events`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredEvents.map((event, index) => ({
        "@type": "Event",
        "position": index + 1,
        "name": event.title || "Event",
        "description": event.description || "Event details to be announced",
        "startDate": event.date && event.time ? `${event.date}T${event.time}` : undefined,
        "location": event.location ? {
          "@type": "Place",
          "name": event.location
        } : undefined,
        "organizer": event.host_organization ? {
          "@type": "Organization",
          "name": event.host_organization
        } : undefined,
        "url": event.event_url
      }))
    }
  };

  // Group events by date
  const groupEventsByDate = (events: Event[]) => {
    return events.reduce((groups, event) => {
      const date = event.date || "TBD";
      if (!groups[date]) groups[date] = [];
      groups[date].push(event);
      return groups;
    }, {} as Record<string, Event[]>);
  };

  const groupedEvents = groupEventsByDate(filteredEvents);

  if (loading) {
    return (
      <>
        <Navigation onJoinCommunityClick={() => {}} />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="NYC B2B Events - Professional Networking Events"
        description="Discover the best B2B networking events, conferences, and meetups in New York City. Connect with fellow professionals and grow your network."
      />
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen bg-white">
        <Navigation onJoinCommunityClick={() => {}} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NYC B2B Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the best professional networking events, conferences, and meetups in New York City. 
              Connect with fellow B2B professionals and grow your network.
            </p>
            
            <div className="flex justify-center mb-8">
              <SimpleSubmitEventDialog />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events, topics, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-base border-2 border-gray-200 focus:border-green-500 rounded-lg"
              />
            </div>
          </div>

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadEvents} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {!error && (
            <>
              {/* Results Count */}
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  {filteredEvents.length === 0 && searchTerm ? 
                    `No events found for "${searchTerm}"` :
                    `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} found`
                  }
                </p>
              </div>

              {/* Events Grid */}
              <div>
                {Object.entries(groupedEvents).map(([date, events]) => (
                  <div key={date}>
                    <div className="text-xl font-bold text-gray-700 mb-4 mt-8">
                      {formatDateHeader(date)}
                    </div>
                    {events.map(event => (
                      <EventCard key={event.id} event={{ ...event, time: formatTimeEST(event.time) }} isAdmin={false} />
                    ))}
                  </div>
                ))}
              </div>

              {filteredEvents.length === 0 && !searchTerm && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
                  <p className="text-gray-600 mb-6">
                    There are no approved events at the moment. Check back soon or submit your own event!
                  </p>
                  <SimpleSubmitEventDialog />
                </div>
              )}
            </>
          )}
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
