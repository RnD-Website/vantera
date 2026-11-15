import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, SectionLabel, SplitWords } from '../components/ui'
import { careers } from '../data/content'
import { img } from '../data/images'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE, ScrollTrigger } from '../lib/gsap'

const BLADE_BG = 'linear-gradient(180deg, #FFB067 0%, #F2611D 35%, #B8400F 70%, #1F1611 100%)'

export function Careers() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(0)

  useGsap(root, (_ctx, mm) => {
    gsap.from('.career-head .split-word', {
      yPercent: 110, duration: 1.1, ease: EASE.out, stagger: 0.035,
      scrollTrigger: { trigger: '.career-head', start: 'top 85%' },
    })
    gsap.from('.career-fade', {
      y: 30, opacity: 0, duration: 1, ease: EASE.out, stagger: 0.1,
      scrollTrigger: { trigger: '.career-head', start: 'top 80%' },
    })
    gsap.from('.career-item', {
      y: 30, opacity: 0, duration: 0.9, ease: EASE.out, stagger: 0.1,
      scrollTrigger: { trigger: '.career-list', start: 'top 85%' },
    })
    gsap.fromTo(
      '.career-photo',
      { clipPath: 'inset(0% 0% 100% 0% round 32px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: EASE.expo, scrollTrigger: { trigger: '.career-photo', start: 'top 88%' } },
    )
    mm.add('(min-width: 768px)', () => {
      gsap.to('.blades', {
        rotate: 220, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo('.career-photo img', { yPercent: -8, scale: 1.12 }, {
        yPercent: 8, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: '.career-photo', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section id="careers" ref={root} className="relative overflow-hidden bg-navy-ink pb-24 pt-32 text-white md:pb-32 md:pt-44" aria-labelledby="careers-title">
      <div className="pointer-events-none absolute right-[-8%] top-1/4 z-0 hidden md:block md:right-[-4%]" style={{ perspective: 1000 }}>
        <div className="blades relative h-[420px] w-[420px] lg:h-[560px] lg:w-[560px]" style={{ transformStyle: 'preserve-3d' }}>
          {[0, 60, 120].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: '16%', height: '100%', transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                background: BLADE_BG, opacity: 0.22,
                boxShadow: 'inset 0 6px 14px rgba(255,255,255,.25), inset 0 -8px 18px rgba(0,0,0,.35)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="career-head lg:sticky lg:top-32">
              <div className="career-fade"><SectionLabel light>{careers.label}</SectionLabel></div>
              <h2 id="careers-title" className="mt-8 font-worksans text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
                <SplitWords text={careers.title} />
              </h2>
              <p className="career-fade mt-8 max-w-md text-xl leading-relaxed text-white/60">{careers.description}</p>
              <div className="career-fade mt-10">
                <Button href={careers.cta.href}>{careers.cta.label}</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="career-photo relative mb-10 h-[300px] overflow-hidden rounded-[32px] md:h-[420px]">
              <img src={img('team', 1400)} alt="Collaborative technology team working together around a laptop" loading="lazy" className="photo-warm absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-electric/10" />
              <span className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-navy-ink/50 px-4 py-2 font-manrope text-sm font-semibold backdrop-blur">
                Life at VANTERA
              </span>
            </div>

            <div className="career-list border-t border-white/10">
              {careers.values.map((v, i) => {
                const isOpen = open === i
                return (
                  <div key={v.q} className="career-item border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`career-panel-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left md:py-8"
                    >
                      <h3 className={`font-worksans text-xl font-semibold leading-snug transition-colors duration-300 md:text-2xl ${isOpen ? 'text-cyan-accent' : 'text-white group-hover:text-cyan-accent'}`}>
                        {v.q}
                      </h3>
                      <span
                        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          isOpen ? 'bg-electric text-white' : 'border border-white/20 text-white group-hover:border-cyan-accent group-hover:text-cyan-accent'
                        }`}
                      >
                        <span className="absolute h-[2px] w-4 rounded-full bg-current" />
                        <span className="absolute h-[2px] w-4 rounded-full bg-current transition-transform duration-300" style={{ transform: isOpen ? 'none' : 'rotate(90deg)' }} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`career-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                          onAnimationComplete={() => ScrollTrigger.refresh()}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-8 pr-4 text-lg leading-relaxed text-white/60 md:pr-16">{v.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
