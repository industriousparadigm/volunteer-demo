import { motion } from 'framer-motion'

const shapes = [
  { type: 'cross', size: 'large' },
  { type: 'cross', size: 'medium' },
  { type: 'crescent', size: 'large' },
  { type: 'cross', size: 'small' },
  { type: 'crescent', size: 'medium' },
  { type: 'cross', size: 'medium' },
  { type: 'crescent', size: 'small' },
]

function FloatingShapes() {
  const sizes = {
    small: { width: 120, height: 120 },
    medium: { width: 180, height: 180 },
    large: { width: 240, height: 240 },
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => {
        const size = sizes[shape.size]
        const randomX = Math.random() * 100
        const randomY = Math.random() * 100
        
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200, 0],
              y: [0, (Math.random() - 0.5) * 200, 0],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            {shape.type === 'cross' && (
              <img 
                src="/red-cross.png"
                alt="Red Cross"
                className="object-contain"
                style={{ 
                  width: size.width, 
                  height: size.height,
                  opacity: 0.15,
                  filter: 'blur(1px)',
                }}
              />
            )}
            {shape.type === 'crescent' && (
              <img 
                src="/red-crescent.png"
                alt="Red Crescent"
                className="object-contain"
                style={{ 
                  width: size.width, 
                  height: size.height,
                  opacity: 0.15,
                  filter: 'blur(1px)',
                }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingShapes