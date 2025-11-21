import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// --- DATA SECTION: Update your Resume content here ---
const RESUME_DATA = {
  header: {
    name: "Eric.Zhou",
    id: "QU-2026-FC",
    title: "HELLO WORLD, I AM ERIC ZHOU",
    subtitle: "Computing Student @ Queen's U | Full Stack Developer | Algorithms",
    links: {
      github: "https://github.com/Violet0725",
      linkedin: "https://www.linkedin.com/in/ericzhou040725",
      email: "mailto:zhouxuhongeric@gmail.com"
    }
  },
  skills: {
    languages: ["Java", "Python", "C", "JavaScript", "SQL", "Lua"],
    frameworks: ["React", "Next.js", "Node.js", "Vue.js", "Git", "Linux Shell"]
  },
  experience: {
    role: "TeachingAssistant",
    course: "CISC 203: Discrete Mathematics",
    period: "Sep 2025 - Present",
    tasks: [
      "students.mark(200+); // Marked tests & delivered detailed feedback",
      "system.troubleshoot(); // Developed guides, reducing queries by 15%",
      "return \"High Student Engagement\";"
    ]
  },
  projects: [
    {
      title: "Flight Search System",
      date: "Jul 2025",
      desc: "End-to-End application using Vue.js and TDesign. Optimized load times by 25% via backend API integration.",
      tags: ["Vue Router", "Rest API"]
    },
    {
      title: "Gym Workout Finder",
      date: "Mar 2025",
      desc: "Targeted muscle group filtering using React & TypeScript. Achieved 95% uptime.",
      tags: ["TypeScript", "CSS3"]
    },
    {
      title: "Spotify Playlist Tool",
      date: "Dec 2024",
      desc: "Python GUI automation. Reduced data fetch latency by 15% using efficient JSON parsing.",
      tags: ["Python", "OAuth 2.0"]
    }
  ]
};

// --- COMPONENTS ---

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00f3ff';
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#00f3ff'));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = 'rgba(0, 243, 255,' + opacityValue + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="canvas-bg" />;
};

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
    <p style={{ color: 'var(--muted)' }}>// Student ID: {data.id}</p>
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
        <h3 className="sub-heading"> '&gt;' Languages</h3>
        <div className="skills-grid">
          {skills.languages.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
        </div>
      </div>
      <div>
        <h3 className="sub-heading"> '&gt;' Frameworks & Tools</h3>
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

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h3>{project.title}</h3>
    <span className="project-date">Status: Completed [{project.date}]</span>
    <p className="project-desc">{project.desc}</p>
    <div className="tags-wrapper">
      {project.tags.map(tag => <span key={tag} className="skill-tag small">{tag}</span>)}
    </div>
  </div>
);

const ProjectsSection = ({ projects }) => (
  <section id="projects">
    <h2 className="section-title">03. DEPLOYED_MODULES</h2>
    <div className="projects-grid">
      {projects.map((proj, index) => <ProjectCard key={index} project={proj} />)}
    </div>
  </section>
);

const Footer = ({ links }) => (
  <footer className="contact-section">
    <h2 className="contact-title">INITIATE_COMMUNICATION()</h2>
    <p className="location-text">Located in Kingston, Ontario, Canada</p>
    
    <a href={links.email} className="btn-tech">Send Email</a>

    <div className="social-links">
      <a href={links.github} target="_blank" rel="noreferrer">github.com/Violet0725</a>
      <a href={links.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/ericzhou040725</a>
    </div>
    
    <div className="footer-meta">
      System Status: Normal | GPA: 4.1/4.3 | © 2026 Eric Zhou
    </div>
  </footer>
);

function App() {
  return (
    <div className="App">
      <ParticleBackground />
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