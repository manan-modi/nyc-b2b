
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

// Updated Event interface to include admin properties
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
  // Admin properties
  status?: 'pending' | 'approved' | 'rejected';
  submitted_at?: string;
  display_order?: number;
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

// Updated function for backwards compatibility
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
      featured: false,
      status: submission.status,
      submitted_at: submission.submitted_at,
      display_order: 0
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

// Updated legacy functions for backwards compatibility
export const updateEventStatus = async (eventId: string, status: 'approved' | 'rejected'): Promise<Event> => {
  const submission = await updateEventSubmissionStatus(eventId, status);
  
  // Convert to Event format
  return {
    id: submission.id,
    title: submission.title || '',
    description: submission.description || '',
    event_url: submission.event_url,
    date: submission.date || '',
    time: submission.time || '',
    location: submission.location || '',
    category: 'Networking',
    price: 'Free',
    host_organization: 'TBA',
    expected_attendees: 'TBA',
    image_url: submission.image_url,
    featured: false,
    status: submission.status,
    submitted_at: submission.submitted_at,
    display_order: 0
  };
};

export const updateEventOrder = async (eventId: string, order: number): Promise<Event> => {
  // For now, just return the event with updated order (placeholder implementation)
  const submissions = await fetchAllEventSubmissions();
  const submission = submissions.find(s => s.id === eventId);
  
  if (!submission) {
    throw new Error('Event not found');
  }

  return {
    id: submission.id,
    title: submission.title || '',
    description: submission.description || '',
    event_url: submission.event_url,
    date: submission.date || '',
    time: submission.time || '',
    location: submission.location || '',
    category: 'Networking',
    price: 'Free',
    host_organization: 'TBA',
    expected_attendees: 'TBA',
    image_url: submission.image_url,
    featured: false,
    status: submission.status,
    submitted_at: submission.submitted_at,
    display_order: order
  };
};

export const updateEventDetails = async (eventId: string, updates: any): Promise<Event> => {
  const submission = await updateEventSubmissionDetails(eventId, {
    title: updates.title,
    description: updates.description,
    event_url: updates.event_url,
    date: updates.date,
    time: updates.time,
    location: updates.location,
    image_url: updates.image_url
  });

  return {
    id: submission.id,
    title: submission.title || updates.title,
    description: submission.description || updates.description,
    event_url: submission.event_url,
    date: submission.date || updates.date,
    time: submission.time || updates.time,
    location: submission.location || updates.location,
    category: updates.category || 'Networking',
    price: updates.price || 'Free',
    host_organization: updates.host_organization || 'TBA',
    expected_attendees: updates.expected_attendees || 'TBA',
    image_url: submission.image_url,
    featured: updates.featured || false,
    status: submission.status,
    submitted_at: submission.submitted_at,
    display_order: 0
  };
};
