'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EditorialVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  style?: React.CSSProperties;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: any) => void;
  fallbackImage?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  priority?: boolean; // Load immediately without intersection observer
  aesthetic?: 'minimal' | 'refined' | 'cinematic'; // Visual treatment style
  transition?: 'fast' | 'normal' | 'slow'; // Animation timing
}

export function EditorialVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
  style,
  onLoadStart,
  onCanPlay,
  onError,
  fallbackImage,
  aspectRatio = "16/9",
  priority = false,
  aesthetic = 'refined',
  transition = 'normal'
}: EditorialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Enhanced Intersection Observer para lazy loading con aesthetic transitions
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || priority) {
      if (priority) setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Slight delay para coordinar con transiciones de página
            setTimeout(() => {
              setIsInView(true);
            }, transition === 'fast' ? 50 : transition === 'slow' ? 200 : 100);
            observer.unobserve(videoElement);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: aesthetic === 'cinematic' ? '50px' : '20px'
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [priority, aesthetic, transition]);

  // Auto-play cuando esté en vista
  useEffect(() => {
    if (isInView && videoRef.current && autoPlay && !hasError) {
      videoRef.current.play().catch((error) => {
        console.warn('Auto-play failed:', error);
        setHasError(true);
        onError?.(error);
      });
    }
  }, [isInView, autoPlay, hasError, onError]);

  const handleLoadStart = () => {
    setIsLoading(true);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    onCanPlay?.();
  };

  const handleError = (error: any) => {
    setHasError(true);
    setIsLoading(false);
    onError?.(error);
  };

  // Si hay error y tenemos imagen de fallback
  if (hasError && fallbackImage) {
    return (
      <motion.div
        className={`relative overflow-hidden ${className}`}
        style={{ aspectRatio, ...style }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={fallbackImage}
          alt="Video fallback"
          className="w-full h-full object-cover"
          style={{ aspectRatio }}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white/80 text-sm font-ibm-mono">
            Video unavailable
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className} ${aesthetic === 'cinematic' ? 'motion-blur-enhanced' : 'motion-aesthetic'}`}
      style={{ aspectRatio, ...style }}
      initial={{ 
        opacity: 0, 
        scale: aesthetic === 'minimal' ? 1.001 : aesthetic === 'cinematic' ? 1.008 : 1.005,
        filter: aesthetic === 'cinematic' ? 'blur(1px) saturate(0.96)' : 'blur(0.5px) saturate(0.98)'
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px) saturate(1)'
      }}
      transition={{ 
        duration: transition === 'fast' ? 0.4 : transition === 'slow' ? 1.2 : 0.7, 
        ease: [0.19, 1, 0.22, 1],
        opacity: { duration: transition === 'fast' ? 0.3 : transition === 'slow' ? 1.0 : 0.6 },
        filter: { duration: transition === 'fast' ? 0.35 : transition === 'slow' ? 1.1 : 0.65 }
      }}
    >
      {/* Overlay de carga con blur */}
      {isLoading && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center z-10 ${
            aesthetic === 'minimal' ? 'bg-background/95' : 
            aesthetic === 'cinematic' ? 'bg-background/90' : 
            'bg-background/92'
          }`}
          style={{ willChange: 'opacity, backdrop-filter' }}
          initial={{ opacity: 1, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: isLoading ? 1 : 0,
            backdropFilter: isLoading ? 'blur(2px)' : 'blur(0px)'
          }}
          transition={{ 
            duration: transition === 'fast' ? 0.2 : transition === 'slow' ? 0.5 : 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          <motion.div 
            className={`w-6 h-6 border border-functional/30 border-t-functional/60 rounded-full animate-spin ${
              aesthetic === 'minimal' ? 'opacity-60' : 'opacity-80'
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.div>
      )}

      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        className="w-full h-full object-cover"
        style={{ aspectRatio }}
      />

      {/* Aesthetic overlay */}
      <motion.div 
        className={`absolute inset-0 pointer-events-none ${
          aesthetic === 'minimal' ? 'bg-black/2' : 
          aesthetic === 'cinematic' ? 'bg-black/8' : 
          'bg-black/4'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: transition === 'fast' ? 0.5 : transition === 'slow' ? 1.5 : 1.0,
          delay: 0.2
        }}
      />
    </motion.div>
  );
}

// Componente específico para hero video
export function HeroVideo({
  src,
  poster,
  className = '',
  children,
  overlay = true
}: {
  src: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      <EditorialVideo
        src={src}
        poster={poster}
        autoPlay={true}
        loop={true}
        muted={true}
        controls={false}
        className="absolute inset-0"
        aspectRatio="16/9"
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      )}
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Componente para video inline en contenido
export function InlineVideo({
  src,
  poster,
  caption,
  className = ''
}: {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <motion.figure
      className={`my-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <EditorialVideo
        src={src}
        poster={poster}
        controls={true}
        autoPlay={false}
        className="rounded-lg shadow-lg"
        aspectRatio="16/9"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-functional font-ibm-mono">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

// Componente para video background
export function BackgroundVideo({
  src,
  poster,
  className = '',
  children,
  opacity = 0.3
}: {
  src: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
  opacity?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        <EditorialVideo
          src={src}
          poster={poster}
          autoPlay={true}
          loop={true}
          muted={true}
          controls={false}
          className="w-full h-full"
          aspectRatio="16/9"
        />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
