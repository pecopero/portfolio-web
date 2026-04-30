import { motion } from 'framer-motion'
import { FiDownload, FiArrowDown } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' }
})

export default function Hero() {
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
          Available for freelance work
        </motion.div>

        <motion.h1 className="hero-title" {...fadeUp(0.35)}>
          Hi, I'm{' '}
          <span className="gradient-text">Ivan Djajusman</span>
          <br />
          <span className="hero-role">Frontend Developer</span>
        </motion.h1>

        <motion.p className="hero-desc" {...fadeUp(0.5)}>
          Crafting high-performance web experiences since <strong>2019</strong>.
          Specialized in <span className="tag-inline">React</span>,{' '}
          <span className="tag-inline">TypeScript</span>,{' '}
          <span className="tag-inline">Shopify</span> &{' '}
          <span className="tag-inline">Tailwind CSS</span>.
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.65)}>
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
          <a href="/cv-ivan-djajusman.pdf" download className="btn btn-outline">
            <FiDownload size={16} />
            Download CV
          </a>
        </motion.div>

        <motion.div className="hero-socials" {...fadeUp(0.8)}>
          <a
            href="https://github.com/pecopero"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
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
