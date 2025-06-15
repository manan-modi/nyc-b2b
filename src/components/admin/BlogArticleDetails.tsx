
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, Eye } from "lucide-react";
import { BlogArticle } from "@/lib/blogService";

interface BlogArticleDetailsProps {
  article: BlogArticle;
}

export const BlogArticleDetails = ({ article }: BlogArticleDetailsProps) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="h-4 w-4" />
          By {article.author_name} {article.author_role && `(${article.author_role})`}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          Created: {formatDate(article.created_at)}
        </div>
        {article.published_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            Published: {formatDate(article.published_date)}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          {article.read_time} min read
        </div>
      </div>
      
      <div className="space-y-3">
        {article.category && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Category:</span> {article.category}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Eye className="h-4 w-4" />
          {article.views || 0} views
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
