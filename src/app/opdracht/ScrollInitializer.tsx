'use client';

import { useEffect } from 'react';
import { setupSmoothScroll } from './scroll';

export default function ScrollInitializer() {
  useEffect(() => {
    const cleanupFunction = setupSmoothScroll();
    return cleanupFunction;
  }, []);
  
  return null;
} 