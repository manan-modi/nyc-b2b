
-- Create a table for blog articles
CREATE TABLE public.blog_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  featured_image TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT,
  published_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  read_time INTEGER, -- in minutes
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to view published articles
CREATE POLICY "Anyone can view published articles" 
  ON public.blog_articles 
  FOR SELECT 
  USING (status = 'published');

-- Policy to allow anyone to submit articles (they start as draft)
CREATE POLICY "Anyone can submit articles" 
  ON public.blog_articles 
  FOR INSERT 
  WITH CHECK (status = 'draft');

-- Add indexes for better performance
CREATE INDEX idx_blog_articles_published ON public.blog_articles (status, published_date DESC) WHERE status = 'published';
CREATE INDEX idx_blog_articles_slug ON public.blog_articles (slug);
CREATE INDEX idx_blog_articles_category ON public.blog_articles (category) WHERE status = 'published';

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_articles_updated_at 
    BEFORE UPDATE ON public.blog_articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate URL-friendly slugs
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '-+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;
