
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Search, ExternalLink, Clock } from "lucide-react";
import { SimpleSubmitEventDialog } from "./SimpleSubmitEventDialog";
import { fetchApprovedEvents, Event } from "@/lib/eventStorage";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Networking", "Finance", "AI/ML", "Workshop", "Community", "Blockchain", "SaaS", "Marketing", "Sales"];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchApprovedEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast({
        title: "Failed to Load Events",
        description: "There was an error loading events. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.fields['Event Title']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.fields['Event Description']?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.fields.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) {
        return "Today";
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          weekday: 'long'
        });
      }
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

  // Group events by date
  const groupEventsByDate = (events: Event[]) => {
    const groups: { [key: string]: Event[] } = {};
    events.forEach(event => {
      const dateKey = event.fields.Date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });
    return groups;
  };

  const groupedEvents = groupEventsByDate(filteredEvents);
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png"
                  alt="NYC B2B Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold nyc-gradient-text">NYC B2B</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/events" className="text-green-600 font-semibold">Events</Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin</Link>
              <Button size="sm" className="nyc-gradient hover:opacity-90 text-white">
                Join Community
              </Button>
            </div>
            <div className="md:hidden">
              <Button size="sm" className="nyc-gradient hover:opacity-90 text-white">
                Join
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">NYC B2B Events</h1>
            <p className="text-gray-600">
              Discover the best startup events in NYC
            </p>
          </div>
          <SimpleSubmitEventDialog />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-12 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200 text-gray-900 h-12 focus:border-green-500 focus:ring-green-500/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-gray-900 hover:bg-gray-50">
                  {category === "all" ? "All" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900">{formatDate(date)}</h2>
              </div>
              
              {/* Events for this date */}
              <div className="space-y-4 ml-5">
                {groupedEvents[date].map((event) => (
                  <Card key={event.id} className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Event Content */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="flex items-center gap-3 mb-3 sm:mb-0">
                              <div className="text-green-600 font-bold text-lg">
                                {formatTime(event.fields.Time)}
                              </div>
                              <Badge className={`${getCategoryColor(event.fields.Category)} text-xs border-0`}>
                                {event.fields.Category}
                              </Badge>
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 text-xl leading-tight mb-3">
                            {event.fields['Event Title']}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.fields.Location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{event.fields['Expected Attendees']}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                            {event.fields['Event Description']}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">
                                By {event.fields['Host Organization']}
                              </span>
                              <span className="text-lg font-bold text-green-600 mt-1">
                                {event.fields.Price}
                              </span>
                            </div>
                            <Button 
                              className="bg-gray-900 hover:bg-gray-800 text-white px-6" 
                              asChild
                            >
                              <a href={event.fields['Event URL']} target="_blank" rel="noopener noreferrer">
                                View Event
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                        
                        {/* Event Image */}
                        <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 relative">
                          <img 
                            src={event.fields['Image URL'] || getDefaultImage(event.fields.Category)} 
                            alt={event.fields['Event Title']}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-16">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {events.length === 0 
                ? "No events have been submitted yet. Be the first to submit an event!"
                : "Try adjusting your search or filters"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
