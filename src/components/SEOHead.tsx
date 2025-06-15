
import { Helmet } from "react-helmet-async";
import { BlogArticle } from "@/lib/blogService";

interface SEOHeadProps {
  article?: BlogArticle;
  title?: string;
  description?: string;
  baseUrl?: string;
}

export const SEOHead = ({ 
  article, 
  title = "NYC B2B - Join NYC's #1 B2B startup community", 
  description = "Join NYC's #1 B2B startup community. Discover exclusive events, job opportunities, and resources. Join 5,000+ founders and innovators.",
  baseUrl = "https://nycb2b.com"
}: SEOHeadProps) => {
  const pageTitle = article ? `${article.title} | NYC B2B` : title;
  const pageDescription = article ? (article.meta_description || article.excerpt) : description;
  const pageUrl = article ? `${baseUrl}/blog/${article.slug}` : baseUrl;
  const imageUrl = article?.featured_image || `${baseUrl}/lovable-uploads/4ce54989-5124-4e46-a3ab-aa1434b9fffd.png`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {article?.meta_keywords && (
        <meta name="keywords" content={article.meta_keywords.join(", ")} />
      )}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="NYC B2B" />
      
      {article && (
        <>
          <meta property="article:published_time" content={article.published_date || article.created_at} />
          <meta property="article:modified_time" content={article.updated_at} />
          <meta property="article:author" content={article.author_name} />
          {article.category && <meta property="article:section" content={article.category} />}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nycb2b" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};
