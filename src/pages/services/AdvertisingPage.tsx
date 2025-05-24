import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart2, Users, Globe, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdvertisingPage: React.FC = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Target className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Publicité ciblée',
        en: 'Targeted Advertising'
      },
      description: {
        fr: 'Campagnes publicitaires précisément ciblées pour votre audience.',
        en: 'Precisely targeted advertising campaigns for your audience.'
      }
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Analyse de performance',
        en: 'Performance Analysis'
      },
      description: {
        fr: 'Suivi et optimisation continue de vos campagnes.',
        en: 'Continuous monitoring and optimization of your campaigns.'
      }
    },
    {
      icon: <Users className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Marketing d\'influence',
        en: 'Influencer Marketing'
      },
      description: {
        fr: 'Collaboration avec des influenceurs pertinents pour votre marque.',
        en: 'Collaboration with relevant influencers for your brand.'
      }
    },
    {
      icon: <Globe className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Publicité programmatique',
        en: 'Programmatic Advertising'
      },
      description: {
        fr: 'Automatisation et optimisation de vos achats média.',
        en: 'Automation and optimization of your media buying.'
      }
    },
    {
      icon: <PieChart className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Attribution marketing',
        en: 'Marketing Attribution'
      },
      description: {
        fr: 'Mesure précise de l\'impact de chaque canal.',
        en: 'Precise measurement of each channel\'s impact.'
      }
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Optimisation ROI',
        en: 'ROI Optimization'
      },
      description: {
        fr: 'Maximisation du retour sur investissement publicitaire.',
        en: 'Maximizing advertising return on investment.'
      }
    }
  ];

  const stats = [
    {
      value: '250+',
      label: {
        fr: 'Campagnes réussies',
        en: 'Successful campaigns'
      }
    },
    {
      value: '45M+',
      label: {
        fr: 'Impressions générées',
        en: 'Impressions generated'
      }
    },
    {
      value: '3.2x',
      label: {
        fr: 'ROI moyen',
        en: 'Average ROI'
      }
    },
    {
      value: '98%',
      label: {
        fr: 'Clients satisfaits',
        en: 'Satisfied clients'
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
            {language === 'fr' ? 'Publicité' : 'Advertising'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Des campagnes publicitaires performantes qui génèrent des résultats.'
              : 'High-performing advertising campaigns that generate results.'
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-gray text-center mb-12"
          >
            {language === 'fr' ? 'Nos Résultats' : 'Our Results'}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label[language]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-gray">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {language === 'fr'
                ? 'Prêt à lancer votre prochaine campagne ?'
                : 'Ready to launch your next campaign?'
              }
            </h2>
            <p className="text-gray-300 mb-8">
              {language ===   'fr'
                ? 'Contactez-nous pour discuter de vos objectifs publicitaires.'
                : 'Contact us to discuss your advertising goals.'
              }
            </p>
            <button className="btn btn-primary">
              {language === 'fr' ? 'Commencer maintenant' : 'Get started now'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisingPage;
