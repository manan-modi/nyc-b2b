
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ArticleMetaFieldsProps {
  formData: {
    meta_description: string;
    meta_keywords: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export const ArticleMetaFields = ({ formData, onFormDataChange }: ArticleMetaFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="meta_description">Meta Description (SEO) *</Label>
        <Textarea
          id="meta_description"
          value={formData.meta_description}
          onChange={(e) => onFormDataChange('meta_description', e.target.value)}
          placeholder="SEO meta description (150-160 characters for optimal search results)"
          rows={2}
          maxLength={160}
        />
        <div className="text-xs text-gray-500">
          {formData.meta_description.length}/160 characters
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meta_keywords">Meta Keywords (SEO)</Label>
        <Input
          id="meta_keywords"
          value={formData.meta_keywords}
          onChange={(e) => onFormDataChange('meta_keywords', e.target.value)}
          placeholder="startup, nyc, b2b, founder, entrepreneur"
        />
      </div>
    </>
  );
};
