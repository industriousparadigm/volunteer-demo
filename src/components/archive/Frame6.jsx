import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import GradientMesh from './GradientMesh'

function Frame6() {
  const frameRef = useRef(null)
  const isInView = useInView(frameRef, { once: false, amount: 0.3 })
  const [highlightedIndices, setHighlightedIndices] = useState(new Set())
  
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Grid configuration
  const rows = 10
  const cols = 8
  const totalSymbols = rows * cols
  const countedPercentage = 0.15 // Only 15% are counted

  // Generate grid data
  const gridItems = Array.from({ length: totalSymbols }, (_, index) => {
    const isCross = Math.random() > 0.3
    const shouldBeHighlighted = Math.random() < countedPercentage
    return {
      id: index,
      type: isCross ? 'cross' : 'crescent',
      highlighted: shouldBeHighlighted
    }
  })

  useEffect(() => {
    if (isInView) {
      // Animate highlighting over time
      const highlighted = new Set()
      gridItems.forEach((item, index) => {
        if (item.highlighted) {
          setTimeout(() => {
            setHighlightedIndices(prev => new Set([...prev, index]))
          }, index * 30)
        }
      })
    } else {
      setHighlightedIndices(new Set())
    }
  }, [isInView])

  return (
    <section ref={frameRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      <GradientMesh variant="purple" />
      
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-8"
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-4 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Most volunteers remain uncounted
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Only a fraction of contributions are measured
        </motion.p>

        <div 
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '600px'
          }}
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ 
                delay: index * 0.01,
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: highlightedIndices.has(index) ? 1 : 0.1,
                  scale: highlightedIndices.has(index) ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img 
                  src={item.type === 'cross' ? '/red-cross.png' : '/red-crescent.png'}
                  alt={item.type === 'cross' ? 'Red Cross' : 'Red Crescent'}
                  className="w-full h-full object-contain"
                  style={{
                    filter: highlightedIndices.has(index) 
                      ? 'none' 
                      : 'grayscale(100%) brightness(0.3)',
                  }}
                />
              </motion.div>

              {highlightedIndices.has(index) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span className="text-white">Counted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-700 rounded-full" />
              <span className="text-gray-400">Uncounted</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Frame6