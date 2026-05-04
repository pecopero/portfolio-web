import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const ringX  = useSpring(mouseX, { stiffness: 160, damping: 22 })
  const ringY  = useSpring(mouseY, { stiffness: 160, damping: 22 })

  useEffect(() => {
    const move  = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setVisible(true) }
    const over  = (e) => setHovering(!!e.target.closest('a, button, input, textarea, [role="button"], label'))
    const down  = () => setClicking(true)
    const up    = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    document.addEventListener('mousemove',  move)
    document.addEventListener('mouseover',  over)
    document.addEventListener('mousedown',  down)
    document.addEventListener('mouseup',    up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      document.removeEventListener('mousemove',  move)
      document.removeEventListener('mouseover',  over)
      document.removeEventListener('mousedown',  down)
      document.removeEventListener('mouseup',    up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        className="cur-wrap"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <div className={`cur-ring${hovering ? ' hov' : ''}${clicking ? ' clk' : ''}`} />
      </motion.div>

      <motion.div
        className="cur-wrap"
        style={{ x: mouseX, y: mouseY, opacity: visible ? 1 : 0 }}
      >
        <div className={`cur-dot${clicking ? ' clk' : ''}`} />
      </motion.div>
    </>
  )
}
