import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  MailCheck,
  MapPin,
  Menu,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import './App.css'

const phoneNumbers = ['0755-4568550', '7987009527', '8871167393']
const primaryPhone = '7987009527'
const address =
  'New Jail Badbai Road, New Koh E Fiza, Airport Karond Bypass, Near Dwarka Dham, Bhopal'

const images = {
  hero: '/images/school-hero.png',
  building: '/images/school-building.png',
}

const navLinks = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Facilities', 'facilities'],
  ['Admissions', 'admissions'],
  ['Contact', 'contact'],
]

const trustPoints = ['English Medium', 'CBSE Pattern', 'Pre Nursery to Grade 8th']

const features = [
  ['Safe & Secure Environment', 'A calm, child-friendly campus parents can trust.', ShieldCheck],
  ['Caring & Qualified Teachers', 'Supportive teachers who understand every child’s pace.', Users],
  ['Fun Activities & Play-Based Education', 'Age-appropriate activities that keep learning joyful.', HeartHandshake],
  ['Simple Admission Process', 'Speak with the school team and get clear guidance.', CheckCircle2],
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

const emptyAdmissionForm = {
  parentName: '',
  studentName: '',
  classInterested: '',
  phone: '',
  message: '',
}

function isValidPhoneNumber(phone) {
  const normalizedPhone = phone.trim().replace(/[\s-]/g, '')

  return /^(\+91)?[6-9]\d{9}$/.test(normalizedPhone) || /^0\d{9,11}$/.test(normalizedPhone)
}

function SectionIntro({ kicker, title, children, align = 'center' }) {
  return (
    <motion.div
      className={`section-intro section-intro-${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.65 }}
    >
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {children && <p>{children}</p>}
    </motion.div>
  )
}

function ImagePanel({ src, alt, className = '', label }) {
  return (
    <div className={`image-panel ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
      {label && <span>{label}</span>}
    </div>
  )
}

function AnnouncementBar({ onDismiss }) {
  return (
    <div className="announcement-bar">
      <a href="#admissions">
        <Sparkles size={16} />
        <span>Admissions Open 2026–27 — Pre Nursery to Grade 8th | CBSE Pattern</span>
        <ArrowRight size={16} />
      </a>
      <button type="button" aria-label="Dismiss announcement" onClick={onDismiss}>
        <X size={16} />
      </button>
    </div>
  )
}

function Header({ showAnnouncement, onDismissAnnouncement }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 18)
  })

  const closeMenu = () => setOpen(false)

  return (
    <div className={`site-chrome ${scrolled ? 'site-chrome-scrolled' : ''}`}>
      {showAnnouncement && <AnnouncementBar onDismiss={onDismissAnnouncement} />}
      <header className="site-header">
        <nav aria-label="Primary navigation" className="nav-shell">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-mark">
              <GraduationCap size={26} />
            </span>
            <span>
              <strong>Felix</strong>
              <small>International School</small>
            </span>
          </a>

          <div className="nav-links">
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href={`tel:${primaryPhone}`} className="nav-phone">
              <Phone size={17} />
              {primaryPhone}
            </a>
            <a href="#admissions" className="button button-primary button-small">
              Apply Now
              <ArrowRight size={17} />
            </a>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <motion.div
        className="mobile-drawer"
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, x: 0, pointerEvents: 'auto' },
          closed: { opacity: 0, x: 24, pointerEvents: 'none' },
        }}
        transition={{ duration: 0.22 }}
      >
        {navLinks.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a href="#admissions" className="button button-primary" onClick={closeMenu}>
          Apply for 2026–27
          <ArrowRight size={18} />
        </a>
      </motion.div>
    </div>
  )
}

