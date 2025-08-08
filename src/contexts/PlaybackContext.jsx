import { createContext, useContext, useState } from 'react'

const PlaybackContext = createContext()

export function PlaybackProvider({ children }) {
  const [hasStarted, setHasStarted] = useState(false)
  
  return (
    <PlaybackContext.Provider value={{ hasStarted, setHasStarted }}>
      {children}
    </PlaybackContext.Provider>
  )
}

export function usePlayback() {
  const context = useContext(PlaybackContext)
  if (!context) {
    throw new Error('usePlayback must be used within PlaybackProvider')
  }
  return context
}