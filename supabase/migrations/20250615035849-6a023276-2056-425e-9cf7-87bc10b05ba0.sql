
-- Drop any existing policies first to avoid conflicts, then recreate them
DROP POLICY IF EXISTS "Admins can view all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;
DROP POLICY IF EXISTS "Anyone can view all articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Anyone can update articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Anyone can delete articles" ON public.blog_articles;

-- Create policies for jobs table
CREATE POLICY "Admins can view all jobs" 
  ON public.jobs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update jobs" 
  ON public.jobs 
  FOR UPDATE 
  USING (true);

-- Create policies for blog_articles table
CREATE POLICY "Anyone can view all articles" 
  ON public.blog_articles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can update articles" 
  ON public.blog_articles 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete articles" 
  ON public.blog_articles 
  FOR DELETE 
  USING (true);
