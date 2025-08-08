import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import GradientMesh from './GradientMesh'

function Frame4() {
  const frameRef = useRef(null)
  const isInView = useInView(frameRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const items = [
    { 
      title: "Floods in Asia",
      description: "Emergency response teams deployed"
    },
    { 
      title: "Refugee support across Africa & Europe",
      description: "Humanitarian aid delivered"
    },
    { 
      title: "Digital aid networks",
      description: "Technology-enabled assistance"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      x: -100,
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <section ref={frameRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950">
      <GradientMesh variant="mixed" />
      
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-8"
      >
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-16 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Mobilizing Response
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative group"
              style={{ perspective: 1000 }}
            >
              <div className="relative">
                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-xl opacity-80">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Frame4