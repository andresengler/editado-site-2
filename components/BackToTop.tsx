'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  threshold?: number;
}

export function BackToTop({ threshold = 300 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    setIsScrolling(true);
    
    const scrollToTopSmooth = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        setTimeout(scrollToTopSmooth, 15);
      } else {
        setIsScrolling(false);
      }
    };
    
    scrollToTopSmooth();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            bg-primary text-primary-foreground
            w-12 h-12 rounded-full
            flex items-center justify-center
            transition-smooth hover-lift
            ${isScrolling ? 'animate-breathe' : ''}
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className={isScrolling ? 'animate-bounce' : ''} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}