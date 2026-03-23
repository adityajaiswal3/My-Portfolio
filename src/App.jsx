import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Cpu, Globe, Layout, Palette, Terminal, Award, MapPin, Phone, MessageCircle } from 'lucide-react'
import Experience from './components/Experience'
import { AnimeNavBarDemo } from './components/ui/anime-navbar-demo'


const SkillItem = ({ name, status }) => (
  <div className="skill-row">
    <span>{name}</span>
    <span className="tag">{status}</span>
  </div>
)

const ExperienceCard = ({ type, title, subtitle, date, description, link }) => (
  <motion.div
    className="card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
    onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
    onClick={() => link && window.open(link, '_blank')}
    style={link ? { cursor: 'pointer' } : {}}
  >
    <div className="card-tag">
      {type}
      {link && <ExternalLink size={12} style={{ marginLeft: '10px' }} />}
    </div>
    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>{subtitle}</p>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>{date}</p>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem' }}>{description}</p>
  </motion.div>
)

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;

      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const onHover = (e) => {
      setHovered(e.detail);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('cursorHover', onHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('cursorHover', onHover);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor ${hovered ? 'hovered' : ''}`}
        style={{ position: 'fixed', left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', left: 0, top: 0 }}
      />
    </>
  );
};

const skillsData = [
  { name: 'C++', percentage: 92 },
  { name: 'JAVA', percentage: 88 },
  { name: 'PYTHON', percentage: 85 },
  { name: 'REACT', percentage: 90 },
  { name: 'NODE.JS', percentage: 84 },
  { name: 'MYSQL', percentage: 89 },
  { name: 'GIT', percentage: 95 },
  { name: 'PHP', percentage: 80 }
];

const StackSkillCard = ({ name, percentage }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      className="card"
      style={{ padding: '1.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      onClick={() => setClicked(!clicked)}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
    >
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', transition: 'all 0.3s ease' }}>
        <p style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: clicked ? 'bold' : 'normal', color: clicked ? '#000' : 'var(--text-main)', transition: 'color 0.3s ease', width: '100%', textAlign: clicked ? 'left' : 'center' }}>
          {name}
        </p>
        <AnimatePresence>
          {clicked && (
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#000', position: 'absolute', right: 0 }}
            >
              {percentage}%
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: 'var(--accent-cyan)',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectImageCard = ({ title, subtitle, image, link, buttonText = "View Project", description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}
  >
    <div
      className="project-image-wrapper"
      onClick={() => link && window.open(link, '_blank')}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
    >
      <div className="project-bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="project-overlay" />
      <div className="project-content">
        <h3 className="project-image-title">{title}</h3>
        <p className="project-image-subtitle">{subtitle}</p>
        {link ? (
          <button className="project-view-btn">{buttonText}</button>
        ) : (
          <button className="project-view-btn" style={{ visibility: 'hidden' }}>{buttonText}</button>
        )}
      </div>
    </div>
    {description && (
      <div style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', padding: '0 0.5rem', textAlign: 'justify' }}>
        {description}
      </div>
    )}
  </motion.div>
);

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <motion.h1
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '10px' }}
            >
              INITIALIZING_CORE
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Experience />
      <AnimeNavBarDemo />

      <main>
        {/* HERO SECTION */}
        <section id="home">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hero-tag"
          >
            OPEN FOR OPPORTUNITIES · 2025
          </motion.div>

          <h1 className="hero-title">
            Aditya<br />
            <span className="outline">Jaiswal</span><br />
          </h1>

          <div className="hero-footer">
            <p>
              <span>Computer Science Engineer</span> & Full Stack Developer — building robust systems with <span>C++, React, and Java.</span>
            </p>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <h2 style={{ fontSize: '7vw', marginBottom: '5rem' }}>The Profile</h2>
          <div className="grid-2">
            <div>
              <a
                href="/cv.pdf"
                download="Aditya_Jaiswal_CV.pdf"
                className="profile-image-container"
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
              >
                <div className="image-wrapper">
                  <img src="/aditya.png" alt="Aditya Jaiswal" />
                  <div className="cv-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    <span>DOWNLOAD CV</span>
                  </div>
                </div>
                <div className="profile-label">
                  ADITYA JAISWAL
                </div>
              </a>
              <p style={{ marginTop: '3rem', color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                I'm <strong>Aditya Jaiswal</strong>, a Computer Science Engineering student specialized in <strong>Data Structures, Algorithms, and Object-Oriented Programming</strong>. Currently pursuing BTech at <strong>Lovely Professional University</strong>.
              </p>
              <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                I specialize in building efficient systems, from hospital record management software to scalable web applications using <strong>C++, Java, and the MERN stack</strong>.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>CORE SKILLS</h3>
              <SkillItem name="C / C++ / Java / Python / PHP" status="LANGUAGES" />
              <SkillItem name="React / Node.js / HTML & CSS" status="FRAMEWORKS" />
              <SkillItem name="MySQL / MongoDB" status="DATABASE" />
              <SkillItem name="Git / GitHub" status="TOOLS" />
              <SkillItem name="DSA / OOP / Cloud Computing" status="CONCEPTS" />
              <SkillItem name="Generative AI (Oracle Certified)" status="AI" />

              <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>EDUCATION</h3>
              <div style={{ padding: '1rem 0' }}>
                <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>2023 — CURRENT</p>
                <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>BTech — Computer Science & Engineering</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Lovely Professional University </p>
              </div>
              <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>2021 — 2023</p>
                <h4 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Intermediate (Science)</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>SKMRD College, Patna </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <h2 style={{ fontSize: '8vw', marginBottom: '5rem' }}>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <ProjectImageCard
              title="Hospital Patient Record System"
              subtitle="Advanced DSA Project"
              image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
              link="https://github.com/adityajaiswal3/Hospital-Patient-Record-System"
              description="Developed a highly optimized, structured patient management system that efficiently handles sensitive medical records and appointment scheduling. By utilizing advanced data structures, it ensures real-time updates and seamless O(log n) retrieval of medical history. The modular architecture improves system reliability and focuses on strict error-handling and efficient memory utilization."
            />
            <ProjectImageCard
              title="Building Materials Store"
              subtitle="E-Commerce System"
              image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
              link="https://github.com/adityajaiswal3/-building-materials-project"
              description="Engineered a scalable e-commerce platform dedicated to managing and selling building materials through an interactive web interface. The robust backend, handled via PHP and HTML, ensures a smooth shopping experience and inventory tracking. It is targeted at maximizing user-experience while simplifying operations for material vendors."
            />
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements">
          <div className="hero-tag">ACHIEVEMENTS</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '5rem' }}>Success</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <ProjectImageCard
              title="CyberSec Symposium 2.0"
              subtitle="Cyber Conference @ LPU"
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
              link="/cybersec_certificate.jpg.jpg"
              buttonText="View Details"
              description="Actively participated in North India's largest cybersecurity conference, delving deep into advanced network security and ethical hacking challenges. Engaged in hands-on workshops alongside top-tier professionals to gain practical insights into the evolving landscape of digital security and data protection strategies."
            />
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications">
          <div className="hero-tag">CERTIFIED</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '5rem' }}>Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div
              className="card"
              style={{ padding: '2rem', cursor: 'pointer' }}
              onClick={() => window.open('/oracle_certificate.pdf', '_blank')}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
            >
              <Award color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Generative AI Professional</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ORACLE · Sep 2025
                <ExternalLink size={12} />
              </p>
            </div>
            <div
              className="card"
              style={{ padding: '2rem', cursor: 'pointer' }}
              onClick={() => window.open('/nptel_certificate.pdf', '_blank')}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
            >
              <Cpu color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Cloud Computing</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                NPTEL · Mar 2025
                <ExternalLink size={12} />
              </p>
            </div>
            <div
              className="card"
              style={{ padding: '2rem', cursor: 'pointer' }}
              onClick={() => window.open('https://coursera.org/verify/2AL1RND1KB7J', '_blank')}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
            >
              <Globe color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Computer Networking</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                GOOGLE · Sep 2024
                <ExternalLink size={12} />
              </p>
            </div>
            <div
              className="card"
              style={{ padding: '2rem', cursor: 'pointer' }}
              onClick={() => window.open('https://coursera.org/verify/GA7AUC2N8G17', '_blank')}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
            >
              <Terminal color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Operating  System</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                IBM · Sep 2024
                <ExternalLink size={12} />
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <div className="hero-tag">SKILLS</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '5rem' }}>Technical Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {skillsData.map(skill => (
              <StackSkillCard key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </section>

        {/* CONNECT SECTION */}
        <section id="connect" style={{ padding: '5rem 5%', minHeight: 'auto', marginBottom: '8rem', marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', display: 'inline-block', fontWeight: '800', letterSpacing: '-1px' }}>
              Contact <span style={{ color: '#ff9800', background: 'rgba(255,152,0,0.1)', padding: '5px 20px', borderRadius: '12px' }}>Me</span>
            </h2>
          </div>

          <div className="contact-grid">
            {/* Left Panel */}
            <div className="contact-info">
              <div className="contact-row">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div>
                  <h4>Location</h4>
                  <p>Phagwara, Punjab</p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-icon"><Mail size={24} /></div>
                <div>
                  <h4>Email</h4>
                  <p>adityajaiswal947043@gmail.com</p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-icon"><Phone size={24} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 90068 87516</p>
                </div>
              </div>

              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/aditya-jaiswal-b046b4283/" target="_blank" className="social-btn">LinkedIn</a>
                <a href="https://github.com/adityajaiswal3" target="_blank" className="social-btn">GitHub</a>
                <a href="#" className="social-btn">Twitter</a>
              </div>
            </div>

            {/* Right Panel */}
            <div className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="Your Name" className="contact-input" />
                <input type="email" placeholder="Your Email" className="contact-input" />
              </div>
              <input type="text" placeholder="Subject" className="contact-input" />
              <textarea placeholder="Your Message" rows="5" className="contact-input" />

              <div className="form-buttons">
                <button className="form-btn email-btn" onClick={() => window.open('mailto:adityajaiswal947043@gmail.com')}>
                  <Mail size={18} style={{ marginRight: '8px' }} /> Send via Email
                </button>
                <button className="form-btn whatsapp-btn" onClick={() => window.open('https://wa.me/919006887516', '_blank')}>
                  <MessageCircle size={18} style={{ marginRight: '8px' }} /> Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '8rem 5% 4rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
        <div>© 2025 ADITYA JAISWAL</div>
        <div>C++ · REACT · DS ALGO</div>
        <div>BUILT WITH PRECISION</div>
      </footer>
    </div>
  )
}

export default App
