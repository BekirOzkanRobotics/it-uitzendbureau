'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[color:var(--primary-color)] hover:no-underline">
          IT-Uitzendbureau
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]">
            {t('nav.home')}
          </Link>
          <Link href="/opdracht" className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]">
            {t('nav.postJob')}
          </Link>
          <Link href="/nieuwsbrief" className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]">
            {t('nav.newsletter')}
          </Link>
          <Link href="/contact" className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]">
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="hidden md:flex items-center">
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <button 
            className="ml-3 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-[color:var(--primary-color)]" />
            ) : (
              <FaBars className="h-6 w-6 text-[color:var(--primary-color)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/opdracht" 
              className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.postJob')}
            </Link>
            <Link 
              href="/nieuwsbrief" 
              className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.newsletter')}
            </Link>
            <Link 
              href="/contact" 
              className="text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-[color:var(--primary-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 