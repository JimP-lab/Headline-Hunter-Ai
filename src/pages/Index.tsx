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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow">
                <Newspaper className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              AI News Scraper
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Discover the latest news on any topic with our AI-powered scraping technology. 
              Get real-time articles from trusted sources worldwide.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 backdrop-blur border">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms find the most relevant articles
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 backdrop-blur border">
                <div className="p-3 rounded-full bg-accent/10 mb-4">
                  <Clock className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest news as it happens
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 backdrop-blur border">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free to Try</h3>
                <p className="text-sm text-muted-foreground">
                  No signup required - start scraping immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            AI News Scraper Preview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how the app works in action
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Decorative background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 transform scale-95"></div>
          
          {/* Video container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
            <video 
              className="w-full h-auto"
              controls
              poster="/placeholder.svg"
              preload="metadata"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-20 lg:py-32 border-t bg-muted/20">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            AI News Scraper
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Search for the latest news on any topic
          </p>
          
          <SearchBar onScrapeComplete={handleScrapeComplete} />
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 pb-20">
        <ArticleGrid articles={articles} isLoading={isLoading} />
      </div>
    </div>
  );
};
export default Index;
