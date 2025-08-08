import { motion } from 'framer-motion'

function GradientMesh({ variant = 'purple' }) {
  const gradients = {
    purple: {
      colors: ['#d946ef', '#a855f7', '#8b5cf6', '#7c3aed'],
      positions: ['0%', '25%', '50%', '100%'],
    },
    pink: {
      colors: ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8'],
      positions: ['0%', '33%', '66%', '100%'],
    },
    blue: {
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
      positions: ['0%', '30%', '60%', '100%'],
    },
    mixed: {
      colors: ['#d946ef', '#3b82f6', '#a855f7', '#ec4899'],
      positions: ['0%', '25%', '60%', '100%'],
    }
  }

  const selected = gradients[variant]

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {selected.colors.map((color, index) => (
              <stop key={index} offset={selected.positions[index]} stopColor={color} stopOpacity="0.8" />
            ))}
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>
        
        <motion.circle
          initial={{ cx: "20%", cy: "20%", r: "40%" }}
          animate={{
            cx: ['20%', '30%', '20%'],
            cy: ['20%', '30%', '20%'],
            r: ['40%', '45%', '40%'],
          }}
          fill={`url(#gradient-${variant})`}
          filter="url(#blur)"
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.circle
          initial={{ cx: "80%", cy: "80%", r: "50%" }}
          animate={{
            cx: ['80%', '70%', '80%'],
            cy: ['80%', '70%', '80%'],
            r: ['50%', '55%', '50%'],
          }}
          fill={`url(#gradient-${variant})`}
          filter="url(#blur)"
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.ellipse
          initial={{ cx: "50%", cy: "50%", rx: "60%", ry: "40%" }}
          animate={{
            rx: ['60%', '65%', '60%'],
            ry: ['40%', '45%', '40%'],
            rotate: [0, 180, 360],
          }}
          fill={`url(#gradient-${variant})`}
          filter="url(#blur)"
          opacity="0.5"
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  )
}

export default GradientMesh