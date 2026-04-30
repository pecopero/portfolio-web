import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiLayout, FiShoppingCart, FiCode } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'GitHub Repository Explorer',
    desc: 'A personal project built with React and GitHub API to search and explore repositories by username. Features real-time search, pagination, and a clean responsive UI.',
    tags: ['React', 'GitHub API', 'JavaScript', 'CSS3'],
    color: '#7C3AED',
    icon: <FiCode />,
    github: 'https://github.com/pecopero/github-repo-explorer',
    live: '#',
  },
  {
    title: 'Seiko Boutique Indonesia',
    desc: 'Led end-to-end Shopify development for a premium global watch brand. Implemented custom theme, responsive UI, and product architecture. Delivered a production-ready store within 3 days.',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    color: '#10B981',
    icon: <FiShoppingCart />,
    github: '#',
    live: '#',
  },
  {
    title: 'SIRCLO E-Commerce Platform',
    desc: 'Built and scaled React-based frontend systems for high-traffic e-commerce platforms at SIRCLO. Developed reusable UI component libraries that improved team-wide development efficiency.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Figma'],
    color: '#F59E0B',
    icon: <FiLayout />,
    github: '#',
    live: '#',
  },
  {
    title: 'Checkout Performance Optimization',
    desc: 'Led a performance optimization initiative at Bridzia that improved checkout page load speed by 35%. Applied code splitting, lazy loading, and clean architecture principles.',
    tags: ['React', 'TypeScript', 'Performance', 'Tailwind CSS'],
    color: '#EC4899',
    icon: <FiCode />,
    github: '#',
    live: '#',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Projects</h2>
          <p>A selection of my recent work</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="project-top"
                style={{ background: `${p.color}18`, borderBottom: `1px solid ${p.color}30` }}
              >
                <div className="project-icon" style={{ color: p.color, background: `${p.color}22` }}>
                  {p.icon}
                </div>
                <div className="project-links">
                  <a href={p.github} className="proj-link" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href={p.live} className="proj-link" aria-label="Live">
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="proj-tag" style={{ borderColor: `${p.color}50`, color: p.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    className="project-glow"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${p.color}20, transparent 70%)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
