import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simplified translations
const translations = {
  fr: {
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.references': 'Références',
    'nav.articles': 'Articles',
    'nav.contact': 'Contact',
    'nav.about.history': 'Histoire',
    'nav.about.team': 'Équipe',
    'nav.services.digital': 'Stratégie digitale',
    'nav.services.branding': 'Branding',
    'nav.services.advertising': 'Publicité',
    'hero.title': 'Solutions marketing innovantes',
    'hero.subtitle': 'Propulsez votre entreprise vers de nouveaux sommets',
    'hero.cta': 'Découvrir nos services',
    'services.title': 'Nos services',
    'services.digital.title': 'Stratégie digitale',
    'services.digital.desc': 'Optimisez votre présence en ligne avec nos stratégies sur mesure',
    'services.branding.title': 'Branding',
    'services.branding.desc': 'Créez une identité de marque mémorable qui résonne avec votre public',
    'services.advertising.title': 'Publicité',
    'services.advertising.desc': 'Campagnes publicitaires impactantes pour maximiser votre visibilité',
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Prêt à transformer votre vision en réalité ?',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email professionnel',
    'contact.form.service': 'Service souhaité',
    'contact.form.message': 'Votre message',
    'contact.form.submit': 'Envoyer',
    'footer.rights': 'Tous droits réservés',
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.references': 'References',
    'nav.articles': 'Articles',
    'nav.contact': 'Contact',
    'nav.about.history': 'History',
    'nav.about.team': 'Team',
    'nav.services.digital': 'Digital Strategy',
    'nav.services.branding': 'Branding',
    'nav.services.advertising': 'Advertising',
    'hero.title': 'Innovative Marketing Solutions',
    'hero.subtitle': 'Propel your business to new heights',
    'hero.cta': 'Discover our services',
    'services.title': 'Our Services',
    'services.digital.title': 'Digital Strategy',
    'services.digital.desc': 'Optimize your online presence with our tailored strategies',
    'services.branding.title': 'Branding',
    'services.branding.desc': 'Create a memorable brand identity that resonates with your audience',
    'services.advertising.title': 'Advertising',
    'services.advertising.desc': 'Impactful advertising campaigns to maximize your visibility',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to transform your vision into reality?',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Business Email',
    'contact.form.service': 'Desired Service',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Submit',
    'footer.rights': 'All rights reserved',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, default to 'fr'
    const storedLang = localStorage.getItem('dazzleLanguage');
    return (storedLang as Language) || 'fr';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('dazzleLanguage', language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    const langData = translations[language];
    return langData[key as keyof typeof langData] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
