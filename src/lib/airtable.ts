
export interface AirtableEvent {
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

// Replace these with your actual Airtable credentials
const AIRTABLE_API_URL = 'https://api.airtable.com/v0/YOUR_BASE_ID/Event_Submissions';
const AIRTABLE_API_KEY = 'YOUR_API_KEY';

export const submitEventToAirtable = async (eventData: SubmitEventData) => {
  const response = await fetch(AIRTABLE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit event');
  }

  return response.json();
};

export const fetchApprovedEvents = async (): Promise<AirtableEvent[]> => {
  const response = await fetch(`${AIRTABLE_API_URL}?filterByFormula=Status='Approved'&sort[0][field]=Date&sort[0][direction]=asc`, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data.records;
};

export const fetchAllEvents = async (): Promise<AirtableEvent[]> => {
  const response = await fetch(`${AIRTABLE_API_URL}?sort[0][field]=Submitted At&sort[0][direction]=desc`, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data.records;
};

export const updateEventStatus = async (recordId: string, status: 'Approved' | 'Rejected') => {
  const response = await fetch(`${AIRTABLE_API_URL}/${recordId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        'Status': status,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update event status');
  }

  return response.json();
};
