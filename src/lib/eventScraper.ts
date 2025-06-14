
import FirecrawlApp from '@mendable/firecrawl-js';

export interface ScrapedEventData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  hostOrganization?: string;
  expectedAttendees?: number;
  price?: string;
  category?: string;
}

// Store API key in localStorage for now - in production, this should be in environment variables
const FIRECRAWL_API_KEY_STORAGE = 'firecrawl_api_key';

export const setFirecrawlApiKey = (apiKey: string) => {
  localStorage.setItem(FIRECRAWL_API_KEY_STORAGE, apiKey);
};

export const getFirecrawlApiKey = (): string | null => {
  return localStorage.getItem(FIRECRAWL_API_KEY_STORAGE);
};

export const scrapeEventData = async (url: string): Promise<ScrapedEventData> => {
  try {
    const apiKey = getFirecrawlApiKey();
    if (!apiKey) {
      console.warn('Firecrawl API key not set. Please set it to enable event scraping.');
      return await fallbackScraping(url);
    }

    const app = new FirecrawlApp({ apiKey });
    
    // Use Firecrawl to scrape the page
    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['markdown', 'html'],
      includeTags: ['title', 'meta', 'img', 'h1', 'h2', 'h3', 'p', 'time', 'span', 'div'],
      onlyMainContent: true
    });

    if (!scrapeResult.success) {
      throw new Error('Failed to scrape URL');
    }

    // Access the correct properties from the scrape result
    const markdown = scrapeResult.markdown || '';
    const html = scrapeResult.html || '';
    const metadata = scrapeResult.metadata || {};
    
    // Extract event information from the scraped content
    const scrapedData = extractEventInfo(markdown, html, metadata, url);
    
    console.log('Scraped event data:', scrapedData);
    return scrapedData;
  } catch (error) {
    console.error('Error scraping event data:', error);
    return await fallbackScraping(url);
  }
};

