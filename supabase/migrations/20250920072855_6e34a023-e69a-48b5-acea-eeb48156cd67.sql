-- Fix RLS policies to allow anonymous scraping
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anonymous users can create scrapes" ON public.scrapes;

-- Create a new policy that allows both authenticated and anonymous users
CREATE POLICY "Allow anonymous and authenticated scrape creation" ON public.scrapes
  FOR INSERT WITH CHECK (true);

-- Also update the articles policy to be more permissive for anonymous scrapes
DROP POLICY IF EXISTS "Users can insert articles for their scrapes" ON public.articles;

CREATE POLICY "Allow articles for any scrapes" ON public.articles
  FOR INSERT WITH CHECK (true);