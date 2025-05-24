import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DigitalPage: React.FC = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Search className="w-8 h-8 text-teal" />,
      title: {
        fr: 'SEO & SEM',
        en: 'SEO & SEM'
      },
      description: {
        fr: 'Optimisation pour les moteurs de recherche et gestion des campagnes publicitaires.',
        en: 'Search engine optimization and advertising campaign management.'
      }
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Analyse de données',
        en: 'Data Analytics'
      },
      description: {
        fr: 'Analyse approfondie des données pour des décisions marketing éclairées.',
        en: 'In-depth data analysis for informed marketing decisions.'
      }
    },
    {
      icon: <Target className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Marketing de contenu',
        en: 'Content Marketing'
      },
      description: {
        fr: 'Création de contenu engageant qui résonne avec votre audience.',
        en: 'Creating engaging content that resonates with your audience.'
      }
    },
    {
      icon: <Users className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Médias sociaux',
        en: 'Social Media'
      },
      description: {
        fr: 'Gestion stratégique de vos présences sur les réseaux sociaux.',
        en: 'Strategic management of your social media presence.'
      }
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Innovation digitale',
        en: 'Digital Innovation'
      },
      description: {
        fr: 'Solutions innovantes pour votre transformation digitale.',
        en: 'Innovative solutions for your digital transformation.'
      }
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Growth Marketing',
        en: 'Growth Marketing'
      },
      description: {
        fr: 'Stratégies de croissance basées sur les données et l\'expérimentation.',
        en: 'Data-driven growth strategies and experimentation.'
      }
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-slate-gray py-32 md:py-40">
        <div className="container-custom text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {language === 'fr' ? 'Stratégie Digitale' : 'Digital Strategy'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Des solutions digitales innovantes pour propulser votre croissance.'
              : 'Innovative digital solutions to drive your growth.'
            }
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-gray mb-3">
                  {service.title[language]}
                </h3>
                <p className="text-gray-600">
                  {service.description[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-gray text-center mb-12"
          >
            {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-[21px] top-0 h-full w-[2px] bg-gray-200"></div>
              
              {['Audit', 'Stratégie', 'Implémentation', 'Optimisation'].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex items-start mb-8 last:mb-0"
                >
                  <div className="absolute left-0 w-[44px] h-[44px] bg-teal rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-slate-gray mb-2">{step}</h3>
                    <p className="text-gray-600">
                      {language === 'fr'
                        ? 'Description détaillée de l\'étape et de son importance dans le processus.'
                        : 'Detailed description of the step and its importance in the process.'
                      }
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalPage;
