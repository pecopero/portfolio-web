import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiDownload, FiBook } from 'react-icons/fi'
import './Experience.css'

const experiences = [
  {
    role: 'React Developer',
    company: 'Bridzia Sdn Bhd',
    location: 'Remote (Malaysia)',
    period: 'July 2024 – July 2025',
    recent: true,
    desc: 'Delivered modular, maintainable React applications focused on scalability. Implemented responsive UI aligned with modern UX best practices. Improved code quality and performance through clean architecture. Improved checkout page load speed by 35%.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  },
  {
    role: 'Front End Developer',
    company: 'SIRCLO',
    location: 'Indonesia',
    period: 'Jan 2019 – June 2024',
    recent: false,
    desc: 'Built and scaled React-based frontend systems for high-traffic e-commerce platforms. Developed reusable UI components improving development efficiency and consistency. Delivered pixel-perfect responsive UI aligned with design systems. Optimized performance for faster load times and smoother UX.',
    tags: ['React', 'JavaScript', 'Shopify', 'Tailwind CSS', 'Figma'],
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Universitas Kristen Duta Wacana',
    period: '2012 – 2018',
    major: 'Major in Information Technology',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section exp-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience</h2>
          <p>My professional journey so far</p>
        </motion.div>

        <div className="exp-wrapper">
          <div className="exp-col">
            <div className="exp-timeline">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role + exp.company}
                  className={`exp-item${exp.recent ? ' current' : ''}`}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className="exp-dot-wrap">
                    <div className={`exp-dot${exp.recent ? ' active' : ''}`}>
                      <FiBriefcase size={12} />
                    </div>
                    {i < experiences.length - 1 && <div className="exp-line" />}
                  </div>

                  <div className="exp-card">
                    {exp.recent && <div className="exp-badge">Most Recent</div>}
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
                      {exp.tags.map(tag => (
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
                <span>Education</span>
              </div>
              {education.map(edu => (
                <div key={edu.degree} className="edu-card">
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-school">{edu.school}</div>
                  <div className="exp-meta" style={{ marginTop: 6 }}>
                    <span><FiCalendar size={12} /> {edu.period}</span>
                  </div>
                  <div className="edu-major">{edu.major}</div>
                </div>
              ))}
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
            <h3>Download Full CV</h3>
            <p>Get a complete overview of my experience, education, and skills in PDF format.</p>
            <a href="/cv-ivan-djajusman.pdf" download className="btn btn-primary cv-btn">
              <FiDownload size={16} />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
