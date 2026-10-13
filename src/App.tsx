import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowUp, Github, Linkedin, Mail, MoveUpRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Character3D from './components/Character3D';
import { projects, services, skills } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

const email = 'your.email@example.com';
const linkedin = 'https://www.linkedin.com/';
const github = 'https://github.com/';

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const update = () => setReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || !appRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo('.hero-copy > *', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15,
      });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((element) => {
        const image = element.querySelector('.project-art');
        if (image) {
          gsap.fromTo(image, { scale: 1.08 }, {
            scale: 1, duration: 1.1, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          });
        }
      });
    }, appRef);
    return () => context.revert();
  }, [reducedMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div ref={appRef} className="site-shell">
      <Navbar />
      <main>
        <section className="hero section-pad" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="live-dot" /> FRONTEND DEVELOPER <span className="eyebrow-line" /> PORTFOLIO / 2026</div>
              <h1>AADHIL<span className="lime">.</span><span className="hero-last">T<span className="outline-text">.</span></span></h1>
              <p className="hero-description">Crafting digital experiences<br />through <span>code</span> and <span>motion.</span></p>
              <div className="hero-actions">
                <a className="button button--lime" href="#work">Explore my work <ArrowDownRight size={17} /></a>
                <a className="text-link" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-bottom-note">
                <span>DESIGN MINDED. CODE DRIVEN.</span>
                <span>SCROLL TO EXPLORE <ArrowDown size={13} /></span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-grid" />
              <Character3D reducedMotion={reducedMotion} />
              <div className="hero-side-label">CREATIVE DEVELOPMENT / DIGITAL CRAFT</div>
            </div>
          </div>
          <div className="hero-footer"><span>INDEPENDENT THINKING. PRECISE EXECUTION.</span><span>SCROLL DOWN <ArrowDown size={14} /></span></div>
        </section>

        <div className="marquee" aria-label="Design. Develop. Refine.">
          <div className="marquee-track"><span>DESIGN WITH INTENT <b>✳</b> DEVELOP WITH PRECISION <b>✳</b> MAKE IT MATTER <b>✳</b>&nbsp;</span><span aria-hidden="true">DESIGN WITH INTENT <b>✳</b> DEVELOP WITH PRECISION <b>✳</b> MAKE IT MATTER <b>✳</b>&nbsp;</span></div>
        </div>

        <section className="about section-pad" id="about">
          <div className="section-kicker reveal"><span>01 / ABOUT</span><span>THE PERSON BEHIND THE PIXELS</span></div>
          <div className="about-grid">
            <h2 className="reveal">I BUILD FOR<br />THE <span className="outline-text">DETAILS.</span></h2>
            <div className="about-copy reveal">
              <p className="about-lead">I'm Aadhil T — a frontend developer who cares about how digital experiences <em>look, feel, and work.</em></p>
              <p>I turn design ideas into responsive websites with clean implementation, thoughtful interactions, and attention to the details people notice. From frontend builds to WordPress themes and motion-led interfaces, I enjoy making the web feel a little more considered.</p>
              <div className="about-meta">
                <div><span className="meta-label">EXPERIENCE</span><strong>3.1+ years</strong></div>
                <div><span className="meta-label">FOCUS</span><strong>Frontend / UI</strong></div>
                <div><span className="meta-label">APPROACH</span><strong>Curious by default</strong></div>
              </div>
              <a className="text-link underline-link" href="/assets/resume/aadhil-resume.pdf" download>Download resume <ArrowUpRight size={16} /></a>
              <p className="small-note">Add your actual PDF to <code>public/assets/resume/aadhil-resume.pdf</code> before publishing.</p>
            </div>
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-kicker reveal"><span>02 / SELECTED WORK</span><span>A FEW THINGS I'VE WORKED ON</span></div>
          <div className="section-heading-row reveal"><h2>THE WORK<span className="lime">.</span></h2><p>A selection of projects and implementation work.<br />Details and links should be verified before publishing.</p></div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-card--${project.theme} ${index % 2 ? 'project-card--offset' : ''}`} key={project.name}>
                <div className={`project-art project-art--${project.theme}`}>
                  <div className="art-topline"><span>{project.category}</span><span>{project.number} / 04</span></div>
                  <div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" />
                  <div className="art-display">
                    <span className="art-display-small">DIGITAL EXPERIENCE</span>
                    <span className="art-display-title">{project.name}</span>
                    <span className="art-display-bar" />
                  </div>
                  <div className="art-bottomline"><span>CONCEPT PREVIEW</span><span>REPLACE WITH REAL SCREENSHOT ↗</span></div>
                </div>
                <div className="project-info">
                  <div><span className="project-number">{project.number} — {project.category}</span><h3>{project.name}</h3></div>
                  <p>{project.description}</p>
                </div>
                <div className="project-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="section-footnote"><span className="lime">✳</span> Project previews are visual placeholders. Replace them with screenshots from your actual work before sharing publicly.</p>
        </section>

        <section className="skills section-pad" id="skills">
          <div className="section-kicker reveal"><span>03 / TOOLKIT</span><span>TOOLS ARE ONLY AS GOOD AS THE THINKING</span></div>
          <div className="skills-heading reveal"><h2>MY STACK<span className="lime">.</span></h2><p>The technologies I use to bring ideas<br />from design to production.</p></div>
          <div className="skills-list">
            {skills.map((group, index) => (
              <div className="skill-row reveal" key={group.group}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.group}</h3>
                <div className="skill-items">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-kicker reveal"><span>04 / WHAT I DO</span><span>FROM FIRST PIXEL TO FINAL DETAIL</span></div>
          <h2 className="services-heading reveal">MAKE IT WORK.<br /><span className="outline-text">MAKE IT FEEL RIGHT.</span></h2>
          <div className="services-list">
            {services.map((service) => (
              <div className="service-row reveal" key={service.number}>
                <span>{service.number}</span><h3>{service.title}</h3><p>{service.detail}</p><ArrowUpRight size={20} />
              </div>
            ))}
          </div>
        </section>

        <section className="experience section-pad" id="experience">
          <div className="section-kicker reveal"><span>05 / EXPERIENCE</span><span>THE WORK BEHIND THE WORK</span></div>
          <div className="experience-grid">
            <h2 className="reveal">BUILT THROUGH<br /><span className="outline-text">REAL WORK.</span></h2>
            <div className="experience-copy reveal">
              <p className="about-lead">Professional experience is more than a title. It's the problems solved, the details shipped, and the skills built along the way.</p>
              <div className="experience-placeholder"><span className="live-dot" /><div><strong>Frontend Developer</strong><p>Add your verified company name, employment dates, and responsibilities here.</p></div><span className="meta-label">EDIT ME</span></div>
              <p className="small-note">Update this section with your exact work history before publishing.</p>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="section-kicker reveal"><span>06 / CONTACT</span><span>GOOD WORK STARTS WITH A CONVERSATION</span></div>
          <div className="contact-main reveal"><span className="contact-pretitle"><Sparkles size={15} /> HAVE SOMETHING IN MIND?</span><h2>LET'S MAKE<br /><span className="lime">IT MATTER.</span></h2><a className="contact-cta" href={`mailto:${email}`}>Start a conversation <MoveUpRight size={22} /></a></div>
          <div className="contact-bottom">
            <div><span className="meta-label">EMAIL</span><button className="email-copy" type="button" onClick={copyEmail}>{copied ? 'Copied!' : email} <ArrowUpRight size={14} /></button><p className="small-note">Replace this placeholder email in src/App.tsx.</p></div>
            <div className="social-links"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href={github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href={`mailto:${email}`}><Mail size={17} /> Email <ArrowUpRight size={14} /></a></div>
          </div>
        </section>
      </main>
      <footer className="footer section-pad"><a className="brand" href="#home">AD</a><span>DESIGNED & BUILT WITH INTENTION.</span><a className="back-top" href="#home">BACK TO TOP <ArrowUp size={14} /></a><span className="copyright">© {new Date().getFullYear()} AADHIL T.</span></footer>
    </div>
  );
}
