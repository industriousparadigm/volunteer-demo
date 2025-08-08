import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import GradientMesh from './GradientMesh'

function Frame1() {
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 0.3], [10, 0])

  return (
    <section ref={frameRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-950 via-pink-950 to-blue-950">
      <GradientMesh variant="purple" />
      
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 text-center"
      >
        <motion.h1 
          className="font-display font-black text-[20vw] leading-none tracking-tight text-white"
          style={{ filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' }}
          initial={{ letterSpacing: '0.5em', opacity: 0 }}
          animate={{ letterSpacing: '0.02em', opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          2025
        </motion.h1>

        <motion.p
          className="font-display text-sm md:text-lg lg:text-xl uppercase tracking-[0.3em] text-gray-400 mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          A Year of Unprecedented Challenges
        </motion.p>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="text-gray-500 text-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓ Scroll to continue
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Frame1