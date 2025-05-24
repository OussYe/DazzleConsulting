import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import { useLanguage } from '../contexts/LanguageContext';
import { useArticleStore } from '../stores/articleStore';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { articles, isLoading, error, fetchArticles } = useArticleStore();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (articles.length > 0 && id) {
      const foundArticle = articles.find(a => a.id === id);
      setArticle(foundArticle);
    }
  }, [articles, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          {language === 'fr' 
            ? 'Une erreur est survenue lors du chargement de l\'article.'
            : 'An error occurred while loading the article.'
          }
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-gray mb-4">
            {language === 'fr' ? 'Article non trouvé' : 'Article not found'}
          </h2>
          <Link to="/articles" className="text-teal hover:underline">
            {language === 'fr' ? 'Retour aux articles' : 'Back to articles'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {article.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center text-white/80 space-x-4"
            >
              <img 
                src={article.author_avatar} 
                alt={article.author_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{article.author_name}</div>
                <div className="text-sm flex items-center">
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1" />
                  <span>
                    {article.read_time} {language === 'fr' ? 'min de lecture' : 'min read'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16 bg-off-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/articles"
              className="inline-flex items-center text-teal hover:underline mb-8"
            >
              <ArrowLeft size={20} className="mr-2" />
              {language === 'fr' ? 'Retour aux articles' : 'Back to articles'}
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(article.categories || []).map((category: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white text-slate-gray text-sm font-medium rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <div className="prose max-w-none">
                <Markdown>{article.content}</Markdown>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Partager cet article' : 'Share this article'}
                  </span>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Share article"
                  >
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
