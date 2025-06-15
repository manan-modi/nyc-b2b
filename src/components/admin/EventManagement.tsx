import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Check, X, Calendar, MapPin, Users, ExternalLink, Clock, Star } from "lucide-react";
import { Event, updateEventStatus, updateEventOrder } from "@/lib/eventService";
import { EditEventDialog } from "../EditEventDialog";
import { SortableEventItem } from "./SortableEventItem";
import { EventsStatsCards } from "./EventsStatsCards";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface EventManagementProps {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

export const EventManagement = ({ events, setEvents }: EventManagementProps) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'Time TBD';
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

  const handleStatusUpdate = async (recordId: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus(recordId);
    try {
      await updateEventStatus(recordId, status);
      
      setEvents(events.map(event => 
        event.id === recordId 
          ? { ...event, status }
          : event
      ));

      toast({
        title: `Event ${status}`,
        description: `The event has been ${status} successfully.`,
      });
    } catch (error) {
      console.error('Failed to update event status:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the event status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleOrderUpdate = async (recordId: string, newOrder: number, featured: boolean = false) => {
    setUpdatingOrder(recordId);
    try {
      await updateEventOrder(recordId, newOrder, featured);
      
      setEvents(events.map(event => 
        event.id === recordId 
          ? { ...event, display_order: newOrder, featured }
          : event
      ));

      toast({
        title: "Event Order Updated",
        description: `Event display order has been updated to ${newOrder}.`,
      });
    } catch (error) {
      console.error('Failed to update event order:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the event order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleToggleFeatured = (eventId: string) => {
    const currentEvent = events.find(e => e.id === eventId);
    if (!currentEvent) return;
    
    const currentOrder = currentEvent.display_order || 0;
    const currentFeatured = currentEvent.featured || false;
    handleOrderUpdate(eventId, currentOrder, !currentFeatured);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const approvedEvents = events.filter(e => e.status === 'approved').sort((a, b) => (b.display_order || 0) - (a.display_order || 0));
    
    const oldIndex = approvedEvents.findIndex(item => item.id === active.id);
    const newIndex = approvedEvents.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedEvents = arrayMove(approvedEvents, oldIndex, newIndex);
      
      const updatePromises = reorderedEvents.map((event, index) => {
        const newOrder = reorderedEvents.length - index;
        return handleOrderUpdate(event.id, newOrder, event.featured || false);
      });

      try {
        await Promise.all(updatePromises);
        toast({
          title: "Events Reordered",
          description: "The event display order has been updated successfully.",
        });
      } catch (error) {
        console.error('Failed to reorder events:', error);
        toast({
          title: "Reorder Failed",
          description: "There was an error reordering the events. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const approvedEvents = events.filter(e => e.status === 'approved').sort((a, b) => (b.display_order || 0) - (a.display_order || 0));

  return (
    <div className="space-y-6">
      <EventsStatsCards events={events} />

      {/* Homepage Event Order Section with Drag & Drop */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Homepage Event Display Order</CardTitle>
            <CardDescription>
              Drag and drop to reorder events. Events at the top will appear first on the homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={approvedEvents.slice(0, 6).map(event => event.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {approvedEvents.slice(0, 6).map((event, index) => (
                    <SortableEventItem
                      key={event.id}
                      event={event}
                      index={index}
                      onToggleFeatured={handleToggleFeatured}
                      updatingOrder={updatingOrder}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      </div>

      {/* All Events */}
      <div className="space-y-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{event.title || 'Event Details Pending'}</CardTitle>
                    {event.featured && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">
                    {event.description || 'Event details to be added during review process.'}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(event.status || 'pending')}>
                  {event.status || 'pending'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {formatTime(event.time)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {event.location || 'Location TBD'}
                  </div>
                  {event.expected_attendees && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {event.expected_attendees} expected attendees
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Category:</span> {event.category || 'TBD'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Price:</span> {event.price || 'TBD'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Host:</span> {event.host_organization || 'TBD'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Submitted:</span> {formatDate(event.submitted_at)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-gray-300"
                >
                  <a 
                    href={event.event_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Event Page
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <EditEventDialog event={event} onEventUpdated={handleEventUpdated} />

                {event.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(event.id, 'approved')}
                      disabled={updatingStatus === event.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {updatingStatus === event.id ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(event.id, 'rejected')}
                      disabled={updatingStatus === event.id}
                    >
                      <X className="mr-2 h-4 w-4" />
                      {updatingStatus === event.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events submitted yet</h3>
            <p className="text-gray-600">Events will appear here once users start submitting them.</p>
          </div>
        )}
      </div>
    </div>
  );
};
