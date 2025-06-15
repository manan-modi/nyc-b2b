/*
 * DEPRECATED: This file has been deprecated and replaced by src/pages/EventsPage.tsx
 * This file is kept for reference only and should not be used in new development.
 * The new EventsPage component provides the same functionality with cleaner implementation.
 */

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Clock, ExternalLink, Users } from "lucide-react";
import { fetchApprovedEvents, Event } from "@/lib/eventService";
import { SimpleSubmitEventDialog } from "./SimpleSubmitEventDialog";
import { SEOHead } from "./SEOHead";
import { StructuredData } from "./StructuredData";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

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
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
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
        "name": event.title,
        "description": event.description,
        "startDate": `${event.date}T${event.time}`,
        "location": {
          "@type": "Place",
          "name": event.location
        },
        "organizer": {
          "@type": "Organization",
          "name": event.host_organization
        },
        "url": event.event_url
      }))
    }
  };

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-2 border-gray-100">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {event.category}
                        </Badge>
                        {event.featured && (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-2 line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-3">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-green-600" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 text-green-600" />
                          {formatTime(event.time)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-green-600" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 text-green-600" />
                          {event.expected_attendees} expected attendees
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Host:</span> {event.host_organization}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Price:</span> {event.price}
                          </p>
                        </div>
                        
                        <Button asChild className="nyc-gradient hover:opacity-90 text-white">
                          <a 
                            href={event.event_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            View Event
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
