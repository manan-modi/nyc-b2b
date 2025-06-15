
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";
import { updateArticle, type BlogArticle, type BlogArticleUpdate } from "@/lib/blogService";
import { ArticleBasicFields } from "./article/ArticleBasicFields";
import { ArticleMetaFields } from "./article/ArticleMetaFields";
import { ArticleSettings } from "./article/ArticleSettings";

interface EditArticleDialogProps {
  article: BlogArticle;
  onArticleUpdated: () => void;
}

export const EditArticleDialog = ({ article, onArticleUpdated }: EditArticleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    meta_description: '',
    meta_keywords: '',
    featured_image: '',
    author_name: '',
    author_role: '',
    category: '',
    tags: '',
    featured: false,
    status: 'draft' as 'draft' | 'published'
  });

  // Initialize form data when dialog opens
  useEffect(() => {
    if (open && article) {
      setFormData({
        title: article.title || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        meta_description: article.meta_description || '',
        meta_keywords: article.meta_keywords ? article.meta_keywords.join(', ') : '',
        featured_image: article.featured_image || '',
        author_name: article.author_name || '',
        author_role: article.author_role || '',
        category: article.category || '',
        tags: article.tags ? article.tags.join(', ') : '',
        featured: article.featured || false,
        status: article.status as 'draft' | 'published'
      });
    }
  }, [open, article]);

  const handleFormDataChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData: BlogArticleUpdate = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        meta_description: formData.meta_description || undefined,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : undefined,
        featured_image: formData.featured_image || undefined,
        author_name: formData.author_name,
        author_role: formData.author_role || undefined,
        category: formData.category || undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined,
        featured: formData.featured,
        status: formData.status,
        published_date: formData.status === 'published' && article.status !== 'published' 
          ? new Date().toISOString() 
          : article.published_date
      };

      await updateArticle(article.id, updateData);
      
      toast({
        title: "Article Updated",
        description: `Article "${formData.title}" has been updated successfully.`,
      });

      setOpen(false);
      onArticleUpdated();
    } catch (error) {
      console.error('Failed to update article:', error);
      toast({
        title: "Error",
        description: "Failed to update article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>
            Make changes to your article. You can edit all fields and change the status.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ArticleBasicFields formData={formData} onFormDataChange={handleFormDataChange} />
          
          <ArticleMetaFields formData={formData} onFormDataChange={handleFormDataChange} />

          <ArticleSettings formData={formData} onFormDataChange={handleFormDataChange} />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Article'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
