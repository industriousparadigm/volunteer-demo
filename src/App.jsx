import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Frame1 from './components/Frame1'
import Frame2 from './components/Frame2'
import Frame3 from './components/Frame3'
import Frame4 from './components/Frame4'
import Frame5 from './components/Frame5'
import Frame6 from './components/Frame6'
import Frame7 from './components/Frame7'
import Frame8 from './components/Frame8'
import Frame9 from './components/Frame9'
import SlideNavigation from './components/SlideNavigation'
import AudioController from './components/AudioController'
import { PlaybackProvider } from './contexts/PlaybackContext'

const slides = [
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  Frame8,
  Frame9
]

function SlideRenderer() {
  const { slideId } = useParams()
  const slideNumber = parseInt(slideId) || 1
  const slideIndex = slideNumber - 1
  const SlideComponent = slides[slideIndex]
  
  if (!SlideComponent || slideNumber < 1 || slideNumber > slides.length) {
    return <Navigate to="/1" replace />
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>
      <SlideNavigation currentSlide={slideNumber} totalSlides={slides.length} />
    </div>
  )
}

function App() {
  return (
    <Router>
      <PlaybackProvider>
        <AudioController />
        <Routes>
          <Route path="/:slideId" element={<SlideRenderer />} />
          <Route path="/" element={<Navigate to="/1" replace />} />
        </Routes>
      </PlaybackProvider>
    </Router>
  )
}

export default App