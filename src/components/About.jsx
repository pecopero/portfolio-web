import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './About.css'

function RichText({ text }) {
  return (
    <p dangerouslySetInnerHTML={{
      __html: text.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
    }} />
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const stats = [
    { icon: <FiAward />, value: '7+', label: t.about.stats.years },
    { icon: <FiCode />, value: '2', label: t.about.stats.companies },
    { icon: <FiLayers />, value: '80%', label: t.about.stats.speedup },
    { icon: <FiZap />, value: '100%', label: t.about.stats.passion },
  ]

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.about.title}</h2>
          <p>{t.about.subtitle}</p>
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
              {t.about.heading.split('pixel-perfect').length > 1 ? (
                <>
                  {t.about.heading.split('pixel-perfect')[0]}
                  <span className="gradient-text">pixel-perfect</span>
                  {t.about.heading.split('pixel-perfect')[1]}
                </>
              ) : t.about.heading}
            </h3>
            <RichText text={t.about.p1} />
            <RichText text={t.about.p2} />
            <RichText text={t.about.p3} />

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
