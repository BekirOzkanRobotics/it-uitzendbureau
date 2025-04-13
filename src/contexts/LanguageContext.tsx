'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  nl: TranslationDictionary;
  en: TranslationDictionary;
}

const translations: Translations = {
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.postJob': 'Opdracht Plaatsen',
    'nav.contact': 'Contact',
    
    // Home page
    'home.hero.title': 'Plaats uw remote werk-opdrachten eenvoudig online',
    'home.hero.subtitle': 'Vind de juiste professionals voor uw IT-projecten en andere remote opdrachten via ons gespecialiseerde platform.',
    'home.hero.postJob': 'Plaats een opdracht',
    'home.hero.contact': 'Neem contact op',
    'home.benefits.title': 'Waarom kiezen voor ons platform?',
    'home.benefits.network.title': 'Breed netwerk van professionals',
    'home.benefits.network.desc': 'Toegang tot een gevarieerd netwerk van ervaren remote professionals in verschillende vakgebieden.',
    'home.benefits.matching.title': 'Professionele matching',
    'home.benefits.matching.desc': 'Wij zorgen ervoor dat uw project gekoppeld wordt aan de professional met de juiste vaardigheden.',
    'home.benefits.process.title': 'Eenvoudig en efficiënt proces',
    'home.benefits.process.desc': 'Minimale administratie, snelle afhandeling en directe communicatie voor een optimaal resultaat.',
    'home.cta.title': 'Klaar om uw project te starten?',
    'home.cta.desc': 'Vul eenvoudig het opdrachtformulier in en wij nemen snel contact met u op om uw behoeften te bespreken.',
    'home.cta.button': 'Plaats nu uw opdracht',
    
    // Contact page
    'contact.title': 'Neem contact met ons op',
    'contact.subtitle': 'Heeft u vragen of wilt u meer informatie over onze diensten? Vul het contactformulier in of neem direct contact met ons op.',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefoon',
    'contact.address': 'Adres',
    'contact.form.title': 'Stuur ons een bericht',
    
    // Language selector
    'language.select': 'Selecteer taal',
    'language.nl': 'Nederlands',
    'language.en': 'Engels',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.postJob': 'Post Job',
    'nav.contact': 'Contact',
    
    // Home page
    'home.hero.title': 'Post your remote work assignments easily online',
    'home.hero.subtitle': 'Find the right professionals for your IT projects and other remote assignments through our specialized platform.',
    'home.hero.postJob': 'Post a job',
    'home.hero.contact': 'Contact us',
    'home.benefits.title': 'Why choose our platform?',
    'home.benefits.network.title': 'Broad network of professionals',
    'home.benefits.network.desc': 'Access to a diverse network of experienced remote professionals in various fields.',
    'home.benefits.matching.title': 'Professional matching',
    'home.benefits.matching.desc': 'We ensure that your project is connected to the professional with the right skills.',
    'home.benefits.process.title': 'Simple and efficient process',
    'home.benefits.process.desc': 'Minimal administration, quick processing and direct communication for optimal results.',
    'home.cta.title': 'Ready to start your project?',
    'home.cta.desc': 'Simply fill out the job form and we will contact you quickly to discuss your needs.',
    'home.cta.button': 'Post your job now',
    
    // Contact page
    'contact.title': 'Contact us',
    'contact.subtitle': 'Do you have questions or would you like more information about our services? Fill in the contact form or get in touch with us directly.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.form.title': 'Send us a message',
    
    // Language selector
    'language.select': 'Select language',
    'language.nl': 'Dutch',
    'language.en': 'English',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    // Probeer om opgeslagen taalvoorkeur uit localStorage te halen
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'nl' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 