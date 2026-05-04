import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, nav } = useLanguage()

  const links = [
    { label: t.nav.about, href: 'about' },
    { label: t.nav.skills, href: 'skills' },
    { label: t.nav.projects, href: 'projects' },
    { label: t.nav.experience, href: 'experience' },
    { label: t.nav.contact, href: 'contact' },
  ]

  return (
    <footer className="footer">
      <div className="footer-inner">
        <motion.a
          href="#hero"
          className="footer-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="logo-bracket">&lt;</span>
          <span className="gradient-text">Ivan</span>
          <span className="logo-bracket">/&gt;</span>
        </motion.a>

        <nav className="footer-links">
          {links.map(l => (
            <a key={l.href} href={`#${l.href}`} className="footer-link">
              {l.label}
            </a>
          ))}
        </nav>

        <p className="footer-copy">
          © {year} Ivan Djajusman Adi. {t.footer.copy}{' '}
          <FiHeart className="heart-icon" size={13} />{' '}
          {t.footer.and}
        </p>
      </div>
    </footer>
  )
}
