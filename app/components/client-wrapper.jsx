"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './splash-screen';

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate any loading or initialization here
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading && <SplashScreen />}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1 }} className="transition-opacity duration-1000">
        {children}
      </div>
    </>
  );
}