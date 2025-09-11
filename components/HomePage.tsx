import { useIsMobile } from './ui/use-mobile';
import { motion } from 'framer-motion';

// Usa una imagen local en public/assets/book.png (o cambiala por la ruta que prefieras)
const bookImage = '/assets/book.png';

export function HomePage() {
  const isMobile = useIsMobile();
  
  const desktopVariants = {
    hidden: { opacity: 0, filter: 'blur(20px) saturate(0.8)', y: 6 },
    visible: {
      opacity: 1,
      filter: 'blur(0px) saturate(1)',
      y: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.4 },
        filter: { duration: 1.5 },
        y: { duration: 1.3, ease: [0.16, 1, 0.3, 1] }
      }
    }
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(1px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: {
        duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.9 }, y: { duration: 1.0 }, filter: { duration: 0.7 }
      }
    }
  };
  
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 8rem)' }}>
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
          <motion.div className="flex items-center justify-center" initial="hidden" animate="visible" variants={mobileVariants}>
            <div className="w-56 sm:w-64 max-w-full">
              <img src={bookImage} alt="Person browsing through book pages on a round table" className="w-full h-auto mx-auto block" />
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(1.5px)' },
              visible: {
                opacity: 1, y: 0, filter: 'blur(0px)',
                transition: {
                  duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1],
                  opacity: { duration: 1.0 }, y: { duration: 1.1 }, filter: { duration: 0.8 }
                }
              }
            }}
          >
            <div className="w-full max-w-[300px] sm:max-w-[340px] text-center">
              <p className="text-hero-mobile-unified text-balance">
                An editorial studio crafting meaning, beauty, and long-lasting narratives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center relative" style={{ minHeight: 'calc(100vh - 8rem)' }}>
      <div className="w-full">
        <div className="grid grid-cols-12 items-center gap-6">
          <motion.div
            className="col-span-8"
            initial="hidden"
            animate="visible"
            variants={{
              ...desktopVariants,
              visible: { ...desktopVariants.visible, transition: { ...desktopVariants.visible.transition, delay: 0.1 } }
            }}
          >
            <h1
              className="font-sans tracking-normal leading-[1.02] text-[36px] lg:text-[42px] xl:text-[48px] max-w-[520px] lg:max-w-[580px] xl:max-w-[640px] 2xl:max-w-[680px]"
              style={{ fontWeight: 400 }}
            >
              An editorial studio crafting meaning, beauty, and long-lasting narratives.
            </h1>
          </motion.div>

          <motion.div
            className="col-span-4 flex justify-end"
            initial="hidden"
            animate="visible"
            variants={{
              ...desktopVariants,
              visible: { ...desktopVariants.visible, transition: { ...desktopVariants.visible.transition, delay: 0.3 } }
            }}
          >
            <div className="w-56 sm:w-64 md:w-72 lg:w-84 xl:w-96 2xl:w-[32rem]">
              <img src={bookImage} alt="Person browsing through book pages on a round table" className="w-full h-auto block" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
