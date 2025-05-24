import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Search, Filter, Upload, Download, Trash2, Edit } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import { useLanguage } from '../../contexts/LanguageContext';
import { useArticleStore } from '../../stores/articleStore';

const AdminArticles: React.FC = () => {
  const { language } = useLanguage();
  const { articles, isLoading, error, fetchArticles, createArticle, updateArticle, deleteArticle } = useArticleStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [editorMode, setEditorMode] = useState<'view' | 'edit' | 'create'>('view');
  const [editorContent, setEditorContent] = useState('');

  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles based on search and status
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle article selection
  const handleSelectArticle = (article: any) => {
    setSelectedArticle(article);
    setEditorContent(article.content);
    setEditorMode('view');
  };

  // Handle new article creation
  const handleNewArticle = () => {
    const newArticle = {
      title: language === 'fr' ? 'Nouvel article' : 'New Article',
      excerpt: '',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author_name: 'Admin',
      author_avatar: 'https://i.pravatar.cc/150?img=1',
      date: new Date().toISOString(),
      read_time: 5,
      categories: [],
      content: `# ${language === 'fr' ? 'Nouvel article' : 'New Article'}\n\nStart writing here...`,
      status: 'draft' as const,
      language: language as 'en' | 'fr'
    };
    
    setSelectedArticle(newArticle);
    setEditorContent(newArticle.content);
    setEditorMode('edit');
  };

  // Handle article editing
  const handleEditArticle = () => {
    if (selectedArticle) {
      setEditorMode('edit');
    }
  };

  // Handle article publishing
  const handlePublishArticle = async () => {
    if (selectedArticle) {
      try {
        const updatedArticle = await updateArticle(selectedArticle.id, {
          ...selectedArticle,
          status: 'published'
        });
        setSelectedArticle(updatedArticle);
      } catch (error) {
        console.error('Error publishing article:', error);
      }
    }
  };

  // Handle article deletion
  const handleDeleteArticle = async () => {
    if (selectedArticle && window.confirm(
      language === 'fr' 
        ? 'Êtes-vous sûr de vouloir supprimer cet article ?'
        : 'Are you sure you want to delete this article?'
    )) {
      try {
        await deleteArticle(selectedArticle.id);
        setSelectedArticle(null);
        setEditorMode('view');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  // Handle saving edited content
  const handleSaveContent = async () => {
    if (selectedArticle) {
      try {
        // Extract title from markdown (first h1)
        const titleMatch = editorContent.match(/^#\s+(.*)$/m);
        const newTitle = titleMatch ? titleMatch[1] : selectedArticle.title;
        
        // Extract excerpt (first paragraph)
        const excerptMatch = editorContent.match(/^(?!#)(.+)$/m);
        const newExcerpt = excerptMatch ? excerptMatch[1] : selectedArticle.excerpt;
        
        const updatedArticle = { 
          ...selectedArticle,
          title: newTitle,
          excerpt: newExcerpt,
          content: editorContent,
          read_time: Math.max(1, Math.ceil(editorContent.split(/\s+/).length / 200)) // Rough read time calculation
        };
        
        if (selectedArticle.id) {
          // Update existing article
          const saved = await updateArticle(selectedArticle.id, updatedArticle);
          setSelectedArticle(saved);
        } else {
          // Create new article
          const created = await createArticle(updatedArticle);
          setSelectedArticle(created);
        }
        
        setEditorMode('view');
      } catch (error) {
        console.error('Error saving article:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {language === 'fr' 
          ? 'Une erreur est survenue lors du chargement des articles.'
          : 'An error occurred while loading articles.'
        }
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-gray">
          {language === 'fr' ? 'Gestion des Articles' : 'Article Management'}
        </h1>
        
        <button
          onClick={handleNewArticle}
          className="btn btn-primary"
        >
          <Plus size={18} className="mr-2" />
          {language === 'fr' ? 'Nouvel Article' : 'New Article'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 overflow-hidden flex flex-col">
          {/* Search and Filters */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">{language === 'fr' ? 'Tous' : 'All'}</option>
                <option value="published">{language === 'fr' ? 'Publiés' : 'Published'}</option>
                <option value="draft">{language === 'fr' ? 'Brouillons' : 'Drafts'}</option>
              </select>
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Import/Export Buttons */}
          <div className="flex gap-2 mb-4">
            <button className="flex items-center justify-center w-1/2 py-2 border border-gray-300 rounded-md text-sm text-slate-gray hover:bg-gray-50">
              <Upload size={16} className="mr-2" />
              {language === 'fr' ? 'Importer' : 'Import'}
            </button>
            <button className="flex items-center justify-center w-1/2 py-2 border border-gray-300 rounded-md text-sm text-slate-gray hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              {language === 'fr' ? 'Exporter' : 'Export'}
            </button>
          </div>
          
          {/* Articles List */}
          <div className="overflow-y-auto flex-grow">
            {filteredArticles.length > 0 ? (
              <div className="space-y-2">
                {filteredArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedArticle?.id === article.id 
                        ? 'bg-teal bg-opacity-10 border-teal' 
                        : 'border-gray-200 hover:border-teal'
                    }`}
                  >
                    <div className="flex items-center">
                      <FileText size={18} className="text-gray-500 mr-3" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-slate-gray">{article.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            article.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status === 'published' 
                              ? (language === 'fr' ? 'Publié' : 'Published') 
                              : (language === 'fr' ? 'Brouillon' : 'Draft')
                            }
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(article.date).toLocaleDateString()} • {article.language === 'fr' ? 'Français' : 'English'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {language === 'fr' 
                  ? 'Aucun article trouvé' 
                  : 'No articles found'
                }
              </div>
            )}
          </div>
        </div>
        
        {/* Article Editor/Viewer */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 overflow-hidden lg:col-span-2 flex flex-col">
          {selectedArticle ? (
            <>
              {/* Article Controls */}
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-slate-gray">{selectedArticle.title}</h2>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                    <span className="mx-1">•</span>
                    <span>
                      {selectedArticle.status === 'published' 
                        ? (language === 'fr' ? 'Publié' : 'Published') 
                        : (language === 'fr' ? 'Brouillon' : 'Draft')
                      }
                    </span>
                    <span className="mx-1">•</span>
                    <span>{selectedArticle.language === 'fr' ? 'Français' : 'English'}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {editorMode === 'view' ? (
                    <>
                      <button
                        onClick={handleEditArticle}
                        className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-slate-gray hover:bg-gray-50"
                      >
                        <Edit size={16} className="mr-1" />
                        {language === 'fr' ? 'Modifier' : 'Edit'}
                      </button>
                      
                      {selectedArticle.status === 'draft' && (
                        <button
                          onClick={handlePublishArticle}
                          className="flex items-center justify-center px-3 py-1.5 bg-teal text-white rounded-md text-sm hover:bg-opacity-90"
                        >
                          {language === 'fr' ? 'Publier' : 'Publish'}
                        </button>
                      )}
                      
                      <button
                        onClick={handleDeleteArticle}
                        className="flex items-center justify-center px-3 py-1.5 border border-red-300 rounded-md text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} className="mr-1" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (!selectedArticle.id) {
                            setSelectedArticle(null);
                            setEditorMode('view');
                          } else {
                            setEditorContent(selectedArticle.content);
                            setEditorMode('view');
                          }
                        }}
                        className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-slate-gray hover:bg-gray-50"
                      >
                        {language === 'fr' ? 'Annuler' : 'Cancel'}
                      </button>
                      
                      <button
                        onClick={handleSaveContent}
                        className="flex items-center justify-center px-3 py-1.5 bg-teal text-white rounded-md text-sm hover:bg-opacity-90"
                      >
                        {language === 'fr' ? 'Enregistrer' : 'Save'}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="flex-grow overflow-y-auto border border-gray-200 rounded-md">
                {editorMode === 'view' ? (
                  <div className="p-6 prose max-w-none">
                    <Markdown>{selectedArticle.content}</Markdown>
                  </div>
                ) : (
                  <textarea
                    className="w-full h-full p-4 focus:outline-none font-mono text-sm"
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder={language === 'fr' ? "Commencez à écrire en markdown..." : "Start writing in markdown..."}
                  />
                )}
              </div>
              
              {/* Markdown Help (only in edit mode) */}
              {editorMode !== 'view' && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    {language === 'fr' ? 'Aide Markdown' : 'Markdown Help'}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                    <div># {language === 'fr' ? 'Titre' : 'Heading'}</div>
                    <div>**{language === 'fr' ? 'Gras' : 'Bold'}**</div>
                    <div>*{language === 'fr' ? 'Italique' : 'Italic'}*</div>
                    <div>[{language === 'fr' ? 'Lien' : 'Link'}](url)</div>
                    <div>1. {language === 'fr' ? 'Liste numérotée' : 'Numbered list'}</div>
                    <div>- {language === 'fr' ? 'Liste à puces' : 'Bullet list'}</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {language === 'fr' 
                ? 'Sélectionnez un article ou créez-en un nouveau' 
                : 'Select an article or create a new one'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminArticles;
