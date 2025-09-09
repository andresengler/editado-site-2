import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AnimatedLogo() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded(prev => !prev);
    }, 4500); // Cambia cada 4.5 segundos para dar tiempo a la animación

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-8 relative min-w-[40px]">
      <div className="flex items-center font-sans text-section-title">
        
        {/* E -> Editado */}
        <motion.div className="relative flex items-center">
          <motion.span
            animate={{
              opacity: isExpanded ? 0 : 1,
              filter: isExpanded ? 'blur(8px)' : 'blur(0px)',
              x: isExpanded ? -10 : 0
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute"
          >
            E
          </motion.span>
          
          <motion.span
            animate={{
              opacity: isExpanded ? 1 : 0,
              filter: isExpanded ? 'blur(0px)' : 'blur(8px)',
              x: isExpanded ? 0 : 10
            }}
            transition={{ 
              duration: 0.6,
              delay: isExpanded ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={isExpanded ? 'relative' : 'absolute opacity-0'}
          >
            Editado
          </motion.span>
        </motion.div>

        {/* Espacio dinámico */}
        <motion.div
          animate={{
            width: isExpanded ? '8px' : '0px',
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ 
            duration: 0.4,
            delay: isExpanded ? 0.5 : 0,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />

        {/* S -> Studio */}
        <motion.div className="relative flex items-center">
          <motion.span
            animate={{
              opacity: isExpanded ? 0 : 1,
              filter: isExpanded ? 'blur(8px)' : 'blur(0px)',
              x: isExpanded ? 20 : 0
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute"
          >
            S
          </motion.span>
          
          <motion.span
            animate={{
              opacity: isExpanded ? 1 : 0,
              filter: isExpanded ? 'blur(0px)' : 'blur(8px)',
              x: isExpanded ? 0 : -20
            }}
            transition={{ 
              duration: 0.6,
              delay: isExpanded ? 0.4 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={isExpanded ? 'relative' : 'absolute opacity-0'}
          >
            Studio
          </motion.span>
        </motion.div>
        
      </div>
    </div>
  );
}