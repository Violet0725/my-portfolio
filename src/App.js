import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './App.css';
import repoPrepperGif from './repo-prepper.gif';
import travelGif from './travel.gif';
import chatGif from './chat.gif';

// --- DATA SECTION ---
const RESUME_DATA = {
  header: {
    name: "Eric Zhou",
    id: "QU-2026-CS",
    title: "ERIC ZHOU",
    subtitle: "Full Stack Developer & AI Integration Specialist",
    tagline: "Building the future, one commit at a time.",
    links: {
      github: "https://github.com/Violet0725",
      linkedin: "https://www.linkedin.com/in/ericzhou040725",
      email: "mailto:zhouxuhongeric@gmail.com"
    }
  },
  skills: {
    languages: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 88 },
      { name: "Java", level: 82 },
      { name: "SQL", level: 85 },
      { name: "Bash", level: 75 },
    ],
    frameworks: [
      { name: "Next.js 15", level: 92 },
      { name: "React", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Socket.io", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redis", level: 80 },
      { name: "Docker", level: 78 },
    ]
  },
  experience: {
    role: "Teaching Assistant",
    course: "CISC 203: Discrete Mathematics",
    institution: "Queen's University",
    period: "Sep 2025 - Present",
    highlights: [
      "Mentored 200+ students in discrete mathematics concepts",
      "Developed systematic debugging approaches for proofs",
      "Created documentation reducing clarification requests by 15%",
      "Applied technical writing skills to complex mathematical concepts"
    ]
  },
  projects: [
    {
      title: "Repo Interview Prepper AI",
      date: "Nov 2025",
      demo: repoPrepperGif,
      link: "https://repo-interview-prepper.vercel.app",
      desc: "An intelligent technical interview simulator that analyzes your GitHub repositories to generate contextual, codebase-specific interview questions. Perfect for preparing for technical interviews with personalized practice.",
      tags: ["React", "Vercel BFF", "OpenAI API", "GitHub API"],
      color: "#FF6B6B"
    },
    {
      title: "Travel Debate AI",
      date: "Nov 2025",
      demo: travelGif,
      link: "https://travel-debate-ai.vercel.app/",
      desc: "A multi-agent orchestration engine featuring GPT-4 powered AI personas that debate travel destinations in real-time. Watch AI agents argue, counter, and reach consensus on your perfect vacation spot.",
      tags: ["Next.js 15", "OpenAI API", "Redis", "Multi-Agent"],
      color: "#4ECDC4"
    },
    {
      title: "Real-Time Chat App",
      date: "Oct 2025",
      demo: chatGif,
      link: "https://eric-chat-app.vercel.app/",
      desc: "A low-latency distributed messaging system with WebSocket connections, real-time presence indicators, and instant message delivery. Built for scale with room-based architecture.",
      tags: ["Socket.io", "Node.js", "MongoDB", "React"],
      color: "#A78BFA"
    }
  ]
};