function Hero() {
  const words = ['A Great', 'Beginning', 'for a', 'Bright', 'Future.']

  return (
    <section id="home" className="hero-section">
      <div className="hero-blob hero-blob-left" />
      <div className="hero-blob hero-blob-right" />
      <span className="sparkle sparkle-one">✦</span>
      <span className="sparkle sparkle-two">✧</span>

      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.085 } },
          }}
        >
          <motion.p className="accent-line" variants={fadeUp}>
            Admissions Open 2026–27
          </motion.p>
          <h1 aria-label="A Great Beginning for a Bright Future.">
            {words.map((word) => (
              <motion.span
                key={word}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className={word === 'Bright' ? 'hero-italic' : ''}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p className="hero-subcopy" variants={fadeUp}>
            Felix International School offers a safe, caring and engaging English-medium
            learning environment from Pre Nursery to Grade 8th.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a href="#admissions" className="button button-primary">
              <Sparkles size={18} />
              Apply for 2026–27
            </a>
            <a href={`tel:${primaryPhone}`} className="button button-ghost">
              <Phone size={18} />
              Call Now
            </a>
          </motion.div>
          <motion.div className="hero-trust-grid" variants={fadeUp}>
            {trustPoints.map((point) => (
              <span key={point}>
                <CheckCircle2 size={18} />
                {point}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-media"
          initial={{ opacity: 0, y: 28, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <ImagePanel src={images.hero} alt="Felix International School campus building" />
          <div className="floating-badge badge-top">Admissions Open 2026–27</div>
          <div className="floating-badge badge-left">CBSE Pattern</div>
          <div className="school-name-plate">
            <strong>Felix International School</strong>
            <span>Nurturing Minds. Building Futures.</span>
          </div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="two-column">
        <motion.div
          className="about-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.65 }}
        >
          <ImagePanel src={images.building} alt="Felix International School building" label="New Koh E Fiza, Bhopal" />
          <div className="quote-card">
            <p>“Nurturing Minds. Building Futures.”</p>
          </div>
        </motion.div>

        <motion.div
          className="about-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <SectionIntro
            align="left"
            kicker="Welcome"
            title="Felix International School, <em>Bhopal</em>"
          >
            A parent-friendly English Medium school following CBSE Pattern, focused on
            safe learning, confident communication, discipline and overall growth.
          </SectionIntro>
          <div className="fact-grid">
            {[
              ['Classes', 'Pre Nursery to Grade 8th'],
              ['Medium', 'English Medium'],
              ['Pattern', 'CBSE Pattern'],
              ['Session', 'Admissions Open 2026–27'],
            ].map(([label, value]) => (
              <div key={label} className="fact-card">
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="facilities" className="section features-section">
      <div className="container">
        <SectionIntro
          kicker="Why choose Felix"
          title="A cleaner look at what parents care about most"
        >
          Just the essentials: safety, care, joyful learning and a simple admission path.
        </SectionIntro>
        <div className="feature-grid feature-grid-simple">
          {features.map(([title, description, Icon], index) => (
            <motion.article
              key={title}
              className={`feature-card ${index === 3 ? 'feature-card-accent' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.035 }}
            >
              <Icon size={30} />
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Admissions() {
  const [form, setForm] = useState(emptyAdmissionForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState(null)

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormMessage(null)

    const parentName = form.parentName.trim()
    const studentName = form.studentName.trim()
    const classInterested = form.classInterested.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    if (!parentName || !studentName || !classInterested || !phone) {
      setFormMessage({
        type: 'error',
        text: 'Please fill all required fields before submitting.',
      })
      return
    }

    if (!isValidPhoneNumber(phone)) {
      setFormMessage({
        type: 'error',
        text: 'Please enter a valid Indian mobile or landline number.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('admission_enquiries').insert([
        {
          parent_name: parentName,
          student_name: studentName,
          class_interested: classInterested,
          phone,
          message: message || null,
          source: 'website',
        },
      ])

      if (error) {
        console.error('Supabase insert error:', error)
        throw error
      }

      setForm(emptyAdmissionForm)
      setFormMessage({
        type: 'success',
        text: 'Thank you! Our admission team will contact you shortly.',
      })
    } catch (error) {
      console.error('Admission enquiry submit error:', error)
      setFormMessage({
        type: 'error',
        text: 'Something went wrong. Please try again or call the school directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappText = encodeURIComponent(
    'Hello Felix International School, I want to enquire about admissions for session 2026–27.',
  )

  return (
    <section id="admissions" className="section admissions-section">
      <div className="admissions-shell">
        <motion.div
          className="admission-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.65 }}
        >
          <p className="kicker">Admission enquiry</p>
          <h2>
            Admissions Open for Session <em>2026–27.</em>
          </h2>
          <p>
            Share your details and the school team will contact you shortly for Pre
            Nursery to Grade 8th admissions.
          </p>
          <div className="admission-callout">
            <strong>Classes: Pre Nursery to Grade 8th</strong>
            <span>English Medium | CBSE Pattern | Friendly learning environment</span>
          </div>
        </motion.div>

        <motion.div
          className="admission-form-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className="form-card-header">
            <span>Apply Now</span>
            <h3>Request Admission Call</h3>
            <p>Our admission team will contact you shortly.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Parent Name
              <input
                required
                name="parentName"
                placeholder="Enter parent name"
                value={form.parentName}
                onChange={updateField}
              />
            </label>
            <label>
              Student Name
              <input
                required
                name="studentName"
                placeholder="Enter student name"
                value={form.studentName}
                onChange={updateField}
              />
            </label>
            <label>
              Class Interested In
              <select
                required
                name="classInterested"
                value={form.classInterested}
                onChange={updateField}
              >
                <option value="" disabled>
                  Select class
                </option>
                {[
                  'Pre Nursery',
                  'Nursery',
                  'KG 1',
                  'KG 2',
                  'Grade 1',
                  'Grade 2',
                  'Grade 3',
                  'Grade 4',
                  'Grade 5',
                  'Grade 6',
                  'Grade 7',
                  'Grade 8',
                ].map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </label>
            <label>
              Phone Number
              <input
                required
                name="phone"
                placeholder="Enter phone number"
                inputMode="tel"
                value={form.phone}
                onChange={updateField}
              />
            </label>
            <label className="full-field">
              Message
              <textarea
                name="message"
                placeholder="Write a short message"
                rows="4"
                value={form.message}
                onChange={updateField}
              />
            </label>
            <button
              className="button button-primary full-field"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Admission Call'}
              <MailCheck size={18} />
            </button>
            {formMessage && (
              <p className={`${formMessage.type}-message full-field`} role="status">
                {formMessage.text}
              </p>
            )}
          </form>
          <div className="form-actions">
            <a href={`tel:${primaryPhone}`}>
              <Phone size={17} />
              Call Now
            </a>
            <a href={`https://wa.me/91${primaryPhone}?text=${whatsappText}`} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const mapsQuery = encodeURIComponent(address)
  const whatsappText = encodeURIComponent(
    'Hello Felix International School, I want to enquire about admissions for session 2026–27.',
  )

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-shell contact-shell-simple">
        <div className="contact-details">
          <SectionIntro
            align="left"
            kicker="Contact"
            title="Visit or speak with <em>Felix International School</em>"
          >
            {address}
          </SectionIntro>
          <div className="contact-card">
            <h3>Felix International School</h3>
            <p>
              <MapPin size={21} />
              {address}
            </p>
            <div className="phone-stack">
              {phoneNumbers.map((phone) => (
                <a key={phone} href={`tel:${phone}`}>
                  <Phone size={18} />
                  {phone}
                </a>
              ))}
            </div>
            <div className="contact-actions">
              <a href={`tel:${primaryPhone}`} className="button button-primary">
                Call Now
              </a>
              <a
                href={`https://wa.me/91${primaryPhone}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                WhatsApp Us
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="button button-ghost"
              >
                Get Directions
                <Route size={18} />
              </a>
            </div>
          </div>
        </div>

        <ImagePanel src={images.building} alt="Felix International School campus" className="contact-image" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid footer-grid-simple">
        <div>
          <h2>Felix International School</h2>
          <p>Nurturing Minds. Building Futures.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>{phoneNumbers.join(' | ')}</p>
          <p>{address}</p>
        </div>
      </div>
      <div className="footer-bottom">Copyright 2026 Felix International School. All rights reserved.</div>
    </footer>
  )
}

function MobileApplyBar() {
  return (
    <div className="mobile-apply-bar">
      <a href="#admissions" className="button button-primary">
        Apply Now
        <ArrowRight size={17} />
      </a>
      <a href={`tel:${primaryPhone}`} aria-label="Call Felix International School">
        <Phone size={19} />
      </a>
    </div>
  )
}

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return window.localStorage.getItem('felix-announcement') !== 'hidden'
  })

  function dismissAnnouncement() {
    window.localStorage.setItem('felix-announcement', 'hidden')
    setShowAnnouncement(false)
  }

  return (
    <>
      <Header showAnnouncement={showAnnouncement} onDismissAnnouncement={dismissAnnouncement} />
      <main>
        <Hero />
        <About />
        <Features />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <MobileApplyBar />
    </>
  )
}

export default App
