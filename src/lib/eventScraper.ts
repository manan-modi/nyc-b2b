
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

export const scrapeEventData = async (url: string): Promise<ScrapedEventData> => {
  try {
    console.log('Starting direct scrape of:', url);
    
    // Use a CORS proxy to fetch the page content
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch page content');
    }
    
    const data = await response.json();
    const html = data.contents;
    
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract event information
    const scrapedData = extractEventInfo(doc, url);
    
    console.log('Scraped event data:', scrapedData);
    return scrapedData;
  } catch (error) {
    console.error('Error scraping event data:', error);
    return getFallbackData(url);
  }
};

const extractEventInfo = (doc: Document, url: string): ScrapedEventData => {
  const data: ScrapedEventData = {};

  // Extract title from various sources
  data.title = getMetaProperty(doc, 'og:title') ||
    getMetaProperty(doc, 'twitter:title') ||
    doc.querySelector('h1')?.textContent?.trim() ||
    doc.title ||
    'Event Title';

  // Extract description
  data.description = getMetaProperty(doc, 'og:description') ||
    getMetaProperty(doc, 'twitter:description') ||
    getMetaProperty(doc, 'description') ||
    doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
    'Event description';

  // Extract image
  data.imageUrl = getMetaProperty(doc, 'og:image') ||
    getMetaProperty(doc, 'twitter:image') ||
    doc.querySelector('img')?.getAttribute('src') ||
    '';

  // Make relative URLs absolute
  if (data.imageUrl && data.imageUrl.startsWith('/')) {
    const urlObj = new URL(url);
    data.imageUrl = `${urlObj.protocol}//${urlObj.host}${data.imageUrl}`;
  }

  // Extract date and time information
  extractDateTimeInfo(doc, data);

  // Extract location
  data.location = extractLocation(doc) || 'Location TBD';

  // Extract price
  data.price = extractPrice(doc) || 'TBD';

  // Extract host organization
  data.hostOrganization = extractHost(doc) || 'TBD';

  // Extract expected attendees
  data.expectedAttendees = extractAttendees(doc) || 50;

  // Determine category
  data.category = categorizeEvent(data.title + ' ' + data.description);

  return data;
};

const getMetaProperty = (doc: Document, property: string): string | null => {
  const selector = `meta[property="${property}"], meta[name="${property}"]`;
  const element = doc.querySelector(selector);
  return element?.getAttribute('content') || null;
};

const extractDateTimeInfo = (doc: Document, data: ScrapedEventData) => {
  // Look for structured data (JSON-LD)
  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const jsonData = JSON.parse(script.textContent || '');
      if (jsonData['@type'] === 'Event') {
        if (jsonData.startDate) {
          const startDate = new Date(jsonData.startDate);
          data.date = startDate.toISOString().split('T')[0];
          data.time = startDate.toTimeString().split(' ')[0].slice(0, 5);
        }
        return;
      }
    } catch (e) {
      // Continue if JSON parsing fails
    }
  }

  // Look for datetime attributes
  const timeElement = doc.querySelector('time[datetime]');
  if (timeElement) {
    const datetime = timeElement.getAttribute('datetime');
    if (datetime) {
      const date = new Date(datetime);
      data.date = date.toISOString().split('T')[0];
      data.time = date.toTimeString().split(' ')[0].slice(0, 5);
      return;
    }
  }

  // Text-based date extraction
  const textContent = doc.body.textContent || '';
  
  // Date patterns
  const datePatterns = [
    /(\w+,?\s+\w+\s+\d{1,2},?\s+\d{4})/gi,
    /(\d{1,2}\/\d{1,2}\/\d{4})/g,
    /(\d{4}-\d{2}-\d{2})/g,
  ];

  for (const pattern of datePatterns) {
    const match = textContent.match(pattern);
    if (match && !data.date) {
      try {
        const date = new Date(match[0]);
        if (!isNaN(date.getTime())) {
          data.date = date.toISOString().split('T')[0];
          break;
        }
      } catch (e) {
        // Continue if date parsing fails
      }
    }
  }

  // Time patterns
  const timePatterns = [
    /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/gi,
    /(\d{1,2}\s*(?:AM|PM|am|pm))/gi
  ];

  for (const pattern of timePatterns) {
    const match = textContent.match(pattern);
    if (match && !data.time) {
      data.time = formatTime(match[0]);
      break;
    }
  }

  // Defaults
  if (!data.date) data.date = new Date().toISOString().split('T')[0];
  if (!data.time) data.time = '18:00';
};

const extractLocation = (doc: Document): string | null => {
  // Check structured data first
  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const jsonData = JSON.parse(script.textContent || '');
      if (jsonData.location) {
        const location = jsonData.location;
        return location.name || location.address?.streetAddress || 'NYC';
      }
    } catch (e) {
      // Continue if JSON parsing fails
    }
  }

  // Text-based location extraction
  const textContent = doc.body.textContent || '';
  const locationPatterns = [
    /(?:location|venue|address|where):\s*([^\n]+)/gi,
    /(?:@|at)\s+([^\n,]+(?:,\s*[^\n,]+)*)/gi,
    /(\d+\s+[^,\n]+(?:street|st|avenue|ave|road|rd|boulevard|blvd)[^,\n]*)/gi
  ];

  for (const pattern of locationPatterns) {
    const match = textContent.match(pattern);
    if (match) {
      return match[1]?.trim() || match[0]?.trim();
    }
  }

  return null;
};

const extractPrice = (doc: Document): string | null => {
  const textContent = doc.body.textContent || '';
  const pricePatterns = [
    /(?:price|cost|fee):\s*([^\n]+)/gi,
    /(\$\d+(?:\.\d{2})?)/g,
    /(free|complimentary)/gi
  ];

  for (const pattern of pricePatterns) {
    const match = textContent.match(pattern);
    if (match) {
      return match[1]?.trim() || match[0]?.trim();
    }
  }

  return null;
};

const extractHost = (doc: Document): string | null => {
  const textContent = doc.body.textContent || '';
  const hostPatterns = [
    /(?:hosted by|organizer|host):\s*([^\n]+)/gi,
    /(?:by|from)\s+([A-Z][^\n,]+(?:\s+[A-Z][^\n,]*)*)/g
  ];

  for (const pattern of hostPatterns) {
    const match = textContent.match(pattern);
    if (match) {
      return match[1]?.trim();
    }
  }

  return null;
};

const extractAttendees = (doc: Document): number | null => {
  const textContent = doc.body.textContent || '';
  const attendeePatterns = [
    /(\d+)\s*(?:attendees|people|guests)/gi,
    /(?:capacity|limit):\s*(\d+)/gi
  ];

  for (const pattern of attendeePatterns) {
    const match = textContent.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }

  return null;
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

const getFallbackData = (url: string): ScrapedEventData => {
  // Enhanced fallback for specific platforms
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

const scrapeLumaEvent = (url: string): ScrapedEventData => {
  // Extract event ID from Lu.ma URL
  const eventId = url.split('/').pop();
  
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
