'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simuleer een API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Een e-maillink openen als voorbeeld van functionaliteit
      const subject = encodeURIComponent(`Contact: ${formData.onderwerp}`);
      const body = encodeURIComponent(
        `Naam: ${formData.naam}\nE-mail: ${formData.email}\nTelefoonnummer: ${formData.telefoonnummer}\n\n${formData.bericht}`
      );
      window.open(`mailto:contact@it-uitzendbureau.nl?subject=${subject}&body=${body}`);

      setSubmitSuccess(true);
      // Reset het formulier
      setFormData({
        naam: '',
        email: '',
        telefoonnummer: '',
        onderwerp: 'algemeen',
        bericht: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
      messagePlaceholder: 'Waar kunnen we je mee helpen?'
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
      messagePlaceholder: 'How can we help you?'
    }
  };
  
  const t = translations[language];

  return (
    <div>
      {submitSuccess ? (
        <div className="text-center py-6">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t.successTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.successMessage}
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="text-blue-600 hover:underline"
          >
            {t.backToForm}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="naam" className="block text-sm font-medium mb-1">
                {t.name} *
              </label>
              <input
                id="naam"
                name="naam"
                type="text"
                required
                value={formData.naam}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t.email} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="onderwerp" className="block text-sm font-medium mb-1">
                {t.subject} *
              </label>
              <select
                id="onderwerp"
                name="onderwerp"
                required
                value={formData.onderwerp}
                onChange={handleChange}
                className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              >
                <option value="algemeen">{t.subjectGeneral}</option>
                <option value="project">{t.subjectProject}</option>
                <option value="support">{t.subjectSupport}</option>
                <option value="anders">{t.subjectOther}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bericht" className="block text-sm font-medium mb-1">
              {t.message} *
            </label>
            <textarea
              id="bericht"
              name="bericht"
              required
              rows={6}
              value={formData.bericht}
              onChange={handleChange}
              placeholder={t.messagePlaceholder}
              className="form-textarea w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-6 py-3 w-full md:w-auto rounded font-medium"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 