const extractEventInfo = (markdown: string, html: string, metadata: any, url: string): ScrapedEventData => {
  const data: ScrapedEventData = {};

  // Extract title
  data.title = metadata?.title || extractFromMarkdown(markdown, /^#\s+(.+)$/m) || 'Event Title';

  // Extract description
  data.description = metadata?.description || 
    extractFromMarkdown(markdown, /(?:^|\n)([^#\n]+(?:\n[^#\n]+)*)/m) ||
    'Event description';

  // Extract date and time patterns
  const dateTimePatterns = [
    /(\w+,?\s+\w+\s+\d{1,2},?\s+\d{4})/gi,
    /(\d{1,2}\/\d{1,2}\/\d{4})/g,
    /(\d{4}-\d{2}-\d{2})/g,
    /(\w+\s+\d{1,2}(?:st|nd|rd|th)?)/gi
  ];

  const timePatterns = [
    /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/gi,
    /(\d{1,2}\s*(?:AM|PM|am|pm))/gi
  ];

  for (const pattern of dateTimePatterns) {
    const match = markdown.match(pattern);
    if (match && !data.date) {
      data.date = formatDate(match[0]);
      break;
    }
  }

  for (const pattern of timePatterns) {
    const match = markdown.match(pattern);
    if (match && !data.time) {
      data.time = formatTime(match[0]);
      break;
    }
  }

  // Extract location
  const locationPatterns = [
    /(?:location|venue|address|where):\s*([^\n]+)/gi,
    /(?:@|at)\s+([^\n,]+(?:,\s*[^\n,]+)*)/gi,
    /(\d+\s+[^,\n]+(?:street|st|avenue|ave|road|rd|boulevard|blvd)[^,\n]*)/gi
  ];

  for (const pattern of locationPatterns) {
    const match = markdown.match(pattern);
    if (match && !data.location) {
      data.location = match[1]?.trim() || match[0]?.trim();
      break;
    }
  }

  // Extract price
  const pricePatterns = [
    /(?:price|cost|fee):\s*([^\n]+)/gi,
    /(\$\d+(?:\.\d{2})?)/g,
    /(free|complimentary)/gi
  ];

  for (const pattern of pricePatterns) {
    const match = markdown.match(pattern);
    if (match && !data.price) {
      data.price = match[1]?.trim() || match[0]?.trim();
      break;
    }
  }

  // Extract expected attendees
  const attendeePatterns = [
    /(\d+)\s*(?:attendees|people|guests)/gi,
    /(?:capacity|limit):\s*(\d+)/gi
  ];

  for (const pattern of attendeePatterns) {
    const match = markdown.match(pattern);
    if (match && !data.expectedAttendees) {
      data.expectedAttendees = parseInt(match[1]);
      break;
    }
  }

  // Extract host organization
  const hostPatterns = [
    /(?:hosted by|organizer|host):\s*([^\n]+)/gi,
    /(?:by|from)\s+([A-Z][^\n,]+(?:\s+[A-Z][^\n,]*)*)/g
  ];

  for (const pattern of hostPatterns) {
    const match = markdown.match(pattern);
    if (match && !data.hostOrganization) {
      data.hostOrganization = match[1]?.trim();
      break;
    }
  }

  // Extract image URL from metadata or HTML
  if (metadata?.ogImage) {
    data.imageUrl = metadata.ogImage;
  } else if (html) {
    const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) {
      data.imageUrl = imgMatch[1];
    }
  }

  // Determine category based on content
  data.category = categorizeEvent(markdown + ' ' + (data.title || '') + ' ' + (data.description || ''));

  // Set defaults if not found
  if (!data.date) data.date = new Date().toISOString().split('T')[0];
  if (!data.time) data.time = '18:00';
  if (!data.location) data.location = 'NYC';
  if (!data.price) data.price = 'TBD';
  if (!data.expectedAttendees) data.expectedAttendees = 50;
  if (!data.hostOrganization) data.hostOrganization = 'TBD';

  return data;
};

const fallbackScraping = async (url: string): Promise<ScrapedEventData> => {
  // Fallback scraping for specific platforms
  if (url.includes('lu.ma/')) {
    return scrapeLumaEvent(url);
  }
  
  // Return minimal data for manual completion
  return {
    title: 'Event Title (Please update)',
    description: 'Event description will be updated by admin after review',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    location: 'NYC',
    category: 'Networking',
    price: 'TBD',
    hostOrganization: 'TBD',
    expectedAttendees: 50,
  };
};

const scrapeLumaEvent = async (url: string): Promise<ScrapedEventData> => {
  // Extract event ID from Lu.ma URL
  const eventId = url.split('/').pop();
  
  // Try to extract basic info from URL structure
  return {
    title: `Lu.ma Event ${eventId}`,
    description: 'Event details will be updated after review',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    location: 'NYC',
    category: 'Networking',
    price: 'TBD',
    hostOrganization: 'TBD',
    expectedAttendees: 50,
  };
};

const extractFromMarkdown = (markdown: string, pattern: RegExp): string | null => {
  const match = markdown.match(pattern);
  return match ? match[1]?.trim() : null;
};

const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};

const formatTime = (timeStr: string): string => {
  try {
    const time = timeStr.toLowerCase().replace(/\s/g, '');
    if (time.includes('pm') && !time.startsWith('12')) {
      const hour = parseInt(time.split(':')[0]) + 12;
      const minute = time.split(':')[1]?.replace(/[^\d]/g, '') || '00';
      return `${hour}:${minute}`;
    } else if (time.includes('am') && time.startsWith('12')) {
      const minute = time.split(':')[1]?.replace(/[^\d]/g, '') || '00';
      return `00:${minute}`;
    } else {
      const cleanTime = time.replace(/[^\d:]/g, '');
      return cleanTime.includes(':') ? cleanTime : `${cleanTime}:00`;
    }
  } catch {
    return '18:00';
  }
};

const categorizeEvent = (content: string): string => {
  const contentLower = content.toLowerCase();
  
  if (contentLower.includes('ai') || contentLower.includes('artificial intelligence') || contentLower.includes('machine learning')) {
    return 'AI/ML';
  } else if (contentLower.includes('finance') || contentLower.includes('fintech') || contentLower.includes('banking')) {
    return 'Finance';
  } else if (contentLower.includes('blockchain') || contentLower.includes('crypto') || contentLower.includes('web3')) {
    return 'Blockchain';
  } else if (contentLower.includes('saas') || contentLower.includes('software')) {
    return 'SaaS';
  } else if (contentLower.includes('marketing') || contentLower.includes('growth')) {
    return 'Marketing';
  } else if (contentLower.includes('sales')) {
    return 'Sales';
  } else if (contentLower.includes('workshop') || contentLower.includes('training')) {
    return 'Workshop';
  } else {
    return 'Networking';
  }
};
