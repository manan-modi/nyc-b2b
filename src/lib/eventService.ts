import { supabase } from "@/integrations/supabase/client";

export interface EventSubmission {
  id: string;
  event_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  created_at: string;
  updated_at: string | null;
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
  console.log('Attempting to submit event:', eventData);
  
  try {
    const { data, error } = await supabase
      .from('event_submissions')
      .insert({
        event_url: eventData.eventUrl,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      console.error('No data returned from insert');
      throw new Error('No data returned from submission');
    }

    console.log('Event submitted successfully:', data);
    return data as EventSubmission;
  } catch (error) {
    console.error('Event submission failed:', error);
    throw error;
  }
};

export const fetchAllEventSubmissions = async (): Promise<EventSubmission[]> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching event submissions:', error);
    throw error;
  }

  return (data || []) as EventSubmission[];
};

export const fetchApprovedEvents = async (): Promise<EventSubmission[]> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .select('*')
    .eq('status', 'approved')
    .order('featured', { ascending: false })
    .order('display_order', { ascending: true })
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching approved events:', error);
    throw error;
  }

  return (data || []) as EventSubmission[];
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
    throw error;
  }

  return data as EventSubmission;
};

export const updateEventSubmissionDetails = async (recordId: string, updates: Partial<Omit<EventSubmission, 'id' | 'created_at' | 'updated_at' | 'submitted_at'>>): Promise<EventSubmission> => {
  const { data, error } = await supabase
    .from('event_submissions')
    .update(updates)
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event details:', error);
    throw error;
  }

  return data as EventSubmission;
};
