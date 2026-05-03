import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiSend, FiUser, FiMessageSquare, FiMapPin, FiPhone, FiAlertCircle } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './Contact.css'

// Ganti dengan kredensial EmailJS kamu
const EMAILJS_SERVICE_ID  = 'service_uk9jy0s'
const EMAILJS_TEMPLATE_ID = 'template_7h14nlm'
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
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
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
          <h2>Get In Touch</h2>
          <p>Have a project in mind? Let's talk!</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>Let's build something great together</h3>
            <p>
              I'm currently open to freelance projects, full-time opportunities, or just
              a friendly chat about frontend development. Feel free to reach out!
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon"><FiMail /></div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <a href="mailto:ivan.d.adi.93@gmail.com" className="contact-item-value">
                    ivan.d.adi.93@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon"><FiPhone /></div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <a href="tel:+6281215326751" className="contact-item-value">
                    (+62) 812-1532-6751
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon"><FiMapPin /></div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <span className="contact-item-value">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <p className="socials-label">Find me on</p>
              <div className="socials-row">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social"
                    aria-label={s.label}
                    style={{ '--c': s.color }}
                  >
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
              <motion.div
                className="sent-msg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="sent-icon"><FiSend size={32} /></div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <input type="hidden" name="title" value="New Portfolio Message" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name"><FiUser size={14} /> Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"><FiMail size={14} /> Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message"><FiMessageSquare size={14} /> Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    <FiAlertCircle size={15} />
                    Gagal mengirim pesan. Silakan coba lagi.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <><FiSend size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
