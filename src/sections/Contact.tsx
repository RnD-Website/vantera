import { useRef } from 'react'
import { Button, SplitWords } from '../components/ui'
import { contact } from '../data/content'
import { img } from '../data/images'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

export function Contact() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (_ctx, mm) => {
    gsap.from('.contact-title .split-word', {
      yPercent: 115, rotate: 3, duration: 1.2, ease: EASE.out, stagger: 0.05,
      scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
    })
    gsap.from('.contact-fade', {
      y: 30, opacity: 0, duration: 1, ease: EASE.out, stagger: 0.12, delay: 0.3,
      scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
    })
    gsap.from('.orbit', {
      scale: 0.6, opacity: 0, duration: 1.8, ease: EASE.expo, stagger: 0.12,
      scrollTrigger: { trigger: root.current, start: 'top 70%' },
    })
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo('.float-a', { y: 120 }, { y: -120, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.float-b', { y: 200 }, { y: -160, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.contact-grid', { backgroundPosition: '50% 0px' }, { backgroundPosition: '50% 220px', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  })

  return (
    <section
      id="contact"
      ref={root}
      className="relative isolate flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-navy-ink py-24 md:min-h-[115vh]"
      aria-labelledby="contact-title"
    >
      <div
        className="contact-grid pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,214,190,.07) 1px, transparent 1px), linear-gradient(rgba(255,214,190,.07) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 70%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(70% 70%, black 40%, transparent 100%)',
        }}
      />

      {/* Orbits */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {[520, 760, 1000].map((size, i) => (
          <div key={size} className="orbit absolute" style={{ width: size, height: size }}>
            <div
              className="relative h-full w-full rounded-full border border-electric/20"
              style={{ animation: `spin ${60 + i * 25}s linear infinite${i % 2 ? ' reverse' : ''}` }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-accent shadow-[0_0_16px_#FFB067]" />
              {i === 1 && <span className="absolute bottom-[14%] right-[6%] h-2 w-2 rounded-full bg-electric shadow-[0_0_14px_#F2611D]" />}
            </div>
          </div>
        ))}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-electric/20 blur-[120px]" />
      </div>

      {/* Floating image cards */}
      <div className="float-a pointer-events-none absolute left-[6%] top-[14%] hidden h-56 w-44 overflow-hidden rounded-[24px] border border-white/10 shadow-2xl shadow-black/40 md:block lg:h-72 lg:w-56">
        <img src={img('contactless', 700)} alt="" loading="lazy" className="photo-warm h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/50 to-transparent" />
      </div>
      <div className="float-b pointer-events-none absolute bottom-[12%] right-[6%] hidden h-52 w-64 overflow-hidden rounded-[24px] border border-white/10 shadow-2xl shadow-black/40 md:block lg:h-64 lg:w-80">
        <img src={img('teamAlt', 800)} alt="" loading="lazy" className="photo-warm h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-10">
        <span className="contact-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-manrope text-sm font-semibold text-white/80 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-accent" />
          Let&apos;s talk
        </span>
        <h2 id="contact-title" className="contact-title mt-8 font-worksans text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
          <SplitWords text={contact.title} />
        </h2>
        <p className="contact-fade mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">{contact.description}</p>
        <div className="contact-fade mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href={contact.cta.href} size="lg">{contact.cta.label}</Button>
          <Button href="#solutions" size="lg" variant="outlineLight" arrow={false}>Explore Solutions</Button>
        </div>
      </div>
    </section>
  )
}
