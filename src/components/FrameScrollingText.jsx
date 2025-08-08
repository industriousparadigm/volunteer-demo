import { motion } from 'framer-motion'
import { useRef } from 'react'
import BackgroundTexture from './BackgroundTexture'

function Frame6() {
  const frameRef = useRef(null)
  
  const scrollText = "How might we harness this asset for greater National Societies recognition and IFRC positioning?"
  
  // Create shape variations with random red/white pattern
  const shapeVariations = [
    { type: 'cross', color: 'red' },
    { type: 'crescent', color: 'white' },
    { type: 'cross', color: 'white' },
    { type: 'cross', color: 'red' },
    { type: 'crescent', color: 'red' },
    { type: 'crescent', color: 'white' },
    { type: 'cross', color: 'red' },
    { type: 'crescent', color: 'red' },
    { type: 'cross', color: 'white' },
    { type: 'crescent', color: 'red' },
    { type: 'cross', color: 'red' },
    { type: 'crescent', color: 'white' },
  ]
  
  // Duplicate for seamless loop
  const shapes = [...shapeVariations, ...shapeVariations, ...shapeVariations]

  return (
    <section ref={frameRef} className="h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundTexture />
      
      {/* Main content */}
      <div className="w-full h-full relative flex flex-col justify-center">
        
        {/* Top scrolling text - much larger and bold */}
        <div className="relative flex items-center overflow-hidden mb-4 py-4">
          <motion.div 
            className="flex whitespace-nowrap"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 27,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <span className="font-display text-7xl md:text-8xl lg:text-9xl font-bold text-white mr-20 pl-[30vw]" 
                  style={{ textShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
              {scrollText}
            </span>
            <span className="font-display text-7xl md:text-8xl lg:text-9xl font-bold text-white mr-20"
                  style={{ textShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
              {scrollText}
            </span>
          </motion.div>
        </div>
        
        {/* Bottom scrolling shapes - much larger */}
        <div className="relative flex items-center overflow-hidden mt-4">
          <motion.div 
            className="flex items-center gap-16"
            initial={{ x: "0%" }}
            animate={{ x: ["0%", "33.33%"] }}
            transition={{ 
              duration: 27,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {shapes.map((shape, index) => (
              <div key={index} className="flex-shrink-0 relative">
                <div 
                  className="transform hover:scale-105 transition-transform"
                  style={{ 
                    transform: `rotate(${index % 5 === 0 ? '3deg' : index % 5 === 1 ? '-4deg' : index % 5 === 2 ? '2deg' : index % 5 === 3 ? '-2deg' : '0deg'})`,
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                  }}
                >
                  <img 
                    src={shape.type === 'cross' ? '/red-cross.png' : '/red-crescent.png'}
                    alt={shape.type}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                    style={{ 
                      filter: shape.color === 'white' ? 'brightness(0) invert(1)' : 'none'
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}

export default Frame6