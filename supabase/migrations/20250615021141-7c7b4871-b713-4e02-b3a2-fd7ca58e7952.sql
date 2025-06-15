
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit articles" ON public.blog_articles;

-- Create a more permissive policy that allows anyone to create articles (both draft and published)
CREATE POLICY "Anyone can create articles" 
  ON public.blog_articles 
  FOR INSERT 
  WITH CHECK (true);

-- Also add a policy to allow updating article status (for publish/unpublish functionality)
CREATE POLICY "Anyone can update articles" 
  ON public.blog_articles 
  FOR UPDATE 
  USING (true);
