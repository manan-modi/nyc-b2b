
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormattingGuideTooltip } from "./FormattingGuideTooltip";

interface ArticleBasicFieldsProps {
  formData: {
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author_name: string;
    author_role: string;
    featured_image: string;
    tags: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export const ArticleBasicFields = ({ formData, onFormDataChange }: ArticleBasicFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onFormDataChange('title', e.target.value)}
            placeholder="Enter article title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => onFormDataChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Founder Story">Founder Story</SelectItem>
              <SelectItem value="Market Report">Market Report</SelectItem>
              <SelectItem value="Guide">Guide</SelectItem>
              <SelectItem value="Insights">Insights</SelectItem>
              <SelectItem value="Industry Trends">Industry Trends</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Analysis">Analysis</SelectItem>
              <SelectItem value="Team Building">Team Building</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => onFormDataChange('excerpt', e.target.value)}
          placeholder="Brief description of the article (appears in previews and meta tags)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="content">Content *</Label>
          <FormattingGuideTooltip />
        </div>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => onFormDataChange('content', e.target.value)}
          placeholder="Write your article content here using markdown formatting..."
          rows={10}
          required
          className="font-mono text-sm"
        />
        <div className="text-xs text-gray-500 mt-1">
          Supports: **bold**, *italic*, # headers, * bullets, [links](URL), {`> quotes`}, `code`
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author_name">Author Name *</Label>
          <Input
            id="author_name"
            value={formData.author_name}
            onChange={(e) => onFormDataChange('author_name', e.target.value)}
            placeholder="Author name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="author_role">Author Role</Label>
          <Input
            id="author_role"
            value={formData.author_role}
            onChange={(e) => onFormDataChange('author_role', e.target.value)}
            placeholder="Author role/title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured_image">Featured Image URL</Label>
        <Input
          id="featured_image"
          value={formData.featured_image}
          onChange={(e) => onFormDataChange('featured_image', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => onFormDataChange('tags', e.target.value)}
          placeholder="startup, founder, guide, nyc"
        />
      </div>
    </>
  );
};
