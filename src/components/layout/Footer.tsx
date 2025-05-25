import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

import { useLanguage } from '../../contexts/LanguageContext';
import { useMenu } from '../../contexts/MenuContext';
import Logo from '../shared/Logo';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { getMenuTree } = useMenu();
  
  const menuTree = getMenuTree();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-gray text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="bg-white rounded-md p-1" />
              <span className="ml-2 text-xl font-medium">DazzleConsulting</span>
            </div>
            <p className="mb-6 text-gray-300">
              {language === 'fr' 
                ? "Solutions marketing innovantes pour propulser votre entreprise vers de nouveaux sommets."
                : "Innovative marketing solutions to propel your business to new heights."
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-teal pb-2">
              {language === 'fr' ? 'Liens Rapides' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {menuTree.map(item => (
                <li key={item.id}>
                  <Link to={item.path} className="text-gray-300 hover:text-white transition-colors">
                    {item.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-teal pb-2">
              {language === 'fr' ? 'Nos Services' : 'Our Services'}
            </h3>
            <ul className="space-y-2">
              {menuTree
                .find(item => item.id === 'services')?.children
                ?.map(service => (
                  <li key={service.id}>
                    <Link to={service.path} className="text-gray-300 hover:text-white transition-colors">
                      {service.label[language]}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-teal pb-2">
              {language === 'fr' ? 'Contact' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="flex-shrink-0 mr-2 text-teal" />
                <span className="text-gray-300">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="flex-shrink-0 mr-2 text-teal" />
                <span className="text-gray-300">contact@dazzleconsulting.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} DazzleConsulting. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
