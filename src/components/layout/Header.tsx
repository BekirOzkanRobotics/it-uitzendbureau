'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Effect voor scroll detectie
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect om mobile menu te sluiten bij route verandering
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            IT-Uitzendbureau
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/opdracht" 
              className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/opdracht' ? 'font-semibold' : ''
              }`}
            >
              {t('nav.postJob')}
            </Link>
            <Link 
              href="/nieuwsbrief" 
              className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/nieuwsbrief' ? 'font-semibold' : ''
              }`}
            >
              {t('nav.newsletter')}
            </Link>
            <Link 
              href="/contact" 
              className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                pathname === '/contact' ? 'font-semibold' : ''
              }`}
            >
              {t('nav.contact')}
            </Link>
            
            {/* Taal selector */}
            <div className="relative ml-4">
              <button
                type="button"
                className="flex items-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              >
                <span>{language === 'nl' ? 'NL' : 'EN'}</span>
              </button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 bg-white dark:bg-gray-900 mt-2 rounded shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                href="/" 
                className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/' ? 'font-semibold' : ''
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/opdracht" 
                className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/opdracht' ? 'font-semibold' : ''
                }`}
              >
                {t('nav.postJob')}
              </Link>
              <Link 
                href="/nieuwsbrief" 
                className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/nieuwsbrief' ? 'font-semibold' : ''
                }`}
              >
                {t('nav.newsletter')}
              </Link>
              <Link 
                href="/contact" 
                className={`text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  pathname === '/contact' ? 'font-semibold' : ''
                }`}
              >
                {t('nav.contact')}
              </Link>
              
              {/* Taal selector voor mobiel */}
              <button
                type="button"
                className="flex items-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              >
                <span>{language === 'nl' ? 'Nederlands' : 'English'}</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 