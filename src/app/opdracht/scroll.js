'use client';

// Smooth scroll functie voor de opdracht-knop
export function setupSmoothScroll() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const formElement = document.getElementById('formulier');
    
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Voeg event listeners toe aan alle opdracht-knoppen
  const setupLinks = () => {
    const links = document.querySelectorAll('a[href="#formulier"]');
    links.forEach(link => {
      link.addEventListener('click', scrollToForm);
    });
  };

  // Setup na DOM load
  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
      setupLinks();
    } else {
      window.addEventListener('load', setupLinks);
    }
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', setupLinks);
      const links = document.querySelectorAll('a[href="#formulier"]');
      links.forEach(link => {
        link.removeEventListener('click', scrollToForm);
      });
    }
  };
} 