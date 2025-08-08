import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientMesh from './GradientMesh'
import BackgroundTexture from './BackgroundTexture'
import { usePlayback } from '../contexts/PlaybackContext'

function Frame0() {
  const frameRef = useRef(null)
  const navigate = useNavigate()
  const { hasStarted } = usePlayback()
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState('waiting')
  
  const fullText = "The Value of a Volunteer"
  
  console.log('Frame0 render - phase:', phase, 'charIndex:', currentCharIndex)
  
  // Wait for start signal
  useEffect(() => {
    if (hasStarted && phase === 'waiting') {
      setPhase('typing')
    }
  }, [hasStarted, phase])
  
  useEffect(() => {
    console.log('Frame0 effect running - phase:', phase, 'charIndex:', currentCharIndex)
    let timer
    
    if (phase === 'typing') {
      if (currentCharIndex < fullText.length) {
        timer = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1)
        }, 80) // Slightly faster for smoother feel
      } else {
        console.log('Typing complete, moving to holding')
        timer = setTimeout(() => {
          setPhase('holding')
        }, 1000)
      }
    } else if (phase === 'holding') {
      console.log('In holding phase, moving to fadingRest')
      timer = setTimeout(() => {
        setPhase('fadingRest')
      }, 1000)
    } else if (phase === 'fadingRest') {
      console.log('In fadingRest phase, moving to fadingValue')
      timer = setTimeout(() => {
        setPhase('fadingValue')
      }, 2500) // Longer linger time for "Value"
    } else if (phase === 'fadingValue') {
      console.log('In fadingValue phase, moving to done')
      timer = setTimeout(() => {
        setPhase('done')
      }, 1000)
    } else if (phase === 'done') {
      // Auto-advance to next slide 1 second after animations complete
      timer = setTimeout(() => {
        navigate('/2')
      }, 1000)
    }
    
    return () => {
      if (timer) {
        console.log('Clearing timer for phase:', phase)
        clearTimeout(timer)
      }
    }
  }, [currentCharIndex, fullText.length, phase, navigate])

  // Display character by character
  const displayText = fullText.slice(0, currentCharIndex)
  
  // Split into parts for special handling of "Value"
  const beforeValue = displayText.includes("Value") ? displayText.substring(0, displayText.indexOf("Value")) : displayText
  const hasValue = displayText.includes("Value")
  const afterValue = displayText.includes("Value") ? displayText.substring(displayText.indexOf("Value") + 5) : ""

  return (
    <section ref={frameRef} className="h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundTexture />
      
      <div className="relative z-10 text-center px-8">
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-gray-900 whitespace-pre">
          {/* Before "Value" */}
          {beforeValue.length > 0 && (
            <motion.span
              className="inline"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: (phase === 'fadingRest' || phase === 'fadingValue' || phase === 'done') ? 0 : 1 
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
              {beforeValue}
            </motion.span>
          )}
          
          {/* "Value" with special animation */}
          {hasValue && (
            <motion.span
              className="inline"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: (phase === 'fadingValue' || phase === 'done') ? 0 : 1,
                color: (phase === 'fadingRest' || phase === 'fadingValue' || phase === 'done') ? '#ef4444' : '#111827'
              }}
              transition={{
                opacity: { duration: 1, ease: "easeOut" },
                color: { duration: 0.8, ease: "easeOut" }
              }}
            >
              Value
            </motion.span>
          )}
          
          {/* After "Value" */}
          {afterValue.length > 0 && (
            <motion.span
              className="inline"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: (phase === 'fadingRest' || phase === 'fadingValue' || phase === 'done') ? 0 : 1 
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
              {afterValue}
            </motion.span>
          )}
          
          {/* Invisible placeholder to prevent shift when text completes */}
          {displayText.length === 0 && (
            <span className="opacity-0">The Value of a Volunteer</span>
          )}
        </h1>
        
      </div>
    </section>
  )
}

export default Frame0