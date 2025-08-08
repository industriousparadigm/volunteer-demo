import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import GradientMesh from './GradientMesh'

function Frame2() {
  const frameRef = useRef(null)
  const isInView = useInView(frameRef, { once: false, amount: 0.5 })
  
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const items = [
    { text: "Climate Disasters", color: "from-red-500 to-orange-500" },
    { text: "Ongoing Conflicts", color: "from-purple-500 to-red-500" },
    { text: "Health Crises", color: "from-blue-500 to-purple-500" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8,
      rotateX: -30
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section ref={frameRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-blue-950">
      <GradientMesh variant="pink" />
      
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <motion.h2
                className="font-display font-bold text-5xl md:text-7xl lg:text-8xl uppercase text-white drop-shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {item.text}
              </motion.h2>
              
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-r ${item.color} opacity-10 blur-3xl`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </motion.div>
    </section>
  )
}

export default Frame2