// --- SVG ICONS ---
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// --- NAVIGATION ---
const Navigation = ({ links }) => {
  return (
    <header className="nav-header">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-bracket">&lt;</span>
          {links.name}
          <span className="logo-bracket">/&gt;</span>
        </div>
        
        <nav className="nav-links">
          {['Skills', 'Experience', 'Projects', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
            >
              <span className="nav-number">0{i + 1}.</span>
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-socials">
          <a 
            href={links.links.github} 
            target="_blank" 
            rel="noreferrer"
            className="social-link"
          >
            <GithubIcon />
          </a>
          <a 
            href={links.links.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="social-link"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

// --- HERO SECTION ---
const Hero = ({ data }) => {
  return (
    <section className="hero">
      <div className="hero-content fade-in">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Available for opportunities
        </div>

        <p className="hero-intro">Hello, I'm</p>

        <h1 className="hero-title">{data.title}</h1>

        <h2 className="hero-subtitle">{data.subtitle}</h2>

        <p className="hero-tagline">{data.tagline}</p>

        <div className="hero-cta">
          <a href="#projects" className="btn-primary">
            <span>View My Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <a href={data.links.email} className="btn-secondary">
            <span>Get In Touch</span>
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
};

// --- SECTION HEADER ---
const SectionHeader = ({ number, title, subtitle }) => (
  <div className="section-header">
    <span className="section-number">{number}</span>
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

// --- SKILLS SECTION ---
const SkillBar = ({ skill, index, isInView }) => (
  <div className="skill-item">
    <div className="skill-info">
      <span className="skill-name">{skill.name}</span>
      <span className="skill-level">{skill.level}%</span>
    </div>
    <div className="skill-bar-bg">
      <div
        className="skill-bar-fill"
        style={{ 
          width: isInView ? `${skill.level}%` : '0%',
          transitionDelay: `${index * 0.05}s`
        }}
      />
    </div>
  </div>
);

const SkillsSection = ({ skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <SectionHeader 
        number="01" 
        title="Technical Arsenal" 
        subtitle="Technologies I work with daily"
      />
      <div className="skills-container">
        <div className="skills-column">
          <h3 className="skills-category">
            <span className="category-icon">⚡</span>
            Languages
          </h3>
          {skills.languages.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} isInView={isInView} />
          ))}
        </div>
        <div className="skills-column">
          <h3 className="skills-category">
            <span className="category-icon">🛠</span>
            Frameworks & Tools
          </h3>
          {skills.frameworks.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- EXPERIENCE SECTION ---
const ExperienceSection = ({ exp }) => {
  return (
    <section id="experience" className="experience-section">
      <SectionHeader 
        number="02" 
        title="Experience" 
        subtitle="Where I've been making an impact"
      />
      <div className="experience-card">
        <div className="exp-header">
          <div className="exp-role-wrapper">
            <h3 className="exp-role">{exp.role}</h3>
            <span className="exp-course">{exp.course}</span>
          </div>
          <div className="exp-meta">
            <span className="exp-institution">{exp.institution}</span>
            <span className="exp-period">{exp.period}</span>
          </div>
        </div>
        <ul className="exp-highlights">
          {exp.highlights.map((highlight, i) => (
            <li key={i}>
              <span className="highlight-arrow">→</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// --- PROJECT CARD ---
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`project-card ${index % 2 === 1 ? 'reversed' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-media"
        style={{ '--project-color': project.color }}
      >
        <img src={project.demo} alt={`${project.title} Demo`} loading="lazy" />
        <div className="media-overlay">
          <span>View Project →</span>
        </div>
      </a>

      <div className="project-content">
        <span className="project-date" style={{ color: project.color }}>
          {project.date}
        </span>
        
        <h3 className="project-title">
          <a href={project.link} target="_blank" rel="noreferrer">
            {project.title}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </h3>

        <p className="project-desc">{project.desc}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- PROJECTS SECTION ---
const ProjectsSection = ({ projects }) => (
  <section id="projects" className="projects-section">
    <SectionHeader 
      number="03" 
      title="Featured Projects" 
      subtitle="A selection of my recent work"
    />
    <div className="projects-grid">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  </section>
);

// --- FOOTER / CONTACT ---
const Footer = ({ links }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("zhouxuhongeric@gmail.com");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <section id="contact" className="footer-section">
      <div className="footer-content">
        <span className="footer-eyebrow">04. What's Next?</span>
        
        <h2 className="footer-title">
          Let's Build Something<br />
          <span className="gradient-text">Amazing Together</span>
        </h2>

        <p className="footer-text">
          I'm currently looking for new opportunities. Whether you have a question
          or just want to say hi, my inbox is always open!
        </p>

        <div className="footer-actions">
          <button onClick={handleCopy} className="btn-primary">
            <AnimatePresence mode="wait">
              {copySuccess ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Copy Email Address
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="footer-links">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <span className="footer-divider">•</span>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span className="footer-divider">•</span>
          <a href={links.email}>Email</a>
        </div>

        <div className="footer-bottom">
          <p>Designed & Built by Eric Zhou</p>
          <p className="footer-stats">GPA: 4.1/4.3 • Queen's University • © 2025</p>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP ---
function App() {
  return (
    <div className="App">
      <div className="bg-gradient"></div>
      <div className="container">
        <Navigation links={RESUME_DATA.header} />
        <Hero data={RESUME_DATA.header} />
        <SkillsSection skills={RESUME_DATA.skills} />
        <ExperienceSection exp={RESUME_DATA.experience} />
        <ProjectsSection projects={RESUME_DATA.projects} />
        <Footer links={RESUME_DATA.header.links} />
      </div>
    </div>
  );
}

export default App;
