'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function EventTrackingExample() {
  const [buttonClicked, setButtonClicked] = useState(false);
  
  const handleButtonClick = () => {
    // Track een custom event
    trackEvent('button_click', {
      button_name: 'example_button',
      page: 'example_page'
    });
    
    setButtonClicked(true);
    
    // Reset de status na 2 seconden
    setTimeout(() => {
      setButtonClicked(false);
    }, 2000);
  };
  
  const handleLinkClick = (linkName: string) => {
    // Track een link klik event
    trackEvent('link_click', {
      link_name: linkName,
      page: 'example_page'
    });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track een formulier submit event
    trackEvent('form_submit', {
      form_name: 'example_form',
      page: 'example_page'
    });
    
    alert('Formulier verzonden! Event is geregistreerd in Google Analytics.');
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Google Analytics Event Tracking Voorbeeld</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">1. Button Click Event</h3>
          <button
            onClick={handleButtonClick}
            className={`px-4 py-2 rounded ${
              buttonClicked 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors`}
          >
            {buttonClicked ? 'Event Geregistreerd!' : 'Klik om een event te triggeren'}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Deze knop registreert een &apos;button_click&apos; event wanneer je erop klikt.
          </p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">2. Link Click Tracking</h3>
          <div className="flex space-x-4">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('example_link_1');
              }}
              className="text-blue-600 hover:underline"
            >
              Link 1
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('example_link_2');
              }}
              className="text-blue-600 hover:underline"
            >
              Link 2
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Deze links registreren een &apos;link_click&apos; event met de linknaam als parameter.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">3. Form Submit Tracking</h3>
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Naam
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Verzenden & Tracken
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">
            Dit formulier registreert een &apos;form_submit&apos; event wanneer je het verstuurt.
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
        <p className="font-semibold">Hoe werkt dit?</p>
        <p className="mt-1">
          Alle events worden geregistreerd in je Google Analytics account en kunnen worden bekeken in het Firebase Dashboard onder &quot;Analytics&quot;.
        </p>
        <p className="mt-1">
          Je kunt deze events gebruiken om te begrijpen hoe gebruikers met je website interacteren en welke onderdelen het meest worden gebruikt.
        </p>
      </div>
    </div>
  );
} 