import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useArticleStore } from '../stores/articleStore';
import ArticleCard from '../components/articles/ArticleCard';

const ArticlesPage: React.FC = () => {
  const { language } = useLanguage();
  const { articles, isLoading, error, fetchArticles } = useArticleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Fetch articles on mount
  useEffect(() => {
    fetchArticles({ published: true });
  }, [fetchArticles]);

  // Extract all unique tags from articles
  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tags || []))
  );

  // Filter articles based on search term and selected tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || 
      (article.tags && article.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

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
            ? 'Une erreur est survenue lors du chargement des articles.'
            : 'An error occurred while loading articles.'
          }
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-slate-gray py-32 md:py-40">
        <div className="container-custom text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {language === 'fr' ? 'Articles & Insights' : 'Articles & Insights'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Découvrez nos dernières réflexions sur les tendances du marketing, la stratégie de marque et plus encore.'
              : 'Discover our latest thinking on marketing trends, brand strategy, and more.'
            }
          </motion.p>
        </div>
      </div>

      {/* Articles Section */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher des articles...' : 'Search articles...'}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null 
                    ? 'bg-teal text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTag(null)}
              >
                {language === 'fr' ? 'Tous' : 'All'}
              </button>
              
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag 
                      ? 'bg-teal text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image_url={article.image_url}
                  author={article.author}
                  author_avatar={article.author_avatar}
                  created_at={article.created_at}
                  read_time={article.read_time}
                  tags={article.tags}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl text-slate-gray mb-2">
                {language === 'fr' ? 'Aucun article trouvé' : 'No articles found'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Essayez de modifier vos critères de recherche.' 
                  : 'Try adjusting your search criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;
