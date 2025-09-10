import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { WorkingIndicator } from './WorkingIndicator';
import { ContactModal } from './ContactModal';
import { useIsMobile } from './ui/use-mobile';

export function AboutPageNext() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const currentlyRef = useRef<HTMLDivElement>(null);
  const lastLineRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();
  
  // Estado para hover - tanto flecha como descripción
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  

  // Descripciones para cada capability
  const capabilityDescriptions = {
    'Narrative Strategy': 'Defining how a brand tells stories with purpose, coherence, and intent.',
    'Brand Positioning': 'Clarifying the role a brand plays in the market — and in the minds of its audience.',
    'Editorial Research': 'Investigating discourse, trends, and cultural contexts to inform narrative decisions.',
    'Content Architecture': 'Designing content structures that guide navigation, understanding, and conversion.',
    'Verbal Identity': 'Crafting a distinctive and adaptable brand voice aligned with strategic and cultural foundations.',
    'Design Systems': 'Developing scalable visual languages that unify products, platforms, and campaigns.',
    'Creative Direction': 'Guiding the visual and conceptual development to achieve strategic objectives.',
    'Campaign Development': 'Creating integrated campaigns that connect brand strategy with audience engagement.',
    'Platform Strategy': 'Identifying and leading emerging technologies and creative methodologies to enhance brand resonance.',
    'Tech Integration': 'Bridging technical capabilities with creative vision to deliver seamless user experiences.'
  };

  // Función para abrir el modal de contacto
  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  // Función para detectar si el usuario está en mobile
  const isInMobile = () => {
    return window.innerWidth < 768;
  };

  // Función para manejar hover en capability names
  const handleCapabilityHover = (capability: string) => {
    if (!isInMobile()) {
      setHoveredCapability(capability);
    }
  };

  const handleCapabilityLeave = () => {
    if (!isInMobile()) {
      setHoveredCapability(null);
    }
  };

  // Función para manejar click en mobile
  const handleCapabilityClick = (capability: string) => {
    if (isInMobile()) {
      setHoveredCapability(hoveredCapability === capability ? null : capability);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (lastLineRef.current) {
      observer.observe(lastLineRef.current);
    }

    return () => {
      if (lastLineRef.current) {
        observer.unobserve(lastLineRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-about about-page-container">
      {/* Page content with proper spacing */}
      <div className="page-content-spacing">
        {/* Main content area */}
        <div className="relative px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Sticky Introduction */}
            <div className="lg:col-span-1">
              <div className="sticky-desktop-only">
                {/* About title */}
                <motion.h2 
                  className="text-section-mono mb-6 lg:mb-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  About
                </motion.h2>

                {/* Main intro paragraph - unified mobile typography */}
                <motion.div 
                  className="max-w-[440px] lg:max-w-none mb-8 lg:mb-12"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <p className="text-hero-mobile-unified text-balanced lg:text-pretty">
                    An editorial studio crafting meaning, beauty, and long-lasting narratives.
                  </p>
                </motion.div>

                {/* Bio content */}
                <motion.div 
                  className="space-y-4 lg:space-y-5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <p className="text-content text-pretty">
                    We specialize in creating narrative strategies and brand identities that resonate across time. 
                    Our approach combines cultural research, strategic positioning, and thoughtful design to develop 
                    meaningful connections between brands and their audiences.
                  </p>

                  <p className="text-content text-pretty">
                    Founded with the belief that good design tells stories, we work with organizations who understand 
                    that lasting impact comes from authenticity, clarity, and intentional craft.
                  </p>

                  <p className="text-content text-pretty">
                    Our practice spans editorial research, content architecture, verbal identity, visual systems, 
                    and strategic direction — all unified by our commitment to creating work that endures.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Capabilities and Currently */}
            <div className="lg:col-span-2 space-y-16 lg:space-y-20">
              
              {/* Capabilities Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-section-mono mb-8 lg:mb-12">Capabilities</h3>
                
                <div className="space-y-4 lg:space-y-6">
                  {Object.entries(capabilityDescriptions).map(([capability, description], index) => (
                    <div key={capability} className="relative">
                      {/* Capability name - clickeable en mobile, hoverable en desktop */}
                      <motion.div
                        className="cursor-pointer lg:cursor-default"
                        onClick={() => handleCapabilityClick(capability)}
                        onMouseEnter={() => handleCapabilityHover(capability)}
                        onMouseLeave={handleCapabilityLeave}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="text-content relative">
                          {capability}
                          
                          {/* Flecha para mobile */}
                          {isMobile && (
                            <motion.span
                              className="inline-block ml-2 text-functional"
                              animate={{ 
                                rotate: hoveredCapability === capability ? 90 : 0 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              →
                            </motion.span>
                          )}
                        </div>
                      </motion.div>

                      {/* Descripción inline - ALINEADA AL BASELINE - Solo desktop */}
                      {!isMobile && (
                        <motion.div
                          className="pointer-events-none hidden md:block -ml-5 lg:-ml-10 xl:-ml-14 max-w-[720px] lg:max-w-[900px] xl:max-w-[1080px] flex items-start"
                          style={{ 
                            position: 'absolute',
                            top: '0', // CLAVE: Alineado exactamente al baseline del texto principal
                            left: '100%',
                            zIndex: 10,
                            marginLeft: '-5rem' // Negative margin for closer positioning 
                          }}
                          animate={{
                            opacity: hoveredCapability === capability ? 1 : 0,
                            filter: hoveredCapability === capability 
                              ? 'blur(0px)' 
                              : 'blur(1px)',
                            y: hoveredCapability === capability ? 0 : 2
                          }}
                          transition={{ 
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        >
                          <p className="text-functional text-[13px] leading-[1.25] text-pretty">
                            {description}
                          </p>
                        </motion.div>
                      )}

                      {/* Descripción desplegable - Solo mobile */}
                      {isMobile && hoveredCapability === capability && (
                        <motion.div
                          className="mt-3 md:hidden"
                          initial={{ opacity: 0, height: 0, y: -5 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -5 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="text-functional text-[13px] leading-[1.25] text-pretty pl-4 border-l border-gray-200">
                            {description}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Currently Section */}
              <motion.div
                ref={currentlyRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-section-mono mb-8 lg:mb-12">Currently</h3>
                
                <div className="space-y-6 lg:space-y-8">
                  {/* Working status */}
                  <div className="flex items-start space-x-3">
                    <WorkingIndicator />
                    <div>
                      <p className="text-content text-pretty">
                        Available for select projects beginning Q2 2024.
                      </p>
                      <p className="text-content text-pretty mt-2">
                        Focus areas include platform strategy, brand repositioning, and editorial systems for emerging technology companies.
                      </p>
                    </div>
                  </div>

                  {/* Contact invitation */}
                  <div className="pt-4">
                    <p className="text-content text-pretty">
                      Interested in working together?{' '}
                      <motion.button
                        onClick={handleContactClick}
                        className="underline underline-offset-2 hover:no-underline transition-all duration-200"
                        whileHover={{ opacity: 0.7 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get in touch
                      </motion.button>
                      .
                    </p>
                  </div>

                  {/* Last element para intersection observer */}
                  <p ref={lastLineRef} className="text-content text-pretty opacity-0 h-1">
                    Observer anchor
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}