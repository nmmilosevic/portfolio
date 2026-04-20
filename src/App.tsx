import './App.css'
import { Link } from 'react-router-dom' // used by MotionLink (motion(Link))
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { projects } from '@/data/projectsData'
import { Navbar } from '@/components/Navbar'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { ProjectData, ProjectAccent } from '@/data/projectsData'

// ── Framer-motion setup ────────────────────────────────────────────────────

const MotionLink = motion(Link)

// blue-100 = #dbeafe, blue-300 = #93c5fd, brand blue = #1a10d6
const cardVariants: Variants = {
  rest: {
    borderColor: '#f3f4f6',
    boxShadow: '0px 20px 60px rgba(30,64,175,0)',
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    borderColor: 'rgba(243,244,246,0)',
    boxShadow: '0px 20px 60px rgba(30,64,175,0.06)',
    y: -4,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const imageWrapperVariants: Variants = {
  rest: { transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  hover: { transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const arrowVariants: Variants = {
  rest: { x: 0, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  hover: { x: 2, y: -2, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

// Brand colors per project accent
const tagColors: Record<ProjectAccent, string> = {
  amber:  '#FAB800', // Somfy
  sky:    '#2567F4', // 360Learning
  violet: '#C87C2F', // Zestia
  orange: '#3B28CC', // Vibe
  rose:   '#FF1721', // AXA
}

// ── Cycling image carousel ─────────────────────────────────────────────────

function CyclingImage({ images, alt, offset = 0 }: { images: string[]; alt: string; offset?: number }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (images.length <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const delay = setTimeout(() => {
      intervalRef.current = setInterval(
        () => setIndex(i => (i + 1) % images.length),
        2800,
      )
    }, offset)

    return () => {
      clearTimeout(delay)
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [images.length, offset])

  return (
    // Outer div holds overflow:hidden so scaled inner content is clipped
    <div className="relative w-full h-full overflow-hidden">
      {/* Inner motion.div inherits hover variant from MotionLink parent */}
      <motion.div className="absolute inset-0" variants={imageWrapperVariants}>
        <AnimatePresence mode="sync">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-top ken-burns"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// ── Project row ────────────────────────────────────────────────────────────

function ProjectRow({ project, index: rowIndex }: { project: ProjectData; index: number }) {
  const tagColor = tagColors[project.accent]

  // Collect all images from every section (deduplicated)
  const allImages = useMemo(() => {
    const imgs = project.sections.flatMap(sec => sec.images ?? [])
    return imgs.length > 0 ? imgs : (project.coverImage ? [project.coverImage] : [])
  }, [project])

  return (
    // First card has no reveal class so it's always visible; rest animate on scroll
    <div className={rowIndex === 0 ? '' : 'reveal'}>
      <MotionLink
        to={`/projects/${project.slug}`}
        className="block rounded-2xl p-8 md:p-10 cursor-pointer border border-[#f3f4f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107]"
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardVariants}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10">

          {/* ── Left: text (narrower) ── */}
          <div className="md:w-[38%] shrink-0 flex flex-col">
            {/* Tag */}
            <p className="type-xs uppercase tracking-[0.1em] font-medium mb-3" style={{ color: tagColor }}>
              {project.tag}
            </p>

            {/* Name + Year */}
            <div className="flex items-baseline justify-between gap-6 mb-4">
              <h2 className="type-h3 font-medium text-[#0f172a] tracking-[-0.02em] leading-snug">
                {project.company}
              </h2>
              <span className="type-m text-[#475569] tabular-nums shrink-0">
                {project.year}
              </span>
            </div>

            {/* Description */}
            <p className="type-m text-[#334155] leading-[1.65] mb-5">
              {project.description}
            </p>

            {/* Text link — reacts to card hover only */}
            <span className="inline-flex items-center gap-1.5 type-s font-medium text-[#1a10d6] pointer-events-none">
              View project
              <motion.span variants={arrowVariants} style={{ display: 'inline-flex' }}>
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </span>
          </div>

          {/* ── Right: cycling image (dominant, 16:9) ── */}
          {allImages.length > 0 && (
            <div
              className="w-full md:flex-1 overflow-hidden rounded-xl"
              style={{ aspectRatio: '16/9' }}
            >
              <CyclingImage
                images={allImages}
                alt={`${project.company} project preview`}
                offset={rowIndex * 600}
              />
            </div>
          )}

        </div>
      </MotionLink>
    </div>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────

// Word-by-word stagger reveal for plain headline text
const wordVariants = {
  hidden: { opacity: 0, y: 18, rotateX: -25 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
}

function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const ease = [0.22, 1, 0.36, 1] as const
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      style={{ display: 'inline', perspective: '600px' }}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ transformOrigin: 'top center' }}
          variants={wordVariants}
          transition={{ duration: 0.5, ease }}
        >
          {word}{i < words.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      className="relative mx-auto max-w-5xl px-6 py-20 flex flex-col justify-center"
      style={{ minHeight: 'calc(100vh - 108px - 80px)' }}
    >
      {/* Availability eyebrow */}
      <motion.div
        className="flex items-center gap-2 mb-10"
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.03 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0 }}
      >
        <span
          className="inline-block w-[7px] h-[7px] rounded-full bg-emerald-500 shrink-0"
          style={{ boxShadow: '0 0 0 2.5px rgba(16,185,129,0.18)' }}
          aria-hidden="true"
        />
        <span className="type-xs font-medium tracking-[0.06em] uppercase text-emerald-600 select-none">
          Available for freelance
        </span>
      </motion.div>

      {/* Headline block */}
      <h1 className="font-heading font-normal text-[48px] md:text-[56px] leading-[1.08] tracking-[-0.03em] text-[#0f172a] max-w-3xl mb-10">
        <WordReveal text="Hi. I'm Nicolas, a" delay={0.08} />
        {' '}
        <motion.em
          className="not-italic text-[#1a10d6] inline-block"
          initial={{ opacity: 0, filter: 'blur(14px)', scale: 1.06 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
        >
          Senior Product&nbsp;Designer
        </motion.em>
        {' '}
        <WordReveal text="crafting interfaces and systems for growing companies." delay={0.6} />
      </h1>

      {/* Subtitle */}
      <motion.p
        className="type-l text-[#64748b] leading-relaxed max-w-lg"
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
      >
        Based in Spain, working with global teams.
      </motion.p>
    </section>
  )
}

// ── Work ───────────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" aria-label="Selected work" className="mx-auto max-w-5xl px-5 md:px-6">
      <div className="flex flex-col gap-[64px] pb-[150px]">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────────────────────

function About() {
  const stats = [
    { value: '2M+', label: 'Users impacted' },
    { value: '5', label: 'Industries' },
    { value: '50+', label: 'Features' },
  ]

  return (
    <section
      id="about"
      className="relative"
      style={{ background: '#f3f4f6' }}
    >
      <div className="mx-auto max-w-5xl px-6 py-[150px]">

        {/* Two-column prose block */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16 mb-[64px] reveal">

          {/* Left — statement */}
          <div>
            <p
              className="font-heading type-statement leading-[1.25] font-normal tracking-[-0.02em] text-[#0f172a]"
            >
              Over{' '}
              <span style={{ color: '#1a10d6', fontStyle: 'italic' }}>9 years</span>{' '}
              working with fast-moving teams across Europe, from early-stage startups to large enterprises.
            </p>
          </div>

          {/* Right — body + skills */}
          <div className="flex flex-col gap-[16px]">
            <p className="type-m text-[#64748b] leading-[1.65]">
              I specialise in turning messy, complex problems into{' '}
              <span
                className="font-medium"
                style={{ color: '#0f172a' }}
              >
                simple, intuitive
              </span>{' '}
              product experiences. Whether it&apos;s a full platform redesign, a new feature, or a design system, I bring structure, clarity, and genuine craft to everything I touch.
            </p>

            <p className="type-m text-[#64748b] leading-[1.65]">
              I work closely with founders, product managers, and engineers to ship work that holds up under scrutiny. Remote-first, async-friendly, and comfortable leading design end to end.
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {['Product Design', 'Product Strategy', 'Design Systems', 'Prototyping', 'User Research', 'Figma', 'Claude Code', 'Cursor'].map((s) => (
                <span
                  key={s}
                  className="type-xs text-[#475569] rounded-[4px] px-3 py-1 cursor-default transition-colors duration-150"
                  style={{ background: '#ffffff' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = '#eff6ff'
                    el.style.color = '#1a10d6'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = '#ffffff'
                    el.style.color = '#475569'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-start px-8 py-8 md:py-10 bg-white rounded-[8px]"
              style={{ }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <p
                className="font-heading font-semibold tracking-[-0.04em] leading-none mb-2"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                  color: '#1a10d6',
                  letterSpacing: '-0.04em',
                }}
              >
                {value}
              </p>
              <p
                className="type-xs uppercase font-semibold"
                style={{ letterSpacing: '0.1em', color: '#94a3b8' }}
              >
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── Site end panel ─────────────────────────────────────────────────────────

function SiteEnd() {
  const [copied, setCopied] = useState(false)
  const ease = [0.22, 1, 0.36, 1] as const

  const copyEmail = async () => {
    await navigator.clipboard.writeText('nm.milosevic@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 90% -5%, rgba(42,26,180,0.22) 0%, transparent 65%),
          radial-gradient(ellipse 55% 45% at -5% 105%, rgba(72,24,180,0.16) 0%, transparent 60%),
          radial-gradient(ellipse 40% 35% at 50% 50%, rgba(20,12,80,0.25) 0%, transparent 70%),
          #04021a
        `,
      }}
    >

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-5 md:px-6 flex flex-col flex-1 py-24 md:py-32">

        {/* Main content — vertically centered */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Headline — oversized, two lines */}
          <div className="mb-12">
            <motion.h2
              className="font-heading font-normal text-white leading-[1.08] tracking-[-0.03em] text-[48px] md:text-[56px]"
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease, delay: 0.08 }}
            >
              Got something<br />
              <span style={{ color: '#1a10d6' }}>worth building?</span>
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="type-l leading-[1.65] mb-14"
            style={{ color: '#ffffff', maxWidth: '36ch' }}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease, delay: 0.22 }}
          >
            Available for freelance. If you have a product challenge worth solving, I&apos;d love to hear about it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.36 }}
          >
            <button
              onClick={copyEmail}
              className="learn-more learn-more-white"
              aria-label={copied ? 'Email copied to clipboard' : 'Copy email address nm.milosevic@gmail.com'}
            >
              {copied
                ? <Check className="w-4 h-4 shrink-0" />
                : <Copy className="w-4 h-4 shrink-0" />
              }
              {copied ? 'Copied!' : 'nm.milosevic@gmail.com'}
            </button>

            <a
              href="https://linkedin.com/in/nicolasmilosevic"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more learn-more-white"
            >
              LinkedIn
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
            </a>
          </motion.div>
        </div>

        {/* Copyright — bottom-left, very small, no separator */}
        <motion.div
          className="mt-auto pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.5 }}
        >
          <p className="type-xs select-none" style={{ color: 'rgba(255,255,255,0.18)' }}>
            &copy; {new Date().getFullYear()} Nicolas Milosevic
          </p>
        </motion.div>

        {/* Screen-reader live region for copy feedback */}
        <p aria-live="polite" aria-atomic="true" className="sr-only">
          {copied ? 'Email address copied to clipboard.' : ''}
        </p>

      </div>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────────────────

function App() {
  useScrollReveal()

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Work />
        <About />
      </main>
      <SiteEnd />
    </div>
  )
}

export default App
