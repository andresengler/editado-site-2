import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ManifestoPage } from './components/ManifestoPage';
import { FloatingLetters } from './components/FloatingLetters';

import { useIsMobile } from './components/ui/use-mobile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const isMobile = useIsMobile();
  
  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setNextPage(page);
    
    // Production-ready timing - smooth and efficient
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextPage('');
      }, 150); // Optimized transition duration
    }, 100); // Faster, cleaner exit
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onPageChange={handleNavigate} />;
      case 'manifesto':
        return <ManifestoPage onPageChange={handleNavigate} />;
      default:
        return <HomePage />;
    }
  };

  // Use unified background for all pages
  const getBackgroundClass = () => {
    return 'bg-background';
  };

  const getBackgroundOverlayClass = () => {
    return 'bg-background';
  };

  // Determine layout class based on page - maintain specific overflow behavior while using unified transitions
  const getLayoutClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      // Special layout for About and Manifesto - no overflow restrictions for sticky positioning
      return 'relative z-1 lg:px-[10vw]';
    }
    // Standard layout for Home page - perfect centering with flex
    return 'flex flex-col min-h-screen relative z-1 lg:px-[10vw]';
  };

  const getContainerClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      return `${getBackgroundClass()} bg-smooth-transition ${isTransitioning ? 'active' : ''} font-sans relative`;
    }
    return `min-h-screen ${getBackgroundClass()} bg-smooth-transition ${isTransitioning ? 'active' : ''} flex flex-col font-sans overflow-x-hidden relative`;
  };

  return (
    <div className={getContainerClass()}>
      {/* PRODUCTION TRANSITION SYSTEM - Clean and Efficient */}
      
      {/* Simple transition overlay */}
      <motion.div
        className={`bg-transition-overlay ${getBackgroundOverlayClass()}`}
        animate={{
          opacity: isTransitioning ? 0.05 : 0
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{ zIndex: isTransitioning ? 1 : -1 }}
      />

      {/* Clean blur overlay */}
      <motion.div
        className="page-blur-overlay"
        animate={{
          backdropFilter: isTransitioning 
            ? 'blur(2px) saturate(1.02)' 
            : 'blur(0px) saturate(1)',
          opacity: isTransitioning ? 0.95 : 1
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{ zIndex: isTransitioning ? 30 : -1 }}
      />

      {/* Global floating letters effect - optimized */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-80">
        <FloatingLetters />
      </div>
      
      {/* Main content container - clean layout */}
      <motion.div 
        className={getLayoutClass()}
        animate={{
          opacity: isTransitioning ? 0.8 : 1
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {/* Header - consistent for all pages */}
        <div className="relative z-20">
          <Header currentPage={currentPage} onPageChange={handleNavigate} />
        </div>
        
        {/* Page content container - adaptive based on page type */}
        <div className={currentPage === 'home' ? 'flex-1 relative z-1' : 'relative z-1'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ 
                opacity: 0, 
                y: 8
              }}
              animate={{ 
                opacity: 1, 
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                y: -4
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {renderPage()}
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