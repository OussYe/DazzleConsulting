import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../../contexts/LanguageContext';
import { useMenu } from '../../contexts/MenuContext';
import Logo from '../shared/Logo';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { getMenuTree } = useMenu();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const menuTree = getMenuTree();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setIsNavigating(false);
    window.scrollTo(0, 0);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleNavigation = () => {
    setIsNavigating(true);
    window.scrollTo(0, 0);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'header-scrolled py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo className="bg-white rounded-md p-1" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuTree.map((item) => (
            <div 
              key={item.id} 
              className="relative group"
              onMouseEnter={() => !isNavigating && setOpenDropdown(item.id)}
              onMouseLeave={() => !isNavigating && setOpenDropdown(null)}
            >
              {item.children ? (
                <div className="flex items-center">
                  <button 
                    className={`nav-link flex items-center ${
                      location.pathname.startsWith(item.path) ? 'active' : ''
                    }`}
                  >
                    <span>{item.label[language]}</span>
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${
                      openDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === item.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className="dropdown-link"
                            onClick={handleNavigation}
                          >
                            <span>{child.label[language]}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={handleNavigation}
                >
                  {item.label[language]}
                </Link>
              )}
            </div>
          ))}
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="nav-link flex items-center"
          >
            <Globe size={16} className="mr-1" />
            <span className="text-sm uppercase">{language}</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 transition-transform duration-300 hover:scale-110" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-gray shadow-lg"
          >
            <div className="container-custom py-4">
              {menuTree.map((item) => (
                <div key={item.id} className="py-2">
                  {item.children ? (
                    <div>
                      <button 
                        className="mobile-nav-link flex items-center justify-between w-full"
                        onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                      >
                        {item.label[language]}
                        <ChevronDown size={16} 
                          className={`transition-transform duration-300 ${
                            openDropdown === item.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mobile-dropdown"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.id}
                                to={child.path}
                                className="mobile-nav-link"
                                onClick={handleNavigation}
                              >
                                {child.label[language]}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="mobile-nav-link"
                      onClick={handleNavigation}
                    >
                      {item.label[language]}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Language Switcher */}
              <button 
                onClick={toggleLanguage}
                className="mobile-nav-link flex items-center"
              >
                <Globe size={16} className="mr-2" />
                {language === 'fr' ? 'Switch to English' : 'Passer au Français'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
