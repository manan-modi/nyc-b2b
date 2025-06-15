
import { supabase } from "@/integrations/supabase/client";

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
  expected_attendees: number;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  display_order?: number;
  featured?: boolean;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface SubmitEventData {
  eventUrl: string;
}

export const submitEventToStorage = async (eventData: SubmitEventData): Promise<Event> => {
  console.log('Submitting event:', eventData);
  
  if (!eventData.eventUrl?.trim()) {
    throw new Error('Event URL is required');
  }

  try {
    new URL(eventData.eventUrl);
  } catch (error) {
    throw new Error('Please enter a valid URL starting with http:// or https://');
  }

  // Create event record exactly like jobs submission - minimal data with status pending
  const eventRecord = {
    title: "Event Submission",
    description: "Event submitted for review",
    event_url: eventData.eventUrl.trim(),
    date: new Date().toISOString().split('T')[0],
    time: "18:00:00",
    location: "TBD",
    category: "Networking",
    price: "TBD",
    host_organization: "TBD",
    expected_attendees: 50,
    status: 'pending' as const
  };

  console.log('Inserting event record:', eventRecord);

  const { data, error } = await supabase
    .from('events')
    .insert([eventRecord])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error(`Failed to submit event: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned from database');
  }

  console.log('Event submitted successfully:', data);
  return data as Event;
};

export const fetchApprovedEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'approved')
    .order('display_order', { ascending: true })
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching approved events:', error);
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return (data || []) as Event[];
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching all events:', error);
    throw new Error(`Failed to fetch all events: ${error.message}`);
  }

  return (data || []) as Event[];
};

export const updateEventStatus = async (recordId: string, status: 'approved' | 'rejected'): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update({ status })
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event status:', error);
    throw new Error(`Failed to update event status: ${error.message}`);
  }

  return data as Event;
};

export const updateEventDetails = async (recordId: string, updates: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event details:', error);
    throw new Error(`Failed to update event details: ${error.message}`);
  }

  return data as Event;
};

export const updateEventOrder = async (recordId: string, displayOrder: number, featured: boolean = false): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update({ 
      display_order: displayOrder,
      featured: featured
    })
    .eq('id', recordId)
    .select()
    .single();

  if (error) {
    console.error('Error updating event order:', error);
    throw new Error(`Failed to update event order: ${error.message}`);
  }

  return data as Event;
};
