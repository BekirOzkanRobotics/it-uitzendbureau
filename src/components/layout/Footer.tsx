'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { language, t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">IT-Uitzendbureau</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/opdracht" className="hover:text-blue-400 transition-colors">
                  {t('nav.postJob')}
                </Link>
              </li>
              <li>
                <Link href="/nieuwsbrief" className="hover:text-blue-400 transition-colors">
                  {t('nav.newsletter')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{language === 'nl' ? 'Contact' : 'Contact'}</h3>
            <ul className="space-y-2">
              <li>
                <span className="block">IT-Uitzendbureau</span>
                <span className="block">Maastricht</span>
              </li>
              <li>
                <span className="block">+31 (0)43 123 4567</span>
              </li>
              <li>
                <a href="mailto:contact@it-uitzendbureau.nl" className="hover:text-blue-400 transition-colors">
                  contact@it-uitzendbureau.nl
                </a>
              </li>
            </ul>
          </div>
          
          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{language === 'nl' ? 'Disclaimer' : 'Disclaimer'}</h3>
            <p className="text-sm text-gray-400">
              {language === 'nl' 
                ? 'Dit is een voorbeeldproject. Alle informatie op deze website is fictief en alleen voor demonstratiedoeleinden.'
                : 'This is a sample project. All information on this website is fictional and for demonstration purposes only.'}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} IT-Uitzendbureau. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
} 