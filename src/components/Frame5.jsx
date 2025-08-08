import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundTexture from './BackgroundTexture'

function Frame5() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState('start')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('animate')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance to next frame
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/6')
    }, 27800) // Last animation at 5.8s delay + ~1s duration = 6.8s, add 1s buffer + 20s extra hold
    return () => clearTimeout(timer)
  }, [navigate])

  // Data for the bars
  const data = {
    2025: {
      volunteers: '17M',
      volunteersValue: 17,
      maxVolunteers: 20, // Scale max for visual proportion
      usd: '300M',
      usdValue: 300,
      maxUsd: 350, // Scale max for visual proportion
      color: 'bg-red-500' // Swapped to red
    },
    2011: {
      volunteers: '13.5M',
      volunteersValue: 13.5,
      maxVolunteers: 20,
      usd: '230M',
      usdValue: 230,
      maxUsd: 350,
      color: 'bg-blue-600' // Swapped to blue
    }
  }

  // Calculate pill heights based on values
  const calculateHeight = (value, max) => {
    return (value / max) * 100 // Returns percentage
  }

  return (
    <section ref={frameRef} className="h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundTexture />
      
      <div className="w-full h-full relative flex items-center justify-center px-8">
        
        {/* Main content container */}
        <div className="relative flex items-end justify-center gap-12 h-[60vh] w-full">
          
          {/* 2025 Bar (Center, appears first) */}
          <div className="relative flex flex-col items-center h-full">
            {/* Year label */}
            <motion.div 
              className="absolute -top-12 font-display text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              2025
            </motion.div>
            
            {/* Pill container */}
            <div className="relative h-full w-32 md:w-40 flex items-end">
              {/* Animated pill */}
              <motion.div 
                className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-full relative overflow-hidden flex flex-col items-center justify-center shadow-lg"
                initial={{ height: '40px' }}
                animate={animationPhase === 'animate' ? { 
                  height: '85%' 
                } : { height: '40px' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 0.5
                }}
              >
                {/* Values inside pill */}
                <motion.div 
                  className="flex flex-col items-center justify-center text-white font-display font-bold"
                  initial={{ opacity: 0 }}
                  animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.8 }}
                >
                  <div className="text-2xl md:text-3xl">{data[2025].volunteers}</div>
                  <div className="text-sm md:text-base opacity-90">volunteers</div>
                  <div className="mt-2 text-lg md:text-xl">${data[2025].usd}</div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* 2011 Bar (Left of 2025, appears second) */}
          <motion.div 
            className="relative flex flex-col items-center h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={animationPhase === 'animate' ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3.2 }}
            style={{ position: 'absolute', left: 'calc(50% - 320px)' }}
          >
            {/* Year label */}
            <div className="absolute -top-12 font-display text-2xl md:text-3xl font-bold text-gray-900">
              2011
            </div>
            
            {/* Pill container */}
            <div className="relative h-full w-32 md:w-40 flex items-end">
              {/* Animated pill */}
              <motion.div 
                className="w-full bg-gradient-to-t from-blue-900 to-blue-800 rounded-full relative overflow-hidden flex flex-col items-center justify-center shadow-lg"
                initial={{ height: '40px' }}
                animate={animationPhase === 'animate' ? { 
                  height: '70%' 
                } : { height: '40px' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 3.5
                }}
              >
                {/* Values inside pill */}
                <motion.div 
                  className="flex flex-col items-center justify-center text-white font-display font-bold"
                  initial={{ opacity: 0 }}
                  animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 4.8 }}
                >
                  <div className="text-2xl md:text-3xl">{data[2011].volunteers}</div>
                  <div className="text-sm md:text-base opacity-90">volunteers</div>
                  <div className="mt-2 text-lg md:text-xl">${data[2011].usd}</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Estimate text - positioned near top of red pill */}
        <motion.div 
          className="absolute"
          style={{ top: 'calc(40vh - 60px)', left: 'calc(50% + 100px)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={animationPhase === 'animate' ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 5.5 }}
        >
          <p className="font-display text-sm md:text-base text-gray-700 text-left max-w-xs">
            <span className="font-bold">**Estimate based on minimum wage</span><br/>
            <span className="font-bold">valuation;</span> real value likely higher.
          </p>
        </motion.div>

        {/* Source citation - bottom right */}
        <motion.div 
          className="absolute bottom-[20vh] right-12"
          initial={{ opacity: 0, x: 20 }}
          animate={animationPhase === 'animate' ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 5.8 }}
        >
          <p className="font-display text-xs md:text-sm text-gray-500 text-right">
            Source: IFRC (2011), The Value of Volunteers.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default Frame5