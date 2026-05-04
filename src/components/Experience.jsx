import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiDownload, FiBook } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import './Experience.css'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const jobTags = [
    ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    ['React', 'JavaScript', 'Shopify', 'Tailwind CSS', 'Figma'],
  ]

  return (
    <section id="experience" className="section exp-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t.experience.title}</h2>
          <p>{t.experience.subtitle}</p>
        </motion.div>

        <div className="exp-wrapper">
          <div className="exp-col">
            <div className="exp-timeline">
              {t.experience.jobs.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  className={`exp-item${i === 0 ? ' current' : ''}`}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="exp-dot-wrap">
                    <div className={`exp-dot${i === 0 ? ' active' : ''}`}>
                      <FiBriefcase size={12} />
                    </div>
                    {i < t.experience.jobs.length - 1 && <div className="exp-line" />}
                  </div>
                  <div className="exp-card">
                    {i === 0 && <div className="exp-badge">{t.experience.mostRecent}</div>}
                    <div className="exp-header">
                      <h3 className="exp-role">{exp.role}</h3>
                      <span className="exp-company">{exp.company}</span>
                    </div>
                    <div className="exp-meta">
                      <span><FiCalendar size={12} /> {exp.period}</span>
                      <span><FiMapPin size={12} /> {exp.location}</span>
                    </div>
                    <p className="exp-desc">{exp.desc}</p>
                    <div className="exp-tags">
                      {jobTags[i].map(tag => (
                        <span key={tag} className="exp-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="edu-section"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="edu-header">
                <FiBook size={16} />
                <span>{t.experience.education}</span>
              </div>
              <div className="edu-card">
                <div className="edu-degree">{t.experience.edu.degree}</div>
                <div className="edu-school">{t.experience.edu.school}</div>
                <div className="exp-meta" style={{ marginTop: 6 }}>
                  <span><FiCalendar size={12} /> {t.experience.edu.period}</span>
                </div>
                <div className="edu-major">{t.experience.edu.major}</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="cv-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="cv-icon">
              <FiDownload size={28} />
            </div>
            <h3>{t.experience.cvTitle}</h3>
            <p>{t.experience.cvDesc}</p>
            <a href="/cv-ivan-djajusman.pdf" download className="btn btn-primary cv-btn">
              <FiDownload size={16} />
              {t.experience.cvBtn}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
