import { motion } from 'motion/react';
import { EditorialVideo } from './EditorialVideo';
import { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  children?: React.ReactNode;
  opacity?: number;
  overlay?: boolean;
  parallax?: boolean;
  className?: string;
  aesthetic?: 'minimal' | 'refined' | 'cinematic';
}

export function VideoBackground({
  videoSrc,
  posterSrc,
  children,
  opacity = 0.4,
  overlay = true,
  parallax = false,
  className = '',
  aesthetic = 'refined'
}: VideoBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity,
          transform: parallax ? `translateY(${scrollY * 0.5}px) scale(1.1)` : 'none'
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
          aesthetic={aesthetic}
          transition="slow"
          priority={true}
        />
      </motion.div>
      
      {/* Optional overlay for better text readability */}
      {overlay && (
        <motion.div 
          className={`absolute inset-0 ${
            aesthetic === 'minimal' ? 'bg-background/20' :
            aesthetic === 'cinematic' ? 'bg-black/30' :
            'bg-background/25'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

// Background video específicamente para Manifesto
export function ManifestoVideoBackground({ 
  videoSrc, 
  posterSrc, 
  children 
}: { 
  videoSrc: string; 
  posterSrc?: string; 
  children?: React.ReactNode; 
}) {
  return (
    <VideoBackground
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      opacity={0.15}
      overlay={true}
      parallax={true}
      className="min-h-screen"
      aesthetic="minimal"
    >
      <div className="bg-manifesto/90 min-h-screen">
        {children}
      </div>
    </VideoBackground>
  );
}

// Subtle atmospheric video background
export function AtmosphericVideoBackground({ 
  videoSrc, 
  posterSrc, 
  children,
  intensity = 'subtle'
}: { 
  videoSrc: string; 
  posterSrc?: string; 
  children?: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
}) {
  const getOpacity = () => {
    switch (intensity) {
      case 'subtle': return 0.08;
      case 'medium': return 0.15;
      case 'strong': return 0.25;
      default: return 0.08;
    }
  };

  return (
    <VideoBackground
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      opacity={getOpacity()}
      overlay={false}
      parallax={false}
      aesthetic="minimal"
    >
      {/* Ultra-subtle texture overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 1.0 }}
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(245,244,242,0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245,244,242,0.015) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(245,244,242,0.01) 0%, transparent 60%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 500px 500px'
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </VideoBackground>
  );
}

// Video curtain effect - slides in as background
export function VideoCurtain({ 
  videoSrc, 
  posterSrc, 
  isOpen = false, 
  children,
  direction = 'up' 
}: { 
  videoSrc: string; 
  posterSrc?: string; 
  isOpen?: boolean; 
  children?: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const getTransform = () => {
    if (!isOpen) {
      switch (direction) {
        case 'up': return 'translateY(100%)';
        case 'down': return 'translateY(-100%)';
        case 'left': return 'translateX(100%)';
        case 'right': return 'translateX(-100%)';
        default: return 'translateY(100%)';
      }
    }
    return 'translate(0, 0)';
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ transform: getTransform() }}
      animate={{ transform: isOpen ? 'translate(0, 0)' : getTransform() }}
      transition={{ 
        duration: 1.2, 
        ease: [0.19, 1, 0.22, 1],
        type: "tween"
      }}
    >
      <VideoBackground
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        opacity={0.6}
        overlay={true}
        aesthetic="cinematic"
        className="w-full h-full"
      >
        <motion.div
          className="relative z-20 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
          transition={{ 
            duration: 0.8, 
            delay: isOpen ? 0.4 : 0,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          {children}
        </motion.div>
      </VideoBackground>
    </motion.div>
  );
}

// Video grid layout
export function VideoGrid({ 
  videos, 
  columns = 3 
}: { 
  videos: Array<{
    src: string;
    poster?: string;
    title?: string;
    description?: string;
  }>; 
  columns?: number;
}) {
  return (
    <div className={`grid gap-6 ${
      columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
      columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {videos.map((video, index) => (
        <motion.div
          key={index}
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: [0.19, 1, 0.22, 1]
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <EditorialVideo
            src={video.src}
            poster={video.poster}
            controls={true}
            autoPlay={false}
            className="rounded-lg shadow-lg hover-aesthetic"
            aspectRatio="16/9"
            aesthetic="refined"
            transition="normal"
          />
          {video.title && (
            <h3 className="text-content font-medium">{video.title}</h3>
          )}
          {video.description && (
            <p className="text-functional font-ibm-mono text-[13px] leading-tight">
              {video.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Video testimonial component
export function VideoTestimonial({ 
  videoSrc, 
  posterSrc,
  quote,
  author,
  role 
}: {
  videoSrc: string;
  posterSrc?: string;
  quote: string;
  author: string;
  role?: string;
}) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <EditorialVideo
          src={videoSrc}
          poster={posterSrc}
          controls={true}
          autoPlay={false}
          className="rounded-xl shadow-xl"
          aspectRatio="16/10"
          aesthetic="cinematic"
          transition="normal"
        />
      </motion.div>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <blockquote className="text-content leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="text-functional font-ibm-mono text-[13px]">
          <p className="font-medium">{author}</p>
          {role && <p className="opacity-80">{role}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}