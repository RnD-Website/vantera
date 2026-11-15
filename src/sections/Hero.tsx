import { useRef } from 'react'
import { GrainGradient } from '../components/GrainGradient'
import { Button } from '../components/ui'
import { hero } from '../data/content'
import { PaymentFlow } from '../components/PaymentFlow'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-navy-ink bg-white text-navy shadow-md sm:h-12 sm:w-12 md:h-14 md:w-14">
      {children}
    </div>
  )
}

const chipIcon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (_ctx, mm) => {
    const tl = gsap.timeline({ defaults: { ease: EASE.out } })
    tl.from('.hero-card', { scale: 0.97, borderRadius: 64, duration: 1.4, ease: EASE.expo })
      .from('.hero-media > *', { y: 80, opacity: 0, duration: 1.8, ease: EASE.expo }, 0.3)
      .from('.hero-line', { yPercent: 115, rotate: 2, duration: 1.25, stagger: 0.12 }, 0.35)
      .from('.hero-fade', { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, 0.75)

    mm.add('(min-width: 1024px)', () => {
      gsap.to('.hero-media > *', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        y: -90,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section id="home" ref={root} className="relative bg-navy p-3 sm:p-4 md:p-6">
      <div className="hero-card relative flex min-h-[97svh] flex-col overflow-hidden rounded-[24px] bg-navy-ink md:rounded-[32px] lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute inset-0">
          <GrainGradient base={[0.085, 0.05, 0.04]} glowA={[0.96, 0.4, 0.1]} glowB={[0.42, 0.16, 0.5]} intensity={1.1} />
        </div>

        {/* Animated payment-flow visual (desktop) */}
        <div className="hero-media pointer-events-none absolute left-[55%] top-1/2 z-[3] hidden -translate-x-1/2 -translate-y-1/2 lg:block lg:scale-[0.82] xl:scale-[0.95] 2xl:scale-100">
          <PaymentFlow />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden h-1/4 bg-gradient-to-t from-navy-ink/70 to-transparent lg:block" />

        <div className="hero-content container relative z-10 pb-10 pt-28 sm:pt-32 md:pt-36 lg:py-32">
          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:h-[640px] lg:grid-cols-[1.45fr_0.35fr_1fr] lg:gap-8">
            <div className="flex flex-col justify-center text-center lg:h-full lg:text-left">
              <h1 className="font-worksans text-[2.4rem] font-medium leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.5rem]">
                {hero.title.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <span className={`hero-line block lg:whitespace-nowrap ${i === hero.title.length - 1 ? 'bg-brand-gradient bg-clip-text text-transparent' : ''}`}>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="hidden lg:block" />

            <div className="relative flex flex-col items-center gap-8 text-center lg:h-full lg:items-start lg:justify-between lg:gap-0 lg:py-2 lg:text-left">
              <div className="hero-fade relative z-10 flex flex-col items-center gap-3 sm:flex-row">
                <div className="flex -space-x-3">
                  <Chip>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" {...chipIcon}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8v5H8zM9 16h6" /></svg>
                  </Chip>
                  <Chip>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" {...chipIcon}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
                  </Chip>
                  <Chip>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" {...chipIcon}><path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
                  </Chip>
                  <Chip>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" {...chipIcon}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>
                  </Chip>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-accent sm:text-xs">
                    {hero.label}
                  </span>
                  <p className="text-sm text-white/65 sm:text-base">Banking · Payments · Infrastructure</p>
                </div>
              </div>

              <div className="relative z-10 max-w-md space-y-6">
                <p className="hero-fade text-base leading-relaxed text-white/80 sm:text-lg">{hero.description}</p>
                <div className="hero-fade flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Button href={hero.primaryCta.href} size="md">{hero.primaryCta.label}</Button>
                  <Button href={hero.secondaryCta.href} variant="outlineLight" arrow={false}>{hero.secondaryCta.label}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative z-[1] mt-auto flex h-[380px] select-none items-center justify-center overflow-hidden sm:h-[460px] lg:hidden">
          <div className="origin-center scale-[0.6] sm:scale-75">
            <PaymentFlow />
          </div>
        </div>
      </div>
    </section>
  )
}
