import { motion, AnimatePresence } from 'motion/react';
import { EditorialVideo } from './EditorialVideo';
import { useState, useEffect } from 'react';

// Video transition overlay que se integra con tu sistema actual
export function VideoTransitionOverlay({ 
  isActive, 
  videoSrc, 
  posterSrc,
  intensity = 'medium' 
}: {
  isActive: boolean;
  videoSrc: string;
  posterSrc?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}) {
  const getOpacity = () => {
    switch (intensity) {
      case 'subtle': return 0.12;
      case 'medium': return 0.2;
      case 'strong': return 0.35;
      default: return 0.2;
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: getOpacity() }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          <EditorialVideo
            src={videoSrc}
            poster={posterSrc}
            autoPlay={true}
            loop={true}
            muted={true}
            controls={false}
            className="w-full h-full object-cover"
            aesthetic="minimal"
            transition="fast"
            priority={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Page transition con video reveal
export function VideoPageTransition({ 
  isTransitioning, 
  videoSrc, 
  posterSrc,
  children 
}: {
  isTransitioning: boolean;
  videoSrc: string;
  posterSrc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Video reveal overlay durante transición */}
      <motion.div
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: isTransitioning ? 35 : -1 }}
        animate={{
          clipPath: isTransitioning 
            ? 'circle(150% at 50% 50%)' 
            : 'circle(0% at 50% 50%)'
        }}
        transition={{
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1]
        }}
      >
        <EditorialVideo
          src={videoSrc}
          poster={posterSrc}
          autoPlay={true}
          loop={true}
          muted={true}
          controls={false}
          className="w-full h-full object-cover"
          aesthetic="cinematic"
          transition="fast"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        animate={{
          filter: isTransitioning 
            ? 'blur(8px) saturate(0.8)' 
            : 'blur(0px) saturate(1)',
          scale: isTransitioning ? 0.95 : 1
        }}
        transition={{
          duration: 0.6,
          ease: [0.19, 1, 0.22, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Video-enhanced floating letters
export function VideoFloatingElements({ 
  videoSrc, 
  posterSrc, 
  isVisible = true 
}: {
  videoSrc: string;
  posterSrc?: string;
  isVisible?: boolean;
}) {
  const [elements] = useState(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isVisible ? 0.15 : 0, 
            scale: isVisible ? 1 : 0,
            rotate: 360,
            x: Math.sin(element.id) * 20,
            y: Math.cos(element.id) * 15
          }}
          transition={{
            duration: 20 + element.delay * 10,
            repeat: Infinity,
            ease: "linear",
            opacity: { duration: 1, delay: element.delay }
          }}
        >
          <div 
            className="w-full h-full rounded-full overflow-hidden opacity-60"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          >
            <EditorialVideo
              src={videoSrc}
              poster={posterSrc}
              autoPlay={true}
              loop={true}
              muted={true}
              controls={false}
              className="w-full h-full object-cover scale-150"
              aesthetic="minimal"
              transition="fast"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Video modal/lightbox integrado con tu sistema
export function VideoLightbox({ 
  isOpen, 
  onClose, 
  videoSrc, 
  posterSrc,
  title 
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc?: string;
  title?: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with enhanced blur */}
          <motion.div
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(25px) saturate(1.1) brightness(0.7)',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(25px) saturate(1.1) brightness(0.7)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          
          {/* Video container */}
          <motion.div
            className="relative z-10 w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.19, 1, 0.22, 1],
              delay: 0.1
            }}
          >
            {title && (
              <motion.h3
                className="text-center mb-4 text-white text-lg font-ibm-mono"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {title}
              </motion.h3>
            )}
            
            <EditorialVideo
              src={videoSrc}
              poster={posterSrc}
              controls={true}
              autoPlay={true}
              className="w-full rounded-xl shadow-2xl"
              aspectRatio="16/9"
              aesthetic="cinematic"
              transition="normal"
              priority={true}
            />
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-12 -right-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Integrated video hover effect
export function VideoHoverCard({ 
  videoSrc, 
  posterSrc,
  title,
  description,
  className = '' 
}: {
  videoSrc: string;
  posterSrc?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Video */}
      <div className="overflow-hidden rounded-lg">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <EditorialVideo
            src={videoSrc}
            poster={posterSrc}
            autoPlay={isHovered}
            loop={true}
            muted={true}
            controls={false}
            className="w-full"
            aspectRatio="16/9"
            aesthetic="refined"
            transition="fast"
          />
        </motion.div>
      </div>
      
      {/* Overlay content */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white space-y-1">
          <h3 className="font-medium text-content">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 font-ibm-mono">{description}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}