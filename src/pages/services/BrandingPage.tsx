import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Image, MessageSquare, PenTool, Share2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const BrandingPage: React.FC = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: <Palette className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Identité visuelle',
        en: 'Visual Identity'
      },
      description: {
        fr: 'Création d\'une identité de marque unique et mémorable.',
        en: 'Creation of a unique and memorable brand identity.'
      }
    },
    {
      icon: <Layout className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Design de marque',
        en: 'Brand Design'
      },
      description: {
        fr: 'Conception d\'éléments visuels cohérents avec votre image.',
        en: 'Design of visual elements consistent with your image.'
      }
    },
    {
      icon: <Image className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Direction artistique',
        en: 'Art Direction'
      },
      description: {
        fr: 'Définition de l\'orientation créative de votre marque.',
        en: 'Definition of your brand\'s creative direction.'
      }
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Ton de voix',
        en: 'Voice & Tone'
      },
      description: {
        fr: 'Développement d\'une voix de marque distinctive.',
        en: 'Development of a distinctive brand voice.'
      }
    },
    {
      icon: <PenTool className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Design d\'emballage',
        en: 'Packaging Design'
      },
      description: {
        fr: 'Création d\'emballages qui captent l\'attention.',
        en: 'Creation of attention-grabbing packaging.'
      }
    },
    {
      icon: <Share2 className="w-8 h-8 text-teal" />,
      title: {
        fr: 'Stratégie de marque',
        en: 'Brand Strategy'
      },
      description: {
        fr: 'Positionnement stratégique de votre marque sur le marché.',
        en: 'Strategic positioning of your brand in the market.'
      }
    }
  ];

  const portfolioItems = [
    {
      image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: {
        fr: 'Refonte de marque pour Mode Élégante',
        en: 'Brand redesign for Elegant Fashion'
      }
    },
    {
      image: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: {
        fr: 'Identité visuelle pour Tech Innovate',
        en: 'Visual identity for Tech Innovate'
      }
    },
    {
      image: 'https://images.pexels.com/photos/5709667/pexels-photo-5709667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: {
        fr: 'Design d\'emballage pour Bio Nature',
        en: 'Packaging design for Bio Nature'
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
            {language === 'fr' ? 'Branding' : 'Branding'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Créez une marque forte qui résonne avec votre audience.'
              : 'Create a strong brand that resonates with your audience.'
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

      {/* Portfolio Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-gray text-center mb-12"
          >
            {language === 'fr' ? 'Notre Portfolio' : 'Our Portfolio'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold">
                        {item.title[language]}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandingPage;
