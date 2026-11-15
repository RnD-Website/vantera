import { useRef } from 'react'
import { VelocityMarquee } from '../components/VelocityMarquee'
import { PartnerMark } from '../components/Icons'
import { SectionLabel, SplitWords } from '../components/ui'
import { partners } from '../data/content'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

export function Partners() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    gsap.from('.partners-label', {
      y: 16, opacity: 0, duration: 0.8, ease: EASE.soft,
      scrollTrigger: { trigger: root.current, start: 'top 85%' },
    })
    gsap.from('.partners-title .split-word', {
      yPercent: 110, duration: 1.1, ease: EASE.out, stagger: 0.04,
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    })
    gsap.from('.partners-wall', {
      opacity: 0, y: 30, duration: 1.2, ease: EASE.soft,
      scrollTrigger: { trigger: '.partners-wall', start: 'top 90%' },
    })
  })

  return (
    <section id="partners" ref={root} className="overflow-hidden bg-soft pb-10 pt-20 md:pb-14 md:pt-28" aria-labelledby="partners-title">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="partners-label"><SectionLabel>{partners.label}</SectionLabel></div>
          <h2 id="partners-title" className="partners-title font-worksans text-3xl font-normal leading-[1.1] text-ink md:text-4xl lg:text-[2.75rem]">
            <SplitWords text={partners.title} />
          </h2>
        </div>
      </div>

      <div className="partners-wall mt-12 md:mt-16">
        <VelocityMarquee
          speed={45}
          className="[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
        >
          {partners.logos.map((l) => (
            <div
              key={l.name}
              className="group mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-transparent px-6 py-5 text-[#A08F85] transition-all duration-500 hover:border-navy/10 hover:bg-white hover:text-navy hover:shadow-lg hover:shadow-navy/5 md:mx-5 md:px-8"
            >
              <span className="transition-colors duration-500 group-hover:text-electric">
                <PartnerMark mark={l.mark} />
              </span>
              <span className="whitespace-nowrap font-worksans text-xl font-semibold tracking-tight md:text-2xl">{l.name}</span>
            </div>
          ))}
        </VelocityMarquee>
        <p className="sr-only">Partner names shown are illustrative placeholders.</p>
      </div>
    </section>
  )
}
