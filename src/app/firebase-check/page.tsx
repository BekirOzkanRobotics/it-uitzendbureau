'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export default function FirebaseCheck() {
  const [status, setStatus] = useState<{
    initialized: boolean;
    configLoaded: boolean;
    connectionTested: boolean;
    error: string | null;
  }>({
    initialized: false,
    configLoaded: false,
    connectionTested: false,
    error: null
  });

  useEffect(() => {
    async function checkFirebase() {
      try {
        // 1. Controleer of Firebase geïnitialiseerd is
        setStatus(prev => ({ ...prev, initialized: !!db }));
        
        // 2. Controleer of de configuratie is geladen
        const configLoaded = !!(
          process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        );
        setStatus(prev => ({ ...prev, configLoaded }));
        
        // 3. Test de verbinding met Firestore
        if (db) {
          try {
            // Probeer een eenvoudige query uit te voeren
            const testQuery = query(collection(db, 'test-collection'), limit(1));
            await getDocs(testQuery);
            setStatus(prev => ({ ...prev, connectionTested: true }));
          } catch (err) {
            console.error('Firestore query error:', err);
            setStatus(prev => ({ 
              ...prev, 
              connectionTested: false,
              error: err instanceof Error ? err.message : 'Fout bij het uitvoeren van een Firestore query' 
            }));
          }
        }
      } catch (err) {
        console.error('Firebase check error:', err);
        setStatus(prev => ({ 
          ...prev, 
          error: err instanceof Error ? err.message : 'Onbekende fout bij het controleren van Firebase' 
        }));
      }
    }
    
    checkFirebase();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Firebase Configuratie Check</h1>
          <p className="text-lg mb-8">Gedetailleerde controle van de Firebase-configuratie</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          
          <div className="grid gap-4">
            <div className="border-b pb-3">
              <div className="flex items-center">
                <span className={`mr-2 text-xl ${status.initialized ? 'text-green-500' : 'text-red-500'}`}>
                  {status.initialized ? '✓' : '✗'}
                </span>
                <span className="font-medium">Firebase SDK geïnitialiseerd</span>
              </div>
              {!status.initialized && (
                <p className="text-red-600 text-sm mt-1 ml-7">
                  De Firebase SDK kon niet worden geïnitialiseerd. Controleer de installatie.
                </p>
              )}
            </div>
            
            <div className="border-b pb-3">
              <div className="flex items-center">
                <span className={`mr-2 text-xl ${status.configLoaded ? 'text-green-500' : 'text-red-500'}`}>
                  {status.configLoaded ? '✓' : '✗'}
                </span>
                <span className="font-medium">Firebase configuratie geladen</span>
              </div>
              {!status.configLoaded && (
                <p className="text-red-600 text-sm mt-1 ml-7">
                  De Firebase configuratie kon niet worden geladen. Controleer je .env.local bestand.
                </p>
              )}
            </div>
            
            <div className="border-b pb-3">
              <div className="flex items-center">
                <span className={`mr-2 text-xl ${status.connectionTested ? 'text-green-500' : 'text-red-500'}`}>
                  {status.connectionTested ? '✓' : '✗'}
                </span>
                <span className="font-medium">Firestore verbinding getest</span>
              </div>
              {!status.connectionTested && (
                <p className="text-red-600 text-sm mt-1 ml-7">
                  Kon geen verbinding maken met Firestore. Dit kan komen door onjuiste configuratie of netwerkproblemen.
                </p>
              )}
            </div>
            
            {status.error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800">
                <h3 className="font-semibold mb-1">Foutmelding:</h3>
                <p className="text-sm">{status.error}</p>
              </div>
            )}
            
            {status.initialized && status.configLoaded && status.connectionTested && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-800">
                <p className="font-semibold">✅ Firebase is correct geconfigureerd en werkt!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Volgende stappen:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Als de tests slagen, is Firebase klaar voor gebruik in je applicatie.</li>
            <li>Als er fouten zijn, controleer dan de Firebase configuratie in .env.local</li>
            <li>Controleer of de Firebase-project instellingen correct zijn in de <a href="https://console.firebase.google.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
} 