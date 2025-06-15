
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Check, Calendar, Clock, BookOpen, Eye, Edit, ExternalLink } from "lucide-react";
import { BlogArticle, updateArticleStatus } from "@/lib/blogService";
import { CreateArticleDialog } from "../CreateArticleDialog";
import { BlogStatsCards } from "./BlogStatsCards";

interface BlogManagementProps {
  articles: BlogArticle[];
  setArticles: (articles: BlogArticle[]) => void;
  onReloadData: () => void;
}

export const BlogManagement = ({ articles, setArticles, onReloadData }: BlogManagementProps) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

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
          <Card key={article.id} className="overflow-hidden">
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

                {article.status === 'draft' && (
                  <Button
                    size="sm"
                    onClick={() => handleArticleStatusUpdate(article.id, 'published')}
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
                    onClick={() => handleArticleStatusUpdate(article.id, 'draft')}
                    disabled={updatingStatus === article.id}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {updatingStatus === article.id ? 'Moving to Draft...' : 'Move to Draft'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
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
