'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNext } from '../../components/HeaderNext';
import { Footer } from '../../components/Footer';
import { ManifestoPageNext } from '../../components/ManifestoPageNext';
import { FloatingLetters } from '../../components/FloatingLetters';
import { useIsMobile } from '../../components/ui/use-mobile';

export default function Manifesto() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();

  // Use unified background for manifesto page
  const getBackgroundClass = () => {
    return 'bg-manifesto';
  };

  const getBackgroundOverlayClass = () => {
    return 'bg-manifesto';
  };

  // Special layout for Manifesto - no overflow restrictions for sticky positioning
  const getLayoutClass = () => {
    return 'relative z-1 lg:px-[15vw]';
  };

  const getContainerClass = () => {
    return `${getBackgroundClass()} bg-smooth-transition cinematic-transition ${isTransitioning ? 'active' : ''} font-sans relative`;
  };

  return (
    <div className={getContainerClass()}>
      {/* UNIFIED TRANSITION SYSTEM */}
      
      {/* Ultra-subtle transition overlay with refined depth */}
      <motion.div
        className={`bg-transition-overlay ${getBackgroundOverlayClass()}`}
        animate={{
          opacity: isTransitioning ? 0.08 : 0,
          scale: isTransitioning ? 1.001 : 1
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ zIndex: isTransitioning ? 1 : -1 }}
      />

      {/* Refined blur overlay with aesthetic effects */}
      <motion.div
        className="page-blur-overlay"
        animate={{
          backdropFilter: isTransitioning 
            ? 'blur(3px) saturate(1.04) brightness(0.995) contrast(1.01)' 
            : 'blur(0px) saturate(1) brightness(1) contrast(1)',
          opacity: isTransitioning ? 0.98 : 1
        }}
        transition={{
          duration: 0.28,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ zIndex: isTransitioning ? 30 : -1 }}
      />

      {/* Ultra-subtle texture overlay for editorial sophistication */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          opacity: isTransitioning ? 0.015 : 0
        }}
        transition={{
          duration: 0.32,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{ 
          zIndex: isTransitioning ? 25 : -1,
          background: `
            radial-gradient(circle at 33% 33%, rgba(0,0,0,0.008) 0.5px, transparent 0.5px),
            radial-gradient(circle at 67% 67%, rgba(0,0,0,0.006) 0.5px, transparent 0.5px),
            radial-gradient(circle at 50% 85%, rgba(0,0,0,0.007) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '12px 12px, 16px 16px, 14px 14px'
        }}
      />

      {/* Global floating letters effect - unified */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-100">
        <FloatingLetters />
      </div>
      
      {/* Main content container - adaptive layout with enhanced motion */}
      <motion.div 
        className={getLayoutClass()}
        animate={{
          opacity: isTransitioning ? 0.85 : 1,
          filter: isTransitioning ? 'blur(0.5px) saturate(0.98)' : 'blur(0px) saturate(1)',
          y: isTransitioning ? -1 : 0
        }}
        transition={{
          duration: 0.28,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Header - consistent for all pages */}
        <div className="relative z-20">
          <HeaderNext />
        </div>
        
        {/* Page content container - adaptive based on page type */}
        <div className="relative z-1">
          <AnimatePresence mode="wait">
            <motion.div
              key="manifesto"
              initial={{ 
                opacity: 0, 
                y: 4, 
                filter: 'blur(1px) saturate(0.96)'
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px) saturate(1)'
              }}
              exit={{ 
                opacity: 0, 
                y: -2, 
                filter: 'blur(0.8px) saturate(0.98)'
              }}
              transition={{
                duration: 0.38,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.32 },
                y: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
                filter: { duration: 0.3 }
              }}
            >
              <ManifestoPageNext />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer - consistent for all pages */}
        <div className="relative z-50">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}