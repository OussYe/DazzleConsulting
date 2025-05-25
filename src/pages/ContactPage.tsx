import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/contact/ContactForm';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Contact details
  const contactDetails = [
    {
      icon: <Mail size={20} className="text-teal" />,
      title: language === 'fr' ? 'Email' : 'Email',
      details: 'contact@dazzleconsulting.fr',
    },
    {
      icon: <MapPin size={20} className="text-teal" />,
      title: language === 'fr' ? 'Adresse' : 'Address',
      details: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    },
    {
      icon: <Clock size={20} className="text-teal" />,
      title: language === 'fr' ? 'Horaires' : 'Hours',
      details: language === 'fr' 
        ? 'Lun-Ven: 8h - 18h | Sam: 10h - 14h' 
        : 'Mon-Fri: 8am - 6pm | Sat: 10am - 2pm',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="bg-slate-gray py-32 md:py-40">
        <div className="container-custom text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Prêt à transformer votre vision en réalité ? Notre équipe est à votre disposition pour répondre à toutes vos questions.'
              : 'Ready to transform your vision into reality? Our team is here to answer all your questions.'
            }
          </motion.p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-slate-gray mb-6"
              >
                {language === 'fr' ? 'Informations de contact' : 'Contact Information'}
              </motion.h2>
              
              <div className="space-y-6">
                {contactDetails.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="flex items-start p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="mr-4 p-2 bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-gray">{item.title}</h3>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Map */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 h-80 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2159256528925!2d2.2950943156744447!3d48.87059057928922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc49f6ee33b%3A0x4941d0f35b647c1!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
