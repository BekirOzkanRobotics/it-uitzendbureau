'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase'; // Importeer de app instantie uit firebase.ts
import { getAnalytics, isSupported, logEvent, setCurrentScreen } from 'firebase/analytics';

// Global variabele om analytics instantie op te slaan
let analyticsInstance: any = null;

// Deze functie initialiseert Firebase Analytics en hergebruikt bestaande instanties
export const initializeAnalytics = async () => {
  // Retourneer bestaande instantie als die al bestaat
  if (analyticsInstance) {
    return analyticsInstance;
  }

  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      // Gebruik de app instantie die al is geïnitialiseerd in firebase.ts
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    }
  } catch (error) {
    console.error('Firebase Analytics initialisatiefout:', error);
  }
  return null;
};

// Helper functie om events te registreren
export const trackEvent = async (eventName: string, eventParams?: { [key: string]: any }) => {
  try {
    const analytics = await initializeAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  } catch (error) {
    console.error('Event tracking fout:', error);
  }
};

// Helper functie om pagina-weergaven te registreren
export const trackPageView = async (pageName: string) => {
  try {
    const analytics = await initializeAnalytics();
    if (analytics) {
      setCurrentScreen(analytics, pageName);
      logEvent(analytics, 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  } catch (error) {
    console.error('Pagina-weergave tracking fout:', error);
  }
};

// React hook voor het bijhouden van pagina-weergaven
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
}; 