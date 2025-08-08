import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePlayback } from '../contexts/PlaybackContext'

function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isHoveringBottom, setIsHoveringBottom] = useState(false)
  const { hasStarted, setHasStarted } = usePlayback()
  const audioRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  
  const isOnSlide9 = location.pathname === '/9'
  const currentSlide = parseInt(location.pathname.slice(1)) || 1
  const isDarkSlide = [3, 4, 7, 8, 9].includes(currentSlide)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8
    }
  }, [])

  // Track mouse position to show/hide controls
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bottomThird = window.innerHeight * 0.66
      setIsHoveringBottom(e.clientY > bottomThird)
    }
    
    const handleMouseLeave = () => {
      setIsHoveringBottom(false)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleStart = async () => {
    if (!audioRef.current) return
    
    setHasStarted(true)
    setIsPlaying(true)
    setIsPaused(false)

    try {
      // If on slide 9 (ended), restart from beginning
      if (isOnSlide9) {
        audioRef.current.currentTime = 0
        audioRef.current.volume = isMuted ? 0 : 0.8
        navigate('/1')
      }
      
      await audioRef.current.play()
    } catch (err) {
      console.error('Audio playback error:', err)
    }
  }

  const handlePause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }

  const handleResume = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPaused(false)
      setIsPlaying(true)
    } catch (err) {
      console.error('Audio playback error:', err)
    }
  }

  const handleStop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
    setIsPaused(false)
    setHasStarted(false)
    navigate('/1')
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    audioRef.current.volume = newMutedState ? 0 : 0.8
  }

  // Listen for when we reach slide 9 to show restart button
  useEffect(() => {
    if (isOnSlide9 && hasStarted) {
      setIsPlaying(false)
    }
  }, [isOnSlide9, hasStarted])

  return (
    <>
      <audio
        ref={audioRef}
        id="backgroundMusic"
        src="/audio-with-narration-v5.mp3"
        preload="auto"
      />
      <AnimatePresence>
        {(isHoveringBottom || !hasStarted) && !hasStarted && !isPaused && !isOnSlide9 && (
          <motion.button
            onClick={handleStart}
            className={`fixed bottom-8 left-8 z-40 px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
              isDarkSlide
                ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Start
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(isHoveringBottom || isPaused) && (hasStarted || isPaused) && !isOnSlide9 && (
          <motion.div 
            className="fixed bottom-8 left-8 z-40 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
          {isPaused ? (
            <motion.button
              onClick={handleResume}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
                isDarkSlide
                  ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
              }`}
            >
              Resume
            </motion.button>
          ) : isPlaying ? (
            <motion.button
              onClick={handlePause}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
                isDarkSlide
                  ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
              }`}
            >
              Pause
            </motion.button>
          ) : null}
          
          <motion.button
            onClick={handleStop}
            className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
              isDarkSlide
                ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
            }`}
          >
            Restart
          </motion.button>
          
          <motion.button
            onClick={toggleMute}
            className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
              isDarkSlide
                ? isMuted
                  ? 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60'
                  : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                : isMuted
                  ? 'bg-gray-900/5 hover:bg-gray-900/10 text-gray-900/40 hover:text-gray-900/60'
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
            }`}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isHoveringBottom && isOnSlide9 && (
          <motion.button
            onClick={handleStart}
            className={`fixed bottom-8 left-8 z-40 px-4 py-2 rounded-lg backdrop-blur-sm transition-all ${
              isDarkSlide
                ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900/70 hover:text-gray-900'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Restart
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default AudioController