import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import { FiMail, FiSend, FiUser, FiMessageSquare, FiMapPin, FiPhone, FiAlertCircle } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

const EMAILJS_SERVICE_ID  = 'service_uk9jy0s'
const EMAILJS_TEMPLATE_ID = 'template_oruqcws'
const EMAILJS_PUBLIC_KEY  = 'M7MDdTWwCcbXIA7Kb'

const socials = [
  { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/pecopero', color: '#A78BFA' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: '#', color: '#06B6D4' },
  { icon: <FaTwitter />, label: 'Twitter/X', href: '#', color: '#EC4899' },
]

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#7C3AED', '#EC4899', '#06B6D4', '#F59E0B', '#A78BFA', '#ffffff'],
      })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.contact.title}</h2>
          <p>{t.contact.subtitle}</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>{t.contact.heading}</h3>
            <p>{t.contact.desc}</p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon"><FiMail /></div>
                <div>
                  <div className="contact-item-label">{t.contact.email}</div>
                  <a href="mailto:ivan.d.adi.93@gmail.com" className="contact-item-value">
                    ivan.d.adi.93@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><FiPhone /></div>
                <div>
                  <div className="contact-item-label">{t.contact.phone}</div>
                  <a href="tel:+6281215326751" className="contact-item-value">(+62) 812-1532-6751</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><FiMapPin /></div>
                <div>
                  <div className="contact-item-label">{t.contact.location}</div>
                  <span className="contact-item-value">{t.contact.locationVal}</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <p className="socials-label">{t.contact.findMe}</p>
              <div className="socials-row">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="contact-social" aria-label={s.label} style={{ '--c': s.color }}>
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {status === 'success' ? (
              <motion.div className="sent-msg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="sent-icon"><FiSend size={32} /></div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successDesc}</p>
              </motion.div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <input type="hidden" name="title" value="New Portfolio Message" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name"><FiUser size={14} /> {t.contact.name}</label>
                    <input id="name" name="name" type="text" placeholder={t.contact.namePlaceholder}
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"><FiMail size={14} /> {t.contact.email}</label>
                    <input id="email" name="email" type="email" placeholder={t.contact.emailPlaceholder}
                      value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message"><FiMessageSquare size={14} /> {t.contact.message}</label>
                  <textarea id="message" name="message" rows={5} placeholder={t.contact.messagePlaceholder}
                    value={form.message} onChange={handleChange} required />
                </div>
                {status === 'error' && (
                  <div className="form-error">
                    <FiAlertCircle size={15} />
                    {t.contact.errorMsg}
                  </div>
                )}
                <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><span className="spinner" /> {t.contact.sending}</>
                    : <><FiSend size={15} /> {t.contact.sendBtn}</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
