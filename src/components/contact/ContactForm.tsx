import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle, Paperclip } from 'lucide-react';

import { useLanguage } from '../../contexts/LanguageContext';

// Form field types
interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  attachment?: FileList;
}

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // Available services
  const services = [
    { id: 'digital-strategy', label: t('nav.services.digital') },
    { id: 'branding', label: t('nav.services.branding') },
    { id: 'advertising', label: t('nav.services.advertising') },
  ];

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
      setFileName(null);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold text-slate-gray mb-6">
        {t('contact.title')}
      </h3>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md flex items-center">
          <CheckCircle size={20} className="mr-2 flex-shrink-0" />
          <p>
            {language === 'fr' 
              ? "Votre message a été envoyé avec succès ! Nous vous contacterons sous peu."
              : "Your message has been sent successfully! We will contact you shortly."
            }
          </p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-center">
          <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
          <p>
            {language === 'fr' 
              ? "Une erreur s'est produite. Veuillez réessayer plus tard."
              : "An error occurred. Please try again later."
            }
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name field */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              {t('contact.form.name')} *
            </label>
            <input
              id="name"
              type="text"
              className={`input-field ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {language === 'fr' ? "Le nom est requis" : "Name is required"}
              </p>
            )}
          </div>
          
          {/* Email field */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              {t('contact.form.email')} *
            </label>
            <input
              id="email"
              type="email"
              className={`input-field ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
              {...register('email', { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
            />
            {errors.email?.type === 'required' && (
              <p className="mt-1 text-sm text-red-500">
                {language === 'fr' ? "L'email est requis" : "Email is required"}
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="mt-1 text-sm text-red-500">
                {language === 'fr' ? "Email invalide" : "Invalid email address"}
              </p>
            )}
          </div>
        </div>
        
        {/* Service selection */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="service">
            {t('contact.form.service')} *
          </label>
          <select
            id="service"
            className={`input-field ${errors.service ? 'border-red-500 bg-red-50' : ''}`}
            {...register('service', { required: true })}
          >
            <option value="">
              {language === 'fr' ? "-- Sélectionnez un service --" : "-- Select a service --"}
            </option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-500">
              {language === 'fr' ? "Veuillez sélectionner un service" : "Please select a service"}
            </p>
          )}
        </div>
        
        {/* Message field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            {t('contact.form.message')} *
          </label>
          <textarea
            id="message"
            rows={5}
            className={`input-field ${errors.message ? 'border-red-500 bg-red-50' : ''}`}
            {...register('message', { required: true })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {language === 'fr' ? "Le message est requis" : "Message is required"}
            </p>
          )}
        </div>
                
        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary w-full flex items-center justify-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'fr' ? "Envoi en cours..." : "Sending..."}
            </>
          ) : (
            <>
              {t('contact.form.submit')}
              <Send size={18} className="ml-2" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
