'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { trackEvent } from '@/lib/analytics';
import StepNavigation from './StepNavigation';
import StepInstruction from './StepInstruction';
import StepNumbers from './StepNumbers';

// De interface voor de formulierdata
interface FormData {
  bedrijfsnaam: string;
  contactpersoon: string;
  email: string;
  telefoonnummer: string;
  functietitel: string;
  type_opdracht: string;
  locatie: string;
  werkervaring: string;
  beschrijving: string;
  budget: string;
  startdatum: string;
  duur: string;
}

// Huidige datum formatteren als YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Standaardwaarden voor de formulierdata
const defaultFormData: FormData = {
  bedrijfsnaam: '',
  contactpersoon: '',
  email: '',
  telefoonnummer: '',
  functietitel: '',
  type_opdracht: 'Fulltime',
  locatie: 'Volledig remote',
  werkervaring: '1-3 jaar',
  beschrijving: '',
  budget: '',
  startdatum: today,
  duur: '3-6 maanden'
};

// Stap validatie functies
const validateStep1 = (formData: FormData): boolean => {
  return !!(formData.bedrijfsnaam && formData.contactpersoon && formData.email);
};

const validateStep2 = (formData: FormData): boolean => {
  return !!(formData.functietitel && formData.type_opdracht && formData.locatie && formData.werkervaring);
};

const validateStep3 = (formData: FormData): boolean => {
  return !!(formData.beschrijving);
};

