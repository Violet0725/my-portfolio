import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import repoPrepperGif from './repo-prepper.gif'; 
import travelGif from './travel.gif'; 
import chatGif from './chat.gif';
// --- DATA SECTION: Updated from 'resume.pdf' ---
const RESUME_DATA = {
  header: {
    name: "Eric.Zhou",
    id: "QU-2026-CS",
    title: "HELLO WORLD, I AM ERIC ZHOU",
    subtitle: "Full Stack Developer | AI Integration Specialist",
    links: {
      github: "https://github.com/Violet0725",
      linkedin: "https://www.linkedin.com/in/ericzhou040725",
      email: "mailto:zhouxuhongeric@gmail.com"
    }
  },
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "Bash", "Lua"],
    frameworks: ["Next.js 15", "React", "Node.js", "FastAPI", "Socket.io", "Tailwind CSS", "Redis", "Docker"]
  },
  experience: {
    role: "TeachingAssistant",
    course: "CISC 203: Discrete Mathematics",
    period: "Sep 2025 - Present",
    tasks: [
      "students.mentor(200+); // Breaking down abstract proofs into logical steps",
      "analysis.run('root-cause'); // Identified edge cases to reinforce algorithmic correctness",
      "docs.create('Common Errors'); // Reduced repetitive clarification tickets by 15%",
      "return \"Mirrored technical documentation practices for complex systems\";"
    ]
  },
  projects: [
    {
      title: "Repo Interview Prepper AI",
      date: "Nov 2025",
      // Using process.env.PUBLIC_URL ensures links work on GitHub Pages
      demo: repoPrepperGif, 
      desc: "Technical interview simulator that scans GitHub repos to generate context-aware questions. Architected secure BFF pattern and implemented model cascading for 40% faster generation.",
      tags: ["React", "Vercel BFF", "OpenAI API", "GitHub API"]
    },
    {
      title: "Travel Debate AI",
      date: "Nov 2025",
      demo: travelGif, 
      desc: "Multi-agent orchestration engine where GPT-4 personas (Budget, Luxury, Mediator) debate to generate itineraries. Features real-time visualization and Redis persistence.",
      tags: ["Next.js 15", "OpenAI API", "Redis", "Multi-Agent"]
    },
    {
      title: "Real-Time Chat App",
      date: "Oct 2025",
      demo: chatGif,
      desc: "Low-latency distributed messaging system handling concurrent bidirectional streams. Optimized React state for sub-100ms delivery.",
      tags: ["Socket.io", "Node.js", "MongoDB", "React"]
    }
  ]
};

// --- COMPONENTS ---

const Navigation = ({ links }) => (
  <header>
    <div className="logo">{links.name}</div>
    <nav className="nav-links">
      <a href={links.links.github} target="_blank" rel="noreferrer">[ GitHub_Access ]</a>
      <a href={links.links.linkedin} target="_blank" rel="noreferrer">[ LinkedIn_Signal ]</a>
    </nav>
  </header>
);

const Hero = ({ data }) => (
  <section className="hero">
    <p style={{ color: 'var(--secondary)' }}>{'//'} Student ID: {data.id}</p>
    <h1>
      {data.title.split("ERIC ZHOU")[0]}
      <span className="highlight">ERIC ZHOU</span>
    </h1>
    <div className="typing-container">{data.subtitle}</div>
    <div className="cta-group">
      <a href="#projects" className="btn-tech">Initialize_Portfolio()</a>
      <a href={data.links.linkedin} target="_blank" rel="noreferrer" className="btn-tech">Connect_LinkedIn()</a>
    </div>
  </section>
);

const SkillsSection = ({ skills }) => (
  <section>
    <h2 className="section-title">01. SYSTEM_CAPABILITIES</h2>
    <div className="skills-container">
      <div>
        <h3 className="sub-heading">&gt; Languages</h3>
        <div className="skills-grid">
          {skills.languages.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
        </div>
      </div>
      <div>
        <h3 className="sub-heading">&gt; Frameworks & Tools</h3>
        <div className="skills-grid">
          {skills.frameworks.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
        </div>
      </div>
    </div>
  </section>
);

const ExperienceTerminal = ({ exp }) => (
  <section>
    <h2 className="section-title">02. RUNTIME_LOGS</h2>
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
        <span className="terminal-title">user@queens-u:~/work-experience</span>
      </div>
      <div className="terminal-body">
        <p><span className="keyword">class</span> <span className="func">{exp.role}</span> {'{'}</p>
        <p>&nbsp;&nbsp;course: <span className="string">"{exp.course}"</span>;</p>
        <p>&nbsp;&nbsp;period: <span className="string">"{exp.period}"</span>;</p>
        <br />
        <p>&nbsp;&nbsp;<span className="keyword">function</span> <span className="func">executeTasks</span>() {'{'}</p>
        {exp.tasks.map((task, index) => (
          <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{task}</p>
        ))}
        <p>&nbsp;&nbsp;{'}'}</p>
        <p>{'}'}</p>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }) => (
  // 'reversed' class is applied to odd indices (1, 3, 5...) to alternate layout
  <div className={`project-card ${index % 2 === 1 ? 'reversed' : ''}`}>
    
    {/* Media Section (GIF) */}
    {project.demo && (
      <div className="project-media">
        <img src={project.demo} alt={`${project.title} Demo`} />
        <div className="media-overlay"></div>
      </div>
    )}
    
    {/* Content Section */}
    <div className="project-content">
      <h3>{project.title}</h3>
      <span className="project-date">Status: Completed [{project.date}]</span>
      <p className="project-desc">{project.desc}</p>
      <div className="tags-wrapper">
        {project.tags.map(tag => <span key={tag} className="skill-tag small">{tag}</span>)}
      </div>
    </div>
  </div>
);

const ProjectsSection = ({ projects }) => (
  <section id="projects">
    <h2 className="section-title">03. DEPLOYED_MODULES</h2>
    <div className="projects-grid">
      {projects.map((proj, index) => (
        <ProjectCard key={index} project={proj} index={index} />
      ))}
    </div>
  </section>
);

const Footer = ({ links }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (e) => {
    e.preventDefault();
    // Simple copy to clipboard logic
    navigator.clipboard.writeText("zhouxuhongeric@gmail.com");
    setCopySuccess('Email Copied!');
    
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <footer className="contact-section">
      <h2 className="contact-title">INITIATE_COMMUNICATION()</h2>
      <p className="location-text">Located in Toronto, Ontario, Canada</p>
      
      <button 
        onClick={handleCopy} 
        className="btn-tech" 
        style={{ cursor: 'pointer', minWidth: '150px' }}
      >
        {copySuccess ? copySuccess : 'SEND EMAIL'}
      </button>

      <div className="social-links">
        <a href={links.github} target="_blank" rel="noreferrer">
          github.com/Violet0725
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          linkedin.com/in/ericzhou040725
        </a>
      </div>
      
      <div className="footer-meta">
        System Status: Normal | GPA: 4.1/4.3 | © 2026 Eric Zhou
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App">
      {/* ParticleBackground has been removed to allow the CSS Gradient to show */}
      <div className="container">
        <Navigation links={RESUME_DATA.header} />
        <Hero data={RESUME_DATA.header} />
        <SkillsSection skills={RESUME_DATA.skills} />
        <ExperienceTerminal exp={RESUME_DATA.experience} />
        <ProjectsSection projects={RESUME_DATA.projects} />
        <Footer links={RESUME_DATA.header.links} />
      </div>
    </div>
  );
}

export default App;