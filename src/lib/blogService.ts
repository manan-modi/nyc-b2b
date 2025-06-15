
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type BlogArticle = Database['public']['Tables']['blog_articles']['Row'];
export type BlogArticleInsert = Database['public']['Tables']['blog_articles']['Insert'];
export type BlogArticleUpdate = Database['public']['Tables']['blog_articles']['Update'];

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const estimateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const fetchPublishedArticles = async () => {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchAllArticles = async () => {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchArticleBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
};

export const createArticle = async (article: BlogArticleInsert) => {
  const slug = generateSlug(article.title);
  const readTime = estimateReadTime(article.content);
  
  const { data, error } = await supabase
    .from('blog_articles')
    .insert({
      ...article,
      slug,
      read_time: readTime,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateArticle = async (id: string, updates: BlogArticleUpdate) => {
  if (updates.title) {
    updates.slug = generateSlug(updates.title);
  }
  if (updates.content) {
    updates.read_time = estimateReadTime(updates.content);
  }

  const { data, error } = await supabase
    .from('blog_articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateArticleStatus = async (id: string, status: 'draft' | 'published') => {
  const updates: BlogArticleUpdate = { status };
  
  if (status === 'published') {
    updates.published_date = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('blog_articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const incrementViews = async (id: string) => {
  const { error } = await supabase.rpc('increment', {
    table_name: 'blog_articles',
    row_id: id,
    column_name: 'views'
  });

  if (error) console.error('Failed to increment views:', error);
};
