import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword, scrapeId } = await req.json();
    
    if (!keyword || !scrapeId) {
      throw new Error('Missing required parameters: keyword and scrapeId');
    }

    console.log(`Starting news scrape for keyword: "${keyword}", scrapeId: ${scrapeId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get News API key from environment
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    
    if (!newsApiKey) {
      console.log('NEWS_API_KEY not found, returning demo articles');
      
      // Return demo articles for testing
      const demoArticles = [
        {
          title: `Breaking: Latest Updates on ${keyword}`,
          url: `https://example.com/news/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          summary: `This is a demo article about ${keyword}. In a real implementation, this would contain actual scraped news content from various sources providing comprehensive coverage of the topic.`,
          image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
          source: 'Demo Source',
          published_at: new Date().toISOString(),
        },
        {
          title: `Analysis: The Impact of ${keyword} on Global Markets`,
          url: `https://example.com/analysis/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          summary: `Expert analysis on how ${keyword} is affecting various sectors. This demo article would typically contain insights from industry experts and market analysts.`,
          image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
          source: 'Market Analysis Demo',
          published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          title: `Opinion: What ${keyword} Means for the Future`,
          url: `https://example.com/opinion/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          summary: `A thoughtful opinion piece exploring the long-term implications of ${keyword}. This demo content represents the type of editorial coverage you would receive.`,
          image_url: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=400&fit=crop',
          source: 'Editorial Demo',
          published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        }
      ];

      // Store demo articles in the database
      for (const article of demoArticles) {
        await supabase
          .from('articles')
          .insert({
            scrape_id: scrapeId,
            title: article.title,
            url: article.url,
            summary: article.summary,
            image_url: article.image_url,
            source: article.source,
            published_at: article.published_at,
          });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        articles: demoArticles,
        message: 'Demo articles returned. Add NEWS_API_KEY to get real news data.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Real News API integration (when API key is available)
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${newsApiKey}`;
    
    const response = await fetch(newsApiUrl);
    const newsData = await response.json();

    if (!response.ok) {
      throw new Error(`News API error: ${newsData.message}`);
    }

    console.log(`News API returned ${newsData.articles?.length || 0} articles`);

    // Process and store articles
    const articles = [];
    
    if (newsData.articles && newsData.articles.length > 0) {
      for (const article of newsData.articles.slice(0, 12)) { // Limit to 12 articles
        const processedArticle = {
          title: article.title || 'No title available',
          url: article.url || '#',
          summary: article.description || article.content?.substring(0, 200) || 'No summary available',
          image_url: article.urlToImage || null,
          source: article.source?.name || 'Unknown Source',
          published_at: article.publishedAt || new Date().toISOString(),
        };

        // Store in database
        const { data: savedArticle } = await supabase
          .from('articles')
          .insert({
            scrape_id: scrapeId,
            title: processedArticle.title,
            url: processedArticle.url,
            summary: processedArticle.summary,
            image_url: processedArticle.image_url,
            source: processedArticle.source,
            published_at: processedArticle.published_at,
          })
          .select()
          .single();

        if (savedArticle) {
          articles.push(savedArticle);
        }
      }
    }

    console.log(`Successfully processed and stored ${articles.length} articles`);

    return new Response(JSON.stringify({ 
      success: true, 
      articles: articles,
      totalFound: newsData.totalResults || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in scrape-news function:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: 'Check the function logs for more details'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});