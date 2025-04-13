import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Contact - IT-Uitzendbureau',
  description: 'Neem contact op met IT-Uitzendbureau voor al je vragen over IT-vacatures en -professionals.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Neem contact met ons op
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Heb je een vraag of wil je meer informatie? Vul onderstaand formulier in en we nemen zo snel mogelijk contact met je op.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <ContactForm />
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">Contactgegevens</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">📍</span>
                <span>IT-Uitzendbureau, Maastricht</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">📞</span>
                <span>+31 (0)43 123 4567</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✉️</span>
                <span>contact@it-uitzendbureau.nl</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">Openingstijden</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Maandag - Vrijdag:</span>
                <span>9:00 - 17:30</span>
              </li>
              <li className="flex justify-between">
                <span>Zaterdag:</span>
                <span>Gesloten</span>
              </li>
              <li className="flex justify-between">
                <span>Zondag:</span>
                <span>Gesloten</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 