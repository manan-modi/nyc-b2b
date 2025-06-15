
import { supabase } from "@/integrations/supabase/client";

export interface EventSubmission {
  id: string;
  event_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  created_at: string;
  updated_at: string;
  // Optional fields that admin can fill in
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  image_url?: string;
}

// Legacy Event interface for backwards compatibility
export interface Event {
  id: string;
  title: string;
  description: string;
  event_url: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  host_organization: string;
  expected_attendees: string;
  image_url?: string;
  featured?: boolean;
}

export interface SubmitEventData {
  eventUrl: string;
}

export const submitEventUrl = async (eventData: SubmitEventData): Promise<EventSubmission> => {
  console.log('Submitting event URL:', eventData);

  if (!eventData.eventUrl?.trim()) {
    throw new Error('Event URL is required');
  }

  try {
    new URL(eventData.eventUrl);
  } catch (error) {
    throw new Error('Please enter a valid URL starting with http:// or https://');
  }

  // Simple submission - just store the URL with pending status
  const eventRecord = {
    event_url: eventData.eventUrl.trim(),
    status: 'pending' as const
  };

  console.log('Inserting event submission:', eventRecord);

  const { data, error } = await supabase
    .from('event_submissions')
    .insert([eventRecord])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error(
      "Failed to submit event: " + 
      (error.message || JSON.stringify(error) || "Unknown error")
    );
  }

  if (!data) {
    throw new Error('No data returned from database');
  }

  console.log('Event URL submitted successfully:', data);
  return data as EventSubmission;
};

export const fetchAllEventSubmissions = async (): Promise<EventSubmission[]> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching event submissions:', error);
    throw new Error(`Failed to fetch event submissions: ${error.message}`);
  }

  return (data || []) as EventSubmission[];
};

export const fetchApprovedEventSubmissions = async (): Promise<EventSubmission[]> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .select('*')
    .eq('status', 'approved')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching approved events:', error);
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return (data || []) as EventSubmission[];
};

// Legacy function for backwards compatibility
export const fetchApprovedEvents = async (): Promise<Event[]> => {
  const submissions = await fetchApprovedEventSubmissions();
  
  // Convert EventSubmissions to Events for backward compatibility
  return submissions
    .filter(submission => submission.title && submission.description && submission.date && submission.time && submission.location)
    .map(submission => ({
      id: submission.id,
      title: submission.title!,
      description: submission.description!,
      event_url: submission.event_url,
      date: submission.date!,
      time: submission.time!,
      location: submission.location!,
      category: 'Networking', // Default category
      price: 'Free', // Default price
      host_organization: 'TBA', // Default host
      expected_attendees: 'TBA', // Default attendees
      image_url: submission.image_url,
      featured: false
    }));
};

export const updateEventSubmissionStatus = async (recordId: string, status: 'approved' | 'rejected'): Promise<EventSubmission> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .update({ status })
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event status:', error);
    throw new Error(`Failed to update event status: ${error.message}`);
  }

  return data as EventSubmission;
};

export const updateEventSubmissionDetails = async (recordId: string, updates: Partial<Omit<EventSubmission, 'id' | 'created_at' | 'updated_at'>>): Promise<EventSubmission> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .update(updates)
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event details:', error);
    throw new Error(`Failed to update event details: ${error.message}`);
  }

  return data as EventSubmission;
};

// Legacy functions for backwards compatibility
export const updateEventStatus = async (eventId: string, status: string) => {
  // Placeholder for backwards compatibility
  console.warn('updateEventStatus is deprecated - use updateEventSubmissionStatus instead');
};

export const updateEventOrder = async (eventId: string, order: number) => {
  // Placeholder for backwards compatibility
  console.warn('updateEventOrder is deprecated');
};

export const updateEventDetails = async (eventId: string, updates: any) => {
  // Placeholder for backwards compatibility
  console.warn('updateEventDetails is deprecated - use updateEventSubmissionDetails instead');
};
