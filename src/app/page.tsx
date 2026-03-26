"use client";

import { useEffect, useState } from "react";
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
  npm: "https://www.npmjs.com/package/bilibit",
  github: "https://github.com/AoturLab/bilibit",
  tags: ["Node.js", "CLI", "BBDown", "Video Download", "Bilibili"],
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
          Hi, I'm <span className="gradient">Long Chen</span>
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
              <span className="stat">
                <StarIcon />
                {stars ?? BILIBIT.stars} stars
              </span>
              <span className="stat">
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

            <div className="project-tags">
              {BILIBIT.tags.map((tag) => (
                <span
                  key={tag}
                  className={`tag${tag === "Node.js" ? " primary" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={BILIBIT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link primary"
              >
                <GitHubIcon size={14} />
                GitHub
                <ExternalIcon />
              </a>
              <a
                href={BILIBIT.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <NpmIcon />
                npm
                <ExternalIcon />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const links = [
    {
      icon: "🐙",
      label: "GitHub",
      value: "AoturLab",
      href: "https://github.com/AoturLab",
    },
    {
      icon: "📦",
      label: "npm",
      value: "@aoturlab",
      href: "https://www.npmjs.com/~aoturlab",
    },
  ];

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

          <div className="contact-grid">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                custom={3 + i}
                variants={fadeUp}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-icon">{link.icon}</div>
                <div>
                  <p className="contact-card-label">{link.label}</p>
                  <p className="contact-card-value">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
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
          <a href="https://www.npmjs.com/~aoturlab" target="_blank" rel="noopener noreferrer">
            npm
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
