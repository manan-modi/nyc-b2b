
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Search, Filter, ExternalLink } from "lucide-react";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  const events = [
    {
      id: 1,
      title: "NYC Tech Meetup",
      description: "Monthly gathering of NYC's tech community featuring startup pitches and networking",
      date: "Dec 18, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "WeWork SoHo",
      attendees: "250+",
      category: "Networking",
      price: "Free",
      link: "https://meetup.com/nyc-tech"
    },
    {
      id: 2,
      title: "FinTech Founders Dinner",
      description: "Exclusive dinner for fintech founders and investors to discuss industry trends",
      date: "Dec 20, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Midtown East",
      attendees: "50+",
      category: "Finance",
      price: "$75",
      link: "https://eventbrite.com/fintech-dinner"
    },
    {
      id: 3,
      title: "AI Startup Showcase",
      description: "10 AI startups presenting their latest innovations to investors and tech leaders",
      date: "Dec 22, 2024",
      time: "5:30 PM - 8:30 PM",
      location: "Brooklyn Navy Yard",
      attendees: "180+",
      category: "AI/ML",
      price: "Free",
      link: "https://ai-showcase.nyc"
    },
    {
      id: 4,
      title: "SaaS Growth Workshop",
      description: "Learn proven strategies for scaling your SaaS business from 0 to $1M ARR",
      date: "Dec 25, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Manhattan",
      attendees: "100+",
      category: "Workshop",
      price: "$150",
      link: "https://saas-growth.com"
    },
    {
      id: 5,
      title: "Women in Tech Brunch",
      description: "Monthly brunch for women entrepreneurs and tech professionals",
      date: "Dec 28, 2024",
      time: "11:00 AM - 2:00 PM",
      location: "Lower East Side",
      attendees: "75+",
      category: "Community",
      price: "$25",
      link: "https://womenintech-nyc.com"
    },
    {
      id: 6,
      title: "Crypto & Web3 Panel",
      description: "Industry leaders discuss the future of crypto and web3 technologies",
      date: "Dec 30, 2024",
      time: "6:30 PM - 9:00 PM",
      location: "Chelsea",
      attendees: "200+",
      category: "Blockchain",
      price: "Free",
      link: "https://web3-panel.nyc"
    }
  ];

  const categories = ["all", "Networking", "Finance", "AI/ML", "Workshop", "Community", "Blockchain"];
  const dateFilters = ["all", "This Week", "Next Week", "This Month"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Networking": "bg-blue-100 text-blue-800",
      "Finance": "bg-green-100 text-green-800",
      "AI/ML": "bg-purple-100 text-purple-800",
      "Workshop": "bg-orange-100 text-orange-800",
      "Community": "bg-pink-100 text-pink-800",
      "Blockchain": "bg-yellow-100 text-yellow-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC Startup Events</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and attend the best startup events in New York City. Network with founders, investors, and innovators.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
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
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                {dateFilters.map(filter => (
                  <SelectItem key={filter} value={filter}>
                    {filter === "all" ? "All Dates" : filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{event.date}</div>
                    <div className="text-xs text-gray-500">{event.time}</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.attendees} attendees
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">{event.price}</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Event CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Have an Event to Share?</h2>
              <p className="text-xl mb-6 opacity-90">
                Submit your NYC startup event and reach our community of 5,000+ founders and tech professionals.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Submit Your Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
