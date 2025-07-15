import Head from "next/head";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, MouseEvent } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const hero = {
  name: "Shaik Abid Bilal",
  title: "Full Stack Software Engineer",
  location: "Mangalagiri, Guntur District, Andhra Pradesh, India",
  intro:
    "I'm a passionate Full Stack Software Engineer specializing in React, Next.js, and blockchain integration. I love building scalable, user-friendly web applications and am always eager to learn new technologies.",
  photo: "/images/profile.png",
  email: "abidbilal624@gmail.com",
  github: "https://github.com/ShaikAbidBilal",
  linkedin: "https://linkedin.com/in/shaik-abid-bilal",
  phone: "+91 8985564003",
  resume: "/resume.pdf",
};

const about = {
  past:
    "I discovered my passion for programming in my early years, starting with C and C++. My curiosity led me to explore web and mobile development, and I quickly became fascinated by the endless possibilities of software engineering.",
  present:
    "Currently, I am pursuing my B.Tech in Computer Science and Engineering at SRK Institute of Technology. I have interned at Eduskills and am working as a Full Stack Software Engineer at Interstate, building robust web applications and integrating blockchain technologies.",
  future:
    "I'm excited about the future of technology and look forward to contributing to innovative projects in web and blockchain development. My goal is to keep learning and to make a positive impact in the tech industry.",
};

const skills = {
  frontend: [
    "HTML",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux",
    "Node.js",
  ],
  styling: [
    "CSS",
    "Tailwind CSS",
    "Styled-Components",
    "Figma",
    "OpenCV",
  ],
  misc: [
    "Git",
    "Firebase",
    "Spring Boot",
    "GANs",
    "SQL",
    "REST APIs",
    "WebSocket",
    "Android Studio",
  ],
};

