import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ContactForm from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Contact - IT-Uitzendbureau',
  description: 'Neem contact op met IT-Uitzendbureau voor al je vragen over IT-vacatures en -professionals.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Neem contact met ons op
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Heb je een vraag of wil je meer informatie? Vul het formulier in of gebruik een van de contactmogelijkheden hieronder. We nemen zo snel mogelijk contact met je op.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar - op mobiel boven het formulier */}
          <div className="lg:order-last">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-full">
              <h2 className="text-xl font-semibold mb-6 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] pb-2 border-b border-gray-200 dark:border-gray-700">
                Contactgegevens
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <span className="block font-medium">Adres</span>
                    <span className="text-gray-600 dark:text-gray-400">IT-Uitzendbureau, Maastricht</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">
                    <FaPhone />
                  </span>
                  <div>
                    <span className="block font-medium">Telefoon</span>
                    <a href="tel:+31431234567" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      +31 (0)43 123 4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">
                    <FaEnvelope />
                  </span>
                  <div>
                    <span className="block font-medium">E-mail</span>
                    <a href="mailto:contact@it-uitzendbureau.nl" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      contact@it-uitzendbureau.nl
                    </a>
                  </div>
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] pb-2 border-b border-gray-200 dark:border-gray-700">
                Openingstijden
              </h2>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="flex items-center">
                    <FaClock className="text-blue-600 dark:text-blue-400 mr-2" />
                    <span>Maandag - Vrijdag:</span>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">9:00 - 17:30</span>
                </li>
                <li className="flex justify-between">
                  <span className="ml-6">Zaterdag:</span>
                  <span className="text-gray-600 dark:text-gray-400">Gesloten</span>
                </li>
                <li className="flex justify-between">
                  <span className="ml-6">Zondag:</span>
                  <span className="text-gray-600 dark:text-gray-400">Gesloten</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Formulier - neemt 2/3 van de breedte in op desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)] pb-2 border-b border-gray-200 dark:border-gray-700">
                Stuur ons een bericht
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 