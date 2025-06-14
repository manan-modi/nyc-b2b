
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Search, ExternalLink, Clock } from "lucide-react";
import { SubmitEventDialog } from "./SubmitEventDialog";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "NYC Founders & Funders",
      description: "Monthly mixer for NYC's startup ecosystem. Connect with founders, investors, and operators building the future.",
      date: "Dec 18",
      time: "6:00 PM",
      location: "The Assemblage NoMad",
      attendees: 125,
      going: 89,
      category: "Networking",
      price: "Free",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop&crop=center",
      host: "NYC Startup Community",
      link: "https://lu.ma/nyc-founders-funders"
    },
    {
      id: 2,
      title: "FinTech Happy Hour",
      description: "Join NYC's fintech community for drinks, demos, and discussion about the future of financial services.",
      date: "Dec 20",
      time: "7:00 PM",
      location: "Stone Street Tavern",
      attendees: 85,
      going: 67,
      category: "Finance",
      price: "Free",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&crop=center",
      host: "FinTech NYC",
      link: "https://lu.ma/fintech-happy-hour"
    },
    {
      id: 3,
      title: "AI Builders Showcase",
      description: "Watch 8 AI startups demo their products, followed by networking with builders and investors in the space.",
      date: "Dec 22",
      time: "5:30 PM",
      location: "Pier 17 Rooftop",
      attendees: 200,
      going: 156,
      category: "AI/ML",
      price: "Free",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center",
      host: "NYC AI Community",
      link: "https://lu.ma/ai-builders-showcase"
    },
    {
      id: 4,
      title: "SaaS Growth Masterclass",
      description: "Learn from founders who've scaled to $10M+ ARR. Interactive workshop with real case studies and actionable frameworks.",
      date: "Dec 25",
      time: "2:00 PM",
      location: "WeWork Bryant Park",
      attendees: 60,
      going: 45,
      category: "Workshop",
      price: "$99",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&crop=center",
      host: "SaaS Founders NYC",
      link: "https://lu.ma/saas-growth-masterclass"
    },
    {
      id: 5,
      title: "Women in Tech Brunch",
      description: "Monthly brunch celebrating women building and leading in tech. Open conversation, mentorship, and community.",
      date: "Dec 28",
      time: "11:00 AM",
      location: "Cathédrale Restaurant",
      attendees: 75,
      going: 62,
      category: "Community",
      price: "$35",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop&crop=center",
      host: "Women in Tech NYC",
      link: "https://lu.ma/women-tech-brunch"
    },
    {
      id: 6,
      title: "Web3 Builder Meetup",
      description: "Connect with developers, founders, and investors building the decentralized future. Demos, discussions, and networking.",
      date: "Dec 30",
      time: "6:30 PM",
      location: "Consensus Brooklyn",
      attendees: 150,
      going: 98,
      category: "Blockchain",
      price: "Free",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center",
      host: "NYC Web3 Collective",
      link: "https://lu.ma/web3-builder-meetup"
    }
  ];

  const categories = ["all", "Networking", "Finance", "AI/ML", "Workshop", "Community", "Blockchain"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Networking": "bg-blue-100 text-blue-700",
      "Finance": "bg-green-100 text-green-700",
      "AI/ML": "bg-purple-100 text-purple-700",
      "Workshop": "bg-orange-100 text-orange-700",
      "Community": "bg-pink-100 text-pink-700",
      "Blockchain": "bg-yellow-100 text-yellow-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

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
          <SubmitEventDialog />
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

        {/* Events Grid - Luma Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden">
              <div className="aspect-[2/1] relative overflow-hidden bg-gray-100">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="text-sm font-semibold text-gray-900">{event.date}</div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      {event.going} going • {event.attendees} interested
                    </div>
                    <div className="font-semibold text-green-600">{event.price}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Hosted by {event.host}
                  </div>
                </div>
                
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" asChild>
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    View Event
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
