import { lazy, Suspense, useRef } from 'react'
import { Button, SectionLabel } from '../components/ui'
import { about } from '../data/content'
import { img, srcSet } from '../data/images'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

const Emblem3D = lazy(() => import('../components/Emblem3D'))

export function About() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (_ctx, mm) => {
    gsap.from('.about-label', {
      y: 10, opacity: 0, duration: 0.8, ease: EASE.soft,
      scrollTrigger: { trigger: '.about-intro', start: 'top 80%' },
    })
    // Large typography reveal — words brighten as you scroll through the statement
    gsap.fromTo(
      '.about-title .rw',
      { opacity: 0.14 },
      {
        opacity: 1, ease: 'none', stagger: 0.08,
        scrollTrigger: { trigger: '.about-title', start: 'top 82%', end: 'bottom 45%', scrub: true },
      },
    )
    gsap.from('.about-row > *', {
      y: 40, opacity: 0, duration: 1, ease: EASE.out, stagger: 0.12,
      scrollTrigger: { trigger: '.about-row', start: 'top 85%' },
    })
    gsap.from('.about-rule', {
      scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: EASE.inOut,
      scrollTrigger: { trigger: '.about-row', start: 'top 90%' },
    })

    mm.add('(min-width: 768px)', () => {
      // Pinned full-bleed showcase — the next section slides over it
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.showcase', start: 'top top', end: '+=100%', pin: true, pinSpacing: false, scrub: true },
      })
      tl.fromTo('.showcase-img', { scale: 1.12 }, { scale: 1, ease: 'none' }, 0)

      // Image unmasks as it enters
      gsap.fromTo(
        '.showcase-mask',
        { clipPath: 'inset(8% 6% 0% 6% round 32px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: '.showcase', start: 'top bottom', end: 'top top', scrub: true },
        },
      )
      gsap.fromTo(
        '.hotspot-card',
        { x: 14, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: EASE.out, scrollTrigger: { trigger: '.showcase', start: 'top 35%', toggleActions: 'play none none reverse' } },
      )
      gsap.fromTo(
        '.hotspot-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: EASE.inOut, scrollTrigger: { trigger: '.showcase', start: 'top 40%', toggleActions: 'play none none reverse' } },
      )
    })
  })

  return (
    <section id="about" ref={root} className="overflow-hidden" aria-labelledby="about-title">
      <div className="about-intro relative bg-soft pb-16 pt-24 text-ink md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute left-[-6%] top-[42%] hidden h-[34rem] w-[34rem] -translate-y-1/2 opacity-90 lg:block xl:h-[40rem] xl:w-[40rem]">
          <Suspense fallback={null}>
            <Emblem3D className="h-full w-full" />
          </Suspense>
        </div>

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="about-label"><SectionLabel>{about.label}</SectionLabel></div>
            <div className="about-title">
              <h2 id="about-title" className="font-worksans text-3xl font-medium leading-[1.12] md:text-4xl lg:text-5xl">
                {about.title.split(' ').map((w, i) => (
                  <span key={i} className="rw">{w} </span>
                ))}
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-muted md:text-2xl">
                {about.description.split(' ').map((w, i) => (
                  <span key={i} className="rw">{w} </span>
                ))}
              </p>
            </div>
          </div>

          <div className="relative mt-14 pt-10 md:mt-28 md:pt-12">
            <div className="about-rule absolute inset-x-0 top-0 h-px bg-ink/10" />
            <div className="about-row grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="mb-3 font-worksans text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  Seamless <span className="bg-brand-gradient bg-clip-text text-transparent">by design.</span>
                </h3>
                <p className="text-xl text-muted">{about.kickerSub}</p>
              </div>
              <div>
                <p className="text-xl leading-relaxed text-muted">
                  From the branch lobby to the checkout counter to the phone in every pocket, VANTERA connects the
                  hardware, software, and infrastructure that financial experiences depend on — so institutions can
                  move faster with confidence.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={about.secondaryCta.href} variant="outline">{about.secondaryCta.label}</Button>
                  <Button href={about.cta.href}>{about.cta.label}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned product showcase */}
      <div className="relative h-[60svh] bg-soft md:h-screen">
        <div className="showcase relative h-[60svh] w-full overflow-hidden md:h-screen">
          <div className="showcase-mask absolute inset-0 overflow-hidden">
            <img
              src={img(about.showcase.image, 2200)}
              srcSet={srcSet(about.showcase.image)}
              sizes="100vw"
              alt="Customer tapping a card on a payment terminal at a modern coffee shop counter"
              className="photo-warm showcase-img absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/5 to-navy/20" />
          </div>

          <div className="absolute left-[46%] top-[52%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="relative">
              <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-cyan-accent opacity-75" />
              <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-electric shadow-lg" />
            </div>
            <div className="hotspot-line absolute left-5 top-2.5 w-24 origin-left border-t-2 border-dashed border-cyan-accent" />
            <div className="hotspot-card absolute left-[7.5rem] top-[-40px] w-60 rounded-xl border border-white/60 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <h4 className="text-sm font-bold text-ink">{about.showcase.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted">{about.showcase.text}</p>
              <a
                href="#products"
                className="mt-3 block w-full rounded-lg bg-electric px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-navy"
              >
                {about.showcase.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
