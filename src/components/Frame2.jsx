import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundTexture from './BackgroundTexture'

function Frame2() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState('start')
  const [expandPeriod, setExpandPeriod] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('animate')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (animationPhase === 'animate') {
      // 2.6s (last text) + 0.9s (fade duration) + 3s (hold) = 6.5s total
      const expandTimer = setTimeout(() => {
        setExpandPeriod(true)
      }, 6500)
      
      // Auto-advance 1s after period expansion animation (6.5s + 1.5s animation + 1s delay)
      const autoAdvanceTimer = setTimeout(() => {
        navigate('/3')
      }, 9000)
      
      return () => {
        clearTimeout(expandTimer)
        clearTimeout(autoAdvanceTimer)
      }
    }
  }, [animationPhase, navigate])

  return (
    <section ref={frameRef} className="h-screen flex items-center relative overflow-hidden">
      <BackgroundTexture />
      {/* Container for vertical centering */}
      <div className="relative w-full">
        {/* VOLUNTARY - rises from below with mask */}
        <div className="relative overflow-hidden h-28 md:h-36">
          <motion.h1 
            className="font-display font-black text-6xl md:text-8xl uppercase text-gray-900 absolute bottom-0 whitespace-nowrap"
            style={{ right: '53%' }}  // 100% - 47% = 53% from right edge
            initial={{ y: '120%' }}
            animate={animationPhase === 'animate' ? { y: 0 } : {}}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96], // Custom bezier curve
              delay: 0 
            }}
          >
            VOLUNTARY
          </motion.h1>
        </div>
        
        {/* SERVICE - rises from below with mask */}
        <div className="relative overflow-hidden h-28 md:h-36 -mt-6">
          <motion.h1 
            className="font-display font-black text-6xl md:text-8xl uppercase text-gray-900 absolute top-0 whitespace-nowrap"
            style={{ right: '53%' }}  // 100% - 47% = 53% from right edge
            initial={{ y: '150%' }}
            animate={animationPhase === 'animate' ? { y: 0 } : {}}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96], // Custom bezier curve
              delay: 0.2 // Slight stagger
            }}
          >
            SERVICE
          </motion.h1>
        </div>
        
        {/* Red colon dots in the middle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-4">
            {/* Top dot */}
            <div className="relative overflow-hidden h-8 w-8 md:h-10 md:w-10">
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-full bg-red-500 rounded-full"
                initial={{ y: '150%' }}
                animate={animationPhase === 'animate' ? { y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 1.2 // After text animations
                }}
              />
            </div>
            {/* Bottom dot */}
            <div className="relative overflow-hidden h-8 w-8 md:h-10 md:w-10">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full"
                initial={{ y: '150%' }}
                animate={animationPhase === 'animate' ? { y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 1.3 // Slight stagger after top dot
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Right side text content */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 pl-20 pr-16 w-1/2">
          <div className="space-y-2">
            {/* Line 1: A voluntary relief movement */}
            <motion.p 
              className="font-display text-3xl md:text-4xl text-gray-900"
              initial={{ opacity: 0 }}
              animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.0 }}
            >
              A voluntary relief movement
            </motion.p>

            {/* Line 2: — not prompted in any manner */}
            <motion.p 
              className="font-display text-3xl md:text-4xl text-gray-900"
              initial={{ opacity: 0 }}
              animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: "easeOut", delay: 2.3 }}
            >
              <motion.span
                className="inline-block"
                initial={{ scale: 0 }}
                animate={animationPhase === 'animate' ? { 
                  scale: [0, 1.2, 1] 
                } : {}}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut", 
                  delay: 2.3,
                  times: [0, 0.67, 1]
                }}
              >
                —
              </motion.span>
              <span> not prompted in any manner</span>
            </motion.p>

            {/* Line 3: by desire for gain. */}
            <motion.p 
              className="font-display text-3xl md:text-4xl text-gray-900 relative"
              initial={{ opacity: 0 }}
              animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: "easeOut", delay: 2.6 }}
            >
              by desire for gain
              <motion.span 
                className="inline-block bg-gray-900 rounded-full ml-0.5 align-baseline"
                initial={{ width: '16px', height: '16px' }}
                animate={expandPeriod ? {
                  width: '300vw',
                  height: '300vw',
                  x: 'calc(50vw - 100% - 10rem)', // Moved right by reducing offset
                  y: 'calc(50vh - 50% - 8rem)',
                } : {
                  width: '16px',
                  height: '16px'
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{
                  position: expandPeriod ? 'fixed' : 'relative',
                  zIndex: expandPeriod ? 100 : 'auto'
                }}
              />
            </motion.p>
          </div>
        </div>
      </div>

        {/* Commented out for now */}
        {/* Icon with mask reveal - smaller like a colon */}
        {/* <div className="relative overflow-hidden ml-1">
          <motion.div
            initial={{ x: '-100%' }}
            animate={animationPhase === 'animate' ? { x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.2 }}
            className="flex flex-col gap-1 items-center"
          >
            <img src="/red-cross.png" alt="" className="w-4 h-4" />
            <img src="/red-crescent.png" alt="" className="w-4 h-4" />
          </motion.div>
        </div> */}

        {/* Body text lines - commented out for now */}
        {/* <div className="space-y-3">
          <motion.p 
            className="font-display text-3xl md:text-4xl text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 2.0 }}
          >
            A voluntary relief movement
          </motion.p>

          <motion.p 
            className="font-display text-3xl md:text-4xl text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 3.0 }}
          >
            <motion.span
              className="inline-block"
              initial={{ scale: 0 }}
              animate={animationPhase === 'animate' ? { scale: [0, 1.2, 1] } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 2.7 }}
            >
              —
            </motion.span>
            <span> not prompted in any manner</span>
          </motion.p>

          <motion.p 
            className="font-display text-3xl md:text-4xl text-gray-900 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 4.0 }}
          >
            by desire for gain<span className="text-red-500 text-5xl md:text-6xl font-black align-baseline">.</span>
          </motion.p>
        </div> */}
    </section>
  )
}

export default Frame2