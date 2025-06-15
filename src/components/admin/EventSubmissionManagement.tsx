
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Check, X, ExternalLink, Edit, Save, Cancel } from "lucide-react";
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
      image_url: submission.image_url || ''
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
          <Card key={submission.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {editingId === submission.id ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Event Title"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Event Description"
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="date"
                          placeholder="Event Date"
                          value={editForm.date || ''}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        />
                        <Input
                          type="time"
                          placeholder="Event Time"
                          value={editForm.time || ''}
                          onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        />
                        <Input
                          placeholder="Location"
                          value={editForm.location || ''}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                        <Input
                          placeholder="Image URL"
                          value={editForm.image_url || ''}
                          onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {submission.title || 'Event Submission'}
                      </CardTitle>
                      {submission.description && (
                        <CardDescription className="text-base mb-2">
                          {submission.description}
                        </CardDescription>
                      )}
                      <div className="text-sm text-gray-600 space-y-1">
                        {submission.date && <div><strong>Date:</strong> {formatDate(submission.date)}</div>}
                        {submission.time && <div><strong>Time:</strong> {submission.time}</div>}
                        {submission.location && <div><strong>Location:</strong> {submission.location}</div>}
                        <div><strong>Submitted:</strong> {formatDate(submission.submitted_at)}</div>
                      </div>
                    </div>
                  )}
                </div>
                <Badge className={getStatusColor(submission.status || 'pending')}>
                  {submission.status || 'pending'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={submission.event_url} target="_blank" rel="noopener noreferrer">
                    View Original URL
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                {editingId === submission.id ? (
                  <>
                    <Button size="sm" onClick={() => handleEditSave(submission.id)}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      <Cancel className="mr-2 h-4 w-4" />
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
