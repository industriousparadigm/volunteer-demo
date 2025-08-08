import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundTexture from './BackgroundTexture'

function Frame6() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const [expandDot, setExpandDot] = useState(false)
  
  useEffect(() => {
    // Start expansion after text appears and holds
    // 0.3s delay + 0.8s animation + 3s hold + 2.5s extra = 6.6s
    const timer = setTimeout(() => {
      setExpandDot(true)
    }, 6600)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance to next frame
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/7')
    }, 9100) // Dot expansion at 6.6s + 1.5s duration = 8.1s, add 1s buffer
    return () => clearTimeout(timer)
  }, [navigate])
  
  return (
    <section ref={frameRef} className="h-screen flex relative overflow-hidden">
      <BackgroundTexture />
      
      {/* Main content - properly spaced */}
      <div className="w-full h-full relative flex items-center">
        
        {/* Text container - 75% width with less padding */}
        <div className="text-left pl-12 md:pl-16 lg:pl-20 pr-8" style={{ width: '75%' }}>
          
          {/* Line 1 */}
          <div className="overflow-hidden pb-2">
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              How might we
            </motion.h1>
          </div>
          
          {/* Line 2 */}
          <div className="overflow-hidden pb-2">
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35
              }}
            >
              harness this asset
            </motion.h1>
          </div>
          
          {/* Line 3 */}
          <div className="overflow-hidden pb-2">
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
              }}
            >
              for greater National
            </motion.h1>
          </div>
          
          {/* Line 4 - Societies recognition */}
          <div className="overflow-hidden pb-2">
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.65
              }}
            >
              Societies <span className="text-red-500">recognition</span>
            </motion.h1>
          </div>
          
          {/* Line 5 - and IFRC positioning with red positioning */}
          <div className="overflow-hidden pb-2">
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 relative inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.8
              }}
            >
              and IFRC <span className="text-red-500">positioning</span>?
            </motion.h1>
          </div>
        </div>
        
      </div>
      
      {/* Expanding dot - positioned absolutely to fill entire screen */}
      <motion.div
        className="fixed inset-0 bg-gray-900 rounded-full pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ 
          width: 0,
          height: 0,
        }}
        animate={expandDot ? {
          width: '300vmax',
          height: '300vmax',
        } : {}}
        transition={{
          duration: 1.5,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />
    </section>
  )
}

export default Frame6