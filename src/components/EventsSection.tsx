import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { fetchApprovedEvents, EventSubmission } from "@/lib/eventService";
import { SimpleSubmitEventDialog } from "@/components/SimpleSubmitEventDialog";
import { OptimizedImage } from "@/components/ui/optimized-image";

export const EventsSection = () => {
  const [events, setEvents] = useState<EventSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchApprovedEvents();
      // Sort to show featured events first, then slice
      const sortedData = data.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // You might want a secondary sort criterion here, e.g., by date
        return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
      });
      setEvents(sortedData.slice(0, 6));
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string | null | undefined) => {
    const colors: { [key: string]: string } = {
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
    return colors[category || ""] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Date TBD";
    try {
      // Add a time component to avoid timezone issues with `new Date()`
      return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string | null | undefined) => {
    if (!timeString) return "Time TBD";
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

  const getDefaultImage = (category: string | null | undefined) => {
    const defaultCat = "Networking";
    const images: { [key: string]: string } = {
      "Networking": "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
      "Finance": "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      "AI/ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "Workshop": "https://images.unsplash.com/photo-1552664730-d307ca884978",
      "Community": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
      "Blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
    };
    return images[category || defaultCat] || images[defaultCat];
  };

  const communityImages = [
    {
      src: "/lovable-uploads/f82fd6b5-0adc-4821-b6ef-8e916e338872.png",
      alt: "NYC B2B Community Event Panel Discussion"
    },
    {
      src: "/lovable-uploads/8b97f66d-cf71-45a4-aa34-a4a0a47d6512.png", 
      alt: "NYC B2B Founders Networking Event"
    },
    {
      src: "/lovable-uploads/869b893b-cd8a-43f2-a2fd-931d8465dd47.png",
      alt: "Pre-Seed and Seed Founders Mixer Panel"
    },
    {
      src: "/lovable-uploads/95f0e7bb-d022-430b-b63c-d9e545a744f7.png",
      alt: "NYC B2B Community Audience Engagement"
    },
    {
      src: "/lovable-uploads/6cb02953-a4e4-4452-b5d9-e547c63eabbf.png",
      alt: "NYC B2B Networking and Conversations"
    },
    {
      src: "/lovable-uploads/b6001725-cfda-49a7-9a37-31277a327cf5.png",
      alt: "NYC B2B Community Members Networking"
    }
  ];

  return (
    <section id="events" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex justify-center items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg sm:rounded-xl">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">Upcoming Events</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-4">
            Connect with NYC's most innovative B2B minds at exclusive networking events and workshops. 
            Build meaningful relationships that drive your career forward.
          </p>
          <p className="text-lg sm:text-xl font-medium text-green-700 mb-6">
            Find the top startup events and tech events in NYC here
          </p>
          <div className="flex justify-center">
            <SimpleSubmitEventDialog />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              {events.map((event) => (
                <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <OptimizedImage
                      src={event.image_url || getDefaultImage(event.category)}
                      alt={event.title || "Event Image"}
                      aspectRatio="landscape"
                      className="group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <Badge className={`${getCategoryColor(event.category)} text-xs`}>
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">{formatDate(event.date)}</div>
                    </div>
                  </div>
                  
                  <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      {formatTime(event.time)}
                    </div>
                    <CardTitle className="text-base sm:text-lg lg: xl leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                        <div className="flex items-center gap-2 text-gray-600 min-w-0">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{event.expected_attendees} expected</span>
                        </div>
                        <div className="font-semibold text-green-600 flex-shrink-0">{event.price}</div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">
                        Hosted by {event.host_organization}
                      </div>
                    </div>
                    
                    <Button className="w-full nyc-gradient hover:opacity-90 rounded-xl group-hover:scale-105 transition-all duration-200 shadow-lg text-white text-sm sm:text-base" asChild>
                      <a href={event.event_url} target="_blank" rel="noopener noreferrer">
                        Register Now
                        <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* See All Events Button */}
            <div className="text-center mb-16 sm:mb-20">
              <Link to="/events">
                <Button size="lg" variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl px-6 sm:px-8 py-3 sm:py-4 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg text-sm sm:text-base">
                  See All Events
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>

            {/* Inside NYC B2B Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Inside <span className="nyc-gradient-text">NYC B2B</span>
              </h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-12">
                Get a behind-the-scenes look at our vibrant community events and the amazing founders who make it all happen.
              </p>
              
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: 1,
                  }}
                  className="w-full max-w-6xl mx-auto"
                >
                  <CarouselContent className="-ml-2 sm:-ml-4">
                    {communityImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] hover:shadow-xl transition-all duration-300">
                          <OptimizedImage
                            src={image.src}
                            alt={image.alt}
                            aspectRatio="landscape"
                            className="group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
