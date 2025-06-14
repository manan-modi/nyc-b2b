import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Check, X, Calendar, MapPin, Users, ExternalLink, Clock, LogOut, ArrowUp, ArrowDown, Star } from "lucide-react";
import { fetchAllEvents, updateEventStatus, updateEventOrder, Event } from "@/lib/eventStorage";
import { logout } from "@/lib/auth";
import { EditEventDialog } from "./EditEventDialog";
import { FirecrawlApiKeyDialog } from "./FirecrawlApiKeyDialog";

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast({
        title: "Failed to Load Events",
        description: "There was an error loading the events. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleStatusUpdate = async (recordId: string, status: 'Approved' | 'Rejected') => {
    setUpdatingStatus(recordId);
    try {
      await updateEventStatus(recordId, status);
      
      setEvents(events.map(event => 
        event.id === recordId 
          ? { ...event, fields: { ...event.fields, Status: status } }
          : event
      ));

      toast({
        title: `Event ${status}`,
        description: `The event has been ${status.toLowerCase()} successfully.`,
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
          ? { ...event, fields: { ...event.fields, 'Display Order': newOrder, 'Featured': featured } }
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

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const formatDate = (dateString: string) => {
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

  const approvedEvents = events.filter(e => e.fields.Status === 'Approved');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Admin Dashboard</h1>
            <p className="text-gray-600">
              Review and manage submitted events, control display order
            </p>
          </div>
          <div className="flex gap-3">
            <FirecrawlApiKeyDialog />
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {events.filter(e => e.fields.Status === 'Pending Review').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {events.filter(e => e.fields.Status === 'Approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {events.filter(e => e.fields.Status === 'Rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{event.fields['Event Title']}</CardTitle>
                      {event.fields.Featured && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {event.fields['Event Description']}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(event.fields.Status)}>
                    {event.fields.Status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.fields.Date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {formatTime(event.fields.Time)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {event.fields.Location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {event.fields['Expected Attendees']} expected attendees
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Category:</span> {event.fields.Category}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Price:</span> {event.fields.Price}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Host:</span> {event.fields['Host Organization']}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Submitted:</span> {formatDate(event.fields['Submitted At'])}
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
                      href={event.fields['Event URL']} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Event Page
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <EditEventDialog event={event} onEventUpdated={handleEventUpdated} />

                  {event.fields.Status === 'Pending Review' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(event.id, 'Approved')}
                        disabled={updatingStatus === event.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        {updatingStatus === event.id ? 'Approving...' : 'Approve'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusUpdate(event.id, 'Rejected')}
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
    </div>
  );
};

export default AdminDashboard;
