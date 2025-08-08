import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Frame7() {
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
      navigate('/8')
    }, 8000) // Last flash wave ends around 7s, add 1s buffer
    return () => clearTimeout(timer)
  }, [navigate])

  // Grid configuration for top and bottom strips
  const cols = 16
  const rows = 2
  const totalSymbolsPerStrip = cols * rows

  // Generate grid data for top strip with some that will flash
  const topGridItems = Array.from({ length: totalSymbolsPerStrip }, (_, index) => ({
    id: `top-${index}`,
    type: index % 3 === 0 ? 'cross' : 'crescent',
    willFlash: Math.random() < 0.15 // 15% will flash red
  }))

  // Generate grid data for bottom strip with some that will flash
  const bottomGridItems = Array.from({ length: totalSymbolsPerStrip }, (_, index) => ({
    id: `bottom-${index}`,
    type: index % 3 === 1 ? 'cross' : 'crescent',
    willFlash: Math.random() < 0.15 // 15% will flash red
  }))

  // Trigger flashing animation - extended duration
  useEffect(() => {
    if (animationPhase === 'animate') {
      // Create multiple waves of flashing for continuous effect
      const flashWaves = [
        { delay: 800, duration: 2000 },
        { delay: 2000, duration: 2000 },
        { delay: 3500, duration: 2000 },
        { delay: 5000, duration: 2000 }
      ]
      
      flashWaves.forEach((wave) => {
        // Flash top grid items
        topGridItems.forEach((item, index) => {
          if (item.willFlash || Math.random() < 0.1) { // Additional random flashes
            setTimeout(() => {
              setFlashingIndices(prev => new Set([...prev, `top-${index}`]))
              // Keep flashing longer
              setTimeout(() => {
                setFlashingIndices(prev => {
                  const newSet = new Set(prev)
                  newSet.delete(`top-${index}`)
                  return newSet
                })
              }, wave.duration)
            }, wave.delay + index * 20)
          }
        })
        
        // Flash bottom grid items
        bottomGridItems.forEach((item, index) => {
          if (item.willFlash || Math.random() < 0.1) { // Additional random flashes
            setTimeout(() => {
              setFlashingIndices(prev => new Set([...prev, `bottom-${index}`]))
              // Keep flashing longer
              setTimeout(() => {
                setFlashingIndices(prev => {
                  const newSet = new Set(prev)
                  newSet.delete(`bottom-${index}`)
                  return newSet
                })
              }, wave.duration)
            }, wave.delay + 200 + index * 20)
          }
        })
      })
    }
  }, [animationPhase])

  return (
    <section ref={frameRef} className="h-screen flex flex-col relative overflow-hidden bg-gray-950">
      
      {/* Top mosaic strip */}
      <div className="w-full py-4">
        <div 
          className="grid gap-1 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '100%',
            padding: '0 2rem'
          }}
        >
          {topGridItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square"
              initial={{ scale: 0, opacity: 0 }}
              animate={animationPhase === 'animate' ? { 
                scale: 1, 
                opacity: 1 
              } : {}}
              transition={{ 
                delay: index * 0.008,
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  filter: flashingIndices.has(`top-${index}`) 
                    ? 'grayscale(0%) brightness(1.2)' 
                    : 'grayscale(100%) brightness(0.5)',
                  scale: flashingIndices.has(`top-${index}`) ? 1.15 : 1
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

      {/* Middle section with scrolling text */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="w-full">
          <motion.div 
            className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-200 font-medium text-center"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ 
              duration: 10,
              ease: "linear",
              delay: 0, // Start immediately
              repeat: Infinity
            }}
            style={{ whiteSpace: 'nowrap' }}
          >
            Globally, volunteers contribute <span className="text-red-500">2.4% of GDP</span>—a <span className="font-bold">trillion-dollar</span> support system.
          </motion.div>
        </div>
      </div>

      {/* Bottom mosaic strip */}
      <div className="w-full py-4">
        <div 
          className="grid gap-1 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '100%',
            padding: '0 2rem'
          }}
        >
          {bottomGridItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square"
              initial={{ scale: 0, opacity: 0 }}
              animate={animationPhase === 'animate' ? { 
                scale: 1, 
                opacity: 1 
              } : {}}
              transition={{ 
                delay: index * 0.008 + 0.2,
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  filter: flashingIndices.has(`bottom-${index}`) 
                    ? 'grayscale(0%) brightness(1.2)' 
                    : 'grayscale(100%) brightness(0.5)',
                  scale: flashingIndices.has(`bottom-${index}`) ? 1.15 : 1
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
      
    </section>
  )
}

export default Frame7