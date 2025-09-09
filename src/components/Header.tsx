import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ContactModal } from './ContactModal';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Always use modal for contact
  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when contact is clicked
  };

  const handleMobileNavigation = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center shrink-0 relative h-16 px-3 md:px-6 lg:px-0">
        {/* Block 1: Editado Studio */}
        <div className="flex-1">
          <motion.button
            onClick={() => onPageChange('home')}
            className="text-content tracking-wide relative inline-block font-sans text-black"
            whileHover={{ 
              opacity: 0.7,
              scale: 1.005,
              filter: 'brightness(1.05)'
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Editado Studio
          </motion.button>
        </div>
        
        {/* Block 2: About & Manifesto */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-3 lg:space-x-4">
            <motion.button
              onClick={() => onPageChange('about')}
              className={`text-content tracking-wide relative inline-block font-sans text-black ${
                currentPage === 'about' ? 'opacity-100' : ''
              }`}
              whileHover={currentPage !== 'about' ? { 
                opacity: 0.7,
                scale: 1.02,
                y: -1,
                filter: 'brightness(1.1)'
              } : {}}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              About
            </motion.button>
            
            <motion.button
              onClick={() => onPageChange('manifesto')}
              className={`text-content tracking-wide relative inline-block font-sans text-black ${
                currentPage === 'manifesto' ? 'opacity-100' : ''
              }`}
              whileHover={currentPage !== 'manifesto' ? { 
                opacity: 0.7,
                scale: 1.02,
                y: -1,
                filter: 'brightness(1.1)'
              } : {}}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              Manifesto
            </motion.button>
          </div>
        </div>
        
        {/* Block 3: Contact - Hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-end">
          <motion.button
            onClick={handleContactClick}
            className="text-content tracking-wide relative inline-block font-sans text-black"
            whileHover={{ 
              opacity: 0.7,
              scale: 1.02,
              y: -1,
              filter: 'brightness(1.1)'
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Contact
          </motion.button>
        </div>
        
        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-content tracking-wide relative inline-block font-sans text-black"
            whileHover={{ 
              opacity: 0.7,
              scale: 1.02,
              filter: 'brightness(1.1)'
            }}
            whileTap={{
              scale: 0.98,
              opacity: 0.8
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Menu
          </motion.button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Enhanced backdrop with cinematic blur */}
            <motion.div
              initial={{ opacity: 0, scale: 1.01, filter: 'blur(0px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.01, filter: 'blur(2px)' }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.35 },
                scale: { duration: 0.4 },
                filter: { duration: 0.3 }
              }}
              className="mobile-menu-backdrop-heavy"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Minimalist floating menu items */}
            <div className="fixed top-20 right-3 z-50 flex flex-col space-y-4">
              
              {/* About */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={() => handleMobileNavigation('about')}
                className={`text-menu tracking-wide font-neue-mono text-black transition-colors text-right ${
                  currentPage === 'about' ? 'opacity-100' : 'hover:opacity-70'
                }`}
              >
                About
              </motion.button>

              {/* Manifesto */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                onClick={() => handleMobileNavigation('manifesto')}
                className={`text-menu tracking-wide font-neue-mono text-black transition-colors text-right ${
                  currentPage === 'manifesto' ? 'opacity-100' : 'hover:opacity-70'
                }`}
              >
                Manifesto
              </motion.button>

              {/* Contact */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={handleContactClick}
                className="text-menu tracking-wide font-neue-mono text-black transition-colors hover:opacity-70 text-right"
              >
                Contact
              </motion.button>

            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}