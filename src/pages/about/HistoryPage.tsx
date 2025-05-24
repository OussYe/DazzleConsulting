import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const HistoryPage: React.FC = () => {
  const { language } = useLanguage();

  const milestones = [
    {
      year: '2024',
      title: {
        fr: 'La naissance de DazzleConsulting',
        en: 'The birth of DazzleConsulting'
      },
      description: {
        fr: 'Fondée avec la vision de révolutionner le marketing digital, notre agence démarre son aventure.',
        en: 'Founded with a vision to revolutionize digital marketing, our agency begins its journey.'
      },
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2024',
      title: {
        fr: 'Expansion et innovation',
        en: 'Expansion and innovation'
      },
      description: {
        fr: 'Ouverture de nouveaux bureaux et lancement de notre département de stratégie digitale.',
        en: 'Opening of new offices and launch of our digital strategy department.'
      },
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2025',
      title: {
        fr: 'Adaptation et résilience',
        en: 'Adaptation and resilience'
      },
      description: {
        fr: 'Transformation de nos services pour répondre aux nouveaux défis du marché digital.',
        en: 'Transformation of our services to meet new digital market challenges.'
      },
      image: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
            {language === 'fr' ? 'Notre Histoire' : 'Our History'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Découvrez comment DazzleConsulting est devenue une référence dans le marketing digital.'
              : 'Discover how DazzleConsulting became a reference in digital marketing.'
            }
          </motion.p>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

            {/* Milestones */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="w-1/2 px-8">
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}>
                      <img
                        src={milestone.image}
                        alt={milestone.title[language]}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <span className="text-teal font-bold text-xl">
                          {milestone.year}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-gray mt-2 mb-3">
                          {milestone.title[language]}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Point */}
                  <div className="w-8 h-8 bg-teal rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Spacer */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="mt-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-slate-gray mb-6"
            >
              {language === 'fr' ? 'Notre Vision' : 'Our Vision'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {language === 'fr'
                ? 'Notre vision est de continuer à innover et à repousser les limites du marketing digital, en créant des expériences uniques qui connectent les marques à leur audience.'
                : 'Our vision is to continue innovating and pushing the boundaries of digital marketing, creating unique experiences that connect brands with their audience.'
              }
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryPage;
