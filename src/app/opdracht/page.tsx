import OpdrachtForm from '../../components/ui/OpdrachtForm';

export const metadata = {
  title: 'Opdracht Plaatsen - IT-Uitzendbureau',
  description: 'Plaats eenvoudig uw remote werk opdracht via ons online formulier. Wij zorgen voor de juiste match.',
};

export default function OpdrachtPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Plaats uw remote opdracht
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vul het onderstaande formulier in om uw remote werk opdracht aan te melden. 
            Wij nemen binnen 24 uur contact met u op om de details te bespreken.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <OpdrachtForm />
        </div>
      </div>
    </div>
  );
} 