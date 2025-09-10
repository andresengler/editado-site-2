import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ContactModal } from './ContactModal';

export function HeaderNext() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get current page from pathname
  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/about') return 'about';
    if (pathname === '/manifesto') return 'manifesto';
    return 'home';
  };

  const currentPage = getCurrentPage();

  // Handle navigation using Next.js router
  const handleNavigation = (page: string) => {
    const routes = {
      'home': '/',
      'about': '/about',
      'manifesto': '/manifesto'
    };
    router.push(routes[page as keyof typeof routes] || '/');
  };

  // Always use modal for contact
  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when contact is clicked
  };

  const handleMobileNavigation = (page: string) => {
    handleNavigation(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center shrink-0 relative h-16 px-3 md:px-6 lg:px-0">
        {/* Block 1: Editado Studio */}
        <div className="flex-1">
          <motion.button
            onClick={() => handleNavigation('home')}
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
              onClick={() => handleNavigation('about')}
              className={`text-menu tracking-wider relative transition-all duration-300 ease-in-out ${
                currentPage === 'about' 
                  ? 'font-medium text-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
              whileHover={{ 
                opacity: 0.7,
                scale: 1.01,
                y: -0.5
              }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              About
            </motion.button>
            
            <motion.button
              onClick={() => handleNavigation('manifesto')}
              className={`text-menu tracking-wider relative transition-all duration-300 ease-in-out ${
                currentPage === 'manifesto' 
                  ? 'font-medium text-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
              whileHover={{ 
                opacity: 0.7,
                scale: 1.01,
                y: -0.5
              }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              Manifesto
            </motion.button>
          </div>
        </div>
        
        {/* Block 3: Contact button */}
        <div className="flex-1 flex justify-end">
          <motion.button
            onClick={handleContactClick}
            className="text-menu tracking-wider text-gray-600 hover:text-black transition-all duration-300 ease-in-out"
            whileHover={{ 
              opacity: 0.7,
              scale: 1.01,
              y: -0.5
            }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Contact
          </motion.button>
        </div>

        {/* Mobile menu button - visible only on mobile */}
        <div className="md:hidden flex items-center ml-4">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-black transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay with Extreme Distorted Blur */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Heavy distorted backdrop with extreme blur effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-menu-backdrop-heavy"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile menu content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 
              }}
              className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 md:hidden"
            >
              <div className="px-6 py-8 space-y-6">
                <motion.button
                  onClick={() => handleMobileNavigation('about')}
                  className="block w-full text-left text-content text-gray-800 hover:text-black transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  About
                </motion.button>
                
                <motion.button
                  onClick={() => handleMobileNavigation('manifesto')}
                  className="block w-full text-left text-content text-gray-800 hover:text-black transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Manifesto
                </motion.button>
                
                <motion.button
                  onClick={handleContactClick}
                  className="block w-full text-left text-content text-gray-800 hover:text-black transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal - appears above everything */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}