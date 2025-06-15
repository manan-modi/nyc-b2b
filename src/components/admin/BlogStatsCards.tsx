
import { Card, CardContent } from "@/components/ui/card";
import { BlogArticle } from "@/lib/blogService";

interface BlogStatsCardsProps {
  articles: BlogArticle[];
}

export const BlogStatsCards = ({ articles }: BlogStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-gray-900">
            {articles.filter(a => a.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Drafts</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-green-600">
            {articles.filter(a => a.status === 'published').length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-purple-600">
            {articles.filter(a => a.featured).length}
          </div>
          <div className="text-sm text-gray-600">Featured</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold text-blue-600">
            {articles.reduce((sum, a) => sum + (a.views || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </CardContent>
      </Card>
    </div>
  );
};
