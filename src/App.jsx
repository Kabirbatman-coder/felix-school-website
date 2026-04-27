import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MailCheck,
  MapPin,
  Menu,
  MonitorPlay,
  Palette,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import './App.css'

const phoneNumbers = ['0755-4568550', '7987009527', '8871167393']
const primaryPhone = '7987009527'
const address =
  'New Jail Badbai Road, New Koh E Fiza, Airport Karond Bypass, Near Dwarka Dham, Bhopal'

const images = {
  hero: '/images/school-hero.png',
  building: '/images/school-building.png',
  posterOverview: '/images/felix-poster-overview.png',
  posterAdmission: '/images/felix-poster-admission.png',
  placeholder: '/images/school-placeholder.svg',
}

const navLinks = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Facilities', 'facilities'],
  ['Activities', 'activities'],
  ['Admissions', 'admissions'],
  ['Gallery', 'gallery'],
  ['Contact', 'contact'],
]

const trustPoints = ['English Medium', 'CBSE Pattern', 'Pre Nursery to Grade 8th']

const features = [
  ['Safe & Secure Environment', 'Controlled, child-friendly surroundings for everyday confidence.', ShieldCheck],
  ['Spacious & Hygienic Classrooms', 'Clean, comfortable spaces planned for focused learning.', Sparkles],
  ['Audio-Visual Learning', 'Modern AV support that helps lessons become clearer and more engaging.', MonitorPlay],
  ['Fun Activities & Play-Based Education', 'Age-appropriate learning through stories, games and guided play.', HeartHandshake],
  ['Caring & Qualified Teachers', 'Supportive teachers who understand each child’s pace and personality.', Users],
  ['Holistic Development', 'Balanced attention to academics, confidence, discipline and values.', GraduationCap],
  ['Focus on Academics, Sports & Arts', 'A broad school routine that encourages talent in many forms.', Trophy],
  ['Affordable Fee Structure', 'Quality schooling with a parent-friendly admission approach.', CheckCircle2],
  ['Assuring Progress of Every Child', 'Regular observation and encouragement for visible growth.', ClipboardCheck],
  ['Experiential Learning', 'Hands-on activities that help children learn by doing.', BookOpen],
]

const activities = [
  ['Spoken English', BookOpen],
  ['Computer', MonitorPlay],
  ['Paper Craft', Sparkles],
  ['Painting', Palette],
  ['Drawing', Palette],
  ['Hand Writing', ClipboardCheck],
  ['Sports & Outdoor Play', Trophy],
  ['Creative Activities', Sparkles],
]

const admissionSteps = ['Enquire', 'Visit Campus', 'Submit Details', 'Admission Call']

