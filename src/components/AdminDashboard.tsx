import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Check, X, Calendar, MapPin, Users, ExternalLink, Clock, LogOut, GripVertical, Star, BookOpen, Eye, Edit, Briefcase } from "lucide-react";
import { fetchAllEvents, updateEventStatus, updateEventOrder, Event } from "@/lib/eventStorage";
import { fetchAllArticles, updateArticleStatus, type BlogArticle } from "@/lib/blogService";
import { supabase } from "@/integrations/supabase/client";
import { logout } from "@/lib/auth";
import { EditEventDialog } from "./EditEventDialog";
import { CreateArticleDialog } from "./CreateArticleDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Item Component
const SortableEventItem = ({ 
  event, 
  index, 
  onToggleFeatured, 
  updatingOrder 
}: { 
  event: Event; 
  index: number; 
  onToggleFeatured: (eventId: string) => void;
  updatingOrder: string | null;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-200 rounded"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{event.fields['Event Title']}</h3>
            {event.fields.Featured && (
              <Badge className="bg-yellow-100 text-yellow-700">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-600">Order: {event.fields['Display Order'] || 0}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggleFeatured(event.id)}
          disabled={updatingOrder === event.id}
          className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
        >
          <Star className="h-4 w-4" />
          {event.fields.Featured ? 'Unfeature' : 'Feature'}
        </Button>
      </div>
    </div>
  );
};

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  job_url: string;
  description: string | null;
  salary_range: string | null;
  employment_type: string | null;
  experience_level: string | null;
  industry: string | null;
  company_size: string | null;
  funding_stage: string | null;
  status: string | null;
  posted_date: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, articlesData, jobsData] = await Promise.all([
        fetchAllEvents(),
        fetchAllArticles(),
        fetchAllJobs()
      ]);
      setEvents(eventsData);
      setArticles(articlesData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({
        title: "Failed to Load Data",
        description: "There was an error loading the data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllJobs = async (): Promise<Job[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    return data || [];
  };

  const updateJobStatus = async (jobId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId);

    if (error) {
      console.error('Error updating job status:', error);
      throw error;
    }
  };

  const handleJobStatusUpdate = async (jobId: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus(jobId);
    try {
      await updateJobStatus(jobId, status);
      
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, status }
          : job
      ));

      toast({
        title: `Job ${status}`,
        description: `The job has been ${status} successfully.`,
      });
    } catch (error) {
      console.error('Failed to update job status:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the job status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
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

  const handleToggleFeatured = (eventId: string) => {
    const currentEvent = events.find(e => e.id === eventId);
    if (!currentEvent) return;
    
    const currentOrder = currentEvent.fields['Display Order'] || 0;
    const currentFeatured = currentEvent.fields.Featured || false;
    handleOrderUpdate(eventId, currentOrder, !currentFeatured);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const approvedEvents = events.filter(e => e.fields.Status === 'Approved').sort((a, b) => (b.fields['Display Order'] || 0) - (a.fields['Display Order'] || 0));
    
    const oldIndex = approvedEvents.findIndex(item => item.id === active.id);
    const newIndex = approvedEvents.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedEvents = arrayMove(approvedEvents, oldIndex, newIndex);
      
      // Update display orders based on new positions
      const updatePromises = reorderedEvents.map((event, index) => {
        const newOrder = reorderedEvents.length - index; // Higher position = higher order number
        return handleOrderUpdate(event.id, newOrder, event.fields.Featured || false);
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

  const handleArticleStatusUpdate = async (articleId: string, status: 'draft' | 'published') => {
    setUpdatingStatus(articleId);
    try {
      await updateArticleStatus(articleId, status);
      
      setArticles(articles.map(article => 
        article.id === articleId 
          ? { ...article, status, published_date: status === 'published' ? new Date().toISOString() : article.published_date }
          : article
      ));

      toast({
        title: `Article ${status === 'published' ? 'Published' : 'Drafted'}`,
        description: `The article has been ${status === 'published' ? 'published' : 'moved to draft'} successfully.`,
      });
    } catch (error) {
      console.error('Failed to update article status:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the article status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': 
      case 'published': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
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
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const approvedEvents = events.filter(e => e.fields.Status === 'Approved').sort((a, b) => (b.fields['Display Order'] || 0) - (a.fields['Display Order'] || 0));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage events, blog articles, jobs, and website content
            </p>
          </div>
          <div className="flex gap-3">
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

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="blog">Blog Articles</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            {/* Blog Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {articles.filter(a => a.status === 'draft').length}
                  </div>
                  <div className="text-sm text-gray-600">Drafts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600">
                    {articles.filter(a => a.status === 'published').length}
                  </div>
                  <div className="text-sm text-gray-600">Published</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-600">
                    {articles.filter(a => a.featured).length}
                  </div>
                  <div className="text-sm text-gray-600">Featured</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600">
                    {articles.reduce((sum, a) => sum + (a.views || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
            </div>

            {/* Create Article Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Blog Articles</h2>
              <CreateArticleDialog onArticleCreated={loadData} />
            </div>

            {/* Blog Articles List */}
            <div className="space-y-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{article.title}</CardTitle>
                          {article.featured && (
                            <Badge className="bg-yellow-100 text-yellow-700">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {article.excerpt}
                        </CardDescription>
                        <div className="mt-2 text-sm text-gray-500">
                          Slug: /blog/{article.slug}
                        </div>
                      </div>
                      <Badge className={getStatusColor(article.status)}>
                        {article.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="h-4 w-4" />
                          By {article.author_name} {article.author_role && `(${article.author_role})`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          Created: {formatDate(article.created_at)}
                        </div>
                        {article.published_date && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Published: {formatDate(article.published_date)}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {article.read_time} min read
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {article.category && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Category:</span> {article.category}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          {article.views || 0} views
                        </div>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
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
                          href={`/blog/${article.slug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Article
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>

                      {article.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleArticleStatusUpdate(article.id, 'published')}
                          disabled={updatingStatus === article.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          {updatingStatus === article.id ? 'Publishing...' : 'Publish'}
                        </Button>
                      )}

                      {article.status === 'published' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArticleStatusUpdate(article.id, 'draft')}
                          disabled={updatingStatus === article.id}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          {updatingStatus === article.id ? 'Moving to Draft...' : 'Move to Draft'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {articles.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles yet</h3>
                  <p className="text-gray-600">Create your first blog article to get started.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            {/* Job Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {jobs.filter(j => j.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600">
                    {jobs.filter(j => j.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-600">Approved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-red-600">
                    {jobs.filter(j => j.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600">
                    {jobs.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Jobs</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Job Submissions</h2>
            </div>

            {/* Jobs List */}
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {job.company} {job.location && `• ${job.location}`}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(job.status || 'pending')}>
                        {job.status || 'pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        {job.salary_range && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Salary:</span> {job.salary_range}
                          </div>
                        )}
                        {job.employment_type && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Type:</span> {job.employment_type}
                          </div>
                        )}
                        {job.experience_level && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Experience:</span> {job.experience_level}
                          </div>
                        )}
                        {job.industry && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Industry:</span> {job.industry}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {job.company_size && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Company Size:</span> {job.company_size}
                          </div>
                        )}
                        {job.funding_stage && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Funding Stage:</span> {job.funding_stage}
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Submitted:</span> {formatDate(job.created_at)}
                        </div>
                        {job.posted_date && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Posted:</span> {formatDate(job.posted_date)}
                          </div>
                        )}
                      </div>
                    </div>

                    {job.description && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-700 mb-2">Description:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                          {job.description}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="border-gray-300"
                      >
                        <a 
                          href={job.job_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Job Posting
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>

                      {job.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleJobStatusUpdate(job.id, 'approved')}
                            disabled={updatingStatus === job.id}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            {updatingStatus === job.id ? 'Approving...' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleJobStatusUpdate(job.id, 'rejected')}
                            disabled={updatingStatus === job.id}
                          >
                            <X className="mr-2 h-4 w-4" />
                            {updatingStatus === job.id ? 'Rejecting...' : 'Reject'}
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No job submissions yet</h3>
                  <p className="text-gray-600">Job postings will appear here once users start submitting them.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
