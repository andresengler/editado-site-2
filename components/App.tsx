'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'   // ✅ framer-motion
import { Header } from './Header'                         // ✅ ruta correcta
import { Footer } from './Footer'
import { HomePage } from './HomePage'
import { AboutPage } from './AboutPage'
import { ManifestoPage } from './ManifestoPage'
import { FloatingLetters } from './FloatingLetters'
import { useIsMobile } from './ui/use-mobile'

type PageKey = 'home' | 'about' | 'manifesto'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextPage, setNextPage] = useState<PageKey | ''>('')
  const isMobile = useIsMobile()

  const handleNavigate = (page: PageKey) => {
    if (page === currentPage) return
    setIsTransitioning(true)
    setNextPage(page)
    setTimeout(() => {
      setCurrentPage(page)
      setTimeout(() => {
        setIsTransitioning(false)
        setNextPage('')
      }, 150)
    }, 100)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onPageChange={handleNavigate} />
      case 'manifesto':
        return <ManifestoPage onPageChange={handleNavigate} />
      default:
        return <HomePage />
    }
  }

  const getBackgroundClass = () => 'bg-background'
  const getBackgroundOverlayClass = () => 'bg-background'

  const getLayoutClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      return 'relative z-1 lg:px-[10vw]'
    }
    return 'flex flex-col min-h-screen relative z-1 lg:px-[10vw]'
  }

  const getContainerClass = () => {
    if (currentPage === 'about' || currentPage === 'manifesto') {
      return `${getBackgroundClass()} bg-smooth-transition ${isTransitioning ? 'active' : ''} font-sans relative`
    }
    return `min-h-screen ${getBackgroundClass()} bg-smooth-transition ${isTransitioning ? 'active' : ''} flex flex-col font-sans overflow-x-hidden relative`
  }

  return (
    <div className={getContainerClass()}>
      {/* Overlay tenue */}
      <motion.div
        className={`bg-transition-overlay ${getBackgroundOverlayClass()}`}
        animate={{ opacity: isTransitioning ? 0.05 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: isTransitioning ? 1 : -1 }}
      />

      {/* Blur global */}
      <motion.div
        className="page-blur-overlay"
        animate={{
          backdropFilter: isTransitioning ? 'blur(2px) saturate(1.02)' : 'blur(0px) saturate(1)',
          opacity: isTransitioning ? 0.95 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: isTransitioning ? 30 : -1 }}
      />

      {/* Letras flotantes */}
      <div className="fixed inset-0 pointe
