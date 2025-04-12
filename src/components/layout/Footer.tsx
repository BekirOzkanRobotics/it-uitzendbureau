'use client';

import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">IT-Uitzendbureau</h3>
            <p className="text-sm">
              {language === 'nl' 
                ? 'Uw partner voor het vinden van IT-talent en remote werk opdrachten.'
                : 'Your partner for finding IT talent and remote work assignments.'}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white">
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'nl' ? 'Diensten' : 'Services'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  {language === 'nl' ? 'IT-Consultancy' : 'IT Consultancy'}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {language === 'nl' ? 'Remote Werk' : 'Remote Work'}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {language === 'nl' ? 'Projectmanagement' : 'Project Management'}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  {language === 'nl' ? 'Werving & Selectie' : 'Recruitment'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'nl' ? 'Links' : 'Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/opdracht" className="hover:text-white">
                  {t('nav.postJob')}
                </Link>
              </li>
              <li>
                <Link href="/nieuwsbrief" className="hover:text-white">
                  {t('nav.newsletter')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'nl' ? 'Contact' : 'Contact'}
            </h3>
            <address className="not-italic text-sm space-y-2">
              <p>Voorbeeldstraat 123</p>
              <p>1234 AB Amsterdam</p>
              <p>
                <a href="tel:+31612345678" className="hover:text-white">
                  +31 (0)6 1234 5678
                </a>
              </p>
              <p>
                <a href="mailto:info@it-uitzendbureau.nl" className="hover:text-white">
                  info@it-uitzendbureau.nl
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} IT-Uitzendbureau. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="#" className="hover:text-white">
              {language === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
            </Link>
            <Link href="#" className="hover:text-white">
              {language === 'nl' ? 'Algemene Voorwaarden' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 