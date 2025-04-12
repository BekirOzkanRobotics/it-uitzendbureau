import NieuwsbriefForm from '../../components/ui/NieuwsbriefForm';

export const metadata = {
  title: 'Nieuwsbrief - IT-Uitzendbureau',
  description: 'Schrijf je in voor onze nieuwsbrief en blijf op de hoogte van de nieuwste IT-vacatures, tips en trends.',
};

export default function NieuwsbriefPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Schrijf je in voor onze nieuwsbrief
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ontvang regelmatig updates over nieuwe vacatures, ontwikkelingen in de IT-sector en handige tips voor professionals.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <NieuwsbriefForm />
        </div>
      </div>
    </div>
  );
} 