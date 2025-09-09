import { useState } from 'react';
import { ContactModal } from './ContactModal';

interface ManifestoPageProps {
  onPageChange: (page: string) => void;
}

export function ManifestoPage({ onPageChange }: ManifestoPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const paragraphs = [
    "We believe that telling a story well is a moral act.",
    "Words shape perception.",
    "Perception shapes reality.",
    "Every sentence casts the world in a specific light.",
    "Writing, editing, and publishing choose which version of the world we bring into being.",
    "In a noisy landscape, clarity is care.",
    "Structure is responsibility.",
    "Editing asks what truly matters and how we can honor it best.",
    "Publishing takes a stance—quiet or bold—on meaning, value, and truth.",
    "Stories built with empathy and precision break indifference.",
    "They clarify.",
    "They connect.",
    "They restore depth in a flattened world.",
    "Form matters, not for ornament but because it carries meaning.",
    "A sentence carries intention.",
    "A rhythm creates space.",
    "A well-structured essay, a thoughtfully designed magazine, even a footnote can be gestures of respect.",
    "Each says: this was made with attention.",
    "At Editado we treat publishing as an act of responsibility.",
    "We shape narratives, design formats, and structure ideas with care.",
    "Because every story we tell helps shape the world we live in.",
    "Telling a story well isn't just editorial discipline.",
    "It's an ethical stance."
  ];

  return (
    <div className="relative">
      <div className="min-h-screen px-3 md:px-6 lg:px-6 pt-32 lg:pt-40 pb-28 lg:pb-32 flex justify-center page-content-spacing">
        <div className="w-full manifesto-editorial-width">
          <div className="space-y-5 md:space-y-6 lg:space-y-7">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-manifesto tracking-wide text-center optimal-reading">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
