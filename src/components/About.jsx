import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi'
import './About.css'

const stats = [
  { icon: <FiAward />, value: '6+', label: 'Years Experience' },
  { icon: <FiCode />, value: '2', label: 'Companies' },
  { icon: <FiLayers />, value: '35%', label: 'Checkout Speedup' },
  { icon: <FiZap />, value: '100%', label: 'Passion for Code' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <p>A little bit about who I am</p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-avatar-wrap"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="avatar-bg" />
            <div className="avatar-container">
              <div className="avatar-initials">ID</div>
              <div className="avatar-ring ring-1" />
              <div className="avatar-ring ring-2" />
            </div>
            <div className="about-tag tag-react">React</div>
            <div className="about-tag tag-ts">TypeScript</div>
            <div className="about-tag tag-shopify">Shopify</div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="about-heading">
              Turning ideas into{' '}
              <span className="gradient-text">pixel-perfect</span> experiences
            </h3>
            <p>
              I'm <strong>Ivan Djajusman Adi</strong>, a Frontend Developer based in Indonesia with
              over <strong>6 years</strong> of experience building clean, responsive, and scalable user interfaces.
            </p>
            <p>
              Skilled in <strong>React</strong>, <strong>Tailwind CSS</strong>, and modern JavaScript frameworks.
              I have a proven ability to collaborate cross-functionally and optimize web performance for
              high-traffic applications — including a <strong>35% checkout speed improvement</strong> at Bridzia Sdn Bhd.
            </p>
            <p>
              Strong focus on clean architecture, UX excellence, and delivering real business impact.
              I also graduated in <strong>Computer Science</strong> from Universitas Kristen Duta Wacana (2018).
            </p>

            <div className="about-stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
