import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { WorkingIndicator } from "./WorkingIndicator";
import { ContactModal } from "./ContactModal";
import { useIsMobile } from "./ui/use-mobile";

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] =
    useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const currentlyRef = useRef<HTMLDivElement>(null);
  const lastLineRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();

  // Estado para hover - tanto flecha como descripción
  const [hoveredCapability, setHoveredCapability] = useState<
    string | null
  >(null);

  // Descripciones para cada capability
  const capabilityDescriptions = {
    "Narrative Strategy":
      "Defining how a brand tells stories with purpose, coherence, and intent.",
    "Brand Positioning":
      "Clarifying the role a brand plays in the market — and in the minds of its audience.",
    "Editorial Research":
      "Investigating discourse, trends, and cultural contexts to inform narrative decisions.",
    "Content Architecture":
      "Designing content structures that guide navigation, understanding, and conversion.",
    "Verbal Identity":
      "Crafting a distinctive and adaptable brand voice aligned with strategic and cultural foundations.",
    "Design Systems":
      "Developing scalable visual languages that unify products, platforms, and campaigns.",
    "Aesthetic Direction":
      "Translating brand essence into a unique and expressive visual universe.",
    "Tech Integration":
      "Deploying custom tech solutions and integrating CMS, CRM, and APIs with efficiency and scalability.",
    "Category Definition":
      "Helping brands claim new cultural and strategic space by creating or redefining categories.",
    "Platform Strategy":
      "Identifying and shaping the right channels and formats to amplify brand voice and presence.",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!lastLineRef.current) return;

      const lastLineRect =
        lastLineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Release sticky when the last line is approximately at the same level where the sticky text sits
      const stickyTopPosition = 128; // 8rem = 128px
      const tolerance = 20;

      if (lastLineRect.top <= stickyTopPosition + tolerance) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(18px) saturate(0.8)",
      y: 24,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px) saturate(1)",
      y: 0,
      scale: 1,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.4 },
        filter: { duration: 1.5 },
        y: { duration: 1.6 },
        scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      },
    },
  };

  const simpleTextVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      filter: "blur(1px)",
      scale: 0.99,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.2 },
        y: { duration: 1.3 },
        filter: { duration: 1.0 },
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      },
    },
  };

  const separatorVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.2 },
        scaleX: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 1.0 },
      },
    },
  };

  const sectionTitleVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      x: -16,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.3 },
        filter: { duration: 1.2 },
        x: { duration: 1.4 },
        scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(14px) saturate(0.9)",
      y: 18,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px) saturate(1)",
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        delay: 0.08,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.4 },
        filter: { duration: 1.3 },
        y: { duration: 1.5 },
        scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      },
    },
  };

  // Lista de capabilities para mapear
  const capabilities = [
    "Narrative Strategy",
    "Brand Positioning",
    "Editorial Research",
    "Content Architecture",
    "Verbal Identity",
    "Design Systems",
    "Aesthetic Direction",
    "Tech Integration",
    "Category Definition",
    "Platform Strategy",
  ];

  // Componente reutilizable para capability con hover - ARROWS ADJUSTED FOR MOBILE
  const CapabilityItem = ({
    capability,
    index,
    isMobile = false,
  }: {
    capability: string;
    index: number;
    isMobile?: boolean;
  }) => {
    const isHovered = hoveredCapability === capability;
    const description =
      capabilityDescriptions[
        capability as keyof typeof capabilityDescriptions
      ];

    return (
      <motion.div
        className="relative cursor-default flex items-center"
        onMouseEnter={() => setHoveredCapability(capability)}
        onMouseLeave={() => setHoveredCapability(null)}
        onTouchStart={() =>
          isMobile && setHoveredCapability(capability)
        }
        onTouchEnd={() =>
          isMobile &&
          setTimeout(() => setHoveredCapability(null), 1500)
        }
        initial={false}
        style={{
          height: "18px",
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Flecha para mobile - a la derecha, mirando izquierda */}
        {isMobile && (
          <motion.span
            className="absolute text-black/40 pointer-events-none"
            initial={{ opacity: 0, x: -12 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? -20 : -12,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              right: "0px",
            }}
          >
            ←
          </motion.span>
        )}

        {/* Flecha para desktop - a la izquierda, mirando derecha */}
        {!isMobile && (
          <motion.span
            className="absolute left-0 text-black/40 pointer-events-none"
            initial={{ opacity: 0, x: -12 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? -20 : -12,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              fontSize: "14px",
              lineHeight: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ↳
          </motion.span>
        )}

        {/* Texto de la capability */}
        <motion.div
          className="w-[180px] md:w-[200px] lg:w-[220px] flex-shrink-0"
          initial={false}
          animate={{
            x:
              !isMobile && isHovered
                ? 10
                : isMobile && isHovered
                  ? 10
                  : 0,
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
            x: { duration: 0.35 },
            scale: { duration: 0.3 },
          }}
        >
          <p
            className="relative text-black hover:text-black/80 transition-all duration-300 whitespace-nowrap font-sans text-content"
            style={{
              lineHeight: "1.25",
              height: "18px",
              margin: "0",
              padding: "0",
              display: "flex",
              alignItems: "center",
              filter: isHovered
                ? "brightness(1.05)"
                : "brightness(1)",
              letterSpacing: isHovered ? "0.005em" : "0em",
            }}
          >
            {capability}
          </p>
        </motion.div>

        {/* Descripción inline - ALINEADA AL BASELINE - Solo desktop */}
        {!isMobile && (
          <motion.div
            className="pointer-events-none hidden md:block -ml-5 lg:-ml-10 xl:-ml-14 max-w-[720px] lg:max-w-[900px] xl:max-w-[1080px] flex items-start"
            initial={{
              opacity: 0,
              filter: "blur(8px)",
              x: -10,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              filter: isHovered ? "blur(0px)" : "blur(8px)",
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              height: "18px",
            }}
          >
            <p
              className="text-navigation tracking-wide font-ibm-mono text-functional"
              style={{
                fontSize: "13px",
                lineHeight: "1.25",
                margin: "0",
                padding: "0",
              }}
            >
              {description}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <motion.div
          className="space-y-10 w-full px-3 pt-32 pb-28 lg:pb-32 min-h-screen"
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Featured text for mobile - Tighter line height */}
          <motion.div
            className="mb-12"
            variants={simpleTextVariants}
          >
            <h1 className="text-hero-mobile-unified tracking-normal">
              We shape stories, aesthetics, and strategies as
              gestures of clarity, care, and permanence
            </h1>
          </motion.div>

          {/* About Section - MONO EDITORIAL */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-footer tracking-wide leading-tight font-ibm-mono mb-4 text-functional"
              variants={sectionTitleVariants}
            >
              About
            </motion.h2>
            <motion.div
              className="space-y-4 text-content tracking-wide leading-tight font-sans text-sm"
              variants={contentVariants}
            >
              <p>
                Editado Studio is an editorial practice focused
                on publishing, research, and narrative design.
                We collaborate with media outlets, foundations,
                and independent creators to shape stories,
                aesthetics, and strategies with clarity and
                purpose.
              </p>
              <p>
                Our work spans building narrative frameworks,
                refining editorial voice, and prototyping
                content ecosystems that are culturally attuned
                and strategically grounded.
              </p>
            </motion.div>
          </motion.div>

          {/* Separator */}
          <motion.div
            className="w-full h-px bg-gray-300/80 my-8 origin-left"
            variants={separatorVariants}
          ></motion.div>

          {/* Capabilities Section - MONO EDITORIAL */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-footer tracking-wide leading-tight font-ibm-mono mb-4 text-functional"
              variants={sectionTitleVariants}
            >
              Capabilities
            </motion.h2>
            {/* Spacing perfecto en mobile */}
            <motion.div
              className="font-sans text-sm"
              variants={contentVariants}
            >
              {capabilities.map((capability, index) => (
                <CapabilityItem
                  key={capability}
                  capability={capability}
                  index={index}
                  isMobile={true}
                />
              ))}
            </motion.div>

            {/* Description para mobile - aparece debajo en mobile */}
            <motion.div
              className="mt-6 overflow-hidden"
              animate={{
                height: hoveredCapability ? "auto" : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="py-4 px-3"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{
                  opacity: hoveredCapability ? 1 : 0,
                  filter: hoveredCapability
                    ? "blur(0px)"
                    : "blur(10px)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {hoveredCapability && (
                  <p className="text-[13px] text-[#666666] font-ibm-mono leading-tight tracking-wide">
                    {
                      capabilityDescriptions[
                        hoveredCapability as keyof typeof capabilityDescriptions
                      ]
                    }
                  </p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Separator */}
          <motion.div
            className="w-full h-px bg-gray-300/80 my-8 origin-left"
            variants={separatorVariants}
          ></motion.div>

          {/* Currently Section - MONO EDITORIAL */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-footer tracking-wide leading-tight font-ibm-mono mb-4 flex items-center text-functional"
              variants={sectionTitleVariants}
            >
              Currently
              <WorkingIndicator />
            </motion.h2>
            <motion.div
              className="space-y-2.5 text-content tracking-wide leading-normal font-sans text-sm"
              variants={contentVariants}
            >
              <p>
                Helping a leading crypto media outlet scale its
                editorial and distribution strategy across
                languages and markets.
              </p>
              <p>
                Ideating an alternative media outlet that covers
                Argentina's food system and maps local real-food
                brands.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout - Perfect baseline alignment */}
      <div className="hidden md:block">
        <div className="px-3 md:px-6 lg:px-0 pt-32 lg:pt-40 pb-28 lg:pb-32 page-content-spacing">
          {/* 50/50 grid layout with baseline alignment */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">
            {/* Left Column - STICKY Lorem ipsum text */}
            <div className="pr-6 md:pr-8 lg:pr-10">
              {/* Sticky positioning with baseline alignment to About title */}
              <div
                className="fixed-desktop-only"
                style={{
                  // Optimized for desktop fixed positioning while maintaining mobile flow
                  paddingTop: "0px",
                }}
              >
                <motion.h1
                  className="font-sans text-[36px] lg:text-[42px] xl:text-[48px] tracking-normal leading-[1.02] max-w-[98%]"
                  initial="hidden"
                  animate="visible"
                  variants={simpleTextVariants}
                  style={{
                    // Fine-tune alignment with About section - negative margin to align baseline
                    marginTop: "-8px",
                    paddingTop: "0px",
                  }}
                >
                  We shape stories and aesthetics as gestures of
                  clarity and care.
                </motion.h1>
              </div>
            </div>

            {/* Right Column - Content aligned to Lorem ipsum baseline */}
            <div className="scrollable-content-column">
              <motion.div
                className="space-y-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  // Remove any top margin/padding to ensure alignment
                  marginTop: "0px",
                  paddingTop: "0px",
                }}
              >
                {/* About Section - ALIGNED TO LOREM IPSUM BASELINE */}
                <motion.div
                  className="grid grid-cols-12 gap-2 lg:gap-3 items-start mb-12 lg:mb-16"
                  variants={itemVariants}
                  style={{
                    // Ensure perfect alignment with Lorem ipsum
                    marginTop: "0px",
                    paddingTop: "0px",
                  }}
                >
                  <motion.div
                    className="col-span-3 lg:col-span-3"
                    variants={sectionTitleVariants}
                    style={{
                      // Fine-tune vertical alignment
                      paddingTop: "0px", // Alineación perfecta con baseline del Lorem ipsum
                    }}
                  >
                    <h2 className="text-footer tracking-wide leading-tight font-ibm-mono font-normal text-functional">
                      About
                    </h2>
                  </motion.div>
                  <motion.div
                    className="col-start-4 col-span-9 lg:col-start-4 lg:col-span-9"
                    variants={contentVariants}
                    style={{
                      paddingTop: "0px",
                    }}
                  >
                    <div className="space-y-5 text-content tracking-wide leading-tight font-sans">
                      <p>
                        Editado Studio is an editorial practice
                        focused on publishing, research, and
                        narrative design. We collaborate with
                        media outlets, foundations, and
                        independent creators to shape stories,
                        aesthetics, and strategies with clarity
                        and purpose.
                      </p>
                      <p>
                        Our work spans building narrative
                        frameworks, refining editorial voice,
                        and prototyping content ecosystems that
                        are culturally attuned and strategically
                        grounded.
                      </p>
                      <p>
                        The studio was founded by{" "}
                        <a
                          href="https://andresengler.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block transition-colors hover:text-gray-500"
                        >
                          Andrés Engler
                        </a>
                        , an entrepreneur and editor based in
                        Buenos Aires with over a decade of
                        experience in international media,
                        including CoinDesk, and cited by outlets
                        such as the Financial Times and El País.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Separator - SPACING REDUCIDO */}
                <motion.div
                  className="w-full h-px bg-gray-300/80 mb-4 origin-left"
                  variants={separatorVariants}
                ></motion.div>

                {/* Capabilities Section - MONO EDITORIAL */}
                <motion.div
                  className="grid grid-cols-12 gap-2 lg:gap-3 items-start mb-12 lg:mb-16"
                  variants={itemVariants}
                >
                  <motion.div
                    className="col-span-3 lg:col-span-3"
                    variants={sectionTitleVariants}
                  >
                    <h2 className="text-footer tracking-wide leading-tight font-ibm-mono font-normal text-functional">
                      Capabilities
                    </h2>
                  </motion.div>
                  <motion.div
                    className="col-start-4 col-span-9 lg:col-start-4 lg:col-span-9"
                    variants={contentVariants}
                  >
                    {/* SPACING PERFECTO */}
                    <div className="font-sans overflow-visible">
                      {capabilities.map((capability, index) => (
                        <CapabilityItem
                          key={capability}
                          capability={capability}
                          index={index}
                          isMobile={false}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Separator - SPACING REDUCIDO */}
                <motion.div
                  className="w-full h-px bg-gray-300/80 mb-4 origin-left"
                  variants={separatorVariants}
                ></motion.div>

                {/* Currently Section - MONO EDITORIAL */}
                <motion.div
                  ref={currentlyRef}
                  className="grid grid-cols-12 gap-2 lg:gap-3 items-start"
                  variants={itemVariants}
                >
                  <motion.div
                    className="col-span-3 lg:col-span-3"
                    variants={sectionTitleVariants}
                  >
                    <h2 className="text-footer tracking-wide leading-tight font-ibm-mono font-normal flex items-center text-functional">
                      Currently
                      <WorkingIndicator />
                    </h2>
                  </motion.div>
                  <motion.div
                    className="col-start-4 col-span-9 lg:col-start-4 lg:col-span-9"
                    variants={contentVariants}
                  >
                    <div className="space-y-2.5 text-content tracking-wide leading-normal font-sans">
                      <p>
                        Helping a leading crypto media outlet
                        scale its editorial and distribution
                        strategy across languages and markets.
                      </p>
                      <p ref={lastLineRef}>
                        Ideating an alternative media outlet
                        that covers Argentina's food system and
                        maps local real-food brands.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
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
    </>
  );
}