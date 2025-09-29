"use client";

import { useEffect } from 'react';

export default function DebugLogger() {
  useEffect(() => {
    console.log('🔄 [Hydration] Client-side React has hydrated');
    console.log('🌍 [Environment] Window object available:', typeof window !== 'undefined');
    console.log('🌍 [Environment] User Agent:', navigator?.userAgent || 'Unknown');
    console.log('🌍 [Environment] Current URL:', window?.location?.href || 'Unknown');
    
    // Check for any console errors that might indicate hydration issues
    const originalError = console.error;
    console.error = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes('hydration'))) {
        console.log('🚨 [Hydration] Hydration-related error detected:', ...args);
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null; // This component doesn't render anything
}