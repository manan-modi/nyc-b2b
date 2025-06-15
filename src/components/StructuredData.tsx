
import { Helmet } from "react-helmet-async";
import { BlogArticle } from "@/lib/blogService";

interface StructuredDataProps {
  article: BlogArticle;
  baseUrl?: string;
}

export const StructuredData = ({ article, baseUrl = "https://nycb2b.com" }: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.meta_description,
    "image": article.featured_image ? [article.featured_image] : undefined,
    "datePublished": article.published_date || article.created_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Person",
      "name": article.author_name,
      "jobTitle": article.author_role
    },
    "publisher": {
      "@type": "Organization",
      "name": "NYC B2B",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/lovable-uploads/00d2fcf3-063b-4181-8a1d-a84bd811f817.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug}`
    },
    "keywords": article.tags?.join(", "),
    "articleSection": article.category,
    "wordCount": article.content?.split(/\s+/).length || 0,
    "timeRequired": `PT${article.read_time || 5}M`
  };

  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
    </Helmet>
  );
};
