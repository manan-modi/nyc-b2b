
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogArticle } from "@/lib/blogService";
import { BlogArticleDetails } from "./BlogArticleDetails";
import { BlogArticleActions } from "./BlogArticleActions";

interface BlogArticleCardProps {
  article: BlogArticle;
  onReloadData: () => void;
  onStatusUpdate: (articleId: string, status: 'draft' | 'published') => void;
  updatingStatus: string | null;
}

export const BlogArticleCard = ({ 
  article, 
  onReloadData, 
  onStatusUpdate, 
  updatingStatus 
}: BlogArticleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{article.title}</CardTitle>
              {article.featured && (
                <Badge className="bg-yellow-100 text-yellow-700">
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="text-base">
              {article.excerpt}
            </CardDescription>
            <div className="mt-2 text-sm text-gray-500">
              Slug: /blog/{article.slug}
            </div>
          </div>
          <Badge className={getStatusColor(article.status)}>
            {article.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <BlogArticleDetails article={article} />
        <BlogArticleActions 
          article={article}
          onReloadData={onReloadData}
          onStatusUpdate={onStatusUpdate}
          updatingStatus={updatingStatus}
        />
      </CardContent>
    </Card>
  );
};
