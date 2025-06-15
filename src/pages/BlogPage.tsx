
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Search, ArrowRight, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mock blog posts with SEO-friendly URLs
  const blogPosts = [
    {
      id: 1,
      title: "From Idea to $10M ARR: A NYC Fintech Journey",
      slug: "from-idea-to-10m-arr-nyc-fintech-journey",
      excerpt: "Sarah Martinez shares how she built her fintech startup from her Brooklyn apartment to serving 50,000+ customers across the tri-state area.",
      content: "Full article content would go here...",
      author: "Sarah Martinez",
      authorRole: "CEO, PayFlow",
      readTime: "8 min read",
      category: "Founder Stories",
      publishedDate: "2024-12-15",
      tags: ["fintech", "fundraising", "growth", "nyc-startups"],
      featuredImage: "/api/placeholder/800/400",
      metaDescription: "Learn how Sarah Martinez built her fintech startup from idea to $10M ARR in NYC's competitive startup ecosystem.",
      views: 2847,
      featured: true
    },
    {
      id: 2,
      title: "NYC Tech Funding Report Q4 2024: $2.3B Raised",
      slug: "nyc-tech-funding-report-q4-2024",
      excerpt: "Comprehensive analysis of funding trends, top investors, and emerging sectors in NYC's startup ecosystem this quarter.",
      content: "Full article content would go here...",
      author: "NYC B2B Team",
      authorRole: "Research Team",
      readTime: "12 min read",
      category: "Market Reports",
      publishedDate: "2024-12-10",
      tags: ["funding", "market-analysis", "investors", "data"],
      featuredImage: "/api/placeholder/800/400",
      metaDescription: "Complete Q4 2024 NYC tech funding analysis - $2.3B raised across 156 deals. See which sectors and stages dominated.",
      views: 4321,
      featured: true
    },
    {
      id: 3,
      title: "The Complete Guide to Hiring in NYC Startups",
      slug: "complete-guide-hiring-nyc-startups",
      excerpt: "Best practices for building your team in the competitive New York market, from sourcing talent to competitive compensation packages.",
      content: "Full article content would go here...",
      author: "Marcus Chen",
      authorRole: "Head of Talent, TechFlow",
      readTime: "15 min read",
      category: "Hiring & Talent",
      publishedDate: "2024-12-08",
      tags: ["hiring", "talent", "compensation", "team-building"],
      featuredImage: "/api/placeholder/800/400",
      metaDescription: "Master hiring in NYC's competitive startup scene with our complete guide covering sourcing, interviewing, and retention strategies.",
      views: 1923,
      featured: false
    },
    {
      id: 4,
      title: "5 NYC Unicorn Founders Share Their Biggest Mistakes",
      slug: "nyc-unicorn-founders-biggest-mistakes",
      excerpt: "Honest insights from founders who've built billion-dollar companies about what they wish they knew earlier in their journey.",
      content: "Full article content would go here...",
      author: "Jessica Wong",
      authorRole: "Senior Editor",
      readTime: "10 min read",
      category: "Founder Stories",
      publishedDate: "2024-12-06",
      tags: ["mistakes", "lessons-learned", "unicorns", "founder-advice"],
      featuredImage: "/api/placeholder/800/400",
      metaDescription: "Learn from NYC unicorn founders' biggest mistakes. Exclusive insights from billion-dollar company builders.",
      views: 3156,
      featured: false
    }
  ];

  const categories = [
    "Founder Stories",
    "Market Reports", 
    "Hiring & Talent",
    "Fundraising",
    "Product Strategy",
    "Growth Marketing"
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Founder Stories": "bg-purple-100 text-purple-800",
      "Market Reports": "bg-blue-100 text-blue-800", 
      "Hiring & Talent": "bg-green-100 text-green-800",
      "Fundraising": "bg-orange-100 text-orange-800",
      "Product Strategy": "bg-pink-100 text-pink-800",
      "Growth Marketing": "bg-yellow-100 text-yellow-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const generateBlogUrl = (slug: string) => {
    return `/blog/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation onJoinCommunityClick={() => window.open('https://nycb2b.beehiiv.com', '_blank')} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC Startup Insights</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep insights, founder stories, and market intelligence from NYC's thriving startup ecosystem.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">150+</div>  
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">25k+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">$2B+</div>
              <div className="text-gray-600">Funding Coverage</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl leading-tight group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        By {post.author} • {post.views.toLocaleString()} views
                      </div>
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all">
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      By {post.author} • {new Date(post.publishedDate).toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0">
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Never Miss an Insight</h2>
              <p className="text-xl mb-6 opacity-90">
                Get our weekly newsletter with the latest startup insights, funding news, and founder stories.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Subscribe to Newsletter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
