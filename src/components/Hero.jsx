import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiDownload, FiArrowDown } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaReact, FaJs } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiShopify, SiNextdotjs, SiRedux } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const ROLES = ['Frontend Developer', 'React Specialist', 'Shopify Developer', 'UI Craftsman']

const FLOAT_ICONS = [
  { Icon: FaReact,        color: '#61DAFB', top: '14%', right: '10%', size: 28, dur: 6,   delay: 0   },
  { Icon: FaJs,           color: '#F7DF1E', top: '24%', right: '26%', size: 24, dur: 7,   delay: 1   },
  { Icon: SiTypescript,   color: '#3178C6', top: '66%', right: '8%',  size: 24, dur: 8,   delay: 1.5 },
  { Icon: SiTailwindcss,  color: '#06B6D4', top: '36%', right: '4%',  size: 26, dur: 7,   delay: 0.6 },
  { Icon: SiShopify,      color: '#96BF48', top: '80%', right: '22%', size: 22, dur: 9,   delay: 2.2 },
  { Icon: SiNextdotjs,    color: '#aaaaaa', top: '50%', right: '28%', size: 20, dur: 8,   delay: 3   },
  { Icon: SiRedux,        color: '#764ABC', top: '86%', right: '10%', size: 20, dur: 7.5, delay: 2   },
]

function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout

    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseTime)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseTime])

  return text
}

function MagneticButton({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 350, damping: 20 })
  const springY = useSpring(y, { stiffness: 350, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * 0.3)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * 0.3)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' }
})

export default function Hero() {
  const { t } = useLanguage()
  const typedRole = useTypewriter(ROLES)

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />

        {FLOAT_ICONS.map((item, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', top: item.top, right: item.right, zIndex: 0 }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.82, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 + i * 0.1, ease: 'backOut' }}
          >
            <div
              className="hero-float-icon"
              style={{ animationDuration: `${item.dur}s`, animationDelay: `${item.delay}s` }}
            >
              <item.Icon size={item.size} color={item.color} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container hero-content">
        <motion.div className="hero-badge" {...fadeUp(0.2)}>
          <span className="badge-dot" />
          {t.hero.badge}
        </motion.div>

        <motion.h1 className="hero-title" {...fadeUp(0.35)}>
          {t.hero.greeting}{' '}
          <span className="gradient-text">Ivan Djajusman</span>
          <br />
          <span className="hero-role">
            {typedRole}
            <span className="typewriter-cursor" />
          </span>
        </motion.h1>

        <motion.p className="hero-desc" {...fadeUp(0.5)}>
          {t.hero.desc.replace('{year}', '2019')}{' '}
          <span className="tag-inline">React</span>,{' '}
          <span className="tag-inline">TypeScript</span>,{' '}
          <span className="tag-inline">Shopify</span> &{' '}
          <span className="tag-inline">Tailwind CSS</span>.
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.65)}>
          <MagneticButton>
            <a href="#contact" className="btn btn-primary">{t.hero.talkBtn}</a>
          </MagneticButton>
          <MagneticButton>
            <a href="/cv-ivan-djajusman.pdf" download className="btn btn-outline">
              <FiDownload size={16} />
              {t.hero.cvBtn}
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div className="hero-socials" {...fadeUp(0.8)}>
          <a href="https://github.com/pecopero" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/ignatius-ivan-djajusman-adi-243682169/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
            <FaLinkedin size={22} />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  )
}
