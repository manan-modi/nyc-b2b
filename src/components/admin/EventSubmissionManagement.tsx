
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Check, X, ExternalLink, Edit, Save, XCircle, Calendar, MapPin, Users, DollarSign, Building2, Clock, Image, Star } from "lucide-react";
import { EventSubmission, updateEventSubmissionStatus, updateEventSubmissionDetails } from "@/lib/eventService";

interface EventSubmissionManagementProps {
  submissions: EventSubmission[];
  setSubmissions: (submissions: EventSubmission[]) => void;
}

export const EventSubmissionManagement = ({ submissions, setSubmissions }: EventSubmissionManagementProps) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<EventSubmission>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
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

  const handleStatusUpdate = async (recordId: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus(recordId);
    try {
      await updateEventSubmissionStatus(recordId, status);
      
      setSubmissions(submissions.map(submission => 
        submission.id === recordId 
          ? { ...submission, status }
          : submission
      ));

      toast({
        title: `Event ${status}`,
        description: `The event submission has been ${status} successfully.`,
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

  const handleEditStart = (submission: EventSubmission) => {
    setEditingId(submission.id);
    setEditForm({
      title: submission.title || '',
      description: submission.description || '',
      date: submission.date || '',
      time: submission.time || '',
      location: submission.location || '',
      image_url: submission.image_url || '',
      category: submission.category || 'Networking',
      price: submission.price || 'Free',
      host_organization: submission.host_organization || '',
      expected_attendees: submission.expected_attendees || '',
      featured: submission.featured || false
    });
  };

  const handleEditSave = async (recordId: string) => {
    try {
      const updatedSubmission = await updateEventSubmissionDetails(recordId, editForm);
      
      setSubmissions(submissions.map(submission => 
        submission.id === recordId ? updatedSubmission : submission
      ));

      setEditingId(null);
      setEditForm({});

      toast({
        title: "Event Updated",
        description: "The event details have been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to update event details:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the event details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Submissions */}
      <div className="space-y-6">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-2 border-gray-100">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(submission.status || 'pending')}>
                    {submission.status || 'pending'}
                  </Badge>
                  {submission.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={submission.event_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Original URL
                  </a>
                </Button>
              </div>

              {editingId === submission.id ? (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        Event Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter event title"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="mb-2 block">Event Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter event description"
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        Event Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        Event Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={editForm.time || ''}
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Location & Image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Event location"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url" className="flex items-center gap-2 mb-2">
                        <Image className="w-4 h-4" />
                        Event Image URL
                      </Label>
                      <Input
                        id="image_url"
                        placeholder="Image URL"
                        value={editForm.image_url || ''}
                        onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Category & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="mb-2 block">Category</Label>
                      <Select value={editForm.category || 'Networking'} onValueChange={(value) => setEditForm({ ...editForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Networking">Networking</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Conference">Conference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price" className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        Price
                      </Label>
                      <Input
                        id="price"
                        placeholder="Free, $50, etc."
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Host & Attendees */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="host_organization" className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4" />
                        Host Organization
                      </Label>
                      <Input
                        id="host_organization"
                        placeholder="Company or organization name"
                        value={editForm.host_organization || ''}
                        onChange={(e) => setEditForm({ ...editForm, host_organization: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expected_attendees" className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" />
                        Expected Attendees
                      </Label>
                      <Input
                        id="expected_attendees"
                        placeholder="50-100, 200+, etc."
                        value={editForm.expected_attendees || ''}
                        onChange={(e) => setEditForm({ ...editForm, expected_attendees: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={editForm.featured || false}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, featured: checked })}
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Mark as Featured Event
                    </Label>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className="text-xl mb-2 flex items-center gap-2">
                    {submission.featured && <Star className="w-5 h-5 text-yellow-500" />}
                    {submission.title || 'Event Submission'}
                  </CardTitle>
                  {submission.description && (
                    <CardDescription className="text-base mb-4">
                      {submission.description}
                    </CardDescription>
                  )}
                  
                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {submission.date && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{formatDate(submission.date)}</span>
                      </div>
                    )}
                    {submission.time && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{submission.time}</span>
                      </div>
                    )}
                    {submission.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>{submission.location}</span>
                      </div>
                    )}
                    {submission.price && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>{submission.price}</span>
                      </div>
                    )}
                    {submission.host_organization && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="h-4 w-4 text-green-600" />
                        <span>{submission.host_organization}</span>
                      </div>
                    )}
                    {submission.expected_attendees && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4 text-green-600" />
                        <span>{submission.expected_attendees}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <strong>Submitted:</strong> {formatDate(submission.submitted_at)}
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-3 items-center">
                {editingId === submission.id ? (
                  <>
                    <Button size="sm" onClick={() => handleEditSave(submission.id)}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleEditStart(submission)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                )}

                {submission.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(submission.id, 'approved')}
                      disabled={updatingStatus === submission.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {updatingStatus === submission.id ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                      disabled={updatingStatus === submission.id}
                    >
                      <X className="mr-2 h-4 w-4" />
                      {updatingStatus === submission.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No event submissions yet</h3>
            <p className="text-gray-600">Event URL submissions will appear here once users start submitting them.</p>
          </div>
        )}
      </div>
    </div>
  );
};
