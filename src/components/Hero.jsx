import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiArrowDown } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

const ROLES = ['Frontend Developer', 'React Specialist', 'Shopify Developer', 'UI Craftsman']

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
          <a href="#contact" className="btn btn-primary">
            {t.hero.talkBtn}
          </a>
          <a href="/cv-ivan-djajusman.pdf" download className="btn btn-outline">
            <FiDownload size={16} />
            {t.hero.cvBtn}
          </a>
        </motion.div>

        <motion.div className="hero-socials" {...fadeUp(0.8)}>
          <a href="https://github.com/pecopero" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
            <FaGithub size={22} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
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
