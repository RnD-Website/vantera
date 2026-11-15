import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { gsap } from '../lib/gsap'

const WORDS = Array.from({ length: 4 }, () => 'VANTERA')

function Row({ outline, reverse }: { outline?: boolean; reverse?: boolean }) {
  const set = (
    <div className="flex shrink-0">
      {WORDS.map((w, i) => (
        <span
          key={i}
          className={`px-5 font-worksans text-6xl font-extrabold uppercase leading-none tracking-tight md:px-8 md:text-8xl lg:text-9xl ${
            outline ? 'vt-outline' : 'text-white'
          }`}
        >
          {w}
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee-row flex w-max will-change-transform">
      <div className={`flex ${reverse ? 'animate-marquee-ltr' : 'animate-marquee-rtl'}`}>
        {set}
        <div aria-hidden="true" className="flex shrink-0">{set}</div>
      </div>
    </div>
  )
}

export function OutlineMarquee() {
  const root = useRef<HTMLElement>(null)
  useGsap(root, () => {
    // Scroll adds an extra drift on top of the infinite CSS loop
    gsap.fromTo('.marquee-row:nth-child(1)', { x: 0 }, { x: -160, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    gsap.fromTo('.marquee-row:nth-child(2)', { x: -160 }, { x: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  })
  return (
    <section ref={root} aria-hidden="true" className="overflow-hidden bg-navy-ink py-14 md:py-20">
      <div className="flex flex-col gap-1 md:gap-3">
        <Row outline />
        <Row reverse />
      </div>
    </section>
  )
}
