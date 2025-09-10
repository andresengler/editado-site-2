import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { DigitalClock } from './DigitalClock';
import { FloatingLetters } from './FloatingLetters';

export function Footer() {
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToTop = () => {
    // Debug log para verificar que la función se ejecuta
    console.log('scrollToTop called');
    
    // Si ya estamos scrolleando, no hacer nada
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    // Scroll simple y directo para debugging
    console.log('Attempting scroll to top');
    
    // Scroll inmediato para verificar funcionalidad
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // También usar fallback directo
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setTimeout(() => {
      setIsScrolling(false);
      console.log('Scroll completed');
    }, 1000);
  };

  // Unified arrow component - same for mobile and desktop
  const ArrowButton = () => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToTop();
      }}
      disabled={isScrolling}
      className={`
        back-to-top-button relative inline-flex items-center justify-center 
        p-3 cursor-pointer group z-50
        ${isScrolling 
          ? 'back-to-top-scrolling cursor-wait' 
          : ''
        }
      `}
      aria-label={isScrolling ? "Scrolling to top..." : "Back to top"}
      type="button"
      style={{ 
        zIndex: 9999,
        pointerEvents: 'auto',
        position: 'relative',
        touchAction: 'manipulation',
        userSelect: 'none'
      }}
    >
      {/* Using Lucide React ArrowUp icon with enhanced fluid animation */}
      <ArrowUp 
        size={16} 
        className={`
          arrow-icon-fluid text-functional
          ${isScrolling 
            ? 'arrow-icon-scrolling text-black' 
            : ''
          }
        `}
        strokeWidth={1.5}
      />
    </button>
  );



  return (
    <footer 
      className="flex items-center justify-between shrink-0 relative h-16 px-3 md:px-6 lg:px-0"
      style={{ zIndex: 100 }} // Ensure footer is above overlays
    >
      {/* Floating Letters Background Effect */}
      <FloatingLetters />
      
      {/* Mobile Layout: Clock left, Arrow right */}
      <div className="md:hidden flex items-center justify-between w-full relative z-50">
        <div className="text-footer font-ibm-mono text-functional">
          <DigitalClock isMobile={true} />
        </div>
        <ArrowButton />
      </div>
      
      {/* Desktop Layout: Clock left, Location center, Arrow right */}
      <div className="hidden md:flex md:items-center md:justify-between md:w-full relative z-50">
        {/* Digital Clock (left) */}
        <div className="text-footer font-ibm-mono text-functional">
          <DigitalClock isMobile={false} />
        </div>
        
        {/* Location (center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          {/* Mobile: Buenos Aires, AR */}
          <p className="md:hidden text-footer font-ibm-mono tracking-wide text-functional">
            Buenos Aires, AR
          </p>
          {/* Desktop: Buenos Aires, Argentina */}
          <p className="hidden md:block text-footer font-ibm-mono tracking-wide text-functional">
            Buenos Aires, Argentina
          </p>
        </div>
        
        {/* Back to top arrow (right) */}
        <div style={{ zIndex: 9999, position: 'relative' }}>
          <ArrowButton />
        </div>
      </div>
    </footer>
  );
}