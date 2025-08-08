import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import GradientMesh from './GradientMesh'

function Frame3() {
  const frameRef = useRef(null)
  const isInView = useInView(frameRef, { once: false, amount: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

  const textVariants = {
    hidden: {
      opacity: 0,
      letterSpacing: '0.5em',
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      letterSpacing: '0.02em',
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const wordVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  const words = ["Yet,", "IFRC", "volunteers", "mobilize."]

  return (
    <section ref={frameRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950">
      <GradientMesh variant="blue" />
      
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-5xl mx-auto px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl">
            {words.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className={`inline-block mx-2 drop-shadow-lg ${
                  word === "mobilize." 
                    ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent" 
                    : "text-white"
                }`}
                style={{
                  textShadow: word === "mobilize." ? '0 0 40px rgba(239, 68, 68, 0.5)' : 'none'
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-red-500/10 to-purple-500/10 blur-3xl" />
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Frame3