import { ArrowUp } from 'lucide-react';
import { DigitalClock } from './DigitalClock';
import { useIsMobile } from './ui/use-mobile';

export function LandingFooter() {
  const isMobile = useIsMobile();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="flex items-center justify-between shrink-0 relative h-16 px-3 md:px-6 lg:px-6">
      
      {/* Block 1: Editorial tagline (left) */}
      <div className="relative z-10">
        <p className={`font-display tracking-wide leading-tight whitespace-nowrap ${isMobile ? 'hidden' : 'text-[15px]'}`}>
          An editorial studio crafting meaning, beauty, and long-lasting narratives.
        </p>
      </div>
      
      {/* Block 2: Digital Clock (center) */}
      {!isMobile && (
        <div className="relative z-10">
          <DigitalClock />
        </div>
      )}
      
      {/* Block 3: Back to top arrow (right) */}
      <div className="relative z-10">
        <button
          onClick={scrollToTop}
          className="text-[15px] tracking-wide relative inline-block transition-colors hover:text-gray-500 font-display p-2"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
      
      {/* Mobile Layout - Clock positioned between tagline and arrow */}
      {isMobile && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 relative z-10">
          <div className="text-[12px]">
            <DigitalClock />
          </div>
        </div>
      )}
    </footer>
  );
}