import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Logo } from './Logo'
import { ArrowIcon } from './ui'
import { navLinks } from '../data/content'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState('#home')
  const { scrollY } = useScroll()

  // Hide on scroll down, reveal on scroll up (after leaving the hero).
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    if (open) return
    setHidden(y > prev && y > 600)
  })

  // Track active section
  useEffect(() => {
    const ids = navLinks.map((l) => l.href)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[999] p-3 sm:p-4 md:p-6"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: hidden ? 0 : 0.15 }}
    >
      <nav
        aria-label="Primary"
        className={`relative mx-auto max-w-[1280px] bg-white px-4 shadow-lg shadow-navy/10 transition-[border-radius] duration-500 sm:px-6 ${
          open ? 'rounded-[28px]' : 'rounded-full'
        }`}
      >
        <div className="relative z-30 flex h-14 items-center justify-between">
          <a href="#home" aria-label="VANTERA home" className="flex shrink-0 items-center">
            <Logo />
          </a>

          <ul className="hidden items-center self-stretch lg:flex" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((l) => {
              const isActive = active === l.href
              return (
                <li key={l.href} className="relative flex items-center self-stretch">
                  <a
                    href={l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative z-10 rounded-full px-3.5 py-2 font-manrope text-[15px] font-medium transition-colors duration-300 xl:px-4 ${
                      isActive || hovered === l.href ? 'text-electric' : 'text-ink/80'
                    }`}
                  >
                    {l.label}
                  </a>
                  {hovered === l.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-x-0 top-1/2 z-0 h-9 -translate-y-1/2 rounded-full bg-electric/[0.07]"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-electric"
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center lg:flex">
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-manrope text-base font-semibold text-white shadow-md shadow-electric/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-electric/35"
            >
              Let&apos;s Talk
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:rotate-[-45deg]">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-electric/10 hover:text-electric lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="space-y-1 border-t border-ink/10 pb-5 pt-3">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-3 py-3 font-manrope text-lg font-medium text-ink hover:bg-soft hover:text-electric"
                    >
                      {l.label}
                      <ArrowIcon className="h-4 w-4 opacity-40" />
                    </a>
                  </motion.li>
                ))}
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-3">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 font-manrope font-semibold text-white"
                  >
                    Let&apos;s Talk <ArrowIcon />
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
