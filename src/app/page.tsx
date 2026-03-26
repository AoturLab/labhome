"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// bilibit project data
const BILIBIT = {
  name: "bilibit",
  fullName: "bilibit",
  description:
    "A powerful CLI tool for downloading videos and subtitles from Bilibili. Supports full-quality downloads, multi-threaded fetching, and automatic subtitle extraction. Built with Node.js and powered by BBDown.",
  stars: "1.1k",
  forks: "89",
  language: "TypeScript",
  languageColor: "#3178c6",
  github: "https://github.com/AoturLab/bilibit",
  tags: [
    {
      label: "Node.js",
      command: "npm install -g bilibit",
    },
    {
      label: "CLI",
      command: "clawhub install bilibit",
    },
    {
      label: "BBDown",
      command: "bilibit install-bbdown",
    },
    {
      label: "Video Download",
      command: "bilibit download <url>",
    },
    {
      label: "Bilibili",
      command: "bilibit dl --url <b23.tv/xxx>",
    },
  ],
};

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2C4.9 2 4 2.9 4 4v10c0 1.1.9 2 2 2h4v2H6c-1.1 0-2 .9-2 2v1h12v-1c0-1.1-.9-2-2-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm4 6h4v8H10V8z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 7.334v8h6v1.333h6v-1.333h5.333V7.334H0zm6 1.333H6v5.334H4.8v-4H3.2v4H1.333V8.667H6v5.334h1.333v-4H8.8v4H10V8.667h-4zm10.667 0v1.333H20v5.334h-1.333v-4H17.2v4H15.2v-5.334h-1.333v5.334H12V8.667h4.667z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// Star count from GitHub API
function useGitHubStars(owner: string, repo: string) {
  const [stars, setStars] = useState<string | null>(null);
  const [forks, setForks] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          const s = data.stargazers_count;
          setStars(s >= 1000 ? `${(s / 1000).toFixed(1)}k` : String(s));
        }
        if (data.forks_count !== undefined) {
          const f = data.forks_count;
          setForks(f >= 1000 ? `${(f / 1000).toFixed(1)}k` : String(f));
        }
      })
      .catch(() => {});
  }, [owner, repo]);

  return { stars, forks };
}

// Nav
function Nav() {
  return (
    <nav>
      <div className="nav-logo">AoturLab</div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-badge"
        >
          <span className="dot" />
          Available for projects
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-title"
        >
          Hi, I'm <span className="accent">Long Chen</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-subtitle"
        >
          Developer & creator building tools that matter. Passionate about developer experience, CLI utilities, and open source.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-cta"
        >
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function About() {
  const cards = [
    {
      icon: "⚡",
      title: "Developer Tools",
      desc: "Building CLI tools and automation scripts that make developer workflows faster and more enjoyable.",
    },
    {
      icon: "🔧",
      title: "Open Source",
      desc: "Passionate about open source. Contributing to and maintaining projects that help the community.",
    },
    {
      icon: "🎯",
      title: "Focus Areas",
      desc: "Node.js, TypeScript, CLI tools, video processing, and anything that solves a real problem.",
    },
    {
      icon: "🌏",
      title: "Based in China",
      desc: "Working on tools for Chinese internet platforms with global developer patterns and best practices.",
    },
  ];

  return (
    <section id="about">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label">
            About
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="section-title">
            Who I Am
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="section-desc">
            A developer focused on building practical tools and open source projects. I care about developer experience and making complex tasks simple.
          </motion.p>

          <div className="about-grid">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={3 + i}
                variants={fadeUp}
                className="about-card"
              >
                <h3>
                  <span>{card.icon}</span> {card.title}
                </h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const { stars, forks } = useGitHubStars("AoturLab", "bilibit");
  const [skillTooltip, setSkillTooltip] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(cmd);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label">
            Projects
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="section-title">
            Featured Project
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="section-desc">
            The core project I'm actively maintaining and developing.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="project-main">
            <div className="project-header">
              <div className="project-icon">🎬</div>
              <div style={{ flex: 1 }}>
                <h3 className="project-title">
                  <a href={BILIBIT.github} target="_blank" rel="noopener noreferrer">
                    {BILIBIT.fullName}
                  </a>
                </h3>
              </div>
            </div>

            <p className="project-desc">{BILIBIT.description}</p>

            <div className="project-stats">
              <span className="stat stars">
                <StarIcon />
                {stars ?? BILIBIT.stars} stars
              </span>
              <span className="stat forks">
                <ForkIcon />
                {forks ?? BILIBIT.forks} forks
              </span>
              <span className="stat">
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: BILIBIT.languageColor,
                    display: "inline-block",
                  }}
                />
                {BILIBIT.language}
              </span>
            </div>

            <div className="project-links">
              <a
                href={BILIBIT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link primary"
              >
                <GitHubIcon size={14} />
                View on GitHub
                <ExternalIcon />
              </a>

              <div
                className="project-link-wrapper"
                onMouseEnter={() => setSkillTooltip(true)}
                onMouseLeave={() => setSkillTooltip(false)}
              >
                <span className="project-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  Install Skill
                </span>
                {skillTooltip && (
                  <div className="skill-install-tooltip">
                    <p className="skill-install-title">Install bilibit to OpenClaw</p>
                    <div className="skill-install-step">
                      <span className="skill-step-label">1. Install ClawHub (if not installed)</span>
                      <div className="skill-step-command">
                        <code>npm install -g clawhub</code>
                        <button
                          className="skill-copy-btn"
                          onClick={() => copyCommand("npm install -g clawhub")}
                        >
                          {copied === "npm install -g clawhub" ? "✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="skill-install-step">
                      <span className="skill-step-label">2. Install ClawHub Store (CLI)</span>
                      <div className="skill-step-command">
                        <code>clawhub store add clawhub-cli</code>
                        <button
                          className="skill-copy-btn"
                          onClick={() => copyCommand("clawhub store add clawhub-cli")}
                        >
                          {copied === "clawhub store add clawhub-cli" ? "✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="skill-install-step">
                      <span className="skill-step-label">3. Install bilibit Skill</span>
                      <div className="skill-step-command">
                        <code>clawhub install bilibit</code>
                        <button
                          className="skill-copy-btn"
                          onClick={() => copyCommand("clawhub install bilibit")}
                        >
                          {copied === "clawhub install bilibit" ? "✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label">
            Contact
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="section-title">
            Get in Touch
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="section-desc">
            Interested in collaborating or have a project in mind? Feel free to reach out.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="contact-grid">
            {/* Discord card with embedded QR */}
            <a
              href="https://discord.gg/5U6VttXUb8"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-discord-card"
            >
              <div className="contact-discord-left">
                <div className="contact-item-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item-label">Discord</p>
                  <p className="contact-item-desc">讨论群</p>
                </div>
              </div>
              <div className="contact-discord-right">
                <img src="/discord-qr.png" alt="Discord QR Code" width="72" height="72" />
              </div>
            </a>

            {/* Twitter card */}
            <a
              href="https://x.com/longchen_i"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div className="contact-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div>
                <p className="contact-item-label">Twitter / X</p>
                <p className="contact-item-desc">@longchen_i</p>
              </div>
            </a>

            {/* Email card */}
            <a
              href="mailto:chenlong@aotur.com"
              className="contact-item"
            >
              <div className="contact-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="contact-item-label">Email</p>
                <p className="contact-item-desc">chenlong@aotur.com</p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p className="footer-copy">
          © {new Date().getFullYear()} <span>Long Chen</span>. Built with Next.js.
        </p>
        <div className="footer-links">
          <a href="https://github.com/AoturLab" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://x.com/longchen_i" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
