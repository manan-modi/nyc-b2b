
// Event service functionality has been disabled
// This file is kept for compatibility but all functions return empty data

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
  throw new Error('Event submission is currently disabled');
};

export const fetchAllEventSubmissions = async (): Promise<EventSubmission[]> => {
  console.log('Event submissions feature is disabled');
  return [];
};

export const fetchApprovedEvents = async (): Promise<EventSubmission[]> => {
  console.log('Event display feature is disabled');
  return [];
};

export const updateEventSubmissionStatus = async (recordId: string, status: 'approved' | 'rejected'): Promise<EventSubmission> => {
  throw new Error('Event management is currently disabled');
};

export const updateEventSubmissionDetails = async (recordId: string, updates: Partial<Omit<EventSubmission, 'id' | 'created_at' | 'updated_at' | 'submitted_at'>>): Promise<EventSubmission> => {
  throw new Error('Event management is currently disabled');
};
