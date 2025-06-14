import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Search, ExternalLink, Clock } from "lucide-react";
import { SimpleSubmitEventDialog } from "./SimpleSubmitEventDialog";
import { fetchApprovedEvents, Event } from "@/lib/eventStorage";
import { toast } from "@/hooks/use-toast";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NYC B2B Events</h1>
            <p className="text-gray-600 text-lg">
              Discover and attend the best startup events in New York City
            </p>
          </div>
          <SimpleSubmitEventDialog />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 border-gray-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden">
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
                
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" asChild>
                  <a href={event.fields['Event URL']} target="_blank" rel="noopener noreferrer">
                    View Event
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
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
