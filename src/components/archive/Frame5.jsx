import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import CountUp from 'react-countup'
import GradientMesh from './GradientMesh'

function Frame5() {
  const frameRef = useRef(null)
  const isInView = useInView(frameRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const stats = [
    { 
      number: 17,
      suffix: " MILLION",
      label: "VOLUNTEERS",
      color: "from-purple-500 to-pink-500"
    },
    { 
      number: 1.2,
      prefix: "$",
      suffix: "B",
      label: "IN ECONOMIC VALUE",
      color: "from-pink-500 to-red-500"
    }
  ]

  return (
    <section ref={frameRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-pink-950 py-20">
      <GradientMesh variant="purple" />
      
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center"
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-20 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Power of Volunteering
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-20 blur-3xl opacity-50"
                style={{
                  background: `radial-gradient(circle, ${stat.color.includes('purple') ? '#a855f7' : '#ef4444'} 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative">
                <div className={`text-5xl md:text-7xl lg:text-8xl font-display font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-lg leading-tight`}>
                  {isInView && (
                    <>
                      {stat.prefix}
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2.5}
                        decimals={stat.number % 1 !== 0 ? 1 : 0}
                        useEasing={true}
                        separator=","
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>

                <motion.div
                  className="text-xl md:text-2xl text-white/80 font-display font-medium tracking-wider mt-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                >
                  {stat.label}
                </motion.div>

                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex space-x-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Frame5