'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default function FirebaseTest() {
  const [testStatus, setTestStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [testData, setTestData] = useState<any[]>([]);

  useEffect(() => {
    async function testFirebaseConnection() {
      try {
        // Test de verbinding met Firestore door een query uit te voeren
        // We proberen maximaal 1 document op te halen van een willekeurige collectie
        // Als er geen collecties/documenten zijn, is dat ook prima - we testen alleen de verbinding
        const testQuery = query(collection(db, 'contactberichten'), limit(1));
        const snapshot = await getDocs(testQuery);
        
        // Als we hier komen, is de verbinding succesvol
        setTestStatus('success');
        
        // Als er documenten zijn, slaan we die op voor weergave
        const documents: any[] = [];
        snapshot.forEach(doc => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setTestData(documents);
      } catch (error) {
        console.error('Firebase-verbindingsfout:', error);
        setTestStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Onbekende fout');
      }
    }

    testFirebaseConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Firebase Verbindingstest</h2>
      
      {testStatus === 'loading' && (
        <div className="text-blue-600">
          <p>Verbinding testen met Firebase...</p>
        </div>
      )}
      
      {testStatus === 'success' && (
        <div className="text-green-600">
          <p className="mb-2">✅ Firebase is succesvol verbonden!</p>
          {testData.length > 0 ? (
            <>
              <p className="mb-2">Gevonden documenten:</p>
              <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-60 text-xs">
                {JSON.stringify(testData, null, 2)}
              </pre>
            </>
          ) : (
            <p>Geen documenten gevonden in de 'contactberichten' collectie, maar de verbinding werkt!</p>
          )}
        </div>
      )}
      
      {testStatus === 'error' && (
        <div className="text-red-600">
          <p className="mb-2">❌ Er is een fout opgetreden bij het verbinden met Firebase:</p>
          <pre className="bg-red-50 p-3 rounded text-red-800 text-xs">
            {errorMessage}
          </pre>
          <p className="mt-4">Mogelijke oorzaken:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Firebase is niet correct geïnstalleerd</li>
            <li>Je Firebase configuratie in .env.local is niet correct</li>
            <li>Er is een netwerkprobleem</li>
            <li>De Firestore database is niet aangemaakt of heeft beperkende regels</li>
          </ul>
        </div>
      )}
    </div>
  );
} 