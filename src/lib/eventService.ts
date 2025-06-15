
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
  eventTitle: string;
  eventDescription: string;
  eventUrl: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  hostOrganization: string;
  expectedAttendees: number;
  imageUrl?: string;
}

export const submitEventToStorage = async (eventData: SubmitEventData): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert([{
      title: eventData.eventTitle,
      description: eventData.eventDescription,
      event_url: eventData.eventUrl,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      category: eventData.category,
      price: eventData.price,
      host_organization: eventData.hostOrganization,
      expected_attendees: eventData.expectedAttendees,
      image_url: eventData.imageUrl || '',
      status: 'pending',
      display_order: 999,
      featured: false,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error submitting event:', error);
    throw error;
  }

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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }

  return data as Event;
};
