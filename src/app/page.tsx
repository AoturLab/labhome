"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const spring = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

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

// Character-level typewriter for the hero title
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="typewriter-wrap" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="typewriter-char"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="typewriter-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: delay + text.length * 0.04, duration: 0.8, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        _
      </motion.span>
    </span>
  );
}

// Floating ambient orb
function FloatingOrb({ className, size = 400 }: { className?: string; size?: number }) {
  return (
    <motion.div
      className={`floating-orb ${className ?? ""}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      aria-hidden="true"
    />
  );
}

// Scroll-down indicator with animated chevron
function ScrollIndicator() {
  return (
    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </motion.div>
      <span>scroll</span>
    </motion.div>
  );
}

// bilibit project data
const BILIBIT = {
  name: "bilibit",
  fullName: "bilibit",
  description:
    "A powerful CLI tool for downloading videos and subtitles from Bilibili. Supports full-quality downloads, multi-threaded fetching, and automatic subtitle extraction.",
  stars: "1.1k",
  forks: "89",
  language: "TypeScript",
  languageColor: "#3178c6",
  github: "https://github.com/AoturLab/bilibit",
  tags: [
    { label: "Node.js", command: "npm install -g bilibit" },
    { label: "CLI", command: "clawhub install bilibit" },
    { label: "BBDown", command: "bilibit install-bbdown" },
    { label: "Video Download", command: "bibilit download <url>" },
    { label: "Bilibili", command: "bibilit dl --url <b23.tv/xxx>" },
  ],
};

// pic-gen project data
const PICGEN = {
  name: "pic-gen",
  fullName: "pic-gen",
  description:
    "AI image generation and prompt optimization tool. A Skill supporting multiple models: Qwen Wanxiang, Banana (Flux), and DALL-E 3. Transform simple descriptions into professional prompts.",
  stars: "127",
  forks: "12",
  language: "Python",
  languageColor: "#3572A5",
  github: "https://github.com/AoturLab/pic-gen",
  tags: [
    { label: "AI Art", command: "clawhub install pic-gen" },
    { label: "Prompt Eng", command: "clawhub install pic-gen" },
    { label: "Qwen Wanxiang", command: "clawhub install pic-gen" },
    { label: "Flux / DALL-E", command: "clawhub install pic-gen" },
  ],
};

const PROJECTS = [BILIBIT, PICGEN];

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
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
      <div className="nav-logo">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          AoturLab
        </motion.span>
      </div>
      <ul className="nav-links">
        {["About", "Projects", "Contact"].map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
          >
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="hero">
      {/* Ambient floating orbs */}
      <FloatingOrb className="orb-1" size={380} />
      <FloatingOrb className="orb-2" size={280} />

      <div className="container">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-badge"
        >
          <motion.span
            className="dot"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Available for projects
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-title"
        >
          <TypewriterText text="Hi, I'm " delay={0.3} />
          <motion.span
            className="accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + 7 * 0.04 + 0.1, duration: 0.01 }}
          >
            <TypewriterText text="Long Chen" delay={0.3 + 7 * 0.04 + 0.15} />
          </motion.span>
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

        <ScrollIndicator />
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
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label typewriter-section">
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
                variants={spring}
                className="about-card"
                whileHover={{ y: -4, rotateY: 2, borderColor: "rgba(232,164,76,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
  const [skillTooltips, setSkillTooltips] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(cmd);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const projectEmojis: Record<string, string> = {
    bilibit: "🎬",
    "pic-gen": "🎨",
  };

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label typewriter-section">
            Projects
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="section-title">
            Open Source Works
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="section-desc">
            Skills and tools I'm actively maintaining.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="projects-grid">
            {PROJECTS.map((project, pIdx) => (
              <motion.div
                key={project.name}
                className="project-card"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: pIdx * 0.12,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
              >
                <div className="project-header">
                  <motion.div
                    className="project-icon"
                    whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  >
                    {projectEmojis[project.name]}
                  </motion.div>
                  <div style={{ flex: 1 }}>
                    <h3 className="project-title">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.fullName}
                      </a>
                    </h3>
                  </div>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <motion.div
                      key={tag.label}
                      className="tag-wrapper"
                      onHoverStart={() => setSkillTooltips(t => ({ ...t, [`${project.name}-${tag.label}`]: true }))}
                      onHoverEnd={() => setSkillTooltips(t => ({ ...t, [`${project.name}-${tag.label}`]: false }))}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pIdx * 0.12 + tIdx * 0.05, duration: 0.3 }}
                    >
                      <motion.span
                        className={`tag${tag.label === project.tags[0].label ? " primary" : ""}`}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {tag.label}
                      </motion.span>
                      <AnimatePresence>
                        {skillTooltips[`${project.name}-${tag.label}`] && (
                          <motion.div
                            className="skill-tooltip"
                            initial={{ opacity: 0, scale: 0.88, y: 4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 4 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <code>{tag.command}</code>
                            <motion.button
                              className="skill-tooltip-copy"
                              onClick={() => copyCommand(tag.command)}
                              whileTap={{ scale: 0.92 }}
                            >
                              {copied === tag.command ? "✓" : "Copy"}
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className="project-links">
                  <span
                    className="project-link primary"
                    style={{ position: "relative" }}
                    onMouseEnter={() => setSkillTooltips(t => ({ ...t, [`${project.name}-skill`]: true }))}
                    onMouseLeave={() => setSkillTooltips(t => ({ ...t, [`${project.name}-skill`]: false }))}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    Install Skill
                    <AnimatePresence>
                      {skillTooltips[`${project.name}-skill`] && (
                        <motion.div
                          className="skill-install-tooltip"
                          initial={{ opacity: 0, scale: 0.92, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: 6 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="skill-install-hint">
                            Copy and send to your bot:
                          </p>
                          <div className="skill-message-box">
                            <p className="skill-message-text">
                              Please first check if ClawHub store is installed. If not, install ClawHub store, but only the CLI, then install the {project.name} skill.
                            </p>
                          </div>
                          <div className="skill-install-copy-row">
                            <div className="skill-step-command">
                              <code>clawhub install {project.name}</code>
                            </div>
                            <motion.button
                              className="skill-copy-btn"
                              onClick={() => copyCommand(`Please first check if ClawHub store is installed. If not, install ClawHub store, but only the CLI, then install the ${project.name} skill.`)}
                              whileTap={{ scale: 0.92 }}
                            >
                              {copied === `Please first check if ClawHub store is installed. If not, install ClawHub store, but only the CLI, then install the ${project.name} skill.` ? "✓ Copied" : "Copy Text"}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitHubIcon size={14} />
                    GitHub
                    <ExternalIcon />
                  </motion.a>
                </div>
              </motion.div>
            ))}
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
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p custom={0} variants={fadeUp} className="section-label typewriter-section">
            Contact
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="section-title">
            Get in Touch
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="section-desc">
            Interested in collaborating or have a project in mind? Feel free to reach out.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="contact-grid">
            {[
              {
                href: "https://discord.gg/5U6VttXUb8",
                external: true,
                type: "discord",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                ),
                label: "Discord",
                desc: "讨论群",
                qr: true,
              },
              {
                href: "https://x.com/longchen_i",
                external: true,
                type: "twitter",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                label: "Twitter / X",
                desc: "@longchen_i",
              },
              {
                href: "mailto:chenlong@aotur.com",
                external: false,
                type: "email",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email",
                desc: "chenlong@aotur.com",
              },
            ].map((item, i) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                {item.qr ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item contact-discord-card"
                  >
                    <div className="contact-item-icon">{item.icon}</div>
                    <p className="contact-item-label">{item.label}</p>
                    <p className="contact-item-desc">{item.desc}</p>
                    <div className="contact-qr">
                      <img src="/discord-qr.png" alt="Discord QR Code" width="72" height="72" />
                    </div>
                  </a>
                ) : (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="contact-item"
                  >
                    <div className="contact-item-icon">{item.icon}</div>
                    <div>
                      <p className="contact-item-label">{item.label}</p>
                      <p className="contact-item-desc">{item.desc}</p>
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
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
      <ScrollProgress />
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