const galleryItems = [
  ['School Building', images.hero, 'large'],
  ['Campus Front', images.building, 'medium'],
  ['Admission Poster', images.posterAdmission, 'poster'],
  ['Class Activities', images.placeholder, 'small'],
  ['Learning Activities', images.posterOverview, 'poster'],
  ['Playground', images.placeholder, 'small'],
  ['Transport', images.placeholder, 'small'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

function SectionIntro({ kicker, title, children, align = 'center', light = false }) {
  return (
    <motion.div
      className={`section-intro section-intro-${align} ${light ? 'section-intro-light' : ''}`}
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
            A parent-friendly English Medium school in Bhopal
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
            Felix International School offers a safe, caring and engaging learning
            environment from Pre Nursery to Grade 8th.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a href="#admissions" className="button button-primary">
              <Sparkles size={18} />
              Apply for 2026–27
            </a>
            <a href="#about" className="button button-ghost">
              Learn More
              <ArrowRight size={18} />
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
            <p>“A Great Beginning for a Bright Future”</p>
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
            kicker="Who we are"
            title="Welcome to <em>Felix International School</em>"
          >
            Felix International School is dedicated to nurturing young minds through
            quality education, play-based learning, creativity, discipline and holistic
            development. The school provides a safe, hygienic and positive environment
            where every child can grow with confidence.
          </SectionIntro>
          <div className="fact-grid">
            {[
              ['Classes', 'Pre Nursery to Grade 8th'],
              ['Medium', 'English Medium'],
              ['Pattern', 'CBSE Pattern'],
              ['Location', 'Bhopal'],
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
          kicker="Facilities & strengths"
          title="A school environment parents can <em>trust</em>"
        >
          Thoughtful facilities, caring teachers and balanced learning experiences help
          children feel safe, confident and ready to grow.
        </SectionIntro>
        <div className="feature-grid">
          {features.map(([title, description, Icon], index) => (
            <motion.article
              key={title}
              className={`feature-card ${index === 7 ? 'feature-card-accent' : ''}`}
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

function PosterShowcase() {
  return (
    <section className="section poster-section">
      <div className="poster-shell">
        <motion.div
          className="poster-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.65 }}
        >
          <p className="kicker">Admission campaign</p>
          <h2>
            Campaign creatives, now placed inside a cleaner <em>premium web story.</em>
          </h2>
          <p>
            The posters are included as shareable admission highlights, while the main
            website stays calmer, easier to read and more trustworthy for parents.
          </p>
          <a href="#admissions" className="button button-yellow">
            Request Admission Call
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          className="poster-stack"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <img src={images.posterOverview} alt="Felix International School admission poster with features" />
          <img src={images.posterAdmission} alt="Felix International School admission poster with school building" />
        </motion.div>
      </div>
    </section>
  )
}

function Activities() {
  return (
    <section id="activities" className="section activities-section">
      <div className="container">
        <SectionIntro
          light
          kicker="Activities & learning"
          title="Learning that feels active, creative and <em>joyful</em>"
        >
          Children learn through language, technology, art, handwriting, sports and
          guided creative activities.
        </SectionIntro>
        <div className="activity-row" aria-label="Activities and learning areas">
          {activities.map(([title, Icon], index) => (
            <motion.article
              key={title}
              className="activity-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <Icon size={30} />
              <h3>{title}</h3>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Admissions() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
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
          <p className="kicker">Admissions Open for Session 2026–27</p>
          <h2>
            Your child’s journey starts <em>here.</em>
          </h2>
          <p>
            Classes are open from Pre Nursery to Grade 8th for English Medium learning
            with CBSE Pattern academic guidance.
          </p>
          <div className="step-list">
            {admissionSteps.map((step, index) => (
              <div key={step} className="step-item">
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
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
            <p>Share your details and the school team can guide you through the next steps.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Parent Name
              <input required name="parentName" placeholder="Enter parent name" />
            </label>
            <label>
              Student Name
              <input required name="studentName" placeholder="Enter student name" />
            </label>
            <label>
              Class Interested In
              <select required name="classInterested" defaultValue="">
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
              <input required name="phone" placeholder="Enter phone number" inputMode="tel" />
            </label>
            <label className="full-field">
              Message
              <textarea name="message" placeholder="Write a short message" rows="4" />
            </label>
            <button className="button button-primary full-field" type="submit">
              Request Admission Call
              <MailCheck size={18} />
            </button>
            {submitted && (
              <p className="success-message full-field">
                Thank you. Your admission enquiry has been noted on this page.
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

function Gallery() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <SectionIntro kicker="Gallery" title="Campus visuals and admission <em>highlights</em>">
          Real school visuals are featured first. The placeholder cards are ready for
          classroom, playground, transport and learning photos when available.
        </SectionIntro>
        <div className="masonry-gallery">
          {galleryItems.map(([title, image, size]) => (
            <article key={title} className={`gallery-item gallery-${size}`}>
              <img src={image} alt={title} />
              <span>{title}</span>
            </article>
          ))}
        </div>
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
      <div className="contact-shell">
        <div className="contact-details">
          <SectionIntro
            align="left"
            kicker="Contact"
            title="Visit or speak with <em>Felix International School</em>"
          >
            We are located near Dwarka Dham on Airport Karond Bypass, Bhopal.
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

        <div className="map-panel">
          <MapPin size={36} />
          <h3>Google Map Placeholder</h3>
          <p>{address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h2>Felix International School</h2>
          <p>Nurturing Minds. Building Futures.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>{address}</p>
          <p>{phoneNumbers.join(' | ')}</p>
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
        <PosterShowcase />
        <Activities />
        <Admissions />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MobileApplyBar />
    </>
  )
}

export default App