export default function OpdrachtSteps() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Vertalingen
  const translations = {
    nl: {
      steps: [
        'Bedrijfsgegevens',
        'Opdrachtdetails',
        'Beschrijving',
        'Planning'
      ],
      labels: {
        bedrijfsnaam: 'Bedrijfsnaam',
        contactpersoon: 'Contactpersoon',
        email: 'E-mailadres',
        telefoonnummer: 'Telefoonnummer',
        functietitel: 'Functietitel',
        type_opdracht: 'Type opdracht',
        locatie: 'Locatie',
        werkervaring: 'Gewenste werkervaring',
        beschrijving: 'Opdracht beschrijving',
        budget: 'Budget (optioneel)',
        startdatum: 'Gewenste startdatum',
        duur: 'Verwachte duur'
      },
      placeholders: {
        bedrijfsnaam: 'Naam van je bedrijf',
        contactpersoon: 'Naam contactpersoon',
        email: 'email@bedrijf.nl',
        telefoonnummer: 'Je telefoonnummer',
        functietitel: 'Bijv. "Frontend Developer" of "DevOps Engineer"',
        beschrijving: 'Beschrijf de opdracht, vereiste vaardigheden en andere relevante details',
        budget: 'Bijv. "€400-600 per dag" of "€70-90 per uur"'
      },
      type_options: [
        'Fulltime',
        'Parttime',
        'Flexibel'
      ],
      locatie_options: [
        'Volledig remote',
        'Op locatie',
        'Hybride'
      ],
      werkervaring_options: [
        '1-3 jaar',
        '3-5 jaar',
        '5+ jaar'
      ],
      duur_options: [
        '1-3 maanden',
        '3-6 maanden',
        '6-12 maanden',
        '1 jaar of langer'
      ],
      success: {
        title: 'Bedankt voor je aanvraag!',
        message: 'We hebben je opdracht ontvangen en nemen zo snel mogelijk contact met je op.'
      },
      submit: 'Opdracht plaatsen',
      submitting: 'Opdracht plaatsen...',
      error: 'Er is een fout opgetreden bij het verzenden van je opdracht. Probeer het later opnieuw.'
    },
    en: {
      steps: [
        'Company Info',
        'Job Details',
        'Description',
        'Planning'
      ],
      labels: {
        bedrijfsnaam: 'Company name',
        contactpersoon: 'Contact person',
        email: 'Email address',
        telefoonnummer: 'Phone number',
        functietitel: 'Job title',
        type_opdracht: 'Job type',
        locatie: 'Location',
        werkervaring: 'Required experience',
        beschrijving: 'Job description',
        budget: 'Budget (optional)',
        startdatum: 'Desired start date',
        duur: 'Expected duration'
      },
      placeholders: {
        bedrijfsnaam: 'Your company name',
        contactpersoon: 'Contact person name',
        email: 'email@company.com',
        telefoonnummer: 'Your phone number',
        functietitel: 'E.g. "Frontend Developer" or "DevOps Engineer"',
        beschrijving: 'Describe the job, required skills and other relevant details',
        budget: 'E.g. "€400-600 per day" or "€70-90 per hour"'
      },
      type_options: [
        'Full-time',
        'Part-time',
        'Flexible'
      ],
      locatie_options: [
        'Fully remote',
        'On-site',
        'Hybrid'
      ],
      werkervaring_options: [
        '1-3 years',
        '3-5 years',
        '5+ years'
      ],
      duur_options: [
        '1-3 months',
        '3-6 months',
        '6-12 months',
        '1 year or longer'
      ],
      success: {
        title: 'Thank you for your request!',
        message: 'We have received your job posting and will contact you as soon as possible.'
      },
      submit: 'Post Job',
      submitting: 'Posting Job...',
      error: 'An error occurred while submitting your job posting. Please try again later.'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prevStep => prevStep + 1);
      
      // Track event voor de stap
      trackEvent('job_form_step_completed', {
        step: currentStep + 1,
        step_name: t.steps[currentStep]
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Track formulier versturen gestart event
      trackEvent('job_form_submit_start', {
        language: language
      });

      // Opslaan van de opdracht in Firestore
      const docRef = await addDoc(collection(db, 'opdrachten'), {
        ...formData,
        taal: language,
        tijdstempel: serverTimestamp(),
      });

      // Track succesvol versturen event
      trackEvent('job_form_submit_success', {
        language: language,
        form_id: docRef.id
      });

      // Toon success
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Track fout bij versturen event
      trackEvent('job_form_submit_error', {
        error_message: error instanceof Error ? error.message : 'Unknown error',
        language: language
      });

      setSubmitError(
        language === 'nl'
          ? 'Er is een fout opgetreden bij het verzenden van je opdracht. Probeer het later opnieuw.'
          : 'An error occurred while submitting your job posting. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Valideer huidige stap
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return validateStep1(formData);
      case 1:
        return validateStep2(formData);
      case 2:
        return validateStep3(formData);
      case 3:
        return true; // Stap 4 bevat optionele velden
      default:
        return false;
    }
  };

  // Toon success melding
  if (submitSuccess) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t.success.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {t.success.message}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Terug naar home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
      {/* Stappen indicator met StepNumbers component */}
      <div className="mb-8">
        <StepNumbers 
          currentStep={currentStep} 
          steps={t.steps} 
        />
        <h2 className="text-xl font-bold text-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
          {t.steps[currentStep]}
        </h2>
      </div>

      {/* Step instructions */}
      {currentStep === 0 && (
        <StepInstruction 
          stepNumber={1}
          title={language === 'nl' ? "Eerst wat over jouw bedrijf" : "First, tell us about your company"}
          description={language === 'nl' 
            ? "Vul je bedrijfsinformatie in zodat we weten wie de opdracht plaatst. Deze informatie wordt alleen gebruikt om contact met je op te nemen."
            : "Fill in your company information so we know who is posting the job. This information will only be used to contact you."}
        />
      )}

      {currentStep === 1 && (
        <StepInstruction 
          stepNumber={2}
          title={language === 'nl' ? "Details van de opdracht" : "Job details"}
          description={language === 'nl' 
            ? "Geef aan welke functie je zoekt en wat de werkomstandigheden zijn. Dit helpt ons de juiste kandidaten te selecteren."
            : "Indicate which role you are looking for and what the working conditions are. This helps us select the right candidates."}
        />
      )}

      {currentStep === 2 && (
        <StepInstruction 
          stepNumber={3}
          title={language === 'nl' ? "Beschrijf de opdracht" : "Describe the job"}
          description={language === 'nl' 
            ? "Geef een gedetailleerde beschrijving van de opdracht, inclusief vereiste vaardigheden en verantwoordelijkheden."
            : "Provide a detailed description of the job, including required skills and responsibilities."}
        />
      )}

      {currentStep === 3 && (
        <StepInstruction 
          stepNumber={4}
          title={language === 'nl' ? "Planning en budget" : "Planning and budget"}
          description={language === 'nl' 
            ? "Geef aan wanneer de opdracht zou moeten starten en wat de verwachte duur en budget is."
            : "Indicate when the job should start and what the expected duration and budget is."}
        />
      )}

      {/* Formulier stappen */}
      <div>
        {/* Stap 1: Bedrijfsgegevens */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="bedrijfsnaam" className="block text-sm font-medium mb-1">
                  {t.labels.bedrijfsnaam} *
                </label>
                <input
                  id="bedrijfsnaam"
                  name="bedrijfsnaam"
                  type="text"
                  required
                  value={formData.bedrijfsnaam}
                  onChange={handleChange}
                  placeholder={t.placeholders.bedrijfsnaam}
                  className="form-input w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="contactpersoon" className="block text-sm font-medium mb-1">
                  {t.labels.contactpersoon} *
                </label>
                <input
                  id="contactpersoon"
                  name="contactpersoon"
                  type="text"
                  required
                  value={formData.contactpersoon}
                  onChange={handleChange}
                  placeholder={t.placeholders.contactpersoon}
                  className="form-input w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {t.labels.email} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.placeholders.email}
                  className="form-input w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="telefoonnummer" className="block text-sm font-medium mb-1">
                  {t.labels.telefoonnummer}
                </label>
                <input
                  id="telefoonnummer"
                  name="telefoonnummer"
                  type="tel"
                  value={formData.telefoonnummer}
                  onChange={handleChange}
                  placeholder={t.placeholders.telefoonnummer}
                  className="form-input w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* Stap 2: Opdrachtdetails */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="functietitel" className="block text-sm font-medium mb-1">
                {t.labels.functietitel} *
              </label>
              <input
                id="functietitel"
                name="functietitel"
                type="text"
                required
                value={formData.functietitel}
                onChange={handleChange}
                placeholder={t.placeholders.functietitel}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="type_opdracht" className="block text-sm font-medium mb-1">
                  {t.labels.type_opdracht} *
                </label>
                <select
                  id="type_opdracht"
                  name="type_opdracht"
                  required
                  value={formData.type_opdracht}
                  onChange={handleChange}
                  className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
                >
                  {language === 'nl' 
                    ? t.type_options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))
                    : translations.en.type_options.map((option, index) => (
                        <option key={index} value={translations.nl.type_options[index]}>{option}</option>
                      ))
                  }
                </select>
              </div>

              <div>
                <label htmlFor="locatie" className="block text-sm font-medium mb-1">
                  {t.labels.locatie} *
                </label>
                <select
                  id="locatie"
                  name="locatie"
                  required
                  value={formData.locatie}
                  onChange={handleChange}
                  className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
                >
                  {language === 'nl' 
                    ? t.locatie_options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))
                    : translations.en.locatie_options.map((option, index) => (
                        <option key={index} value={translations.nl.locatie_options[index]}>{option}</option>
                      ))
                  }
                </select>
              </div>

              <div>
                <label htmlFor="werkervaring" className="block text-sm font-medium mb-1">
                  {t.labels.werkervaring} *
                </label>
                <select
                  id="werkervaring"
                  name="werkervaring"
                  required
                  value={formData.werkervaring}
                  onChange={handleChange}
                  className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
                >
                  {language === 'nl' 
                    ? t.werkervaring_options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))
                    : translations.en.werkervaring_options.map((option, index) => (
                        <option key={index} value={translations.nl.werkervaring_options[index]}>{option}</option>
                      ))
                  }
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stap 3: Beschrijving */}
        {currentStep === 2 && (
          <div>
            <label htmlFor="beschrijving" className="block text-sm font-medium mb-1">
              {t.labels.beschrijving} *
            </label>
            <textarea
              id="beschrijving"
              name="beschrijving"
              required
              rows={8}
              value={formData.beschrijving}
              onChange={handleChange}
              placeholder={t.placeholders.beschrijving}
              className="form-textarea w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        )}

        {/* Stap 4: Planning */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1">
                {t.labels.budget}
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                placeholder={t.placeholders.budget}
                className="form-input w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startdatum" className="block text-sm font-medium mb-1">
                  {t.labels.startdatum} *
                </label>
                <input
                  id="startdatum"
                  name="startdatum"
                  type="date"
                  required
                  value={formData.startdatum}
                  onChange={handleChange}
                  className="form-input w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="duur" className="block text-sm font-medium mb-1">
                  {t.labels.duur} *
                </label>
                <select
                  id="duur"
                  name="duur"
                  required
                  value={formData.duur}
                  onChange={handleChange}
                  className="form-select w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800"
                >
                  {language === 'nl' 
                    ? t.duur_options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))
                    : translations.en.duur_options.map((option, index) => (
                        <option key={index} value={translations.nl.duur_options[index]}>{option}</option>
                      ))
                  }
                </select>
              </div>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                {submitError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigatie */}
      <StepNavigation 
        currentStep={currentStep}
        totalSteps={4}
        onNext={currentStep === 3 ? handleSubmit : nextStep}
        onPrev={prevStep}
        isNextDisabled={!isStepValid() || isSubmitting}
        isComplete={currentStep === 3}
      />
    </div>
  );
} 