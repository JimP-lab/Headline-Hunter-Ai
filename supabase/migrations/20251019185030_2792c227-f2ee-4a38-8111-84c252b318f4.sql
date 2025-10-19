-- Fix critical security issues in scrapes table RLS policies

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Allow viewing all scrapes" ON public.scrapes;

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Allow all scrape creation" ON public.scrapes;

-- Create restrictive SELECT policy: users can only view their own scrapes or anonymous ones
CREATE POLICY "Users can view own scrapes"
ON public.scrapes
FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create restrictive INSERT policy: users can only create their own scrapes or anonymous ones
CREATE POLICY "Users can create own scrapes"
ON public.scrapes
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);