import { ArticleCard } from './ArticleCard';
import { Card } from '@/components/ui/card';
import { FileText, Zap } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  url: string;
  summary?: string;
  image_url?: string;
  source?: string;
  published_at?: string;
}

interface ArticleGridProps {
  articles: Article[];
  isLoading?: boolean;
}

export const ArticleGrid = ({ articles, isLoading }: ArticleGridProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-80 animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12">
        <Card className="p-8 text-center border-dashed border-2 border-primary/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Search for a topic above to discover the latest news articles
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Zap className="h-4 w-4" />
                <span>Powered by AI news scraping</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Latest News Articles
        </h2>
        <p className="text-muted-foreground">
          Found {articles.length} articles - Click any article to read more
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};