'use client';

import { motion } from 'framer-motion';
import { WorkingIndicator } from './WorkingIndicator';
import { InternalHeader } from './InternalHeader';
import { ArrowRight, MapPin, Mail, Globe } from 'lucide-react';

interface AboutPageProps {
  onPageChange: (page: string) => void;
  variant?: 'cards' | 'timeline' | 'sidebar' | 'minimal' | 'magazine';
}

export function AboutPageAlternatives({ onPageChange, variant = 'cards' }: AboutPageProps) {
  
  // **OPCIÓN 1: TARJETAS MODULARES**
  if (variant === 'cards') {
    return (
      <div className="flex flex-col h-full">
        <InternalHeader currentPage="about" onPageChange={onPageChange} />
        
        <div className="flex-1 px-3 md:px-6 py-8 md:py-12">
          {/* Hero */}
          <motion.div 
            className="max-w-4xl mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-tagline md:text-[42px] leading-tight mb-6">
              Editorial and narrative studio shaping enduring media, content systems, and story-driven experiences.
            </h1>
            <div className="flex items-center space-x-2 text-navigation opacity-70">
              <MapPin size={16} />
              <span>Buenos Aires, Argentina</span>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* About Card */}
            <motion.div 
              className="bg-gray-50/50 rounded-lg p-6 md:p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-section-title mb-4">About</h2>
              <p className="text-sm leading-relaxed mb-4">
                We specialize in publishing, research, and narrative design. We partner with media outlets, foundations, and independent creators.
              </p>
              <div className="flex items-center text-sm opacity-70">
                <span>Founded by</span>
                <ArrowRight size={14} className="mx-2" />
                <a href="https://andresengler.com" className="underline hover:no-underline">Andrés Engler</a>
              </div>
            </motion.div>

            {/* Services Card */}
            <motion.div 
              className="bg-gray-50/50 rounded-lg p-6 md:p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-section-title mb-4">Services</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Narrative Strategy</div>
                <div>Content Design</div>
                <div>Editorial Research</div>
                <div>Aesthetic Direction</div>
                <div>Cultural Adaptation</div>
                <div>Content Architecture</div>
                <div>Verbal Identity</div>
                <div>Format Exploration</div>
              </div>
            </motion.div>

            {/* Currently Card */}
            <motion.div 
              className="bg-gray-50/50 rounded-lg p-6 md:p-8 border border-gray-100 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-section-title mb-4 flex items-center">
                Currently
                <WorkingIndicator />
              </h2>
              <div className="space-y-3 text-sm">
                <p>• Rebranding a leading AI startup</p>
                <p>• Building strategy for a sweets brand</p>
                <p>• Leading email marketing for tech startup</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    );
  }

  // **OPCIÓN 2: TIMELINE VERTICAL**
  if (variant === 'timeline') {
    return (
      <div className="flex flex-col h-full">
        <InternalHeader currentPage="about" onPageChange={onPageChange} />
        
        <div className="flex-1 px-3 md:px-6 py-8 md:py-12 max-w-3xl mx-auto">
          {/* Hero */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-tagline md:text-[42px] leading-tight">
              Editorial and narrative studio
            </h1>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              
              <motion.div 
                className="flex items-start space-x-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-3 h-3 bg-current rounded-full mt-2 relative z-10"></div>
                <div className="flex-1">
                  <h2 className="text-section-title mb-3">About</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Editado Studio specializes in publishing, research, and narrative design. We partner with media outlets, foundations, and independent creators to shape stories, systems, and strategies with clarity and intent.
                  </p>
                  <p className="text-sm leading-relaxed opacity-70">
                    Founded by Andrés Engler in Buenos Aires, Argentina.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-3 h-3 bg-current rounded-full mt-2 relative z-10"></div>
                <div className="flex-1">
                  <h2 className="text-section-title mb-3">Services</h2>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                    <div>Narrative Strategy</div>
                    <div>Content Design</div>
                    <div>Editorial Research</div>
                    <div>Aesthetic Direction</div>
                    <div>Cultural Adaptation</div>
                    <div>Content Architecture</div>
                    <div>Verbal Identity</div>
                    <div>Format Exploration</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-3 h-3 bg-working-indicator rounded-full mt-2 relative z-10 animate-pulse"></div>
                <div className="flex-1">
                  <h2 className="text-section-title mb-3 flex items-center">
                    Currently
                    <WorkingIndicator />
                  </h2>
                  <div className="space-y-2 text-sm">
                    <p>Rebranding a leading AI startup</p>
                    <p>Building strategy and digital world for a sweets brand</p>
                    <p>Leading email marketing for an emerging tech startup</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // **OPCIÓN 3: SIDEBAR NAVIGATION**
  if (variant === 'sidebar') {
    return (
      <div className="flex flex-col h-full">
        <InternalHeader currentPage="about" onPageChange={onPageChange} />
        
        <div className="flex-1 flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50/30 border-r border-gray-100 p-6 space-y-6">
            <div>
              <h1 className="text-section-title mb-2">Editado Studio</h1>
              <p className="text-sm opacity-70">Editorial & Narrative</p>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-100/50 text-sm font-medium">About</button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-100/50 text-sm">Services</button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-100/50 text-sm">Currently</button>
            </nav>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm opacity-70">
                <MapPin size={14} />
                <span>Buenos Aires</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-70">
                <Mail size={14} />
                <span>hello@editado.xyz</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-tagline mb-8">
                Editorial and narrative studio shaping enduring media, content systems, and story-driven experiences.
              </h1>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-section-title mb-4">About</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Editado Studio is an editorial studio specializing in publishing, research, and narrative design. We partner with media outlets, foundations, and independent creators to shape stories, systems, and strategies with clarity and intent.
                    </p>
                    <p>
                      Founded by <a href="https://andresengler.com" className="underline hover:no-underline">Andrés Engler</a>, an entrepreneur and editor based in Buenos Aires, Argentina.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // **OPCIÓN 4: MINIMAL CENTRADO**
  if (variant === 'minimal') {
    return (
      <div className="flex flex-col h-full">
        <InternalHeader currentPage="about" onPageChange={onPageChange} />
        
        <div className="flex-1 flex items-center justify-center px-3 md:px-6">
          <motion.div 
            className="max-w-2xl text-center space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-tagline md:text-[42px] leading-tight">
              Editorial and narrative studio shaping enduring media, content systems, and story-driven experiences.
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div>
                <h2 className="text-section-title mb-4">About</h2>
                <p className="text-sm leading-relaxed">
                  Founded by Andrés Engler in Buenos Aires. We specialize in publishing, research, and narrative design.
                </p>
              </div>
              
              <div>
                <h2 className="text-section-title mb-4">Services</h2>
                <div className="text-sm space-y-1">
                  <p>Narrative Strategy</p>
                  <p>Content Design</p>
                  <p>Editorial Research</p>
                  <p>Aesthetic Direction</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-section-title mb-4 flex items-center justify-center">
                  Currently
                  <WorkingIndicator />
                </h2>
                <div className="text-sm space-y-1">
                  <p>AI startup rebranding</p>
                  <p>Sweets brand strategy</p>
                  <p>Tech startup marketing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // **OPCIÓN 5: MAGAZINE LAYOUT**
  if (variant === 'magazine') {
    return (
      <div className="flex flex-col h-full">
        <InternalHeader currentPage="about" onPageChange={onPageChange} />
        
        <div className="flex-1 px-3 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Magazine Header */}
            <motion.div 
              className="border-b border-gray-200 pb-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-[48px] md:text-[64px] leading-none mb-4">ES</h1>
                  <p className="text-navigation opacity-70">Editorial Studio</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm opacity-50">Buenos Aires, 2024</p>
                  <div className="flex items-center justify-end space-x-2 mt-2">
                    <WorkingIndicator />
                    <span className="text-sm">Currently Working</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Magazine Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              
              {/* Main Article */}
              <motion.div 
                className="md:col-span-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-tagline leading-tight mb-6">
                  Editorial and narrative studio shaping enduring media, content systems, and story-driven experiences.
                </h2>
                
                <div className="columns-1 md:columns-2 gap-8 space-y-4 text-sm leading-relaxed">
                  <p>
                    Editado Studio is an editorial studio specializing in publishing, research, and narrative design. We partner with media outlets, foundations, and independent creators to shape stories, systems, and strategies with clarity and intent.
                  </p>
                  <p>
                    We work closely with our clients to build narrative architecture, refine editorial tone, and prototype content ecosystems that are culturally aware and strategically grounded.
                  </p>
                  <p>
                    Founded by <a href="https://andresengler.com" className="underline hover:no-underline">Andrés Engler</a>, an entrepreneur and editor based in Buenos Aires, Argentina. Andrés has led international editorial strategy at CoinDesk and has been cited by major publications such as the Financial Times and El País.
                  </p>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div 
                className="md:col-span-4 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Services */}
                <div className="bg-gray-50/50 p-6 rounded">
                  <h3 className="text-section-title mb-4">Services</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Narrative Strategy</span>
                      <span className="opacity-50">01</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Content Design</span>
                      <span className="opacity-50">02</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Editorial Research</span>
                      <span className="opacity-50">03</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Aesthetic Direction</span>
                      <span className="opacity-50">04</span>
                    </div>
                  </div>
                </div>

                {/* Currently */}
                <div className="border border-gray-200 p-6 rounded">
                  <h3 className="text-section-title mb-4">Currently</h3>
                  <div className="space-y-3 text-sm">
                    <p>→ Rebranding a leading AI startup</p>
                    <p>→ Building strategy for a sweets brand</p>
                    <p>→ Leading email marketing for tech startup</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}