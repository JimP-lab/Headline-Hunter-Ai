-- Drop all existing policies and recreate them correctly
DROP POLICY IF EXISTS "Anonymous users can create scrapes" ON public.scrapes;
DROP POLICY IF EXISTS "Users can create their own scrapes" ON public.scrapes;
DROP POLICY IF EXISTS "Users can view their own scrapes" ON public.scrapes;
DROP POLICY IF EXISTS "Allow anonymous and authenticated scrape creation" ON public.scrapes;

-- Create proper policies for scrapes that work for anonymous users
CREATE POLICY "Allow all scrape creation" ON public.scrapes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow viewing all scrapes" ON public.scrapes
  FOR SELECT USING (true);

-- Drop and recreate articles policies  
DROP POLICY IF EXISTS "Users can view articles from their scrapes" ON public.articles;
DROP POLICY IF EXISTS "Allow articles for any scrapes" ON public.articles;

CREATE POLICY "Allow all article creation" ON public.articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow viewing all articles" ON public.articles
  FOR SELECT USING (true);