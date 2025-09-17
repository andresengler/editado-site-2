'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'corners' | 'footer' | 'sides' | 'center';
}

export function ContactModalAlternatives({ isOpen, onClose, variant = 'corners' }: ContactModalProps) {
  const [isTelegramHovered, setIsTelegramHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isWebsiteHovered, setIsWebsiteHovered] = useState(false);

  const renderBrandingElements = () => {
    switch (variant) {
      case 'corners':
        return (
          <>
            {/* E en esquina superior izquierda extrema */}
            <div className="absolute top-2 left-2 text-black/20 font-geist-mono text-[8px] tracking-widest">
              E
            </div>
            {/* S en esquina inferior derecha extrema */}
            <div className="absolute bottom-2 right-2 text-black/20 font-geist-mono text-[8px] tracking-widest">
              S
            </div>
          </>
        );
      
      case 'footer':
        return (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <div className="text-black/25 font-geist-mono text-[8px] tracking-widest">E</div>
            <div className="w-6 h-px bg-black/15"></div>
            <div className="text-black/25 font-geist-mono text-[8px] tracking-widest">S</div>
          </div>
        );
      
      case 'sides':
        return (
          <>
            {/* E en borde izquierdo */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black/20 font-geist-mono text-[8px] tracking-widest rotate-90">
              E
            </div>
            {/* S en borde derecho */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/20 font-geist-mono text-[8px] tracking-widest -rotate-90">
              S
            </div>
          </>
        );
      
      case 'center':
        return (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 z-0">
            <div className="text-black/10 font-geist-mono text-[24px] tracking-widest">E</div>
            <div className="text-black/10 font-geist-mono text-[24px] tracking-widest">S</div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ 
                y: -window.innerHeight,
                rotate: -5,
                opacity: 0
              }}
              animate={{ 
                y: 0,
                rotate: 0,
                opacity: 1
              }}
              exit={{ 
                y: window.innerHeight,
                rotate: 5,
                opacity: 0,
                transition: { duration: 0.6, ease: "easeIn" }
              }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 30,
                mass: 1.5,
                duration: 1.2 
              }}
              className="paper-realistic relative border border-gray-200/40" 
              style={{
                width: '400px',
                height: '250px',
                padding: '24px',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 8px 24px rgba(0, 0, 0, 0.08),
                  0 2px 8px rgba(0, 0, 0, 0.04),
                  inset 0 1px 0 rgba(255, 255, 255, 0.9),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.02)
                `
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-black/40 hover:text-black/70 transition-colors z-10"
              >
                <X size={14} />
              </button>
              
              {/* Render branding elements based on variant */}
              {renderBrandingElements()}
              
              {/* Esquina superior izquierda - Nombre */}
              <div className="absolute top-6 left-6 z-10">
                <div className="text-black font-geist-mono text-[16px] tracking-wide">
                  Andrés Engler
                </div>
              </div>
              
              {/* Esquina superior derecha - Título */}
              <div className="absolute top-6 right-6 z-10">
                <div className="text-black font-geist-mono text-[16px] tracking-wide">
                  Creative Consultant
                </div>
              </div>
              
              {/* Esquina inferior izquierda - Información de contacto */}
              <div className="absolute bottom-6 left-6 space-y-1 z-10">
                
                {/* Telegram */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsTelegramHovered(true)}
                  onMouseLeave={() => setIsTelegramHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-black font-geist-mono text-[14px] tracking-wide"
                    animate={{
                      filter: isTelegramHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isTelegramHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    +31 (0)6 11 71 08 41
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-black font-geist-mono text-[14px] tracking-wide flex items-center"
                    animate={{
                      filter: isTelegramHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isTelegramHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    @andresengler
                  </motion.div>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsEmailHovered(true)}
                  onMouseLeave={() => setIsEmailHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-black font-geist-mono text-[14px] tracking-wide"
                    animate={{
                      filter: isEmailHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isEmailHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    hello@manondevlieger.com
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-black font-geist-mono text-[14px] tracking-wide flex items-center"
                    animate={{
                      filter: isEmailHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isEmailHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    andres@editado.xyz
                  </motion.div>
                </motion.div>

                {/* Website */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsWebsiteHovered(true)}
                  onMouseLeave={() => setIsWebsiteHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-black font-geist-mono text-[14px] tracking-wide"
                    animate={{
                      filter: isWebsiteHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isWebsiteHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    manondevlieger.com
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-black font-geist-mono text-[14px] tracking-wide flex items-center"
                    animate={{
                      filter: isWebsiteHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isWebsiteHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    editado.xyz
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}