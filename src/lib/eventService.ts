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
  console.log('Submitting event data:', eventData);
  
  // Validate required fields before submission
  const requiredFields = ['eventTitle', 'eventDescription', 'eventUrl', 'date', 'time', 'location', 'category', 'price', 'hostOrganization'];
  const missingFields = requiredFields.filter(field => !eventData[field as keyof SubmitEventData]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Validate URL format
  try {
    new URL(eventData.eventUrl);
  } catch {
    throw new Error('Please provide a valid event URL');
  }

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventData.date)) {
    throw new Error('Date must be in YYYY-MM-DD format');
  }

  // Validate time format (HH:MM)
  if (!/^\d{2}:\d{2}$/.test(eventData.time)) {
    throw new Error('Time must be in HH:MM format');
  }

  // Ensure expected attendees is a positive number
  if (eventData.expectedAttendees <= 0) {
    throw new Error('Expected attendees must be greater than 0');
  }

  try {
    const insertData = {
      title: eventData.eventTitle.trim(),
      description: eventData.eventDescription.trim(),
      event_url: eventData.eventUrl.trim(),
      date: eventData.date,
      time: eventData.time,
      location: eventData.location.trim(),
      category: eventData.category,
      price: eventData.price.trim(),
      host_organization: eventData.hostOrganization.trim(),
      expected_attendees: eventData.expectedAttendees,
      image_url: eventData.imageUrl?.trim() || null,
      status: 'pending' as const,
      display_order: 999,
      featured: false,
    };

    console.log('Prepared insert data:', insertData);

    const { data, error } = await supabase
      .from('events')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      
      // Handle specific error types
      if (error.code === '42501') {
        throw new Error('Permission denied. Please check if event submission is allowed.');
      } else if (error.code === '23505') {
        throw new Error('An event with this information already exists.');
      } else if (error.message.includes('violates row-level security')) {
        throw new Error('Unable to submit event due to security restrictions. Please try again.');
      } else {
        throw new Error(`Failed to submit event: ${error.message}`);
      }
    }

    if (!data) {
      throw new Error('Event was submitted but no data was returned. Please check the admin dashboard.');
    }

    console.log('Event successfully submitted:', data);
    return data as Event;
  } catch (error) {
    console.error('Error in submitEventToStorage:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred while submitting the event.');
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
