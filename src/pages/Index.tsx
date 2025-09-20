import { useState } from 'react';
import { SearchBar } from '@/components/scraper/SearchBar';
import { ArticleGrid } from '@/components/scraper/ArticleGrid';
import { Button } from '@/components/ui/button';
import { Newspaper, Zap, Clock, Shield } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  url: string;
  summary?: string;
  image_url?: string;
  source?: string;
  published_at?: string;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScrapeComplete = (newArticles: Article[]) => {
    setArticles(newArticles);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow">
                <Newspaper className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              AI News Scraper
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover the latest news on any topic with our AI-powered scraping technology. 
              Get real-time articles from trusted sources worldwide.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-2 rounded-lg bg-primary/10 mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms find the most relevant articles
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-2 rounded-lg bg-accent/10 mb-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Real-time</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest news as it happens
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-2 rounded-lg bg-primary/10 mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Free to Try</h3>
                <p className="text-sm text-muted-foreground">
                  No signup required - start scraping immediately
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div className="mb-8">
              <SearchBar onScrapeComplete={handleScrapeComplete} />
            </div>

            {/* Sign up CTA */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Want unlimited scraping? Sign up for a free account
              </p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = '/auth'}
              >
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 pb-16">
        <ArticleGrid articles={articles} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;