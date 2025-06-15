
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArticleSettingsProps {
  formData: {
    featured: boolean;
    status: 'draft' | 'published';
  };
  onFormDataChange: (field: string, value: boolean | string) => void;
}

export const ArticleSettings = ({ formData, onFormDataChange }: ArticleSettingsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => onFormDataChange('featured', checked)}
        />
        <Label htmlFor="featured">Featured Article</Label>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value: 'draft' | 'published') => onFormDataChange('status', value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
