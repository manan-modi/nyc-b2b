
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { updateEventSubmissionStatus, updateEventSubmissionDetails, EventSubmission } from "@/lib/eventService";
import { ExternalLink, Edit, Check, X } from "lucide-react";
import { format } from "date-fns";

interface EventSubmissionManagementProps {
  submissions: EventSubmission[];
  setSubmissions: (submissions: EventSubmission[]) => void;
}

export const EventSubmissionManagement = ({ submissions, setSubmissions }: EventSubmissionManagementProps) => {
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<EventSubmission>>({});

  const handleStatusUpdate = async (eventId: string, status: 'approved' | 'rejected') => {
    try {
      const updatedEvent = await updateEventSubmissionStatus(eventId, status);
      setSubmissions(submissions.map(sub => 
        sub.id === eventId ? updatedEvent : sub
      ));
      
      toast({
        title: "Status Updated",
        description: `Event ${status} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update event status.",
        variant: "destructive",
      });
    }
  };

  const startEditing = (event: EventSubmission) => {
    setEditingEvent(event.id);
    setEditForm({
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      image_url: event.image_url || '',
      category: event.category || 'Networking',
      price: event.price || 'Free',
      host_organization: event.host_organization || '',
      expected_attendees: event.expected_attendees || '',
      featured: event.featured || false,
      display_order: event.display_order || 0,
    });
  };

  const saveEdits = async (eventId: string) => {
    try {
      const updatedEvent = await updateEventSubmissionDetails(eventId, editForm);
      setSubmissions(submissions.map(sub => 
        sub.id === eventId ? updatedEvent : sub
      ));
      
      setEditingEvent(null);
      setEditForm({});
      
      toast({
        title: "Event Updated",
        description: "Event details saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to save event details.",
        variant: "destructive",
      });
    }
  };

  const cancelEditing = () => {
    setEditingEvent(null);
    setEditForm({});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Submissions</h2>
          <p className="text-gray-600">Manage submitted events and update their details</p>
        </div>
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            Pending: {submissions.filter(s => s.status === 'pending').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            Approved: {submissions.filter(s => s.status === 'approved').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            Rejected: {submissions.filter(s => s.status === 'rejected').length}
          </span>
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Submitted</h3>
            <p className="text-gray-600">Event submissions will appear here for review.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {submission.title || 'Untitled Event'}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <a 
                        href={submission.event_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                      >
                        {submission.event_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardDescription>
                    <div className="text-sm text-gray-500">
                      Submitted {format(new Date(submission.submitted_at), 'MMM dd, yyyy HH:mm')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(submission.status)}
                    {submission.featured && (
                      <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {editingEvent === submission.id ? (
                  // Edit Form
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                          id="title"
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={editForm.category} onValueChange={(value) => setEditForm({...editForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Networking">Networking</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="AI/ML">AI/ML</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Community">Community</SelectItem>
                            <SelectItem value="Blockchain">Blockchain</SelectItem>
                            <SelectItem value="SaaS">SaaS</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={editForm.date || ''}
                          onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={editForm.time || ''}
                          onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location || ''}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          value={editForm.price || ''}
                          onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="host">Host Organization</Label>
                        <Input
                          id="host"
                          value={editForm.host_organization || ''}
                          onChange={(e) => setEditForm({...editForm, host_organization: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="attendees">Expected Attendees</Label>
                        <Input
                          id="attendees"
                          value={editForm.expected_attendees || ''}
                          onChange={(e) => setEditForm({...editForm, expected_attendees: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={editForm.image_url || ''}
                        onChange={(e) => setEditForm({...editForm, image_url: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={editForm.featured || false}
                          onCheckedChange={(checked) => setEditForm({...editForm, featured: checked})}
                        />
                        <Label htmlFor="featured">Featured Event</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="display-order">Display Order:</Label>
                        <Input
                          id="display-order"
                          type="number"
                          value={editForm.display_order || 0}
                          onChange={(e) => setEditForm({...editForm, display_order: parseInt(e.target.value) || 0})}
                          className="w-20"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={cancelEditing}>
                        Cancel
                      </Button>
                      <Button onClick={() => saveEdits(submission.id)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-3">
                    {submission.description && (
                      <p className="text-gray-700">{submission.description}</p>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Date:</span>
                        <div className="text-gray-600">{submission.date || 'TBD'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Time:</span>
                        <div className="text-gray-600">{submission.time || 'TBD'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Location:</span>
                        <div className="text-gray-600">{submission.location || 'TBD'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Price:</span>
                        <div className="text-gray-600">{submission.price || 'Free'}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(submission)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      
                      <div className="flex gap-2">
                        {submission.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(submission.id, 'approved')}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </>
                        )}
                        {submission.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        )}
                        {submission.status === 'rejected' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(submission.id, 'approved')}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
