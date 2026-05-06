import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FiExternalLink, FiGithub, FiLayout, FiShoppingCart, FiCode, FiStar, FiUsers, FiCreditCard } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
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
    live: 'https://pecopero.github.io/github-repo-explorer/',
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
    live: 'https://www.guardian.com.sg/',
  },
  {
    title: 'Island Rituals',
    descKey: 'island',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    color: '#06B6D4',
    icon: <FiShoppingCart />,
    github: null,
    live: 'https://islandrituals.id/',
  },
  {
    title: 'MyCashier',
    descKey: 'mycashier',
    tags: ['Electron', 'React', 'SQLite', 'Tailwind CSS'],
    color: '#F97316',
    icon: <FiCreditCard />,
    github: 'https://github.com/pecopero/MyCashier',
    live: null,
  },
]

const descriptions = {
  en: {
    github: 'A personal project built with React and GitHub API to search and explore repositories by username. Features real-time search, pagination, and a clean responsive UI.',
    seiko: 'Led end-to-end Shopify development for a premium global watch brand. Implemented custom theme, responsive UI, and product architecture. Delivered a production-ready store within 3 days.',
    sirclo: 'Built and scaled React-based frontend systems for high-traffic e-commerce platforms at SIRCLO. Developed reusable UI component libraries that improved team-wide development efficiency.',
    checkout: 'Led a performance optimization initiative at Bridzia that improved checkout page load speed by 80%. Applied code splitting, lazy loading, and clean architecture principles.',
    island: 'Developed a full Shopify storefront for Island Rituals, an Indonesian wellness and lifestyle brand. Implemented custom theme, product pages, and a smooth shopping experience optimized for mobile.',
    mycashier: 'A full-featured offline desktop POS app built with Electron + React + SQLite. Supports barcode scanning, multiple payment methods (cash/transfer/QRIS), thermal receipt printing, stock management, supplier debt tracking, sales & P&L reports, and multi-user roles.',
  },
  id: {
    github: 'Proyek personal menggunakan React dan GitHub API untuk mencari dan menjelajahi repositori berdasarkan username. Fitur: pencarian real-time, pagination, dan UI responsif yang bersih.',
    seiko: 'Memimpin pengembangan Shopify end-to-end untuk brand jam tangan premium global. Mengimplementasikan custom theme, UI responsif, dan arsitektur produk. Store siap produksi dalam 3 hari.',
    sirclo: 'Membangun dan mengembangkan sistem frontend berbasis React untuk platform e-commerce traffic tinggi di SIRCLO. Mengembangkan library komponen UI yang meningkatkan efisiensi seluruh tim.',
    checkout: 'Memimpin inisiatif optimasi performa di Bridzia yang meningkatkan kecepatan halaman checkout sebesar 80%. Menerapkan code splitting, lazy loading, dan prinsip arsitektur bersih.',
    island: 'Mengembangkan storefront Shopify lengkap untuk Island Rituals, brand wellness dan lifestyle asal Indonesia. Mengimplementasikan custom theme, halaman produk, dan pengalaman belanja yang smooth dan mobile-friendly.',
    mycashier: 'Aplikasi kasir desktop offline lengkap dibangun dengan Electron + React + SQLite. Fitur: barcode scanner, multi metode pembayaran (tunai/transfer/QRIS), cetak struk thermal, manajemen stok, hutang supplier + notifikasi jatuh tempo, laporan laba rugi, dan multi-user dengan role.',
  },
}

function TiltCard({ color, initial, animate, transition, children }) {
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
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
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
            <div key={p.title} className="proj-wrap">
              <TiltCard
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
            </div>
          ))}
        </div>

        <GitHubStats inView={inView} />
      </div>
    </section>
  )
}

function GitHubStats({ inView }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/pecopero')
      .then(r => r.json())
      .then(d => setStats({ repos: d.public_repos, followers: d.followers }))
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <motion.a
      href="https://github.com/pecopero"
      target="_blank"
      rel="noreferrer"
      className="github-stats-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <FaGithub size={18} />
      <span className="gh-stat"><FiStar size={14} /> {stats.repos} public repos</span>
      <span className="gh-dot">·</span>
      <span className="gh-stat"><FiUsers size={14} /> {stats.followers} followers</span>
      <span className="gh-arrow">View GitHub →</span>
    </motion.a>
  )
}
