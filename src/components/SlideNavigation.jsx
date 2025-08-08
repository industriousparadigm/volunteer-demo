import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useCallback, useState } from 'react'

function SlideNavigation({ currentSlide, totalSlides }) {
  const navigate = useNavigate()
  const [isHoveringBottom, setIsHoveringBottom] = useState(false)
  
  // Determine if current slide has dark background
  // Slides 3, 4, 7, 8, 9 have dark backgrounds
  const isDarkSlide = [3, 4, 7, 8, 9].includes(currentSlide)
  
  // Track mouse position to show/hide navigation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bottomThird = window.innerHeight * 0.66
      setIsHoveringBottom(e.clientY > bottomThird)
    }
    
    const handleMouseLeave = () => {
      setIsHoveringBottom(false)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      navigate(`/${currentSlide + 1}`)
    }
  }, [currentSlide, totalSlides, navigate])

  const goToPrev = useCallback(() => {
    if (currentSlide > 1) {
      navigate(`/${currentSlide - 1}`)
    }
  }, [currentSlide, navigate])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrev()
      } else if (e.key === 'Escape') {
        navigate('/1')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [goToNext, goToPrev, navigate])

  // Scroll to navigate
  useEffect(() => {
    let isScrolling = false
    
    const handleScroll = (e) => {
      e.preventDefault()
      
      // Prevent multiple triggers
      if (isScrolling) return
      
      if (Math.abs(e.deltaY) > 30) {
        isScrolling = true
        
        if (e.deltaY > 0) {
          goToNext()
        } else {
          goToPrev()
        }
        
        // Reset after animation
        setTimeout(() => {
          isScrolling = false
        }, 600)
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [goToNext, goToPrev])

  return (
    <>
      {/* Navigation UI - only visible when hovering bottom third */}
      <AnimatePresence>
        {isHoveringBottom && (
          <motion.div 
            className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-2xl mx-auto px-8 flex justify-between items-center">
          {/* Previous */}
          <motion.button
            onClick={goToPrev}
            className={`pointer-events-auto p-3 rounded-full backdrop-blur-sm transition-all ${
              isDarkSlide
                ? currentSlide > 1
                  ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
                : currentSlide > 1 
                  ? 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/60 hover:text-gray-900' 
                  : 'bg-gray-900/5 text-gray-900/20 cursor-not-allowed'
            }`}
            whileHover={currentSlide > 1 ? { scale: 1.1 } : {}}
            whileTap={currentSlide > 1 ? { scale: 0.95 } : {}}
            disabled={currentSlide === 1}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </motion.button>

          {/* Slide indicators */}
          <div className="flex space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(`/${index + 1}`)}
                className={`pointer-events-auto w-2 h-2 rounded-full transition-all ${
                  isDarkSlide
                    ? index === currentSlide - 1 
                      ? 'bg-white w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                    : index === currentSlide - 1 
                      ? 'bg-gray-900 w-8' 
                      : 'bg-gray-900/30 hover:bg-gray-900/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={goToNext}
            className={`pointer-events-auto p-3 rounded-full backdrop-blur-sm transition-all ${
              isDarkSlide
                ? currentSlide < totalSlides
                  ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
                : currentSlide < totalSlides 
                  ? 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/60 hover:text-gray-900' 
                  : 'bg-gray-900/5 text-gray-900/20 cursor-not-allowed'
            }`}
            whileHover={currentSlide < totalSlides ? { scale: 1.1 } : {}}
            whileTap={currentSlide < totalSlides ? { scale: 0.95 } : {}}
            disabled={currentSlide === totalSlides}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hints (show briefly) */}
      <AnimatePresence>
        {currentSlide === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className={`fixed top-8 right-8 text-sm backdrop-blur-sm px-4 py-2 rounded-lg ${
              isDarkSlide 
                ? 'text-white/40 bg-white/10' 
                : 'text-gray-900/40 bg-gray-900/10'
            }`}
          >
            Use ← → or scroll to navigate
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SlideNavigation