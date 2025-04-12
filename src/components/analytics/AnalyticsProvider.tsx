'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Wanneer de route verandert, track een nieuwe pageview
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const pageName = pathname.split('/').pop() || 'home';
    trackPageView(pageName);
  }, [pathname, searchParams]);

  return null; // Dit component rendert niets, het voert alleen code uit
} 