import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Share2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  author: string;
  author_avatar: string;
  created_at: string;
  read_time: number;
  tags?: string[];
  index?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  image_url,
  author,
  author_avatar,
  created_at,
  read_time,
  tags = [],
  index = 0
}) => {
  const { language } = useLanguage();
  
  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="article-card h-full flex flex-col"
    >
      {/* Image */}
      <Link to={`/articles/${id}`} className="block aspect-[16/9] overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag, i) => (
            <span 
              key={i}
              className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-xl mb-2 text-slate-gray">
          <Link to={`/articles/${id}`} className="hover:text-teal">
            {title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4">
          {excerpt.length > 120 ? excerpt.substring(0, 120) + '...' : excerpt}
        </p>
        
        {/* Metadata */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center">
            <img 
              src={author_avatar} 
              alt={author}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <span className="text-xs text-gray-600 block">{author}</span>
              <div className="flex items-center text-xs text-gray-500">
                <span>{formatDate(created_at)}</span>
                <span className="mx-1">•</span>
                <Clock size={12} className="mr-1" />
                <span>
                  {read_time} {language === 'fr' ? 'min de lecture' : 'min read'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Share Button */}
          <button 
            className="text-gray-400 hover:text-teal transition-colors"
            aria-label="Share article"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
