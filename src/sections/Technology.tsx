import { useRef } from 'react'
import { HighlightGlyph } from '../components/Icons'
import { Button, SectionLabel, SplitWords } from '../components/ui'
import { technology, why } from '../data/content'
import { img } from '../data/images'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

const blueCard = 'radial-gradient(120% 120% at 22% 20%, #F2611D 0%, #B8400F 42%, #1F1611 100%)'
const navyCard = 'radial-gradient(130% 130% at 70% 10%, #3A2619 0%, #24170F 65%)'

function Highlight({ h, style, className = '', big = false }: { h: (typeof why.highlights)[number]; style?: React.CSSProperties; className?: string; big?: boolean }) {
  return (
    <div
      style={style}
      className={`bento group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[32px] p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 md:p-10 lg:min-h-0 ${className}`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/5 text-cyan-accent transition-colors duration-300 group-hover:border-cyan-accent/60">
        <HighlightGlyph name={h.icon} className="h-8 w-8" />
      </span>
      <div>
        <h3 className={`origin-left font-worksans font-bold leading-tight text-white transition-transform duration-300 group-hover:scale-[1.03] ${big ? 'text-3xl md:text-4xl' : 'text-2xl md:text-[1.7rem]'}`}>
          {h.title}
        </h3>
        <p className={`mt-3 leading-relaxed text-white/70 ${big ? 'text-lg' : 'text-sm md:text-base'}`}>{h.text}</p>
      </div>
    </div>
  )
}

export function Technology() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (_ctx, mm) => {
    gsap.utils.toArray<HTMLElement>('.bento').forEach((el, i) => {
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1.1, ease: EASE.out, delay: (i % 3) * 0.08, clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })
    gsap.from('.why-head .split-word', {
      yPercent: 110, duration: 1.1, ease: EASE.out, stagger: 0.04,
      scrollTrigger: { trigger: '.why-head', start: 'top 85%' },
    })
    mm.add('(min-width: 768px)', () => {
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((el) => {
        gsap.fromTo(el, { yPercent: -10, scale: 1.15 }, {
          yPercent: 10, scale: 1.15, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      gsap.to('.tech-glow', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section id="technology" ref={root} className="relative overflow-hidden bg-navy-ink py-16 md:py-24" aria-labelledby="tech-title">
      <div
        className="tech-glow pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1200px] max-w-none -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(rgba(242,97,29,.18) 0%, rgba(242,97,29,.06) 40%, rgba(242,97,29,0) 68%)' }}
      />
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
        {/* Row 1 — Technology & Innovation */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div
            className="bento relative flex min-h-[440px] flex-col justify-center overflow-hidden rounded-[32px] p-10 md:min-h-[560px] md:p-16 lg:col-span-3"
            style={{ background: blueCard }}
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
            <SectionLabel light className="!text-white/85">{technology.label}</SectionLabel>
            <h2 id="tech-title" className="mt-6 max-w-2xl font-worksans text-3xl font-bold leading-[1.05] text-white md:text-5xl lg:text-[3.6rem]">
              {technology.title}
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl">{technology.description}</p>
            <div className="mt-10">
              <Button href={technology.cta.href} variant="white" size="lg">{technology.cta.label}</Button>
            </div>
          </div>
          <div className="bento relative min-h-[440px] overflow-hidden rounded-[32px] md:min-h-[560px] lg:col-span-2" style={{ background: navyCard }}>
            <img
              src={img('infrastructure', 1200)}
              alt="Aisle of server racks in a modern data center"
              loading="lazy"
              className="photo-warm parallax-img absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-electric/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/15 bg-navy-ink/50 px-5 py-4 text-white backdrop-blur-md">
              <span className="font-manrope text-sm font-semibold">Infrastructure, engineered for continuity</span>
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-accent shadow-[0_0_12px_#FFB067]" />
            </div>
          </div>
        </div>

        {/* Why VANTERA */}
        <div id="why" className="why-head grid items-end gap-6 pb-10 pt-24 md:pt-32 lg:grid-cols-2">
          <SectionLabel light>{why.label}</SectionLabel>
          <h2 className="font-worksans text-3xl font-bold leading-[1.08] text-white md:text-5xl">
            <SplitWords text={why.title} />
          </h2>
        </div>

        {/* Row 2 — bento of highlights */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:h-[640px] lg:grid-cols-[1.7fr_1fr_1fr_1.1fr] lg:grid-rows-2">
          <div className="bento relative min-h-[320px] overflow-hidden rounded-[32px] md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0">
            <img
              src={img('selfServiceHall', 1200)}
              alt="Row of illuminated self-service screens in a modern hall"
              loading="lazy"
              className="photo-warm parallax-img absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/60 to-transparent" />
          </div>

          <div className="bento group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[32px] p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl md:p-10 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:min-h-0">
            <img
              src={img('keypad', 1000)}
              alt=""
              loading="lazy"
              className="photo-warm pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-ink/90 via-navy/60 to-electric/30" />
            <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/10 text-cyan-accent backdrop-blur">
              <HighlightGlyph name={why.highlights[0].icon} className="h-8 w-8" />
            </span>
            <div className="relative z-10">
              <h3 className="origin-left font-worksans text-3xl font-bold leading-tight text-white transition-transform duration-300 group-hover:scale-[1.03] md:text-4xl">
                {why.highlights[0].title}
              </h3>
              <p className="mt-3 max-w-md text-lg text-white/80">{why.highlights[0].text}</p>
            </div>
          </div>

          <Highlight h={why.highlights[1]} big style={{ background: blueCard }} className="hover:brightness-110 lg:col-start-4 lg:row-span-2 lg:row-start-1" />
          <Highlight h={why.highlights[2]} style={{ background: navyCard }} className="border border-white/10 hover:brightness-125 lg:col-start-2 lg:row-start-2" />
          <Highlight h={why.highlights[3]} className="border border-white/10 bg-white/[0.06] hover:border-cyan-accent/40 hover:bg-white/[0.1] lg:col-start-3 lg:row-start-2" />
        </div>
      </div>
    </section>
  )
}
