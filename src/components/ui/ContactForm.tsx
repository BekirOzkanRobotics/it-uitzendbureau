'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { trackEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoonnummer: '',
    onderwerp: 'algemeen',
    bericht: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formStep, setFormStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Animatievarianten voor formulier elementen
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Reset errors wanneer gebruiker een veld aanpast
  useEffect(() => {
    setValidationErrors({});
  }, [formData]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.naam.trim()) {
      errors.naam = language === 'nl' ? 'Naam is verplicht' : 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = language === 'nl' ? 'Email is verplicht' : 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = language === 'nl' ? 'Ongeldig emailadres' : 'Invalid email format';
    }
    
    if (formStep === 1 && !formData.bericht.trim()) {
      errors.bericht = language === 'nl' ? 'Bericht is verplicht' : 'Message is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Verwijder error voor dit veld
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const goToNextStep = () => {
    if (validateForm()) {
      setFormStep(1);
    }
  };

  const goToPreviousStep = () => {
    setFormStep(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Track formulier versturen gestart event
      trackEvent('contact_form_submit_start', {
        subject: formData.onderwerp,
        language: language
      });

      // Opslaan van het contactbericht in Firestore
      const docRef = await addDoc(collection(db, 'contactberichten'), {
        ...formData,
        taal: language,
        tijdstempel: serverTimestamp(),
      });

      // Track succesvol versturen event
      trackEvent('contact_form_submit_success', {
        subject: formData.onderwerp,
        language: language,
        form_id: docRef.id
      });

      // Toon success en reset form
      setSubmitSuccess(true);
      // Reset het formulier
      setFormData({
        naam: '',
        email: '',
        telefoonnummer: '',
        onderwerp: 'algemeen',
        bericht: ''
      });
      setFormStep(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Track fout bij versturen event
      trackEvent('contact_form_submit_error', {
        error_message: error instanceof Error ? error.message : 'Unknown error',
        subject: formData.onderwerp,
        language: language
      });

      setSubmitError(
        language === 'nl'
          ? 'Er is een fout opgetreden bij het verzenden van je bericht. Probeer het later opnieuw.'
          : 'An error occurred while submitting your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    nl: {
      formTitle: 'Stuur ons een bericht',
      name: 'Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      subject: 'Onderwerp',
      subjectGeneral: 'Algemene vraag',
      subjectProject: 'Projectvoorstel',
      subjectSupport: 'Ondersteuning',
      subjectOther: 'Anders',
      message: 'Bericht',
      submit: 'Versturen',
      submitting: 'Verzenden...',
      successTitle: 'Bedankt voor je bericht!',
      successMessage: 'We nemen zo snel mogelijk contact met je op.',
      backToForm: 'Terug naar het formulier',
      namePlaceholder: 'Jouw naam',
      emailPlaceholder: 'jouw@email.nl',
      phonePlaceholder: 'Je telefoonnummer (optioneel)',
      messagePlaceholder: 'Waar kunnen we je mee helpen?',
      next: 'Volgende',
      back: 'Terug',
      step1: 'Jouw gegevens',
      step2: 'Je bericht'
    },
    en: {
      formTitle: 'Send us a message',
      name: 'Name',
      email: 'Email address',
      phone: 'Phone number',
      subject: 'Subject',
      subjectGeneral: 'General inquiry',
      subjectProject: 'Project proposal',
      subjectSupport: 'Support',
      subjectOther: 'Other',
      message: 'Message',
      submit: 'Submit',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your message!',
      successMessage: 'We will get back to you as soon as possible.',
      backToForm: 'Back to the form',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: 'Your phone number (optional)',
      messagePlaceholder: 'How can we help you?',
      next: 'Next',
      back: 'Back',
      step1: 'Your details',
      step2: 'Your message'
    }
  };
  
  const t = translations[language];

  // Progress steps
  const steps = [t.step1, t.step2];
  
  const formProgress = () => (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <div className={`h-1 w-16 mx-1 ${
                index <= formStep 
                  ? 'bg-blue-600 dark:bg-blue-500' 
                  : 'bg-gray-300 dark:bg-gray-700'
              }`} />
            )}
            <div className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center h-10 w-10 rounded-full 
                text-sm font-medium transition-all duration-300
                ${
                  index === formStep
                    ? 'bg-blue-600 text-white scale-110' 
                    : index < formStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}>
                {index + 1}
              </div>
              <div className={`
                text-xs mt-1 text-center w-16 truncate
                ${
                  index === formStep
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {step}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {submitSuccess ? (
        <motion.div 
          className="text-center py-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t.successTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.successMessage}
          </p>
          <motion.button
            onClick={() => setSubmitSuccess(false)}
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.backToForm}
          </motion.button>
        </motion.div>
      ) : (
        <>
          {formProgress()}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <motion.div 
                className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {submitError}
              </motion.div>
            )}

            {formStep === 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="naam" className="block text-sm font-medium mb-1">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="naam"
                      name="naam"
                      type="text"
                      required
                      value={formData.naam}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                        validationErrors.naam 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800'
                      }`}
                    />
                    {validationErrors.naam && (
                      <p className="mt-1 text-red-500 text-xs">{validationErrors.naam}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      {t.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                        validationErrors.email 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-red-500 text-xs">{validationErrors.email}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefoonnummer" className="block text-sm font-medium mb-1">
                      {t.phone}
                    </label>
                    <input
                      id="telefoonnummer"
                      name="telefoonnummer"
                      type="tel"
                      value={formData.telefoonnummer}
                      onChange={handleChange}
                      placeholder={t.phonePlaceholder}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="onderwerp" className="block text-sm font-medium mb-1">
                      {t.subject} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="onderwerp"
                      name="onderwerp"
                      required
                      value={formData.onderwerp}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-800"
                    >
                      <option value="algemeen">{t.subjectGeneral}</option>
                      <option value="project">{t.subjectProject}</option>
                      <option value="support">{t.subjectSupport}</option>
                      <option value="anders">{t.subjectOther}</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                  <motion.button
                    type="button"
                    onClick={goToNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.next}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {formStep === 1 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="bericht" className="block text-sm font-medium mb-1">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    required
                    rows={6}
                    value={formData.bericht}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      validationErrors.bericht 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-800'
                    }`}
                  ></textarea>
                  {validationErrors.bericht && (
                    <p className="mt-1 text-red-500 text-xs">{validationErrors.bericht}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={goToPreviousStep}
                    className="border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.back}
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </form>
        </>
      )}
    </div>
  );
} 