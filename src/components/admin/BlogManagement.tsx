
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BlogArticle, updateArticleStatus } from "@/lib/blogService";
import { CreateArticleDialog } from "../CreateArticleDialog";
import { BlogStatsCards } from "./BlogStatsCards";
import { BlogArticleCard } from "./BlogArticleCard";

interface BlogManagementProps {
  articles: BlogArticle[];
  setArticles: (articles: BlogArticle[]) => void;
  onReloadData: () => void;
}

export const BlogManagement = ({ articles, setArticles, onReloadData }: BlogManagementProps) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const handleArticleStatusUpdate = async (articleId: string, status: 'draft' | 'published') => {
    setUpdatingStatus(articleId);
    try {
      await updateArticleStatus(articleId, status);
      
      setArticles(articles.map(article => 
        article.id === articleId 
          ? { ...article, status, published_date: status === 'published' ? new Date().toISOString() : article.published_date }
          : article
      ));

      toast({
        title: `Article ${status === 'published' ? 'Published' : 'Drafted'}`,
        description: `The article has been ${status === 'published' ? 'published' : 'moved to draft'} successfully.`,
      });
    } catch (error) {
      console.error('Failed to update article status:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the article status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="space-y-6">
      <BlogStatsCards articles={articles} />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Articles</h2>
        <CreateArticleDialog onArticleCreated={onReloadData} />
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <BlogArticleCard
            key={article.id}
            article={article}
            onReloadData={onReloadData}
            onStatusUpdate={handleArticleStatusUpdate}
            updatingStatus={updatingStatus}
          />
        ))}

        {articles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600">Create your first blog article to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
