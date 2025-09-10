import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import bookImage from 'figma:asset/2a658beac4ea2597958ee8d1facf122c5df5cfe6.png';

interface MidjourneyVideoProps {
  className?: string;
}

export function MidjourneyVideo({ className = "" }: MidjourneyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate video loading and play
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle video load/error events
  const handleVideoLoad = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setError(true);
      });
    }
  };

  const handleVideoError = () => {
    setError(true);
  };

  // If error or no video support, fallback to image
  if (error) {
    return (
      <motion.img 
        src={bookImage}
        alt="Person reading a book"
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Video container with aesthetic movements */}
      <motion.div
        className="relative overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Simulated aesthetic video - using animated image with creative transitions */}
        <motion.div
          className="relative w-full h-auto"
          animate={{
            scale: [1, 1.02, 0.98, 1],
            rotate: [0, 0.5, -0.3, 0],
            x: [0, 2, -1, 0],
            y: [0, -1, 1, 0]
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {/* Base image with cinematic overlay effects */}
          <motion.img 
            src={bookImage}
            alt="Person reading a book - Cinematic Movement"
            className="w-full h-auto block"
            style={{
              filter: "contrast(1.05) brightness(0.98) saturate(1.1)"
            }}
          />
          
          {/* Aesthetic light rays effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 300px 200px at 30% 20%, rgba(255,248,220,0.15) 0%, transparent 50%),
                radial-gradient(ellipse 200px 300px at 70% 80%, rgba(255,245,210,0.1) 0%, transparent 60%)
              `
            }}
            animate={{
              opacity: [0.3, 0.6, 0.4, 0.3],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Page turning effect simulation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)
              `,
              backgroundSize: "200% 200%"
            }}
            animate={{
              backgroundPosition: ["-100% -100%", "100% 100%", "-100% -100%"]
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Subtle shadow movement */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 400px 100px at 50% 90%, rgba(0,0,0,0.1) 0%, transparent 70%)
              `
            }}
            animate={{
              scale: [1, 1.1, 0.9, 1],
              x: [0, 3, -2, 0]
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
        
        {/* Floating reading particles */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-30"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 8)}%`
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 5, -3, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 6 + (i * 0.8),
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>
        
        {/* Cinematic breathing effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.02) 100%)
            `
          }}
          animate={{
            scale: [1, 1.008, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.div>
      
      {/* Loading state */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </div>
  );
}