import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Cpu, Globe, Layout, Palette, Terminal, Award } from 'lucide-react'
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
          <h2 style={{ fontSize: '10vw', marginBottom: '5rem' }}>The Profile</h2>
          <div className="grid-2">
            <div>
              <div
                className="profile-image-container"
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
              >
                <img src="/aditya.png" alt="Aditya Jaiswal" />
                <div style={{ position: 'absolute', bottom: '-20px', left: '0', background: 'var(--bg-color)', padding: '5px 10px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                  ADITYA JAISWAL
                </div>
              </div>
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
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Lovely Professional University (CGPA: 6.75)</p>
              </div>
              <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>2021 — 2023</p>
                <h4 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Intermediate (Science)</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>SKMRD College, Patna (74.2%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="experience">
          <h2 style={{ fontSize: '8vw', marginBottom: '5rem' }}>Projects &<br />Success</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <ExperienceCard
              type="PROJECT / DSA"
              title="Hospital Patient Record System"
              subtitle="Advanced DSA Project"
              date="Jun 2025"
              description="Built a structured management system utilizing optimized data structures for O(log n) search and retrieval. Focused on efficient memory management and modular architecture."
            />
            <ExperienceCard
              type="PROJECT / WEB"
              title="Building Materials Store"
              subtitle="E-Commerce & Management System"
              date="Recent"
              description="Developed a platform for managing and selling building materials using HTML and PHP. Focused on scalable architecture and user experience."
              link="https://github.com/adityajaiswal3/-building-materials-project"
            />
            <ExperienceCard
              type="ACHIEVEMENT"
              title="CyberSec Symposium 2.0"
              subtitle="North India's Largest Cyber Conference"
              date="Apr 2024"
              description="Participated in high-level discussions and workshops on network security and ethical hacking at LPU."
            />
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications">
          <div className="hero-tag">CERTIFIED</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '5rem' }}>Credentials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <Award color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Generative AI Professional</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>ORACLE · Sep 2025</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <Cpu color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Cloud Computing</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>NPTEL · Mar 2025</p>
            </div>
            <div
              className="card"
              style={{ padding: '2rem', cursor: 'pointer' }}
              onClick={() => window.open('https://coursera.org/verify/2AL1RND1KB7J', '_blank')}
              onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
              onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
            >
              <Globe color="var(--accent-cyan)" size={32} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Bits and Bytes of Computer Networking</h3>
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
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Introduction to Hardware and Operating Systems</h3>
              <p style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                IBM · Sep 2024
                <ExternalLink size={12} />
              </p>
            </div>
          </div>
        </section>

        {/* STACK SECTION */}
        <section id="stack">
          <div className="hero-tag">STACK</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '5rem' }}>Tech Arsenal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {['C++', 'JAVA', 'PYTHON', 'REACT', 'NODE.JS', 'MYSQL', 'GIT', 'PHP'].map(tool => (
              <div
                key={tool}
                className="card"
                style={{ textAlign: 'center', padding: '1.5rem' }}
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
              >
                <p style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{tool}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONNECT SECTION */}
        <section id="connect">
          <div className="hero-tag">CONNECT</div>
          <h2 style={{ fontSize: '6vw', marginBottom: '2rem', textAlign: 'center' }} className="outline">Contact.</h2>

          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 5rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
              Currently seeking <strong>Software Engineering Internships</strong> for Summer 2025.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>EMAIL</p>
              <a
                href="mailto:adityajaiswal947043@gmail.com"
                style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}
              >
                adityajaiswal947043@gmail.com
              </a>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>PHONE</p>
              <p style={{ fontSize: '1.2rem' }}>+91 90068 87516</p>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>LOCATION</p>
              <p style={{ fontSize: '1.2rem' }}>Phagwara, Punjab</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '5rem', flexWrap: 'wrap' }}>
            <motion.a href="https://github.com/adityajaiswal3" target="_blank" className="card" style={{ padding: '1rem 2rem', textDecoration: 'none', color: 'white', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }} whileHover={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }} onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))} onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}>GITHUB</motion.a>
            <motion.a href="https://www.linkedin.com/in/aditya-jaiswal-b046b4283/" target="_blank" className="card" style={{ padding: '1rem 2rem', textDecoration: 'none', color: 'white', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }} whileHover={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }} onMouseEnter={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: true }))} onMouseLeave={() => window.dispatchEvent(new CustomEvent('cursorHover', { detail: false }))}>LINKEDIN</motion.a>
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
