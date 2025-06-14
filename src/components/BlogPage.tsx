
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, TrendingUp, Users, DollarSign, Building2, Menu, X, Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SimpleSubmitEventDialog } from "@/components/SimpleSubmitEventDialog";

const BlogPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredPosts = [
    {
      id: 1,
      title: "From Idea to $10M ARR: A NYC Fintech Journey",
      excerpt: "Sarah Martinez shares how she built her fintech startup from her Brooklyn apartment to serving 50,000+ customers across the five boroughs.",
      author: "Sarah Martinez",
      readTime: "8 min read",
      category: "Founder Story",
      date: "Dec 12, 2024",
      featured: true,
      slug: "idea-to-10m-arr-nyc-fintech-journey"
    },
    {
      id: 2,
      title: "NYC Tech Funding Report Q4 2024",
      excerpt: "Comprehensive analysis of funding trends, top investors, and emerging sectors in NYC's startup ecosystem this quarter.",
      author: "NYC Startup Hub Team",
      readTime: "12 min read",
      category: "Market Report",
      date: "Dec 10, 2024",
      featured: true,
      slug: "nyc-tech-funding-report-q4-2024"
    }
  ];

  const posts = [
    {
      id: 3,
      title: "The Complete Guide to Hiring in NYC Startups",
      excerpt: "Best practices for building your team in the competitive New York market, from sourcing to onboarding.",
      author: "Marcus Chen",
      readTime: "15 min read",
      category: "Guide",
      date: "Dec 8, 2024",
      slug: "complete-guide-hiring-nyc-startups"
    },
    {
      id: 4,
      title: "5 NYC Unicorn Founders Share Their Biggest Mistakes",
      excerpt: "Honest insights from founders who've built billion-dollar companies about what they wish they knew earlier.",
      author: "Jessica Wong",
      readTime: "10 min read",
      category: "Insights",
      date: "Dec 6, 2024",
      slug: "nyc-unicorn-founders-biggest-mistakes"
    },
    {
      id: 5,
      title: "HealthTech Trends Shaping NYC's Medical Innovation",
      excerpt: "How NYC's unique healthcare ecosystem is driving innovation in digital health and medical technology.",
      author: "Dr. David Patel",
      readTime: "7 min read",
      category: "Industry Trends",
      date: "Dec 4, 2024",
      slug: "healthtech-trends-nyc-medical-innovation"
    },
    {
      id: 6,
      title: "Scaling Customer Success from 10 to 10,000 Users",
      excerpt: "A practical playbook for building customer success processes that scale with your startup's growth.",
      author: "Amanda Rodriguez",
      readTime: "9 min read",
      category: "Operations",
      date: "Dec 2, 2024",
      slug: "scaling-customer-success-10-to-10000-users"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold nyc-gradient-text">NYC Startup Hub</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Home</Link>
              <Link to="/events" className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105">Events</Link>
              <Link to="/blog" className="text-green-600 font-medium">Blog</Link>
              <a 
                href="https://venture.angellist.com/nyc-ventures/syndicate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-all duration-200 font-medium hover:scale-105"
              >
                Invest
              </a>
              <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin</Link>
              <SimpleSubmitEventDialog />
              <Button size="sm" className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white">
                Join Community
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/events" 
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  to="/blog" 
                  className="block text-green-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <a 
                  href="https://venture.angellist.com/nyc-ventures/syndicate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Invest
                </a>
                <Link 
                  to="/admin" 
                  className="block text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <div className="py-2">
                  <SimpleSubmitEventDialog />
                </div>
                <Button 
                  size="sm" 
                  className="nyc-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 text-white mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Community
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">NYC Startup Stories</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, guides, and stories from NYC's startup ecosystem. Learn from founders who've been there.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="bg-white/70 backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button className="nyc-gradient hover:opacity-90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Submit Article
          </Button>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
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
                  <CardTitle className="text-2xl leading-tight group-hover:text-green-600 transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      By {post.author} • {post.date}
                    </div>
                    <Button variant="ghost" className="text-green-600 hover:text-green-700 group-hover:translate-x-1 transition-all">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">25k+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">$2B+</div>
              <div className="text-gray-600">Combined Funding Covered</div>
            </div>
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                  <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      By {post.author} • {post.date}
                    </div>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0 group-hover:translate-x-1 transition-all">
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
          <Card className="nyc-gradient border-0 text-white max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Never Miss an Insight</h2>
              <p className="text-xl mb-6 opacity-90">
                Get our weekly newsletter with the latest startup insights, funding news, and founder stories delivered to your inbox.
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
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
