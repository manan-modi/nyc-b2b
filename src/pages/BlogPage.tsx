
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, Users, Mail, MessageCircle, Eye, Calendar, User } from "lucide-react";
import { fetchPublishedArticles, fetchArticleBySlug, incrementViews, type BlogArticle } from "@/lib/blogService";
import { Navigation } from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";

const BlogPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [singleArticle, setSingleArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, [slug]);

  const loadContent = async () => {
    try {
      setLoading(true);
      if (slug) {
        // Load single article
        const article = await fetchArticleBySlug(slug);
        setSingleArticle(article);
        if (article) {
          incrementViews(article.id);
        }
      } else {
        // Load all published articles
        const data = await fetchPublishedArticles();
        setArticles(data);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Founder Story": "bg-purple-100 text-purple-800",
      "Market Report": "bg-blue-100 text-blue-800",
      "Guide": "bg-orange-100 text-orange-800",
      "Insights": "bg-green-100 text-green-800",
      "Industry Trends": "bg-pink-100 text-pink-800",
      "Operations": "bg-yellow-100 text-yellow-800",
      "Analysis": "bg-indigo-100 text-indigo-800",
      "Team Building": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Single article view with Medium-style readability
  if (slug && singleArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <SEOHead article={singleArticle} />
        <StructuredData article={singleArticle} />
        
        <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
        
        <article className="max-w-2xl mx-auto px-6 py-16">
          {/* Article Header */}
          <header className="mb-12">
            {singleArticle.category && (
              <Badge className={`${getCategoryColor(singleArticle.category)} mb-6 text-sm`}>
                {singleArticle.category}
              </Badge>
            )}
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {singleArticle.title}
            </h1>
            
            {singleArticle.excerpt && (
              <p className="text-2xl text-gray-600 mb-8 leading-relaxed font-light">
                {singleArticle.excerpt}
              </p>
            )}
            
            <div className="flex items-center gap-8 text-base text-gray-500 mb-12 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {singleArticle.author_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{singleArticle.author_name}</div>
                  {singleArticle.author_role && (
                    <div className="text-sm text-gray-500">{singleArticle.author_role}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(singleArticle.published_date || singleArticle.created_at)}
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {singleArticle.read_time} min read
                </div>
                
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {singleArticle.views || 0} views
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {singleArticle.featured_image && (
            <div className="mb-12">
              <img 
                src={singleArticle.featured_image} 
                alt={singleArticle.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content - Medium style */}
          <div className="prose prose-xl prose-gray max-w-none">
            <div className="text-gray-800 leading-relaxed text-xl font-light tracking-wide whitespace-pre-wrap">
              {singleArticle.content}
            </div>
          </div>

          {/* Tags */}
          {singleArticle.tags && singleArticle.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {singleArticle.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Button variant="outline" asChild className="hover:bg-gray-50 transition-colors">
              <a href="/blog">← Back to All Articles</a>
            </Button>
          </div>
        </article>
      </div>
    );
  }

  // Article listing view
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredArticles = articles.filter(article => article.featured).slice(0, 2);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SEOHead />
      
      <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC Startup Resources</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, guides, and stories from NYC's startup ecosystem. Learn from founders who've been there.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {article.category && (
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {article.read_time} min read
                      </div>
                    </div>
                    <CardTitle className="text-2xl leading-tight">{article.title}</CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        By {article.author_name} • {formatDate(article.published_date || article.created_at)}
                      </div>
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 relative overflow-hidden group" asChild>
                        <a href={`/blog/${article.slug}`}>
                          <span className="relative z-10">Read Article</span>
                          <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Community Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">8,500+</div>
              <div className="text-gray-600">Newsletter Subscribers</div>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,500+</div>
              <div className="text-gray-600">Active WhatsApp Members</div>
            </div>
          </div>
        </div>

        {/* All Posts */}
        {regularArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {article.category && (
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {article.read_time} min read
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        By {article.author_name} • {formatDate(article.published_date || article.created_at)}
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 p-2 relative overflow-hidden group" asChild>
                        <a href={`/blog/${article.slug}`}>
                          <span className="relative z-10">Read</span>
                          <ArrowRight className="ml-1 h-3 w-3 relative z-10 transition-transform group-hover:translate-x-1" />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles published yet</h3>
            <p className="text-gray-600">Check back soon for fresh startup insights and stories.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Never Miss an Insight</h2>
              <p className="text-xl mb-6 opacity-90">
                Get our weekly newsletter with the latest startup insights, funding news, and founder stories delivered to your inbox.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                <a href="https://nycb2b.beehiiv.com" target="_blank" rel="noopener noreferrer">
                  Subscribe to Newsletter
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
