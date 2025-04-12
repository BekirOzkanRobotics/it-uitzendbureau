'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function NieuwsbriefForm() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    kandidaat: true,
    werkgever: false,
    nieuws: true
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedTypes(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Controleer of er minimaal één type is geselecteerd
    if (!Object.values(selectedTypes).some(value => value)) {
      setSubmitError(language === 'nl' 
        ? 'Selecteer minimaal één type nieuwsbrief'
        : 'Select at least one newsletter type');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simuleren van een API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hier zou normaal gesproken een API call worden gedaan
      console.log('Nieuwsbrief aanmelding voor:', { 
        email, 
        types: Object.entries(selectedTypes)
          .filter(([_, selected]) => selected)
          .map(([type]) => type) 
      });
      
      // Toon success en reset form
      setSubmitSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(language === 'nl'
        ? 'Er is een fout opgetreden bij het aanmelden. Probeer het later opnieuw.'
        : 'An error occurred while subscribing. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    nl: {
      title: 'Blijf op de hoogte',
      success: 'Aanmelding geslaagd!',
      successMessage: 'Je bent nu aangemeld voor onze nieuwsbrief.',
      resubscribe: 'Opnieuw aanmelden',
      email: 'E-mailadres *',
      emailPlaceholder: 'jouw@email.nl',
      interests: 'Ik ben geïnteresseerd in:',
      candidate: 'Vacatures en tips voor kandidaten',
      employer: 'Diensten en tips voor werkgevers',
      news: 'IT-markt nieuws en updates',
      submit: 'Aanmelden',
      submitting: 'Even geduld...',
      disclaimer: 'Je kunt je altijd uitschrijven via de link in elke nieuwsbrief. We gaan zorgvuldig om met je gegevens volgens ons',
      privacy: 'privacybeleid'
    },
    en: {
      title: 'Stay up to date',
      success: 'Successfully subscribed!',
      successMessage: 'You are now subscribed to our newsletter.',
      resubscribe: 'Subscribe again',
      email: 'Email address *',
      emailPlaceholder: 'your@email.com',
      interests: 'I am interested in:',
      candidate: 'Jobs and tips for candidates',
      employer: 'Services and tips for employers',
      news: 'IT market news and updates',
      submit: 'Subscribe',
      submitting: 'Please wait...',
      disclaimer: 'You can always unsubscribe via the link in each newsletter. We handle your data carefully according to our',
      privacy: 'privacy policy'
    }
  };
  
  const t = translations[language];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      {submitSuccess ? (
        <div className="text-center py-4">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t.success}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t.successMessage}
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-4 text-blue-600 hover:underline"
          >
            {t.resubscribe}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t.title}
          </h3>
          
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {submitError}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={handleEmailChange}
              className="form-input w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <p className="block text-sm font-medium">{t.interests}</p>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="kandidaat"
                name="kandidaat"
                checked={selectedTypes.kandidaat}
                onChange={handleTypeChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="kandidaat" className="ml-2 text-sm">
                {t.candidate}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="werkgever"
                name="werkgever"
                checked={selectedTypes.werkgever}
                onChange={handleTypeChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="werkgever" className="ml-2 text-sm">
                {t.employer}
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="nieuws"
                name="nieuws"
                checked={selectedTypes.nieuws}
                onChange={handleTypeChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="nieuws" className="ml-2 text-sm">
                {t.news}
              </label>
            </div>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-2"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            {t.disclaimer}
            <a href="/privacy" className="text-blue-600 hover:underline ml-1">
              {t.privacy}
            </a>.
          </p>
        </form>
      )}
    </div>
  );
} 