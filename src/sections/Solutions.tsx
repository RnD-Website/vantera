import { useEffect, useRef } from 'react'
import { DotGrid } from '../components/DotGrid'
import { GrainGradient } from '../components/GrainGradient'
import { SolutionArt } from '../components/Icons'
import { ArrowIcon, SectionLabel } from '../components/ui'
import { solutions } from '../data/content'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

function SolutionCard({ item, index }: { item: (typeof solutions.items)[number]; index: number }) {
  const card = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)

  // Draw the line art once the card is actually on screen (works inside transformed/pinned parents)
  useEffect(() => {
    const el = card.current!
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-drawn')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.PointerEvent) => {
    const b = card.current!.getBoundingClientRect()
    gsap.to(glow.current, { left: e.clientX - b.left, top: e.clientY - b.top, opacity: 1, duration: 0.5, ease: 'power3.out' })
  }
  const onLeave = () => gsap.to(glow.current, { opacity: 0, duration: 0.6 })

  return (
    <div
      ref={card}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`solution-card group relative flex min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-7 pb-40 transition duration-300 hover:-translate-y-1.5 hover:border-electric/50 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-electric/10 sm:p-8 md:min-h-[560px] md:p-12 md:pb-12 xl:min-h-[600px] ${
        index % 2 === 1 ? 'md:mt-16' : ''
      }`}
    >
      <div
        ref={glow}
        className="pointer-events-none absolute z-0 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/30 opacity-0 blur-3xl [@media(hover:hover)]:block"
        style={{ left: 0, top: 0 }}
      />
      <div className="relative z-10">
        <span className="font-manrope text-sm font-semibold tracking-[0.2em] text-cyan-accent">0{index + 1}</span>
        <h3 className="mt-4 max-w-[16ch] font-worksans text-2xl font-bold leading-tight text-white md:text-3xl">{item.title}</h3>
      </div>
      <div className="relative z-10">
        <p className="max-w-sm text-lg leading-relaxed text-white/70">{item.text}</p>
        <a
          href="#products"
          className="mt-6 inline-flex items-center gap-2 font-manrope text-base font-semibold text-white transition-colors hover:text-cyan-accent"
        >
          <span className="relative">
            Learn More
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-cyan-accent group-hover:bg-cyan-accent group-hover:text-navy">
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 md:bottom-auto md:right-10 md:top-[42%] md:-translate-y-1/2">
        <SolutionArt
          name={item.icon}
          className="h-32 w-32 text-white/60 transition-all duration-700 group-hover:scale-105 group-hover:text-cyan-accent md:h-44 md:w-44"
        />
      </div>
    </div>
  )
}

export function Solutions() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (_ctx, mm) => {
    gsap.from('.sol-head > *', {
      y: 40, opacity: 0, duration: 1, ease: EASE.out, stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 70%' },
    })

    mm.add('(min-width: 1024px)', () => {
      const section = root.current!
      const panel = section.querySelector<HTMLElement>('.sol-panel')!
      const grid = section.querySelector<HTMLElement>('.sol-grid')!
      const cta = section.querySelector<HTMLElement>('.sol-cta')!

      // Panel starts clipped to the exact footprint of the CTA button, then expands to full screen.
      const startClip = () => {
        const s = section.getBoundingClientRect()
        const b = cta.getBoundingClientRect()
        const top = b.top - s.top
        const left = b.left - s.left
        return `inset(${top}px ${s.width - (left + b.width)}px ${s.height - (top + b.height)}px ${left}px round 40px)`
      }
      const travel = () => Math.max(0, grid.offsetHeight - window.innerHeight)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.1 + travel()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      tl.fromTo(panel, { clipPath: startClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1, ease: 'power2.inOut' })
        .fromTo(grid, { scale: 1.12 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .to('.sol-overlay', { opacity: 0, duration: 0.35 }, 0.05)
        .to('.sol-head', { scale: 0.92, opacity: 0, duration: 0.8 }, 0.1)
        .fromTo(grid, { y: 0 }, { y: () => -travel(), duration: () => Math.max(1, travel() / window.innerHeight) * 1.4 }, 1)
    })
  })

  return (
    <section
      id="solutions"
      ref={root}
      className="relative z-10 w-full overflow-hidden bg-soft lg:h-screen"
      aria-labelledby="solutions-title"
    >
      <div className="absolute inset-0 z-0 p-4">
        <DotGrid />
      </div>

      {/* Base layer: heading + CTA (CTA footprint is where the panel grows from) */}
      <div className="relative z-10 flex items-center justify-center pb-16 pt-24 lg:pointer-events-none lg:absolute lg:inset-0 lg:py-0">
        <div className="sol-head mx-auto max-w-4xl px-6 text-center sm:px-10 md:px-16">
          <SectionLabel>{solutions.label}</SectionLabel>
          <h2 id="solutions-title" className="mt-8 font-worksans text-4xl font-bold leading-[1.08] text-ink md:text-5xl lg:text-[4.25rem]">
            {solutions.title}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted">{solutions.description}</p>
          <a
            href={solutions.cta.href}
            className="sol-cta mt-10 inline-flex items-center justify-center gap-2.5 rounded-full bg-navy-ink px-8 py-4 font-manrope text-lg font-semibold text-white lg:invisible"
          >
            {solutions.cta.label}
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Expanding dark panel */}
      <div
        className="sol-panel relative z-20 mx-3 overflow-hidden rounded-[28px] bg-navy-ink sm:mx-4 lg:absolute lg:inset-0 lg:mx-0 lg:rounded-none"
        style={{ isolation: 'isolate', transform: 'translateZ(0)' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <GrainGradient base={[0.075, 0.045, 0.035]} glowA={[0.95, 0.38, 0.11]} glowB={[0.42, 0.16, 0.5]} intensity={0.85} />
        </div>
        <div className="sol-grid relative z-10 grid origin-top gap-x-6 gap-y-8 px-6 pb-16 pt-10 will-change-transform sm:gap-x-10 sm:px-10 md:grid-cols-2 md:gap-y-24 md:px-16 md:pb-36 md:pt-28 lg:gap-x-20 lg:px-20 xl:gap-x-28 xl:px-28">
          {solutions.items.map((item, i) => (
            <SolutionCard key={item.title} item={item} index={i} />
          ))}
        </div>
        {/* Overlay copy: only the CTA label is visible, sitting on the clipped panel so it reads as a button */}
        <div className="sol-overlay pointer-events-none absolute inset-0 z-20 hidden items-center justify-center lg:flex">
          <div className="mx-auto max-w-4xl px-16 text-center">
            <span className="invisible inline-flex font-manrope text-base font-semibold uppercase tracking-[0.2em]">{solutions.label}</span>
            <h2 aria-hidden="true" className="invisible mt-8 font-worksans text-[4.25rem] font-bold leading-[1.08]">{solutions.title}</h2>
            <p aria-hidden="true" className="invisible mx-auto mt-8 max-w-2xl text-xl leading-relaxed">{solutions.description}</p>
            <a
              href={solutions.cta.href}
              className="group pointer-events-auto mt-10 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-manrope text-lg font-semibold text-white"
            >
              {solutions.cta.label}
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="h-6 lg:hidden" />
    </section>
  )
}
