
export interface Event {
  id: string;
  fields: {
    'Event Title': string;
    'Event Description': string;
    'Event URL': string;
    'Date': string;
    'Time': string;
    'Location': string;
    'Category': string;
    'Price': string;
    'Host Organization': string;
    'Expected Attendees': number;
    'Status': 'Pending Review' | 'Approved' | 'Rejected';
    'Submitted At': string;
    'Image URL'?: string;
    'Display Order'?: number;
    'Featured'?: boolean;
  };
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

const STORAGE_KEY = 'nyc-events';

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const getEvents = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading events from localStorage:', error);
    return [];
  }
};

const saveEvents = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
    throw new Error('Failed to save events');
  }
};

export const submitEventToStorage = async (eventData: SubmitEventData): Promise<Event> => {
  const newEvent: Event = {
    id: generateId(),
    fields: {
      'Event Title': eventData.eventTitle,
      'Event Description': eventData.eventDescription,
      'Event URL': eventData.eventUrl,
      'Date': eventData.date,
      'Time': eventData.time,
      'Location': eventData.location,
      'Category': eventData.category,
      'Price': eventData.price,
      'Host Organization': eventData.hostOrganization,
      'Expected Attendees': eventData.expectedAttendees,
      'Image URL': eventData.imageUrl || '',
      'Status': 'Pending Review',
      'Submitted At': new Date().toISOString(),
      'Display Order': 999,
      'Featured': false,
    },
  };

  const events = getEvents();
  events.push(newEvent);
  saveEvents(events);

  return newEvent;
};

export const fetchApprovedEvents = async (): Promise<Event[]> => {
  const events = getEvents();
  return events
    .filter(event => event.fields.Status === 'Approved')
    .sort((a, b) => {
      // Sort by display order first (lower numbers first), then by date
      const orderA = a.fields['Display Order'] || 999;
      const orderB = b.fields['Display Order'] || 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return new Date(a.fields.Date).getTime() - new Date(b.fields.Date).getTime();
    });
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const events = getEvents();
  return events.sort((a, b) => 
    new Date(b.fields['Submitted At']).getTime() - new Date(a.fields['Submitted At']).getTime()
  );
};

export const updateEventStatus = async (recordId: string, status: 'Approved' | 'Rejected'): Promise<Event> => {
  const events = getEvents();
  const eventIndex = events.findIndex(event => event.id === recordId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  events[eventIndex].fields.Status = status;
  saveEvents(events);

  return events[eventIndex];
};

export const updateEventDetails = async (recordId: string, updates: Partial<Event['fields']>): Promise<Event> => {
  const events = getEvents();
  const eventIndex = events.findIndex(event => event.id === recordId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  events[eventIndex].fields = {
    ...events[eventIndex].fields,
    ...updates
  };
  saveEvents(events);

  return events[eventIndex];
};

export const updateEventOrder = async (recordId: string, displayOrder: number, featured: boolean = false): Promise<Event> => {
  const events = getEvents();
  const eventIndex = events.findIndex(event => event.id === recordId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  events[eventIndex].fields['Display Order'] = displayOrder;
  events[eventIndex].fields['Featured'] = featured;
  saveEvents(events);

  return events[eventIndex];
};