const projects = [
  {
    name: "Identity Detection Using GAN",
    description:
      "Developed a deep learning model to detect morphed face images for identity fraud prevention using Generative Adversarial Networks (GANs) and OpenCV for face preprocessing. Achieved high accuracy through data augmentation and transfer learning.",
    stack: ["Python", "GANs", "OpenCV", "Transfer Learning"],
    link: "#",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  // Smooth scroll for nav links and active nav underline
  const [activeSection, setActiveSection] = useState("#about");
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const el = document.querySelector(target.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    navLinks.forEach((a) => {
      a.addEventListener("click", handleNavClick as any);
    });
    return () => {
      navLinks.forEach((a) => {
        a.removeEventListener("click", handleNavClick as any);
      });
    };
  }, []);

  // Track active section for nav underline
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navLinks.map((l) => document.querySelector(l.href) as HTMLElement | null);
      const scrollY = window.scrollY + 120;
      let current = "#about";
      for (let i = 0; i < sectionElements.length; i++) {
        if (sectionElements[i] && sectionElements[i]?.offsetTop !== undefined && sectionElements[i]!.offsetTop <= scrollY) {
          current = navLinks[i].href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation controls for hero
  const heroControls = useAnimation();
  useEffect(() => {
    heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
  }, [heroControls]);

  return (
    <div className="bg-[#18181b] text-white min-h-screen font-sans relative overflow-x-hidden">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <title>Shaik Abid Bilal | Portfolio</title>
        <meta name="description" content="Full Stack Software Engineer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation with animated underline (dark theme) */}
      <nav className="fixed top-0 left-0 w-full bg-[#18181b] bg-opacity-95 z-50 shadow-md border-b border-[#23232a]">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4 py-3 relative">
          <span className="font-bold text-lg tracking-wide">abid.dev</span>
          <div className="space-x-6 text-sm relative flex">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={el => { navRefs.current[i] = el; }}
                className={`hover:text-blue-400 transition-colors relative pb-1 ${activeSection === link.href ? 'font-bold text-blue-400' : ''}`}
                style={{ position: 'relative' }}
              >
                {link.label}
                {/* Animated underline */}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-400 rounded"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {/* Hero Section with fade-in and upward movement */}
      <motion.section
        className="pt-32 pb-16 max-w-3xl mx-auto flex flex-col md:flex-row items-center px-4 relative"
        id="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={heroControls}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg mb-6 md:mb-0 md:mr-10 flex-shrink-0 bg-black flex items-center justify-center"
        >
          <Image src={hero.photo} alt="Profile photo" width={128} height={128} className="object-cover w-full h-full rounded-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl font-bold mb-2" style={{fontFamily:'Inter, sans-serif'}}>{hero.name}</h1>
          <h2 className="text-lg text-blue-400 font-semibold mb-2">{hero.title}</h2>
          <p className="text-gray-400 mb-2">{hero.location}</p>
          <p className="mb-4 max-w-xl text-gray-200">{hero.intro}</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href={hero.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline-animation">GitHub</a>
            <a href={hero.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline-animation">LinkedIn</a>
            <a href={`mailto:${hero.email}`} className="hover:text-blue-400 underline-animation">Email</a>
          </div>
        </motion.div>
        {/* Animated scroll-down indicator */}
        <motion.div
          className="absolute left-1/2 bottom-4 md:bottom-8 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400" viewBox="0 0 24 24">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          <span className="text-xs text-gray-400 mt-1">Scroll</span>
        </motion.div>
      </motion.section>
      {/* About Section with entrance animation */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">About</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-base mb-2">Past</h3>
            <p className="text-gray-300 text-sm">{about.past}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Present</h3>
            <p className="text-gray-300 text-sm">{about.present}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2">Future</h3>
            <p className="text-gray-300 text-sm">{about.future}</p>
          </div>
        </div>
      </section>
      {/* Skills Section with animated badges */}
      <section id="skills" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Skills</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <SkillCategory title="Front End" skills={skills.frontend} />
          <SkillCategory title="Styling & Design" skills={skills.styling} />
          <SkillCategory title="Miscellaneous" skills={skills.misc} />
        </div>
      </section>
      {/* Projects Section with entrance and hover animation */}
      <section id="projects" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Projects</h2>
        <div className="grid gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </section>
      {/* Contact Section with entrance animation */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Contact</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
          <div>
            <p className="mb-2 text-sm">Email: <a href={`mailto:${hero.email}`} className="text-blue-400 hover:underline underline-animation">{hero.email}</a></p>
            <p className="mb-2 text-sm">Phone: <span className="text-blue-400">{hero.phone}</span></p>
            <p className="mb-2 text-sm">GitHub: <a href={hero.github} className="text-blue-400 hover:underline underline-animation" target="_blank" rel="noopener noreferrer">{hero.github}</a></p>
            <p className="mb-2 text-sm">LinkedIn: <a href={hero.linkedin} className="text-blue-400 hover:underline underline-animation" target="_blank" rel="noopener noreferrer">{hero.linkedin}</a></p>
          </div>
        </div>
      </section>
      <footer className="text-center text-gray-500 py-8 border-t border-[#23232a] mt-8 text-xs">
        <p>© {new Date().getFullYear()} Shaik Abid Bilal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Animated skill badges
function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-4 text-blue-400">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="px-3 py-1 bg-[#23232a] rounded-full text-xs border border-gray-200 text-blue-400 shadow-sm"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Project cards with hover and reveal animation
function ProjectCard({ name, description, stack, link }: { name: string; description: string; stack: string[]; link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)" }}
      className="block p-6 border border-[#23232a] rounded-lg bg-[#18181b] hover:bg-[#23232a]/50 transition-colors shadow-lg"
    >
      <h4 className="text-lg font-semibold mb-2 text-blue-400">{name}</h4>
      <p className="text-gray-300 mb-3 text-sm">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {stack.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-[#23232a] rounded text-xs border border-gray-200 text-blue-400">{tech}</span>
        ))}
      </div>
    </motion.a>
  );
}

// Add this to your global CSS (e.g., styles/globals.css):
// .underline-animation {
//   position: relative;
// }
// .underline-animation::after {
//   content: "";
//   position: absolute;
//   left: 0; right: 0; bottom: -2px;
//   height: 2px;
//   background: #60a5fa;
//   border-radius: 2px;
//   transform: scaleX(0);
//   transition: transform 0.3s;
//   transform-origin: left;
// }
// .underline-animation:hover::after {
//   transform: scaleX(1);
// }