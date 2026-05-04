import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaSass, FaGitAlt, FaFigma
} from 'react-icons/fa'
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiShopify,
  SiRedux, SiVite, SiWebpack, SiJest, SiStorybook, SiGraphql, SiPostman
} from 'react-icons/si'
import { FiBox } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './Skills.css'

const skillData = [
  {
    key: 'core',
    color: '#F59E0B',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
      { name: 'CSS3', icon: <FaCss3Alt />, level: 92 },
      { name: 'JavaScript', icon: <FaJs />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
    ]
  },
  {
    key: 'frameworks',
    color: '#7C3AED',
    skills: [
      { name: 'React', icon: <FaReact />, level: 92 },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 80 },
      { name: 'Redux', icon: <SiRedux />, level: 82 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 88 },
      { name: 'Sass/SCSS', icon: <FaSass />, level: 90 },
    ]
  },
  {
    key: 'ecommerce',
    color: '#EC4899',
    skills: [
      { name: 'Shopify', icon: <SiShopify />, level: 88 },
      { name: 'Magento', icon: <FiBox />, level: 85 },
    ]
  },
  {
    key: 'tools',
    color: '#10B981',
    skills: [
      { name: 'Git', icon: <FaGitAlt />, level: 88 },
      { name: 'Vite', icon: <SiVite />, level: 85 },
      { name: 'Webpack', icon: <SiWebpack />, level: 78 },
      { name: 'Jest', icon: <SiJest />, level: 72 },
      { name: 'GraphQL', icon: <SiGraphql />, level: 75 },
      { name: 'Figma', icon: <FaFigma />, level: 80 },
      { name: 'Storybook', icon: <SiStorybook />, level: 70 },
      { name: 'Postman', icon: <SiPostman />, level: 82 },
    ]
  },
]

function SkillBar({ name, icon, level, color, index, inView }) {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
    >
      <div className="skill-meta">
        <span className="skill-icon" style={{ color }}>{icon}</span>
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.07, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const categories = skillData.map(cat => ({
    ...cat,
    label: t.skills.categories[cat.key],
  }))

  return (
    <section id="skills" className="section skills-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.skills.title}</h2>
          <p>{t.skills.subtitle}</p>
        </motion.div>

        <div className="skills-grid">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
            >
              <div className="skill-card-header">
                <div className="skill-dot" style={{ background: cat.color }} />
                <h3>{cat.label}</h3>
              </div>
              <div className="skill-list">
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} index={si} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
