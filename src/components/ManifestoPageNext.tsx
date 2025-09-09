import { useState } from 'react';
import { ContactModal } from './ContactModal';

export function ManifestoPageNext() {
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
    "We shape content with the belief that it carries the power to influence thought, feeling, and action.",
    "Our goal is to help create more thoughtful, beautiful, and lasting narratives.",
    "This is our manifesto.",
    "This is our practice."
  ];

  return (
    <div className="bg-manifesto min-h-screen">
      {/* Page content with proper spacing */}
      <div className="page-content-spacing">
        {/* Main content area */}
        <div className="relative px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Title (Desktop only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-section-mono">Manifesto</h2>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-2">
              {/* Mobile title */}
              <div className="lg:hidden mb-8">
                <h2 className="text-section-mono">Manifesto</h2>
              </div>

              {/* Manifesto content with scroll fade */}
              <div className="manifesto-editorial-width">
                <div className="space-y-6 lg:space-y-8">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-manifesto avoid-widows"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Contact section */}
                <div className="mt-16 lg:mt-20 pt-8 border-t border-gray-300">
                  <p className="text-manifesto avoid-widows">
                    Want to work with us?{' '}
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="underline underline-offset-2 hover:no-underline transition-all duration-200 font-medium"
                    >
                      Get in touch
                    </button>
                    .
                  </p>
                </div>
              </div>
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