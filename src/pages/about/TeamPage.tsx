import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Randa',
    role: {
      fr: 'Directrice Générale',
      en: 'Chief Executive Officer'
    },
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: {
      fr: 'Avec plus de 5 ans d\'expérience dans le marketing digital, Randa dirige l\'agence avec passion et innovation.',
      en: 'With over 5 years of experience in digital marketing, Sophie leads the agency with passion and innovation.'
    },
    social: {
      email: 'randa.latreche@dazzleconsulting.fr',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: {
      fr: 'Directeur Créatif',
      en: 'Creative Director'
    },
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: {
      fr: 'Expert en design et stratégie de marque, Thomas apporte une vision créative unique à chaque projet.',
      en: 'Expert in design and brand strategy, Thomas brings a unique creative vision to each project.'
    },
    social: {
      email: 'thomas@dazzleconsulting.com',
      linkedin: '#',
      twitter: '#'
    }
  }
];

const TeamPage: React.FC = () => {
  const { language } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Des experts passionnés qui donnent vie à vos projets digitaux.'
              : 'Passionate experts bringing your digital projects to life.'
            }
          </motion.p>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Member Image */}
                  <div className="md:w-2/5">
                    <div className="aspect-square">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="md:w-3/5 p-6 flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-slate-gray mb-1">
                        {member.name}
                      </h3>
                      <p className="text-teal font-medium mb-4">
                        {member.role[language]}
                      </p>
                      <p className="text-gray-600 mb-6">
                        {member.bio[language]}
                      </p>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex space-x-4">
                      <a 
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-teal transition-colors"
                        aria-label="Email"
                      >
                        <Mail size={20} />
                      </a>
                      <a 
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-teal transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-teal transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <div className="mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-slate-gray text-center mb-12"
            >
              {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-gray mb-3">
                  {language === 'fr' ? 'Innovation' : 'Innovation'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Nous repoussons constamment les limites pour créer des solutions innovantes.'
                    : 'We constantly push boundaries to create innovative solutions.'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-gray mb-3">
                  {language === 'fr' ? 'Excellence' : 'Excellence'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Nous visons l\'excellence dans chaque aspect de notre travail.'
                    : 'We strive for excellence in every aspect of our work.'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-gray mb-3">
                  {language === 'fr' ? 'Collaboration' : 'Collaboration'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Le travail d\'équipe est au cœur de notre approche.'
                    : 'Teamwork is at the heart of our approach.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
