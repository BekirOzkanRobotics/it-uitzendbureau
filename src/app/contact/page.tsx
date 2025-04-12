import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '../../components/ui/ContactForm';

export const metadata = {
  title: 'Contact - IT-Uitzendbureau',
  description: 'Neem contact met ons op voor vragen over remote werk opdrachten en IT-projecten.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Neem contact met ons op
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Heeft u vragen of wilt u meer informatie over onze diensten? 
            Vul het contactformulier in of neem direct contact met ons op.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-[color:var(--primary-color)] text-3xl mb-4 flex justify-center">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
              E-mail
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a href="mailto:info@it-uitzendbureau.nl" className="text-[color:var(--primary-color)]">
                info@it-uitzendbureau.nl
              </a>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-[color:var(--primary-color)] text-3xl mb-4 flex justify-center">
              <FaPhone />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
              Telefoon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a href="tel:+31612345678" className="text-[color:var(--primary-color)]">
                +31 (0)6 1234 5678
              </a>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-[color:var(--primary-color)] text-3xl mb-4 flex justify-center">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
              Adres
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Voorbeeldstraat 123<br />
              1234 AB Amsterdam<br />
              Nederland
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Stuur ons een bericht
          </h2>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 