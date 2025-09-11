'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ManifestoPage } from './components/ManifestoPage';
import { FloatingLetters } from './components/FloatingLetters';

import { useIsMobile } from './components/ui/use-mobile';

type PageKey = 'home' | 'about' | 'manifesto';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPage, setNextPage] = useState<PageKey | null>(null);
  const isMobile = useIsMobile();

  // Recibe string (como esperan los hijos) y lo mapea al union PageKey
  const handleNavigate = (page: string) => {
    const allowed: PageKey[] = ['home', 'about', 'manifesto'];
    const target: PageKey = allowed.includes(page as PageKey) ? (page as PageKey) : 'home';

    if (target === currentPage) return;

    setIsTransitioning(true);
    setNextPage(target);

    // Transición de salida/entrada
    setTimeout(() => {
      setCurrentPage(target);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextPage(null);
      }, 150);
    }, 100);
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

  const getBackgroundClass = () => 'bg-background';
  const getBackgroundOverlayClass = () => 'bg-background';

  const getLayoutClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      return 'relative z-1 lg:px-[10vw]';
    }
    return 'flex flex-col min-h-screen relative z-1 lg:px-[10vw]';
  };

  const getContainerClass = () => {
    const base = `${getBackgroundClass()} bg-smooth-transition ${isTransitioning ? 'active' : ''} font-sans relative`;
    if (currentPage === 'about' || currentPage === 'manifesto') return base;
    return `min-h-screen ${base} flex flex-col overflow-x-hidden`;
  };

  return (
    <div className={getContainerClass()}>
      {/* Overlay tenue */}
      <motion.div
        className={`bg-transition-overlay ${getBackgroundOverlayClass()}`}
        animate={{ opacity: isTransitioning ? 0.05 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: isTransitioning ? 1 : -1 }}
      />

      {/* Desenfoque global durante transición */}
      <motion.div
        className="page-blur-overlay"
        animate={{
          backdropFilter: isTransitioning ? 'blur(2px) saturate(1.02)' : 'blur(0px) saturate(1)',
          opacity: isTransitioning ? 0.95 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: isTransitioning ? 30 : -1 }}
      />

      {/* Letras flotantes */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-80">
        <FloatingLetters />
      </div>

      {/* Contenido principal */}
      <motion.div
        className={getLayoutClass()}
        animate={{ opacity: isTransitioning ? 0.8 : 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="relative z-20">
          <Header currentPage={currentPage} onPageChange={handleNavigate} />
        </div>

        {/* Página actual */}
        <div className={currentPage === 'home' ? 'flex-1 relative z-1' : 'relative z-1'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="relative z-50">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}
