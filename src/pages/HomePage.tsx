import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, TrendingUp, Palette, Megaphone, ChevronRight } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import { useArticleStore } from '../stores/articleStore';
import ArticleCard from '../components/articles/ArticleCard';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { articles, fetchArticles } = useArticleStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation triggers
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [referencesRef, referencesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [articlesRef, articlesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Fetch featured articles
  useEffect(() => {
    fetchArticles({ published: true });
  }, [fetchArticles]);
  
  // Featured references
  const featuredReferences = [
    {
      title: 'NexGen Brand Identity',
      client: 'NexGen Technologies',
      image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Branding'
    },
    {
      title: 'Eco Market Campaign',
      client: 'Sustainable Goods Co.',
      image: 'https://images.pexels.com/photos/7310201/pexels-photo-7310201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Digital Strategy'
    },
    {
      title: 'Financial Services Website',
      client: 'AlphaBank',
      image: 'https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Web Development'
    }
  ];

  // Slide data for hero carousel
  const slides = [
    {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: t('services.digital.title'),
      subtitle: t('services.digital.desc'),
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: t('services.branding.title'),
      subtitle: t('services.branding.desc'),
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Service cards data
  const services = [
    {
      id: 'digital',
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
      icon: <TrendingUp size={32} className="text-teal" />,
      path: '/services/digital-strategy',
    },
    {
      id: 'branding',
      title: t('services.branding.title'),
      description: t('services.branding.desc'),
      icon: <Palette size={32} className="text-teal" />,
      path: '/services/branding',
    },
    {
      id: 'advertising',
      title: t('services.advertising.title'),
      description: t('services.advertising.desc'),
      icon: <Megaphone size={32} className="text-teal" />,
      path: '/services/advertising',
    },
  ];

  // Process steps data
  const processSteps = [
    {
      number: 1,
      title: 'Discovery',
      description: 'Comprehensive analysis of your brand, audience and market position',
    },
    {
      number: 2,
      title: 'Strategy',
      description: 'Develop a tailored plan with clear objectives and measurable outcomes',
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'Execute with precision using our expertise and cutting-edge tools',
    },
    {
      number: 4,
      title: 'Optimization',
      description: 'Continuous improvement based on performance analytics and feedback',
    },
  ];

  // Carousel auto-advance
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center"
      >
        {/* Background Image Carousel */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-slate-gray bg-opacity-60"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content */}
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8">
              {slides[currentSlide].subtitle}
            </p>
            <Link
              to="/services"
              className="btn btn-primary inline-flex items-center"
            >
              {t('hero.cta')}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>

          {/* Carousel Navigation Dots */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-teal' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 bg-off-white"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-gray">
              {t('services.title')}
            </h2>
            <div className="w-24 h-1 bg-teal mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="service-card group h-full flex flex-col">
                  <div className="p-4 mb-4 bg-gray-100 rounded-xl inline-block group-hover:bg-teal transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-slate-gray">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link
                    to={service.path}
                    className="inline-flex items-center text-teal hover:underline mt-auto"
                  >
                    En savoir plus
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        ref={processRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-gray">
              Notre Approche
            </h2>
            <div className="w-24 h-1 bg-teal mx-auto"></div>
          </motion.div>

          <div className="relative">
            {/* Process Steps Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 top-0"></div>
            
            <div className="space-y-12 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:w-5/12">
                    <div className={`p-6 bg-off-white rounded-xl shadow-sm ${
                      index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                    }`}>
                      <h3 className="text-2xl font-semibold mb-2 text-slate-gray flex items-center">
                        <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center mr-3 text-sm">
                          {step.number}
                        </span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-2/12 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section 
        ref={referencesRef}
        className="py-20 bg-off-white"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={referencesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-gray mb-4">
              {language === 'fr' ? 'Nos Réalisations' : 'Our Work'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Découvrez quelques-uns de nos projets les plus récents'
                : 'Explore some of our most recent projects'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReferences.map((reference, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={referencesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                  <img
                    src={reference.image}
                    alt={reference.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-sm font-medium text-teal">{reference.category}</p>
                      <h3 className="text-xl font-semibold text-white">{reference.title}</h3>
                      <p className="text-white/80">{reference.client}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/references"
              className="btn btn-outline inline-flex items-center"
            >
              {language === 'fr' ? 'Voir tous nos projets' : 'View all projects'}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        ref={articlesRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-gray mb-4">
              {language === 'fr' ? 'Derniers Articles' : 'Latest Articles'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Découvrez nos dernières réflexions sur le marketing digital'
                : 'Explore our latest thoughts on digital marketing'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, index) => (
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

          <div className="text-center mt-12">
            <Link
              to="/articles"
              className="btn btn-outline inline-flex items-center"
            >
              {language === 'fr' ? 'Voir tous les articles' : 'View all articles'}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-gray text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à transformer votre vision en réalité?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nos solutions marketing peuvent propulser votre entreprise.
          </p>
          <Link
            to="/contact"
            className="btn bg-teal text-white hover:bg-opacity-90"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
