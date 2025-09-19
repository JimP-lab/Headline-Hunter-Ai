import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SearchBarProps {
  onScrapeComplete: (articles: any[]) => void;
}

export const SearchBar = ({ onScrapeComplete }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter a topic or keyword to search for news articles",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create a scrape session (anonymous for now)
      const { data: scrapeData, error: scrapeError } = await supabase
        .from('scrapes')
        .insert({
          keyword: keyword.trim(),
          source: 'general',
          user_id: null, // Anonymous scrape
        })
        .select()
        .single();

      if (scrapeError) throw scrapeError;

      // Call the scraping edge function
      const { data, error } = await supabase.functions.invoke('scrape-news', {
        body: { 
          keyword: keyword.trim(),
          scrapeId: scrapeData.id 
        }
      });

      if (error) throw error;

      onScrapeComplete(data.articles || []);
      
      toast({
        title: "News scraped successfully!",
        description: `Found ${data.articles?.length || 0} articles for "${keyword}"`,
      });

    } catch (error: any) {
      console.error('Scraping error:', error);
      toast({
        title: "Scraping failed",
        description: error.message || "Failed to scrape news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-card to-muted/30 border-primary/20 shadow-lg">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            AI News Scraper
          </h2>
          <p className="text-muted-foreground">
            Search for the latest news on any topic
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter a topic or keyword (e.g., artificial intelligence, climate change)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
              className="pl-10 h-12"
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isLoading || !keyword.trim()}
            className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Scrape News
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Free tokens available - No signup required
          </div>
        </div>
      </div>
    </Card>
  );
};