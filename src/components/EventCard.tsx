
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Event } from "@/lib/eventService";
import { format } from "date-fns";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const {
    title,
    description,
    event_url: url,
    date,
    time,
    location,
    category,
    price,
    host_organization: host,
    expected_attendees: attendees,
    image_url: imageUrl,
    featured
  } = event;

  const eventDate = new Date(date);
  const formattedDate = format(eventDate, 'MMM dd, yyyy');
  const isPaid = price && price.toLowerCase() !== 'free';

  // Default images for categories using Unsplash with optimized parameters
  const getDefaultImage = (category: string) => {
    const images = {
      "Networking": "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
      "Finance": "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      "AI/ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "Workshop": "https://images.unsplash.com/photo-1552664730-d307ca884978",
      "Community": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
      "Blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
      "SaaS": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "Marketing": "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
      "Sales": "https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
    };
    return images[category] || images["Networking"];
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 overflow-hidden">
      <div className="relative">
        <OptimizedImage
          src={imageUrl || getDefaultImage(category)}
          alt={title}
          aspectRatio="landscape"
          className="group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
            Featured
          </Badge>
        )}
        {isPaid ? (
          <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
            {price}
          </Badge>
        ) : (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            Free
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
            {title}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-600" />
            <span>{attendees} expected attendees</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Hosted by <span className="font-medium text-gray-700">{host}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full nyc-gradient hover:opacity-90 text-white"
          onClick={() => window.open(url, '_blank')}
        >
          View Event Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
