import { MapPin, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/eventService";

interface EventCardProps {
  event: Event;
  isAdmin?: boolean;
}

export const EventCard = ({ event, isAdmin }: EventCardProps) => (
  <div className="flex items-center bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
    <div className="flex-1 min-w-0">
      <div className="text-sm text-gray-500 mb-1">{event.time || "Time TBD"}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{event.title || "Event Title"}</div>
      <div className="flex items-center text-gray-600 mb-1">
        <Avatar className="w-5 h-5 mr-2">
          <AvatarImage src={event.image_url || ""} />
          <AvatarFallback>{event.host_organization?.[0] || "?"}</AvatarFallback>
        </Avatar>
        By {event.host_organization || "Host TBD"}
      </div>
      <div className="flex items-center text-gray-500 mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        {event.location || "Location TBD"}
      </div>
      {isAdmin && (
        <Button size="sm" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs mb-2 border border-gray-200">
          Manage Event →
        </Button>
      )}
      <Button
        asChild
        className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md text-base"
      >
        <a href={event.event_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          View Event
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
    {event.image_url && (
      <img
        src={event.image_url}
        alt={event.title || "Event"}
        className="w-24 h-24 rounded-lg object-cover ml-6 border border-gray-100"
      />
    )}
  </div>
);
