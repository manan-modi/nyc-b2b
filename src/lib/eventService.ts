import { supabase } from "@/integrations/supabase/client";

// This is now the single source of truth for event data.
// It maps directly to the `event_submissions` table.
export interface EventSubmission {
  id: string;
  event_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  created_at: string;
  updated_at: string | null;
  // All other fields are optional because they are filled in by admin
  title?: string | null;
  description?: string | null;
  date?: string | null;
  time?: string | null;
  location?: string | null;
  image_url?: string | null;
  category?: string | null;
  price?: string | null;
  host_organization?: string | null;
  expected_attendees?: string | null;
  featured?: boolean | null;
  display_order?: number | null;
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

  const eventRecord = {
    event_url: eventData.eventUrl.trim(),
    status: 'pending' as const
  };

  console.log('Inserting event submission to event_submissions table:', eventRecord);

  const { data, error } = await supabase
    .from('event_submissions')
    .insert([eventRecord])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw new Error(
      "Failed to submit event: " + 
      (error.message || JSON.stringify(error) || "Unknown error")
    );
  }

  if (!data) {
    throw new Error('No data returned from database');
  }

  console.log('Event URL submitted successfully to event_submissions:', data);
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

// This is now the primary function for public-facing pages.
export const fetchApprovedEvents = async (): Promise<EventSubmission[]> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .select('*')
    .eq('status', 'approved')
    .order('featured', { ascending: false, nullsFirst: false })
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching approved events:', error);
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return (data || []) as EventSubmission[];
};

export const updateEventSubmissionStatus = async (recordId: string, status: 'approved' | 'rejected'): Promise<EventSubmission> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event status:', error);
    throw new Error(`Failed to update event status: ${error.message}`);
  }

  return data as EventSubmission;
};

// This function replaces all previous update variants.
export const updateEventSubmissionDetails = async (recordId: string, updates: Partial<Omit<EventSubmission, 'id' | 'created_at' | 'updated_at' | 'submitted_at'>>): Promise<EventSubmission> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event details:', error);
    throw new Error(`Failed to update event details: ${error.message}`);
  }

  return data as EventSubmission;
};
