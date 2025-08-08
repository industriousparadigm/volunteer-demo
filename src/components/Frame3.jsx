import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Frame3() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState('start')
  const [flashingIndices, setFlashingIndices] = useState(new Set())
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('animate')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance to next frame
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/4')
    }, 5500) // Text completes at ~3.5s (2.5s delay + 1s duration), add 2s buffer for full experience
    return () => clearTimeout(timer)
  }, [navigate])

  // Grid configuration
  const rows = 8
  const cols = 8
  const totalSymbols = rows * cols

  // Generate grid data with random cross/crescent distribution
  const gridItems = Array.from({ length: totalSymbols }, (_, index) => {
    const isCross = Math.random() > 0.3
    const willFlash = Math.random() < 0.15 // 15% will flash red
    return {
      id: index,
      type: isCross ? 'cross' : 'crescent',
      willFlash: willFlash
    }
  })

  // Trigger flashing animation
  useEffect(() => {
    if (animationPhase === 'animate') {
      gridItems.forEach((item, index) => {
        if (item.willFlash) {
          setTimeout(() => {
            setFlashingIndices(prev => new Set([...prev, index]))
            // Remove from flashing after animation
            setTimeout(() => {
              setFlashingIndices(prev => {
                const newSet = new Set(prev)
                newSet.delete(index)
                return newSet
              })
            }, 1200) // Keep flashing for longer
          }, 1500 + index * 50) // Start flashing after grid loads
        }
      })
    }
  }, [animationPhase])

  return (
    <section ref={frameRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-3 items-center gap-8">
        {/* Left text - United by purpose */}
        <div className="flex justify-end overflow-hidden">
          <motion.div 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-200 font-bold"
            initial={{ y: '120%' }}
            animate={animationPhase === 'animate' ? { y: 0 } : {}}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 2.0 // Start after mosaic is flashing
            }}
          >
            United by purpose
          </motion.div>
        </div>

        {/* Center mosaic */}
        <div className="flex justify-center">
          <div 
            className="grid gap-1.5 md:gap-2"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              width: '480px',
              maxWidth: '90vw'
            }}
          >
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square"
              initial={{ scale: 0, opacity: 0 }}
              animate={animationPhase === 'animate' ? { 
                scale: 1, 
                opacity: 1 
              } : {}}
              transition={{ 
                delay: index * 0.012,
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  filter: flashingIndices.has(index) 
                    ? 'grayscale(0%) brightness(1.2)' 
                    : 'grayscale(100%) brightness(0.7)',
                  scale: flashingIndices.has(index) ? 1.15 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img 
                  src={item.type === 'cross' ? '/red-cross.png' : '/red-crescent.png'}
                  alt={item.type === 'cross' ? 'Red Cross' : 'Red Crescent'}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Right text - not profit */}
        <div className="flex justify-start overflow-hidden">
          <motion.div 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-stone-200 font-bold"
            initial={{ y: '120%' }}
            animate={animationPhase === 'animate' ? { y: 0 } : {}}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 2.5 // Start after left text
            }}
          >
            not profit.
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Frame3