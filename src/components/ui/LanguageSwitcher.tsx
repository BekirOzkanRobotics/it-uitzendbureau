'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: 'nl' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaGlobe className="text-[color:var(--primary-color)]" />
        <span className="hidden sm:inline text-sm">
          {language === 'nl' ? 'NL' : 'EN'}
        </span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 p-1"
          role="menu"
          aria-orientation="vertical"
        >
          <button
            className={`flex w-full items-center px-3 py-2 text-sm rounded-md ${language === 'nl' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            onClick={() => selectLanguage('nl')}
            role="menuitem"
          >
            <span className="mr-2">🇳🇱</span>
            {t('language.nl')}
          </button>
          <button
            className={`flex w-full items-center px-3 py-2 text-sm rounded-md ${language === 'en' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            onClick={() => selectLanguage('en')}
            role="menuitem"
          >
            <span className="mr-2">🇬🇧</span>
            {t('language.en')}
          </button>
        </div>
      )}
    </div>
  );
} 