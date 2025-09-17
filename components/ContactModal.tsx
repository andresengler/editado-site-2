import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);
  const [isTelegramHovered, setIsTelegramHovered] = useState(false);

  // Render using portal to ensure it appears above all other content
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Unified Backdrop Blur - Consistent across all pages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9998] contact-modal-portal contact-modal-backdrop-unified"
            onClick={onClose}
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%, rgba(245, 244, 242, 0.35) 0%, rgba(248, 247, 245, 0.32) 30%, rgba(250, 249, 247, 0.28) 60%, rgba(252, 251, 249, 0.25) 100%),
                radial-gradient(ellipse at 70% 60%, rgba(240, 239, 237, 0.3) 0%, rgba(243, 242, 240, 0.27) 40%, rgba(246, 245, 243, 0.24) 80%, rgba(249, 248, 246, 0.22) 100%),
                linear-gradient(135deg, rgba(253, 252, 250, 0.3) 0%, rgba(247, 246, 244, 0.33) 25%, rgba(251, 250, 248, 0.31) 50%, rgba(245, 244, 242, 0.34) 75%, rgba(249, 248, 246, 0.32) 100%)
              `
            }}
          >
            {/* Organic cloud patterns */}
            <motion.div
              className="absolute inset-0 opacity-15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: `
                  radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 600px 800px at 80% 70%, rgba(248, 247, 245, 0.08) 0%, transparent 45%),
                  radial-gradient(ellipse 700px 500px at 50% 80%, rgba(250, 249, 247, 0.06) 0%, transparent 40%),
                  radial-gradient(ellipse 500px 700px at 30% 10%, rgba(252, 251, 249, 0.05) 0%, transparent 35%)
                `,
                animation: 'cloudFloat 20s ease-in-out infinite'
              }}
            />
            
            {/* Subtle noise texture for depth */}
            <motion.div
              className="absolute inset-0 opacity-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(0,0,0,0.008) 1px, transparent 1px),
                  radial-gradient(circle at 75% 75%, rgba(0,0,0,0.005) 1px, transparent 1px),
                  radial-gradient(circle at 50% 15%, rgba(0,0,0,0.006) 1px, transparent 1px),
                  radial-gradient(circle at 15% 85%, rgba(0,0,0,0.004) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px, 60px 60px, 35px 35px, 55px 55px',
                backgroundPosition: '0px 0px, 20px 30px, 15px 10px, 35px 45px'
              }}
            />
            
            {/* Floating particles for extra atmosphere */}
            <motion.div
              className="absolute inset-0 opacity-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: `
                  radial-gradient(circle 2px at 15% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle 1px at 85% 75%, rgba(248,247,245,0.08) 0%, transparent 50%),
                  radial-gradient(circle 1.5px at 45% 15%, rgba(250,249,247,0.09) 0%, transparent 50%),
                  radial-gradient(circle 1px at 75% 85%, rgba(252,251,249,0.06) 0%, transparent 50%),
                  radial-gradient(circle 2px at 25% 65%, rgba(255,255,255,0.08) 0%, transparent 50%),
                  radial-gradient(circle 1px at 55% 45%, rgba(248,247,245,0.05) 0%, transparent 50%)
                `,
                animation: 'particleFloat 25s ease-in-out infinite'
              }}
            />
          </motion.div>
          
          {/* Modal - Perfect centering with enhanced z-index */}
          <div
            className="fixed inset-0 z-[9999] p-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              minWidth: '100vw',
              left: '0',
              top: '0',
              right: '0',
              bottom: '0'
            }}
          >
            <motion.div
              initial={{ 
                opacity: 0
              }}
              animate={{ 
                opacity: 1
              }}
              exit={{ 
                opacity: 0,
                transition: { 
                  duration: 0.2, 
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              transition={{ 
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
                type: "tween"
              }}
              className="paper-realistic relative border border-gray-200/40 bg-white contact-card-container" 
              style={{
                backgroundColor: '#ffffff',
                margin: '0 auto',
                position: 'relative',
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
              
              {/* E en esquina superior izquierda */}
              <div className="absolute top-4 left-6">
                <div className="font-sans text-footer tracking-[0.08em] opacity-30" style={{ color: 'var(--functional-gray)' }}>
                  E
                </div>
              </div>
              
              {/* S en esquina inferior derecha */}
              <div className="absolute bottom-4 right-4">
                <div className="font-sans text-footer tracking-[0.08em] opacity-30" style={{ color: 'var(--functional-gray)' }}>
                  S
                </div>
              </div>
              
              {/* Nombre y título - Opening Hours Sans */}
              <div className="absolute top-16 left-6">
                <div className="text-black text-contact-name">
                  Andrés Engler
                </div>
                <div className="text-black text-contact-title mt-0.5">
                  Founder, editor
                </div>
              </div>
              
              {/* Información de contacto - Neue Montreal Mono en gris #666666 */}
              <div className="absolute bottom-12 left-6 space-y-0.5">
                
                {/* Email */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsEmailHovered(true)}
                  onMouseLeave={() => setIsEmailHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => window.location.href = 'mailto:andres@editado.xyz'}
                >
                  <motion.div
                    className="text-contact-mono text-functional"
                    animate={{
                      filter: isEmailHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isEmailHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    Email
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-contact-mono flex items-center text-functional"
                    style={{ letterSpacing: '0.02em' }}
                    animate={{
                      filter: isEmailHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isEmailHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    andres@editado.xyz
                  </motion.div>
                </motion.div>

                {/* LinkedIn */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsLinkedInHovered(true)}
                  onMouseLeave={() => setIsLinkedInHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => window.open('https://linkedin.com/in/englerandres', '_blank')}
                >
                  <motion.div
                    className="text-contact-mono text-functional"
                    animate={{
                      filter: isLinkedInHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isLinkedInHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    LinkedIn
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-contact-mono flex items-center text-functional"
                    style={{ letterSpacing: '0.02em' }}
                    animate={{
                      filter: isLinkedInHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isLinkedInHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    in/englerandres
                  </motion.div>
                </motion.div>

                {/* Telegram */}
                <motion.div
                  className="cursor-pointer relative"
                  onMouseEnter={() => setIsTelegramHovered(true)}
                  onMouseLeave={() => setIsTelegramHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => window.open('https://t.me/andresengler', '_blank')}
                >
                  <motion.div
                    className="text-contact-mono text-functional"
                    animate={{
                      filter: isTelegramHovered ? "blur(2px)" : "blur(0px)",
                      opacity: isTelegramHovered ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    Telegram
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-contact-mono flex items-center text-functional"
                    style={{ letterSpacing: '0.02em' }}
                    animate={{
                      filter: isTelegramHovered ? "blur(0px)" : "blur(2px)",
                      opacity: isTelegramHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    @andresengler
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}