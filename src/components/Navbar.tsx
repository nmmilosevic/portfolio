import { Link } from 'react-router-dom'
import { useEffect, useState, useId, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Stage definitions: [label, hold duration ms, golden bg?]
const YOU_STAGES: [string, number, boolean][] = [
  ['Your vision', 1800, false],
  ['My craft',    1800, false],
  ['We ship.',    2400, true],
]

// Float transition factory — organic multi-axis drift
function floatTransition(delay: number) {
  return {
    duration: 3.6,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
    delay,
  }
}

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [youStage, setYouStage] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const uid = useId()
  const nicoFilterId = `cs-nico-${uid}`
  const youFilterId  = `cs-you-${uid}`

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Looping text animation
  useEffect(() => {
    function schedule(stage: number) {
      const [, hold] = YOU_STAGES[stage]
      timerRef.current = setTimeout(() => {
        const next = (stage + 1) % YOU_STAGES.length
        setYouStage(next)
        schedule(next)
      }, hold)
    }
    schedule(0)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 px-4 md:px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-5 py-3 rounded-2xl">

          {/* Left: role label + floating name pill */}
          <Link
            to="/"
            className="flex flex-col"
          >
            <span
              className="type-xs font-medium tracking-[0.06em] uppercase text-[#94a3b8] transition-all duration-300"
              style={visible ? { textShadow: '0 1px 6px rgba(255,255,255,0.95), 0 0 12px rgba(255,255,255,0.7)' } : {}}
            >
              Senior Product Designer
            </span>

            {/* Floating Nicolas tag */}
            <motion.div
              className="relative inline-block self-start"
              style={{ marginTop: '16px', marginLeft: '64px' }}
              animate={{ x: [0, -3, 2, -1, 0], y: [0, -4, -6, -3, 0] }}
              transition={floatTransition(0.4)}
            >
              <span className={`inline-block bg-[#1a10d6] text-white type-xs font-semibold px-4 py-1 rounded-full leading-tight whitespace-nowrap transition-all duration-300 hover:bg-[#0e05f5] ${visible ? 'shadow-[0_2px_16px_rgba(26,16,214,0.35)]' : ''}`}>
                Nicolas Milosevic
              </span>
              {/* Pointer — top-left corner */}
              <svg
                width="24" height="25" viewBox="0 0 28 29" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute z-10 shrink-0 pointer-events-none"
                style={{ top: '-15px', left: '-17px' }}
                aria-hidden="true"
              >
                <g filter={`url(#${nicoFilterId})`}>
                  <path d="M11.8924 23.7113L7.33378 7.71982C7.0984 6.89409 7.95602 6.18106 8.73584 6.55413L23.8385 13.7792C24.6416 14.1634 24.5812 15.3159 23.7425 15.6131L17.5312 17.8139C17.3056 17.8938 17.1164 18.0511 16.9978 18.2574L13.7318 23.9361C13.2908 24.7029 12.1347 24.5616 11.8924 23.7113Z" fill="#1a10d6"/>
                </g>
                <defs>
                  <filter id={nicoFilterId} x="4.28796" y="4.45428" width="23.1241" height="23.9793" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </motion.div>
          </Link>

          {/* Right: Get in touch on top, floating animated tag below with 16px gap */}
          <div className="flex flex-col items-end" style={{ gap: '16px' }}>

            {/* Get in touch button */}
            <a
              href="https://linkedin.com/in/nicolasmilosevic"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-[6px] bg-[#1a10d6] text-white type-s font-semibold min-h-[36px] hover:bg-[#0e05f5] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap ${visible ? 'shadow-[0_2px_18px_rgba(26,16,214,0.38)]' : ''}`}
            >
              Say hello
            </a>

            {/* Floating animated tag */}
            <motion.div
              className="relative inline-block"
              style={{ marginRight: '64px' }}
              animate={{ x: [0, 3, -2, 1, 0], y: [0, -5, -3, -4, 0] }}
              transition={floatTransition(0)}
            >
              <motion.span
                className="inline-flex items-center justify-center text-[#0f172a] type-xs font-semibold px-2 py-1 rounded-full leading-tight overflow-hidden"
                animate={{
                  background: YOU_STAGES[youStage][2]
                    ? 'linear-gradient(135deg,#fde68a 0%,#fbbf24 60%,#f59e0b 100%)'
                    : '#e8edf4',
                  boxShadow: YOU_STAGES[youStage][2]
                    ? '0 2px 14px rgba(251,191,36,0.45), 0 0 0 1px rgba(251,191,36,0.25)'
                    : visible
                      ? '0 2px 12px rgba(15,23,42,0.13)'
                      : '0 0px 0px rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ minWidth: '5.5rem', whiteSpace: 'nowrap' }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={youStage}
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'inline-block' }}
                  >
                    {YOU_STAGES[youStage][0]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>

              {/* Pointer — top-right corner */}
              <svg
                width="20" height="20" viewBox="0 0 28 29" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -scale-x-100 pointer-events-none"
                style={{ top: '-12px', right: '-14px' }}
                aria-hidden="true"
              >
                <g filter={`url(#${youFilterId})`}>
                  <path d="M11.8924 23.7113L7.33378 7.71982C7.0984 6.89409 7.95602 6.18106 8.73584 6.55413L23.8385 13.7792C24.6416 14.1634 24.5812 15.3159 23.7425 15.6131L17.5312 17.8139C17.3056 17.8938 17.1164 18.0511 16.9978 18.2574L13.7318 23.9361C13.2908 24.7029 12.1347 24.5616 11.8924 23.7113Z" fill="#64748b"/>
                </g>
                <defs>
                  <filter id={youFilterId} x="4.28796" y="4.45428" width="23.1241" height="23.9793" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </motion.div>

          </div>

        </div>
      </header>

      {/* Flow spacer */}
      <div className="h-[108px]" aria-hidden="true" />
    </>
  )
}
