import { useState } from 'react';
import { motion } from 'motion/react';
import { EditorialVideo } from './EditorialVideo';
import { useIsMobile } from './ui/use-mobile';

interface HomePageVideoProps {
  videoSrc: string;
  posterSrc?: string;
  fallbackImageSrc?: string;
  tagline?: string;
}

export function HomePageVideo({ 
  videoSrc, 
  posterSrc, 
  fallbackImageSrc,
  tagline = "An editorial studio crafting meaning, beauty, and long-lasting narratives."
}: HomePageVideoProps) {
  const isMobile = useIsMobile();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Enhanced desktop animations - coordinated with existing system
  const desktopVariants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(24px) saturate(0.8)',
      scale: 1.01
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px) saturate(1)',
      scale: 1,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.5 },
        filter: { duration: 1.6 },
        scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
      }
    }
  };

  // Enhanced mobile animations - matching existing HomePage
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      y: 16,
      scale: 0.98,
      filter: 'blur(1px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.9 },
        y: { duration: 1.0 },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.7 }
      }
    }
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };
  
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 -mt-16">
        {/* Contenedor centrado para video y texto */}
        <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
          
          {/* Video centrado con aspect ratio móvil optimizado */}
          <motion.div 
            className="flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={mobileVariants}
          >
            <div className="w-48 sm:w-52 max-w-full">
              <EditorialVideo
                src={videoSrc}
                poster={posterSrc}
                fallbackImage={fallbackImageSrc}
                autoPlay={true}
                loop={true}
                muted={true}
                controls={false}
                className="rounded-lg shadow-lg motion-aesthetic"
                aspectRatio="4/3"
                aesthetic="refined"
                transition="normal"
                priority={true}
                onCanPlay={handleVideoCanPlay}
              />
            </div>
          </motion.div>
          
          {/* Frase centrada debajo */}
          <motion.div 
            className="flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { 
                opacity: 0, 
                y: 18,
                scale: 0.96,
                filter: 'blur(1.5px)'
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 1.1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 1.0 },
                  y: { duration: 1.1 },
                  scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 0.8 }
                }
              }
            }}
          >
            <div className="w-full max-w-[300px] sm:max-w-[340px] text-center">
              <p className="text-hero-mobile-unified text-balance">
                {tagline}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  // Layout para desktop - Tagline a la izquierda, video a la derecha
  return (
    <div className="flex-1 relative min-h-0">
      <div className="w-full py-24">
        <div className="grid grid-cols-12 items-end gap-8">
          <motion.div 
            className="col-span-8"
            initial="hidden"
            animate="visible"
            variants={{
              ...desktopVariants,
              visible: {
                ...desktopVariants.visible,
                transition: {
                  ...desktopVariants.visible.transition,
                  delay: 0.15
                }
              }
            }}
          >
            <h1 
              className="font-sans tracking-normal leading-[1.02] text-[40px] lg:text-[48px] xl:text-[56px]"
              style={{ fontWeight: 400 }}
            >
              {tagline}
            </h1>
          </motion.div>
          <motion.div 
            className="col-span-4 flex justify-end"
            initial="hidden"
            animate="visible"
            variants={{
              ...desktopVariants,
              visible: {
                ...desktopVariants.visible,
                transition: {
                  ...desktopVariants.visible.transition,
                  delay: 0.4
                }
              }
            }}
          >
            <div className="w-44 sm:w-52 md:w-56 lg:w-64 xl:w-72 2xl:w-80">
              <EditorialVideo
                src={videoSrc}
                poster={posterSrc}
                fallbackImage={fallbackImageSrc}
                autoPlay={true}
                loop={true}
                muted={true}
                controls={false}
                className="rounded-xl shadow-xl hover-aesthetic motion-aesthetic"
                aspectRatio="4/3"
                aesthetic="cinematic"
                transition="slow"
                priority={true}
                onCanPlay={handleVideoCanPlay}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Componente para video hero fullscreen
export function VideoHeroPage({ 
  videoSrc, 
  posterSrc, 
  children,
  overlay = true,
  aesthetic = 'cinematic'
}: {
  videoSrc: string;
  posterSrc?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  aesthetic?: 'minimal' | 'refined' | 'cinematic';
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <EditorialVideo
        src={videoSrc}
        poster={posterSrc}
        autoPlay={true}
        loop={true}
        muted={true}
        controls={false}
        className="absolute inset-0 object-cover"
        aspectRatio="16/9"
        aesthetic={aesthetic}
        transition="slow"
        priority={true}
      />
      
      {overlay && (
        <motion.div 
          className={`absolute inset-0 ${
            aesthetic === 'minimal' ? 'bg-gradient-to-b from-black/10 via-transparent to-black/15' :
            aesthetic === 'cinematic' ? 'bg-gradient-to-b from-black/30 via-transparent to-black/40' :
            'bg-gradient-to-b from-black/20 via-transparent to-black/25'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      )}
      
      {children && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// Componente para about page con video
export function AboutPageVideo({ 
  videoSrc, 
  posterSrc,
  caption,
  position = 'right' 
}: {
  videoSrc: string;
  posterSrc?: string;
  caption?: string;
  position?: 'left' | 'right';
}) {
  return (
    <motion.div
      className={`w-full ${position === 'right' ? 'justify-end' : 'justify-start'} flex`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="max-w-sm lg:max-w-md">
        <EditorialVideo
          src={videoSrc}
          poster={posterSrc}
          controls={true}
          autoPlay={false}
          className="rounded-lg shadow-xl hover-editorial"
          aspectRatio="16/10"
          aesthetic="refined"
          transition="normal"
        />
        {caption && (
          <motion.p 
            className="mt-3 text-functional font-ibm-mono text-[13px] leading-tight tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {caption}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}