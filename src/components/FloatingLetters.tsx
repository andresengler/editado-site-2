import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Letter {
  id: string;
  char: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  blur: number;
  opacity: number;
  size: number;
}

export function FloatingLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Expanded editorial vocabulary for dynamic variety
  const editorialWords = [
    'EDITORIAL', 'STUDIO', 'NARRATIVE', 'STORY', 'DESIGN', 'CONTENT', 'WORDS', 'CRAFT',
    'MEANING', 'BEAUTY', 'LASTING', 'CREATIVE', 'WRITING', 'PUBLISH', 'AUTHOR', 'TEXT',
    'BOOK', 'MAGAZINE', 'JOURNAL', 'ARTICLE', 'PROSE', 'POETRY', 'VOICE', 'STYLE',
    'EDIT', 'DRAFT', 'REVIEW', 'POLISH', 'REFINE', 'CLARITY', 'FLOW', 'RHYTHM',
    'CHARACTER', 'PLOT', 'THEME', 'DIALOGUE', 'SCENE', 'CHAPTER', 'PARAGRAPH', 'SENTENCE',
    'LANGUAGE', 'GRAMMAR', 'SYNTAX', 'METAPHOR', 'IMAGERY', 'TONE', 'MOOD', 'EMOTION'
  ];
  
  // Creative and abstract words
  const creativeWords = [
    'INSPIRE', 'CREATE', 'IMAGINE', 'DREAM', 'VISION', 'IDEA', 'CONCEPT', 'THOUGHT',
    'MIND', 'SOUL', 'HEART', 'SPIRIT', 'PASSION', 'LOVE', 'HOPE', 'FAITH',
    'TRUTH', 'WISDOM', 'KNOWLEDGE', 'LEARN', 'DISCOVER', 'EXPLORE', 'JOURNEY', 'PATH'
  ];
  
  // Combine all vocabulary
  const allWords = [...editorialWords, ...creativeWords];
  
  // Create character pool with weighted distribution
  const createCharacterPool = () => {
    const chars = [];
    
    // Select random subset of words each time for variety
    const selectedWords = allWords
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 15) + 10); // 10-25 words per generation
    
    // Add letters from selected vocabulary
    selectedWords.forEach(word => {
      chars.push(...word.split(''));
    });
    
    // Add some additional common letters for balance
    const commonLetters = ['A', 'E', 'I', 'O', 'U', 'N', 'R', 'S', 'T', 'L', 'M', 'D', 'H'];
    commonLetters.forEach(letter => {
      // Add each common letter randomly for natural distribution
      for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        chars.push(letter);
      }
    });
    
    return chars;
  };

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true);
      generateLetters();
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  const generateLetters = () => {
    const newLetters: Letter[] = [];
    const freshCharacterPool = createCharacterPool();
    
    // Generate fewer letters for performance
    for (let i = 0; i < Math.floor(Math.random() * 4) + 8; i++) {
      const char = freshCharacterPool[Math.floor(Math.random() * freshCharacterPool.length)];
      
      newLetters.push({
        id: `letter-${i}-${Date.now()}`,
        char,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 12 + Math.random() * 6,
        blur: 0.5 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.15,
        size: 0.8 + Math.random() * 0.3,
      });
    }
    
    setLetters(newLetters);
    
    // Regenerate less frequently for performance
    setTimeout(() => {
      if (isVisible) generateLetters();
    }, 12000 + Math.random() * 8000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {isVisible && letters.map((letter) => (
          <motion.div
            key={letter.id}
            className="absolute font-serif select-none floating-particle"
            style={{
              left: `${letter.x}%`,
              top: `${letter.y}%`,
              fontSize: `${14 * letter.size}px`, // Larger for better visibility
              filter: `blur(${letter.blur}px)`,
              color: 'var(--floating-letter-secondary)', // Use CSS variable for theme support
            }}
            initial={{ 
              opacity: 0,
              scale: 0.2,
              y: 30,
            }}
            animate={{ 
              opacity: letter.opacity,
              scale: letter.size,
              y: [20, -30, 10, -25],
              x: [0, 10, -5, 8],
            }}
            transition={{
              duration: letter.duration,
              delay: letter.delay,
              ease: "easeInOut",
              y: {
                duration: letter.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              x: {
                duration: letter.duration * 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              opacity: {
                duration: 1.5,
                ease: "easeInOut",
              },
              scale: {
                duration: 1,
                ease: "easeOut",
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.1,
              transition: { duration: 1.5 }
            }}
          >
            {letter.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}