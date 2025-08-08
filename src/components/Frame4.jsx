import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Frame4() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState('mosaic')
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    // Wait a bit, then transform to clock
    const clockTimer = setTimeout(() => {
      setAnimationPhase('clock')
    }, 2000)
    
    return () => {
      clearTimeout(clockTimer)
    }
  }, [])

  // Auto-advance to next frame
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/5')
    }, 9000) // Right text appears at 3.5s delay + 1s duration = 4.5s, add 4.5s buffer for full experience
    return () => clearTimeout(timer)
  }, [navigate])

  // Animate clock hands
  useEffect(() => {
    if (animationPhase === 'clock') {
      const interval = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [animationPhase])

  // EXACT same grid as Frame3
  const rows = 8
  const cols = 8
  const totalSymbols = rows * cols

  // Generate grid data with alternating pattern
  const gridItems = Array.from({ length: totalSymbols }, (_, index) => {
    const isCross = index % 2 === 0 // Alternate every item
    return {
      id: index,
      type: isCross ? 'cross' : 'crescent',
      index
    }
  })

  // Calculate where each mosaic piece should go to form the clock circle
  const getClockPosition = (index) => {
    const row = Math.floor(index / cols)
    const col = index % cols
    const centerX = cols / 2 - 0.5
    const centerY = rows / 2 - 0.5
    
    const dx = col - centerX
    const dy = row - centerY
    const angle = Math.atan2(dy, dx)
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Select specific items to form a spaced circle
    if (distance > 2.5 && distance < 4) {
      // Calculate position on circle with proper spacing
      const itemsInCircle = 20 // Fewer items for better spacing
      const circleIndex = Math.floor((angle + Math.PI) / (2 * Math.PI) * itemsInCircle)
      const newAngle = (circleIndex / itemsInCircle) * 2 * Math.PI - Math.PI
      const clockRadius = 250
      
      return {
        x: Math.cos(newAngle) * clockRadius - col * 50 + 175,
        y: Math.sin(newAngle) * clockRadius - row * 50 + 175,
        scale: 1.5,
        opacity: 0.7,
        rotate: (newAngle * 180 / Math.PI) + 90
      }
    } else {
      // All other items fade out
      return {
        x: dx * 30,
        y: dy * 30,
        scale: 0.1,
        opacity: 0,
        rotate: 0
      }
    }
  }

  return (
    <section ref={frameRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-5 items-center gap-8">
        {/* Left text - Acts of service */}
        <div className="flex justify-end overflow-hidden">
          <motion.div 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-200 font-bold"
            initial={{ y: '120%' }}
            animate={animationPhase === 'clock' ? { y: 0 } : { y: '120%' }}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 3.0 // 1s after clock starts spinning
            }}
          >
            Acts of service
          </motion.div>
        </div>

        {/* Center clock - spans 3 columns */}
        <div className="flex justify-center col-span-3">
          <div className="relative">
            {/* Mosaic Grid that morphs into clock */}
            <div 
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                maxWidth: '400px'
              }}
            >
          {gridItems.map((item) => {
            const clockPos = getClockPosition(item.index)
            
            return (
              <motion.div
                key={item.id}
                className="relative aspect-square w-10 h-10"
                initial={{ 
                  scale: 1,
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={animationPhase === 'clock' ? {
                  scale: clockPos.scale,
                  x: clockPos.x,
                  y: clockPos.y,
                  opacity: clockPos.opacity,
                  rotate: clockPos.rotate
                } : {
                  scale: 1,
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotate: 0
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: item.index * 0.01
                }}
              >
                <img 
                  src={item.type === 'cross' ? '/red-cross.png' : '/red-crescent.png'}
                  alt=""
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'grayscale(100%) brightness(0.7)'
                  }}
                />
              </motion.div>
              )
            })}
            </div>

            {/* Simple white circle clock overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: animationPhase === 'clock' ? 1 : 0
              }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <motion.svg 
                width="800" 
                height="800" 
                viewBox="-200 -200 800 800"
                style={{ position: 'absolute', left: '-200px', top: '-200px' }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* White circle with bold stroke - matches mosaic size */}
                <circle
                  cx="200"
                  cy="200"
                  r="250"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                />
                {/* Single line from center to edge */}
                <line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="-30"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* Right text - rooted in our fundamental principles */}
        <div className="flex justify-start">
          <motion.div 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-200 font-bold"
            initial={{ opacity: 0, x: 50 }}
            animate={animationPhase === 'clock' ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 3.5 // Slightly after left text
            }}
          >
            <span className="block whitespace-nowrap">rooted in our</span>
            <span className="block whitespace-nowrap">fundamental</span>
            <span className="block whitespace-nowrap text-red-500">principles.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Frame4