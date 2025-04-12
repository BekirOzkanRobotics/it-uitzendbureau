'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function OpdrachtForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    bedrijfsnaam: '',
    contactpersoon: '',
    email: '',
    telefoonnummer: '',
    functietitel: '',
    opdrachtType: 'fulltime',
    locatie: 'remote',
    werkervaring: '1-3',
    beschrijving: '',
    budget: '',
    startdatum: '',
    duur: '3-6'
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
      // Opslaan van de opdracht in Firestore
      await addDoc(collection(db, 'opdrachten'), {
        ...formData,
        taal: language,
        tijdstempel: serverTimestamp(),
        status: 'nieuw'
      });
      
      // Formulier succesvol verzonden
      setSubmitSuccess(true);
      
      // Reset het formulier
      setFormData({
        bedrijfsnaam: '',
        contactpersoon: '',
        email: '',
        telefoonnummer: '',
        functietitel: '',
        opdrachtType: 'fulltime',
        locatie: 'remote',
        werkervaring: '1-3',
        beschrijving: '',
        budget: '',
        startdatum: '',
        duur: '3-6'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        language === 'nl'
          ? 'Er is een fout opgetreden bij het verzenden van je opdracht. Probeer het later opnieuw of neem telefonisch contact met ons op.'
          : 'An error occurred while submitting your job. Please try again later or contact us by phone.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    nl: {
      companyName: 'Bedrijfsnaam',
      contactPerson: 'Contactpersoon',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      jobTitle: 'Functietitel',
      jobType: 'Type opdracht',
      fullTime: 'Fulltime',
      partTime: 'Parttime',
      project: 'Project',
      location: 'Locatie',
      remote: 'Volledig remote',
      hybrid: 'Hybride',
      onsite: 'Op locatie',
      experience: 'Gewenste werkervaring',
      exp03: '0-1 jaar',
      exp13: '1-3 jaar',
      exp35: '3-5 jaar',
      exp5plus: '5+ jaar',
      description: 'Opdracht beschrijving',
      budget: 'Budget (optioneel)',
      startDate: 'Gewenste startdatum',
      duration: 'Verwachte duur',
      dur03: '0-3 maanden',
      dur36: '3-6 maanden',
      dur612: '6-12 maanden',
      dur12plus: '12+ maanden',
      submit: 'Opdracht plaatsen',
      submitting: 'Bezig met verzenden...',
      successTitle: 'Bedankt voor je opdracht!',
      successMessage: 'We nemen binnen 24 uur contact met je op om de mogelijkheden te bespreken.',
      backToForm: 'Nog een opdracht plaatsen',
      companyPlaceholder: 'Naam van je bedrijf',
      contactPlaceholder: 'Naam contactpersoon',
      emailPlaceholder: 'email@bedrijf.nl',
      phonePlaceholder: 'Je telefoonnummer',
      titlePlaceholder: 'Bijv. "Frontend Developer" of "DevOps Engineer"',
      descriptionPlaceholder: 'Beschrijf de opdracht, vereiste vaardigheden en andere relevante details',
      budgetPlaceholder: 'Bijv. "€400-600 per dag" of "€70-90 per uur"'
    },
    en: {
      companyName: 'Company name',
      contactPerson: 'Contact person',
      email: 'Email address',
      phone: 'Phone number',
      jobTitle: 'Job title',
      jobType: 'Assignment type',
      fullTime: 'Full-time',
      partTime: 'Part-time',
      project: 'Project',
      location: 'Location',
      remote: 'Fully remote',
      hybrid: 'Hybrid',
      onsite: 'On-site',
      experience: 'Required experience',
      exp03: '0-1 year',
      exp13: '1-3 years',
      exp35: '3-5 years',
      exp5plus: '5+ years',
      description: 'Assignment description',
      budget: 'Budget (optional)',
      startDate: 'Desired start date',
      duration: 'Expected duration',
      dur03: '0-3 months',
      dur36: '3-6 months',
      dur612: '6-12 months',
      dur12plus: '12+ months',
      submit: 'Post assignment',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your assignment!',
      successMessage: 'We will contact you within 24 hours to discuss the possibilities.',
      backToForm: 'Post another assignment',
      companyPlaceholder: 'Your company name',
      contactPlaceholder: 'Contact person name',
      emailPlaceholder: 'email@company.com',
      phonePlaceholder: 'Your phone number',
      titlePlaceholder: 'E.g. "Frontend Developer" or "DevOps Engineer"',
      descriptionPlaceholder: 'Describe the assignment, required skills and other relevant details',
      budgetPlaceholder: 'E.g. "€400-600 per day" or "€70-90 per hour"'
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
              <label htmlFor="bedrijfsnaam" className="block text-sm font-medium mb-1">
                {t.companyName} *
              </label>
              <input
                id="bedrijfsnaam"
                name="bedrijfsnaam"
                type="text"
                required
                value={formData.bedrijfsnaam}
                onChange={handleChange}
                placeholder={t.companyPlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="contactpersoon" className="block text-sm font-medium mb-1">
                {t.contactPerson} *
              </label>
              <input
                id="contactpersoon"
                name="contactpersoon"
                type="text"
                required
                value={formData.contactpersoon}
                onChange={handleChange}
                placeholder={t.contactPlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label htmlFor="telefoonnummer" className="block text-sm font-medium mb-1">
                {t.phone} *
              </label>
              <input
                id="telefoonnummer"
                name="telefoonnummer"
                type="tel"
                required
                value={formData.telefoonnummer}
                onChange={handleChange}
                placeholder={t.phonePlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="functietitel" className="block text-sm font-medium mb-1">
                {t.jobTitle} *
              </label>
              <input
                id="functietitel"
                name="functietitel"
                type="text"
                required
                value={formData.functietitel}
                onChange={handleChange}
                placeholder={t.titlePlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="opdrachtType" className="block text-sm font-medium mb-1">
                {t.jobType} *
              </label>
              <select
                id="opdrachtType"
                name="opdrachtType"
                required
                value={formData.opdrachtType}
                onChange={handleChange}
                className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              >
                <option value="fulltime">{t.fullTime}</option>
                <option value="parttime">{t.partTime}</option>
                <option value="project">{t.project}</option>
              </select>
            </div>

            <div>
              <label htmlFor="locatie" className="block text-sm font-medium mb-1">
                {t.location} *
              </label>
              <select
                id="locatie"
                name="locatie"
                required
                value={formData.locatie}
                onChange={handleChange}
                className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              >
                <option value="remote">{t.remote}</option>
                <option value="hybrid">{t.hybrid}</option>
                <option value="onsite">{t.onsite}</option>
              </select>
            </div>

            <div>
              <label htmlFor="werkervaring" className="block text-sm font-medium mb-1">
                {t.experience} *
              </label>
              <select
                id="werkervaring"
                name="werkervaring"
                required
                value={formData.werkervaring}
                onChange={handleChange}
                className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              >
                <option value="0-1">{t.exp03}</option>
                <option value="1-3">{t.exp13}</option>
                <option value="3-5">{t.exp35}</option>
                <option value="5+">{t.exp5plus}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="beschrijving" className="block text-sm font-medium mb-1">
              {t.description} *
            </label>
            <textarea
              id="beschrijving"
              name="beschrijving"
              required
              rows={6}
              value={formData.beschrijving}
              onChange={handleChange}
              placeholder={t.descriptionPlaceholder}
              className="form-textarea w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1">
                {t.budget}
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                placeholder={t.budgetPlaceholder}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="startdatum" className="block text-sm font-medium mb-1">
                {t.startDate} *
              </label>
              <input
                id="startdatum"
                name="startdatum"
                type="date"
                required
                value={formData.startdatum}
                onChange={handleChange}
                className="form-input w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label htmlFor="duur" className="block text-sm font-medium mb-1">
                {t.duration} *
              </label>
              <select
                id="duur"
                name="duur"
                required
                value={formData.duur}
                onChange={handleChange}
                className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
              >
                <option value="0-3">{t.dur03}</option>
                <option value="3-6">{t.dur36}</option>
                <option value="6-12">{t.dur612}</option>
                <option value="12+">{t.dur12plus}</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-6 py-3 rounded font-medium"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 