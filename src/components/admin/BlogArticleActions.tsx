
import { Button } from "@/components/ui/button";
import { Check, Edit, ExternalLink } from "lucide-react";
import { BlogArticle } from "@/lib/blogService";
import { EditArticleDialog } from "../EditArticleDialog";

interface BlogArticleActionsProps {
  article: BlogArticle;
  onReloadData: () => void;
  onStatusUpdate: (articleId: string, status: 'draft' | 'published') => void;
  updatingStatus: string | null;
}

export const BlogArticleActions = ({ 
  article, 
  onReloadData, 
  onStatusUpdate, 
  updatingStatus 
}: BlogArticleActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button 
        variant="outline" 
        size="sm" 
        asChild
        className="border-gray-300"
      >
        <a 
          href={`/blog/${article.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Article
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>

      <EditArticleDialog 
        article={article} 
        onArticleUpdated={onReloadData}
      />

      {article.status === 'draft' && (
        <Button
          size="sm"
          onClick={() => onStatusUpdate(article.id, 'published')}
          disabled={updatingStatus === article.id}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="mr-2 h-4 w-4" />
          {updatingStatus === article.id ? 'Publishing...' : 'Publish'}
        </Button>
      )}

      {article.status === 'published' && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onStatusUpdate(article.id, 'draft')}
          disabled={updatingStatus === article.id}
        >
          <Edit className="mr-2 h-4 w-4" />
          {updatingStatus === article.id ? 'Moving to Draft...' : 'Move to Draft'}
        </Button>
      )}
    </div>
  );
};
