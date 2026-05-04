import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiShoppingCart, FiZap } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './WhatIDo.css'

const CARDS_META = [
  { Icon: FiCode,         color: '#7C3AED' },
  { Icon: FiShoppingCart, color: '#10B981' },
  { Icon: FiZap,          color: '#F59E0B' },
]

export default function WhatIDo() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t }  = useLanguage()

  return (
    <section className="section whatido-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.whatIDo.title}</h2>
          <p>{t.whatIDo.subtitle}</p>
        </motion.div>

        <div className="whatido-grid">
          {t.whatIDo.cards.map((card, i) => {
            const { Icon, color } = CARDS_META[i]
            return (
              <motion.div
                key={card.title}
                className="whatido-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="whatido-icon" style={{ color, background: `${color}18` }}>
                  <Icon size={24} />
                </div>
                <h3 className="whatido-title">{card.title}</h3>
                <p className="whatido-desc">{card.desc}</p>
                <div
                  className="whatido-bar"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
