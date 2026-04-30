import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import './Footer.css'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Footer() {
  const year = new Date().getFullYear()

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
            <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">
              {l}
            </a>
          ))}
        </nav>

        <p className="footer-copy">
          © {year} Ivan Djajusman Adi. Built with{' '}
          <FiHeart className="heart-icon" size={13} />{' '}
          using React & Framer Motion.
        </p>
      </div>
    </footer>
  )
}
