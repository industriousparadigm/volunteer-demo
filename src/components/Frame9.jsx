import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundTexture from './BackgroundTexture'

function Frame9() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [animationPhase, setAnimationPhase] = useState('start')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('animate')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Stop at Frame9 - no auto-advance
  useEffect(() => {
    // Fade out music after animations complete
    const timer = setTimeout(() => {
      const audioElement = document.getElementById('backgroundMusic')
      if (audioElement) {
        // Fade out over 2 seconds
        let volume = audioElement.volume
        const fadeInterval = setInterval(() => {
          volume -= 0.05
          if (volume <= 0) {
            audioElement.pause()
            clearInterval(fadeInterval)
          } else {
            audioElement.volume = volume
          }
        }, 100)
      }
    }, 7000) // Fade starts at 7s when animations are done
    return () => clearTimeout(timer)
  }, [])

  // Pie chart data - rounded to integers that sum to 100%
  const pieData = [
    { value: 53, label: '5 - 15 hours', color: '#3b82f6' }, // Blue
    { value: 37, label: '15 - 25 hours', color: '#1e293b' }, // Navy/dark
    { value: 5, label: '0 - 5 hours', color: '#ef4444' }, // Red
    { value: 5, label: '50+ hours', color: '#f5f5f4' } // Off-white
  ]

  // Calculate angles for pie slices
  let cumulativeAngle = -90 // Start from top
  const slices = pieData.map((item) => {
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + (item.value / 100) * 360
    cumulativeAngle = endAngle
    return { ...item, startAngle, endAngle }
  })

  // Create SVG path for pie slice
  const createPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle)
    const end = polarToCartesian(centerX, centerY, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ")
  }

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  // Calculate label position for each slice
  const getLabelPosition = (slice, centerX, centerY, radius) => {
    const middleAngle = (slice.startAngle + slice.endAngle) / 2
    const labelRadius = radius * 0.65 // Position labels at 65% of radius
    return polarToCartesian(centerX, centerY, labelRadius, middleAngle)
  }
  
  return (
    <section ref={frameRef} className="h-screen flex relative overflow-hidden">
      
      {/* Split background with slanted divide */}
      <div className="absolute inset-0">
        {/* Black background */}
        <div className="absolute inset-0 bg-gray-950" />
        
        {/* Off-white/beige background with slanted edge using clip-path */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)'
          }}
        >
          <BackgroundTexture />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full flex">
        
        {/* Left side - Text content on black with horizontal pills */}
        <div className="w-1/2 flex flex-col justify-center pl-12 pr-8">
          
          {/* Pills container - stacked vertically */}
          <div className="space-y-8">
            
            {/* 2011 Blue Pill */}
            <div className="flex flex-col">
              {/* Year label above */}
              <motion.div 
                className="font-display text-3xl md:text-4xl font-bold text-stone-200 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                2011
              </motion.div>
              
              {/* Blue Pill - MUCH larger */}
              <motion.div
                className="relative"
                initial={{ width: '60px' }}
                animate={animationPhase === 'animate' ? { 
                  width: '85%' 
                } : { width: '60px' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 0.5
                }}
              >
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-full h-40 shadow-lg flex items-center justify-center overflow-hidden">
                  <motion.div 
                    className="flex flex-col items-center justify-center text-white font-display font-bold px-10"
                    initial={{ opacity: 0 }}
                    animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  >
                    <div className="text-5xl font-extrabold">4 hrs</div>
                    <div className="text-4xl mt-2 font-bold">$300M</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* 2025 Red Pill */}
            <div className="flex flex-col">
              {/* Year label above */}
              <motion.div 
                className="font-display text-3xl md:text-4xl font-bold text-stone-200 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
              >
                2025
              </motion.div>
              
              {/* Red Pill - MUCH larger */}
              <motion.div
                className="relative"
                initial={{ width: '60px' }}
                animate={animationPhase === 'animate' ? { 
                  width: '100%' 
                } : { width: '60px' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 2.0  // 1.5s after beige pill starts (0.5 + 1.5)
                }}
              >
                <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-full h-48 shadow-lg flex items-center justify-center overflow-hidden">
                  <motion.div 
                    className="flex flex-col items-center justify-center text-white font-display font-bold px-12"
                    initial={{ opacity: 0 }}
                    animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 3.3 }}
                  >
                    <div className="text-6xl font-extrabold">180 hrs</div>
                    <div className="text-5xl mt-2 font-bold">$13.5B**</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Asterisk reference text - below pills */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3.8 }}
          >
            <p className="font-display text-sm text-stone-300 max-w-lg">
              <span className="font-bold">**Regional extrapolation from National Societies;</span>
              <span> based on 180 hours/year.</span>
            </p>
          </motion.div>

          {/* Source citation - moved up significantly */}
          <motion.div
            className="absolute bottom-24 left-12"
            initial={{ opacity: 0 }}
            animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            <p className="font-display text-xs text-stone-300">
              Source: IFRC Regional Office for Americas 2025, Volunteer Valuation Analysis.
            </p>
          </motion.div>
        </div>

        {/* Right side - Pie chart on off-white/beige */}
        <div className="w-1/2 flex flex-col items-center justify-between pr-12 pl-8 pt-16 pb-24">
          
          {/* Top section with title and chart */}
          <div className="flex flex-col items-center">
            {/* Title */}
            <div className="overflow-hidden mb-10">
              <motion.h3
                className="font-display text-3xl md:text-4xl text-gray-800 text-center font-semibold"
                initial={{ y: '120%' }}
                animate={animationPhase === 'animate' ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 4.5 }}
              >
                Average number of hours each<br />
                volunteer dedicates per month
              </motion.h3>
            </div>

            {/* Pie chart - BIGGER */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={animationPhase === 'animate' ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96], delay: 4.8 }}
            >
            <svg width="500" height="500" viewBox="0 0 500 500">
              {slices.map((slice, index) => (
                <motion.path
                  key={index}
                  d={createPath(250, 250, 200, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={animationPhase === 'animate' ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 5.0 + index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                />
              ))}
            </svg>

            {/* Percentage labels - positioned at center of each slice */}
            {slices.map((slice, index) => {
              const pos = getLabelPosition(slice, 250, 250, 200)
              const isSmallSlice = slice.value <= 5
              const textColor = slice.color === '#f5f5f4' ? 'text-gray-800' : 'text-white'
              
              return (
                <motion.div
                  key={`label-${index}`}
                  className="absolute"
                  style={{
                    left: `${(pos.x / 500) * 100}%`,
                    top: `${(pos.y / 500) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 5.5 + index * 0.1 }}
                >
                  <span className={`font-display ${isSmallSlice ? 'text-xl' : 'text-3xl'} ${textColor} font-bold`}>
                    {slice.value}%
                  </span>
                </motion.div>
              )
            })}
            </motion.div>

            {/* Complete Legend - all 4 items */}
            <motion.div
              className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={animationPhase === 'animate' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 6.0 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }} />
                <span className="font-display text-gray-700 font-semibold">5 - 15 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#1e293b' }} />
                <span className="font-display text-gray-700 font-semibold">15 - 25 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
                <span className="font-display text-gray-700 font-semibold">0 - 5 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-gray-400" style={{ backgroundColor: '#f5f5f4' }} />
                <span className="font-display text-gray-700 font-semibold">50+ hours</span>
              </div>
            </motion.div>
          </div>
          
          {/* Source citation - aligned with left side */}
          <motion.div
            className="w-full text-right"
            initial={{ opacity: 0 }}
            animate={animationPhase === 'animate' ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 6.2 }}
          >
            <p className="font-display text-xs text-gray-600">
              Source: IFRC Regional Office for Americas 2025, Volunteer Valuation Analysis.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Frame9