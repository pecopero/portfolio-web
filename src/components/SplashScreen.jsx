import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        >
          <div className="splash-bg">
            <div className="splash-blob blob-a" />
            <div className="splash-blob blob-b" />
          </div>

          <div className="splash-content">
            <motion.div
              className="splash-logo"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
            >
              <span className="splash-bracket">&lt;</span>
              <span className="splash-name gradient-text">Ivan</span>
              <span className="splash-bracket">/&gt;</span>
            </motion.div>

            <motion.p
              className="splash-role"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Frontend Developer
            </motion.p>

            <motion.div
              className="splash-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="splash-bar"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.7, duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
