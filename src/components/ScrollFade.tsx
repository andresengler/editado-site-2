import { useEffect, useState } from 'react';

interface ScrollFadeProps {
  page?: 'home' | 'about' | 'manifesto';
  className?: string;
}

export function ScrollFade({ page = 'home', className = '' }: ScrollFadeProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Calculate scroll progress for dynamic opacity
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;
      setScrollProgress(progress);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Get background colors based on page
  const getBackgroundGradients = () => {
    switch (page) {
      case 'about':
        return {
          top: `linear-gradient(
            to bottom,
            var(--background-about) 0%,
            color-mix(in srgb, var(--background-about) 95%, transparent) 15%,
            color-mix(in srgb, var(--background-about) 85%, transparent) 35%,
            color-mix(in srgb, var(--background-about) 60%, transparent) 55%,
            color-mix(in srgb, var(--background-about) 30%, transparent) 75%,
            color-mix(in srgb, var(--background-about) 10%, transparent) 90%,
            transparent 100%
          )`,
          bottom: `linear-gradient(
            to top,
            var(--background-about) 0%,
            color-mix(in srgb, var(--background-about) 95%, transparent) 15%,
            color-mix(in srgb, var(--background-about) 85%, transparent) 35%,
            color-mix(in srgb, var(--background-about) 60%, transparent) 55%,
            color-mix(in srgb, var(--background-about) 30%, transparent) 75%,
            color-mix(in srgb, var(--background-about) 10%, transparent) 90%,
            transparent 100%
          )`
        };
      case 'manifesto':
        return {
          top: `linear-gradient(
            to bottom,
            var(--background-manifesto) 0%,
            color-mix(in srgb, var(--background-manifesto) 95%, transparent) 15%,
            color-mix(in srgb, var(--background-manifesto) 85%, transparent) 35%,
            color-mix(in srgb, var(--background-manifesto) 60%, transparent) 55%,
            color-mix(in srgb, var(--background-manifesto) 30%, transparent) 75%,
            color-mix(in srgb, var(--background-manifesto) 10%, transparent) 90%,
            transparent 100%
          )`,
          bottom: `linear-gradient(
            to top,
            var(--background-manifesto) 0%,
            color-mix(in srgb, var(--background-manifesto) 95%, transparent) 15%,
            color-mix(in srgb, var(--background-manifesto) 85%, transparent) 35%,
            color-mix(in srgb, var(--background-manifesto) 60%, transparent) 55%,
            color-mix(in srgb, var(--background-manifesto) 30%, transparent) 75%,
            color-mix(in srgb, var(--background-manifesto) 10%, transparent) 90%,
            transparent 100%
          )`
        };
      default: // home
        return {
          top: `linear-gradient(
            to bottom,
            var(--background) 0%,
            color-mix(in srgb, var(--background) 95%, transparent) 15%,
            color-mix(in srgb, var(--background) 85%, transparent) 35%,
            color-mix(in srgb, var(--background) 60%, transparent) 55%,
            color-mix(in srgb, var(--background) 30%, transparent) 75%,
            color-mix(in srgb, var(--background) 10%, transparent) 90%,
            transparent 100%
          )`,
          bottom: `linear-gradient(
            to top,
            var(--background) 0%,
            color-mix(in srgb, var(--background) 95%, transparent) 15%,
            color-mix(in srgb, var(--background) 85%, transparent) 35%,
            color-mix(in srgb, var(--background) 60%, transparent) 55%,
            color-mix(in srgb, var(--background) 30%, transparent) 75%,
            color-mix(in srgb, var(--background) 10%, transparent) 90%,
            transparent 100%
          )`
        };
    }
  };

  const gradients = getBackgroundGradients();

  // Dynamic opacity based on scroll position and content
  const topOpacity = Math.min(scrollProgress * 2, 1) * 0.9; // Fade in as we scroll down
  const bottomOpacity = Math.min((1 - scrollProgress) * 2, 1) * 0.9; // Fade out near bottom

  return (
    <>
      {/* Top fade - sticky to viewport top, appears when scrolling */}
      <div 
        className={`
          scroll-fade-sticky-top
          ${isScrolling ? 'scroll-fade-active' : ''}
          ${className}
        `}
        style={{
          background: gradients.top,
          opacity: scrollProgress > 0.05 ? topOpacity : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Bottom fade - sticky to viewport bottom, visible until near end */}
      <div 
        className={`
          scroll-fade-sticky-bottom
          ${isScrolling ? 'scroll-fade-active' : ''}
          ${className}
        `}
        style={{
          background: gradients.bottom,
          opacity: scrollProgress < 0.95 ? bottomOpacity : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </>
  );
}