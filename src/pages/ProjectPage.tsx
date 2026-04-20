import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProjectBySlug, accentStyles, projects } from '@/data/projectsData'

import { Navbar } from '@/components/Navbar'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// ── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ src, alt, type = 'image', onClose }: { src: string; alt: string; type?: 'image' | 'video'; onClose: () => void }) {
  const [closing, setClosing] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const dismiss = useCallback(() => {
    setClosing(true)
  }, [])

  useEffect(() => {
    // Auto-focus close button on open
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { dismiss(); return }
      // Focus trap — only interactive element is the close button
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [dismiss])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12"
      style={{ animation: closing ? 'lb-backdrop-out 450ms ease forwards' : 'lb-backdrop-in 250ms ease forwards' }}
      onClick={dismiss}
      onAnimationEnd={closing ? onClose : undefined}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* close button */}
      <button
        ref={closeRef}
        onClick={dismiss}
        className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-150 text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        aria-label="Close image preview"
      >
        <X className="w-4 h-4" />
      </button>

      {/* media */}
      {type === 'video' ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="relative z-10 max-w-full max-h-full rounded-xl shadow-2xl object-contain"
          style={{ animation: closing ? 'lb-img-out 450ms cubic-bezier(0.22,1,0.36,1) forwards' : 'lb-img-in 550ms cubic-bezier(0.22,1,0.36,1) forwards' }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="relative z-10 max-w-full max-h-full rounded-xl shadow-2xl object-contain"
          style={{ animation: closing ? 'lb-img-out 450ms cubic-bezier(0.22,1,0.36,1) forwards' : 'lb-img-in 550ms cubic-bezier(0.22,1,0.36,1) forwards' }}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  )
}

// ── Zoomable image ──────────────────────────────────────────────────────────

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        className="group relative overflow-hidden rounded-xl border border-[#e2e8f0] aspect-video w-full block transition-all duration-500 ease-out hover:shadow-[0_15px_45px_-8px_rgba(15,23,42,0.12)] hover:border-transparent hover:scale-[1.02]"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </button>

      {open && <Lightbox src={src} alt={alt} onClose={close} />}
    </>
  )
}

// ── Zoomable video ──────────────────────────────────────────────────────────

function ZoomableVideo({ src }: { src: string }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        className="group relative overflow-hidden rounded-xl border border-[#e2e8f0] aspect-video w-full block transition-all duration-500 ease-out hover:shadow-[0_15px_45px_-8px_rgba(15,23,42,0.12)] hover:border-transparent hover:scale-[1.02]"
        onClick={() => setOpen(true)}
        aria-label="Enlarge video"
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ transform: 'scale(1.01)', transformOrigin: 'center center' }}
        />
      </button>

      {open && <Lightbox src={src} alt="" type="video" onClose={close} />}
    </>
  )
}

// ── Footer CTA (shared) ────────────────────────────────────────────────────

