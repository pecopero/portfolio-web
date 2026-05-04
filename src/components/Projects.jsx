import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FiExternalLink, FiGithub, FiLayout, FiShoppingCart, FiCode } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './Projects.css'

const projects = [
  {
    title: 'GitHub Repository Explorer',
    descKey: 'github',
    tags: ['React', 'GitHub API', 'JavaScript', 'CSS3'],
    color: '#7C3AED',
    icon: <FiCode />,
    github: 'https://github.com/pecopero/github-repo-explorer',
    live: null,
  },
  {
    title: 'Seiko Boutique Indonesia',
    descKey: 'seiko',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    color: '#10B981',
    icon: <FiShoppingCart />,
    github: null,
    live: 'https://seikoboutique.co.id/',
  },
  {
    title: 'SIRCLO E-Commerce Platform',
    descKey: 'sirclo',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Figma'],
    color: '#F59E0B',
    icon: <FiLayout />,
    github: null,
    live: null,
  },
  {
    title: 'Checkout Performance Optimization',
    descKey: 'checkout',
    tags: ['React', 'TypeScript', 'Performance', 'Tailwind CSS'],
    color: '#EC4899',
    icon: <FiCode />,
    github: null,
    live: 'https://www.guardian.com.my/',
  },
]

const descriptions = {
  en: {
    github: 'A personal project built with React and GitHub API to search and explore repositories by username. Features real-time search, pagination, and a clean responsive UI.',
    seiko: 'Led end-to-end Shopify development for a premium global watch brand. Implemented custom theme, responsive UI, and product architecture. Delivered a production-ready store within 3 days.',
    sirclo: 'Built and scaled React-based frontend systems for high-traffic e-commerce platforms at SIRCLO. Developed reusable UI component libraries that improved team-wide development efficiency.',
    checkout: 'Led a performance optimization initiative at Bridzia that improved checkout page load speed by 80%. Applied code splitting, lazy loading, and clean architecture principles.',
  },
  id: {
    github: 'Proyek personal menggunakan React dan GitHub API untuk mencari dan menjelajahi repositori berdasarkan username. Fitur: pencarian real-time, pagination, dan UI responsif yang bersih.',
    seiko: 'Memimpin pengembangan Shopify end-to-end untuk brand jam tangan premium global. Mengimplementasikan custom theme, UI responsif, dan arsitektur produk. Store siap produksi dalam 3 hari.',
    sirclo: 'Membangun dan mengembangkan sistem frontend berbasis React untuk platform e-commerce traffic tinggi di SIRCLO. Mengembangkan library komponen UI yang meningkatkan efisiensi seluruh tim.',
    checkout: 'Memimpin inisiatif optimasi performa di Bridzia yang meningkatkan kecepatan halaman checkout sebesar 80%. Menerapkan code splitting, lazy loading, dan prinsip arsitektur bersih.',
  },
}

function TiltCard({ color, initial, animate, transition, children }) {
  const [glowing, setGlowing] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), { stiffness: 500, damping: 40 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 500, damping: 40 })
  const scale   = useSpring(1, { stiffness: 400, damping: 35 })

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    scale.set(1.04)
    setGlowing(true)
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
    setGlowing(false)
  }

  return (
    <motion.div
      className="project-card"
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ rotateX, rotateY, scale }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <AnimatePresence>
        {glowing && (
          <motion.div
            className="project-glow"
            style={{ background: `radial-gradient(circle at 50% 100%, ${color}25, transparent 70%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.projects.title}</h2>
          <p>{t.projects.subtitle}</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <TiltCard
              key={p.title}
              color={p.color}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="project-top" style={{ background: `${p.color}18`, borderBottom: `1px solid ${p.color}30` }}>
                <div className="project-icon" style={{ color: p.color, background: `${p.color}22` }}>
                  {p.icon}
                </div>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="proj-link" aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="proj-link" aria-label="Live">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{descriptions[lang][p.descKey]}</p>
                <div className="project-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="proj-tag" style={{ borderColor: `${p.color}50`, color: p.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
