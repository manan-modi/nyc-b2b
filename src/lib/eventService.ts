
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
  console.log('=== STARTING EVENT SUBMISSION ===');
  console.log('Raw event data received:', eventData);
  
  // Basic validation
  if (!eventData.eventTitle?.trim()) {
    throw new Error('Event title is required');
  }
  if (!eventData.eventUrl?.trim()) {
    throw new Error('Event URL is required');
  }
  if (!eventData.date?.trim()) {
    throw new Error('Event date is required');
  }
  if (!eventData.time?.trim()) {
    throw new Error('Event time is required');
  }
  if (!eventData.location?.trim()) {
    throw new Error('Event location is required');
  }

  // Prepare the data for database insertion
  const insertData = {
    title: eventData.eventTitle.trim(),
    description: eventData.eventDescription?.trim() || 'Event description pending review',
    event_url: eventData.eventUrl.trim(),
    date: eventData.date,
    time: eventData.time,
    location: eventData.location.trim(),
    category: eventData.category || 'Networking',
    price: eventData.price?.trim() || 'TBD',
    host_organization: eventData.hostOrganization?.trim() || 'TBD',
    expected_attendees: eventData.expectedAttendees || 50,
    image_url: eventData.imageUrl?.trim() || null,
    status: 'pending'
  };

  console.log('=== PREPARED DATA FOR INSERT ===');
  console.log('Insert data:', insertData);

  try {
    console.log('=== ATTEMPTING DATABASE INSERT ===');
    
    // Insert the event directly without any complex logic
    const { data, error } = await supabase
      .from('events')
      .insert(insertData)
      .select()
      .single();

    console.log('=== DATABASE RESPONSE ===');
    console.log('Data:', data);
    console.log('Error:', error);

    if (error) {
      console.error('=== DATABASE ERROR DETAILS ===');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      
      // Provide more specific error messages
      if (error.code === '42501') {
        throw new Error('Database permission error. Event submission policies may not be configured correctly.');
      } else if (error.code === '23505') {
        throw new Error('An event with this URL already exists.');
      } else {
        throw new Error(`Database error: ${error.message}`);
      }
    }

    if (!data) {
      throw new Error('Event submission failed - no data returned from database');
    }

    console.log('=== SUCCESS ===');
    console.log('Event submitted successfully:', data);
    return data as Event;

  } catch (error) {
    console.error('=== SUBMISSION ERROR ===');
    console.error('Error details:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred during event submission');
    }
  }
};

export const fetchApprovedEvents = async (): Promise<Event[]> => {
  console.log('Fetching approved events...');
  
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

  console.log('Fetched approved events:', data?.length || 0);
  return (data || []) as Event[];
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  console.log('Fetching all events...');
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching all events:', error);
    throw new Error(`Failed to fetch all events: ${error.message}`);
  }

  console.log('Fetched all events:', data?.length || 0);
  return (data || []) as Event[];
};

export const updateEventStatus = async (recordId: string, status: 'approved' | 'rejected'): Promise<Event> => {
  console.log(`Updating event ${recordId} status to ${status}`);
  
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

  console.log('Event status updated successfully:', data);
  return data as Event;
};

export const updateEventDetails = async (recordId: string, updates: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>): Promise<Event> => {
  console.log(`Updating event ${recordId} details:`, updates);
  
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

  console.log('Event details updated successfully:', data);
  return data as Event;
};

export const updateEventOrder = async (recordId: string, displayOrder: number, featured: boolean = false): Promise<Event> => {
  console.log(`Updating event ${recordId} order to ${displayOrder}, featured: ${featured}`);
  
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

  console.log('Event order updated successfully:', data);
  return data as Event;
};
