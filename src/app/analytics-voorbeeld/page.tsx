import EventTrackingExample from '@/components/examples/EventTrackingExample';

export const metadata = {
  title: 'Google Analytics Voorbeeld - IT-Uitzendbureau',
  description: 'Voorbeeldpagina voor het demonstreren van Google Analytics tracking in Next.js',
};

export default function AnalyticsVoorbeeldPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            Google Analytics Tracking
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deze pagina demonstreert hoe je verschillende gebruikersinteracties kunt bijhouden met Firebase Analytics.
          </p>
        </div>
        
        <EventTrackingExample />
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Hoe gebruik je Firebase Analytics in je project?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">1. Pagina-weergaven bijhouden</h3>
              <p className="text-gray-700">
                Met de <code className="bg-gray-100 px-1 py-0.5 rounded">AnalyticsProvider</code> component worden alle pagina-weergaven automatisch 
                bijgehouden. Je hoeft niets extra's te doen!
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">2. Custom events bijhouden</h3>
              <p className="text-gray-700">
                Importeer de <code className="bg-gray-100 px-1 py-0.5 rounded">trackEvent</code> functie en gebruik deze om 
                custom events te registreren:
              </p>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                <code>
                  {`import { trackEvent } from '@/lib/analytics';\n\n// In je component:\ntrackEvent('event_name', { param1: 'value1' });`}
                </code>
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">3. Events bekijken in Firebase Console</h3>
              <p className="text-gray-700">
                Ga naar de <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Firebase Console</a>, 
                selecteer je project, en navigeer naar "Analytics" om je events te bekijken.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 