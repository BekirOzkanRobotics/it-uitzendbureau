import FirebaseTest from '@/components/test/FirebaseTest';

export const metadata = {
  title: 'Firebase Test - IT-Uitzendbureau',
  description: 'Testpagina voor het controleren van de Firebase-verbinding',
};

export default function FirebaseTestPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Firebase Verbindingstest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deze pagina controleert of de Firebase-integratie correct werkt.
          </p>
        </div>
        
        <FirebaseTest />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Als de test succesvol is, betekent dit dat Firebase correct is geconfigureerd en werkt.
            Bij fouten, controleer de foutmelding en de suggesties voor oplossingen.
          </p>
        </div>
      </div>
    </div>
  );
} 