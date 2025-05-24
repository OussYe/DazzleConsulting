import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Article {
  id: string;
  title: string;
  title_en: string;
  slug: string;
  content: string;
  content_en: string;
  excerpt: string;
  excerpt_en: string;
  author: string;
  author_avatar: string;
  read_time: number;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
}

interface ArticleStore {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  fetchArticles: (options?: { published?: boolean }) => Promise<void>;
  createArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => Promise<Article>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
  articles: [],
  isLoading: false,
  error: null,

  fetchArticles: async (options = {}) => {
    set({ isLoading: true, error: null });
    try {
      let query = supabase.from('articles').select('*');
      
      if (typeof options.published === 'boolean') {
        query = query.eq('published', options.published);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      if (!data) throw new Error('No data returned from Supabase');
      
      set({ articles: data as Article[] });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createArticle: async (article) => {
    set({ isLoading: true, error: null });
    try {
      const { data: existingArticle, error: checkError } = await supabase
        .from('articles')
        .select()
        .eq('slug', article.slug)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingArticle) throw new Error('An article with this slug already exists');

      const newArticle = {
        ...article,
        published: false,
        tags: article.tags || []
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([newArticle])
        .select()
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Failed to create article');

      const createdArticle = data as Article;
      
      set(state => ({
        articles: [createdArticle, ...state.articles]
      }));

      return createdArticle;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateArticle: async (id, article) => {
    set({ isLoading: true, error: null });
    try {
      // First check if the article exists
      const { data: existingArticle, error: checkError } = await supabase
        .from('articles')
        .select()
        .eq('id', id)
        .maybeSingle();

      if (checkError) throw checkError;
      if (!existingArticle) throw new Error('Article not found');

      // If updating the slug, check for uniqueness
      if (article.slug && article.slug !== existingArticle.slug) {
        const { data: slugCheck, error: slugError } = await supabase
          .from('articles')
          .select()
          .eq('slug', article.slug)
          .maybeSingle();

        if (slugError) throw slugError;
        if (slugCheck) throw new Error('An article with this slug already exists');
      }

      const { data, error } = await supabase
        .from('articles')
        .update(article)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Article not found after update');

      const updatedArticle = data as Article;
      
      set(state => ({
        articles: state.articles.map(a => 
          a.id === id ? updatedArticle : a
        )
      }));

      return updatedArticle;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteArticle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        articles: state.articles.filter(a => a.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
