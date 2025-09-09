import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactModal } from './ContactModal';

interface InternalHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function InternalHeader({ currentPage, onPageChange }: InternalHeaderProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center shrink-0 relative h-16 px-3 md:px-6 lg:px-6">
        {/* Left side - Editado Studio */}
        <div className="flex items-center">
          <button
            onClick={() => onPageChange('home')}
            className="text-[15px] tracking-wide relative inline-block transition-colors hover:text-gray-500 font-display"
          >
            Editado Studio
          </button>
        </div>
        
        {/* Center - About & Manifesto */}
        <div className="hidden md:flex items-center ml-16 lg:ml-20">
          <div className="flex space-x-2 lg:space-x-3">
            <button
              onClick={() => onPageChange('about')}
              className={`text-[15px] tracking-wide relative inline-block transition-colors font-display ${
                currentPage === 'about' ? 'opacity-100' : 'hover:text-gray-500'
              }`}
            >
              About
            </button>
            
            <button
              onClick={() => onPageChange('manifesto')}
              className={`text-[15px] tracking-wide relative inline-block transition-colors font-display px-0 ${
                currentPage === 'manifesto' ? 'opacity-100' : 'hover:text-gray-500'
              }`}
            >
              Manifesto
            </button>
          </div>
        </div>
        
        {/* Spacer to push contact right */}
        <div className="flex-1"></div>
        
        {/* Right - Contact */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="text-[15px] tracking-wide relative inline-block transition-colors hover:text-gray-500 font-display"
          >
            Contact
          </button>
        </div>
        
        {/* Mobile Navigation - simplified */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => onPageChange('about')}
            className={`text-[15px] tracking-wide relative inline-block transition-colors font-display ${
              currentPage === 'about' ? 'opacity-100' : 'hover:text-gray-500'
            }`}
          >
            About
          </button>
          
          <button
            onClick={() => onPageChange('manifesto')}
            className={`text-[15px] tracking-wide relative inline-block transition-colors font-display px-0 ${
              currentPage === 'manifesto' ? 'opacity-100' : 'hover:text-gray-500'
            }`}
          >
            Manifesto
          </button>
          
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="text-[15px] tracking-wide relative inline-block transition-colors hover:text-gray-500 font-display"
          >
            Contact
          </button>
        </div>
      </header>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}