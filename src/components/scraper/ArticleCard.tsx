import { Calendar, ExternalLink, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: string;
  title: string;
  url: string;
  summary?: string;
  image_url?: string;
  source?: string;
  published_at?: string;
}

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
      {article.image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          {article.source && (
            <Badge variant="secondary" className="text-xs">
              {article.source}
            </Badge>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(article.published_at)}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg leading-tight line-clamp-3 hover:text-primary transition-colors">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {article.summary && (
          <div className="flex-1 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-auto hover:bg-primary hover:text-primary-foreground"
          onClick={() => window.open(article.url, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Read Full Article
        </Button>
      </CardContent>
    </Card>
  );
};