function FooterCTA() {
  const [copied, setCopied] = useState(false)
  const ease = [0.22, 1, 0.36, 1] as const

  const copyEmail = async () => {
    await navigator.clipboard.writeText('nm.milosevic@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
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
      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 flex flex-col flex-1 py-24 md:py-32">

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
              {copied ? <Check className="w-4 h-4 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
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

        <p aria-live="polite" aria-atomic="true" className="sr-only">
          {copied ? 'Email address copied to clipboard.' : ''}
        </p>
      </div>
    </div>
  )
}

// ── Page end panel ─────────────────────────────────────────────────────────

const cardVariants = {
  rest: {
    borderColor: '#f3f4f6',
    boxShadow: '0px 8px 40px rgba(0,0,0,0)',
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  hover: {
    borderColor: 'rgba(0,0,0,0)',
    boxShadow: '0px 8px 40px rgba(0,0,0,0.12)',
    y: -4,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const MotionLink = motion(Link)

function PageEnd({ currentSlug }: { currentSlug: string }) {
  const otherProjects = projects.filter((p) => p.slug !== currentSlug)

  return (
    <div>

      {/* ── Zone 1: More work ── */}
      <div className="bg-[#f3f4f6]">
        <div className="mx-auto max-w-5xl px-6 pt-[100px] pb-[100px]">
          <h1 className="font-heading type-h1-sm font-semibold text-[#0f172a] leading-[1.1] tracking-[-0.03em] mb-10">
            More work
          </h1>

          <motion.div
            key={currentSlug}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {otherProjects.map((p) => {
              const as = accentStyles[p.accent]

              return (
                <motion.div key={p.slug} variants={itemVariants} className="h-full">
                  <MotionLink
                    to={`/projects/${p.slug}`}
                    className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border border-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-[#1a10d6] focus-visible:outline-offset-2"
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {/* Image area */}
                    <div className="relative w-full aspect-video bg-[#f1f5f9] overflow-hidden">
                      {p.coverImage ? (
                        <img
                          src={p.coverImage}
                          alt={`${p.company} cover`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="type-xs text-[#94a3b8] font-medium tracking-wide">
                            {p.company}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text area — flex-col so tag floats top, company name pins to bottom */}
                    <div className="flex flex-1 gap-3 px-4 py-3.5 bg-white">
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className={`type-tagline uppercase tracking-[0.12em] font-medium mb-2 ${as.pillText}`}>
                          {p.tag}
                        </p>
                        {/* Spacer pushes company name to bottom */}
                        <div className="flex-1" />
                        <p className="type-m font-medium text-[#0f172a] leading-[1.25] tracking-[-0.015em] truncate">
                          {p.company}
                        </p>
                      </div>
                      <div className="shrink-0 self-end w-7 h-7 rounded-full border border-[#e2e8f0] flex items-center justify-center transition-all duration-300 group-hover:border-[#1a10d6] group-hover:bg-[#1a10d6]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] transition-colors duration-200 group-hover:text-white" />
                      </div>
                    </div>
                  </MotionLink>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Zone 2: Deep navy footer CTA ── */}
      <FooterCTA />

    </div>
  )
}

// ── Project page ───────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  useScrollReveal(slug)
  const project = getProjectBySlug(slug ?? '')

  if (!project) return <Navigate to="/" replace />

  const s = accentStyles[project.accent]

  return (
    <div key={slug} className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar />

      <main id="main-content">
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 pt-10 pb-14 md:pt-14 md:pb-20">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 type-s text-[#64748b] hover:text-[#0f172a] transition-colors duration-200 mb-10 md:mb-12 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              All projects
            </Link>
          </motion.div>

          {/* Two-column hero grid */}
          <div className="grid md:grid-cols-[55fr_45fr] gap-10 md:gap-16 items-start">

            {/* Left column: tag + title + subtitle + metadata strip */}
            <div>
              <motion.p
                className={`type-tagline uppercase tracking-[0.12em] font-medium mb-5 ${s.pillText}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              >
                {project.tag}
              </motion.p>

              <motion.h1
                className="type-h1 font-semibold text-[#0f172a] leading-[1.08] tracking-[-0.03em] mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                {project.company}
              </motion.h1>

              <motion.p
                className="type-l text-[#475569] leading-[1.6] mb-8"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.17 }}
              >
                {project.title}
              </motion.p>

              {/* Metadata grid: Category + Period on row 1, Outcome on row 2 */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 w-fit">
                  <div className="flex flex-col">
                    <span className="type-tagline uppercase tracking-[0.12em] text-[#94a3b8] font-medium mb-0.5">Category</span>
                    <span className="type-xs text-[#334155] font-medium leading-snug">{project.category}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="type-tagline uppercase tracking-[0.12em] text-[#94a3b8] font-medium mb-0.5">Period</span>
                    <span className="type-xs text-[#334155] font-medium leading-snug">{project.period}</span>
                  </div>
                </div>

                {/* Detail tags directly below, no separator */}
                <motion.div
                  className="flex flex-wrap gap-2 mt-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
                >
                  {project.detailTags.map((tag) => (
                    <span
                      key={tag}
                      className="type-xs text-[#64748b] border border-[#e2e8f0] rounded-[4px] px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right column: intro text with accent left border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="md:pt-[3.75rem]"
            >
              <div
                className="pl-5 space-y-4"
                style={{ borderLeft: `2px solid ${s.accentHex}` }}
              >
                {project.intro.map((para, i) => (
                  <p key={i} className="type-m text-[#334155] leading-[1.7]">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

        </section>

        {/* ── Sections ────────────────────────────────────── */}

        {project.sections.map((section, si) => (
          <section key={si} className="mx-auto max-w-5xl px-6 py-16">
            <div className="reveal grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 mb-10">
              <div>
                <p className={`type-xs uppercase tracking-[0.1em] font-medium ${s.sectionNum}`}>
                  {String(si + 1).padStart(2, '0')}
                </p>
              </div>
              <div>
                <h2 className="type-h3 font-medium text-[#0f172a] leading-[1.35] tracking-[-0.015em] mb-5">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, pi) => (
                    <p key={pi} className="type-m text-[#334155] leading-[1.65]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {(section.images && section.images.length > 0) || section.video ? (
              <div className={`grid gap-4 ${
                (section.images?.length ?? 0) + (section.video ? 1 : 0) === 1
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {section.video ? (
                  <ZoomableVideo src={section.video} />
                ) : null}
                {section.images?.map((src, ii) => (
                  <ZoomableImage
                    key={src}
                    src={src}
                    alt={`${section.title} – screen ${ii + 1}`}
                  />
                ))}
              </div>
            ) : null}

            {si < project.sections.length - 1 && (
              <div className="mt-10 md:mt-16 border-t border-[#e2e8f0]" />
            )}
          </section>
        ))}

        <div className="h-[200px]" />

      </main>

      <PageEnd currentSlug={project.slug} />
    </div>
  )
}
