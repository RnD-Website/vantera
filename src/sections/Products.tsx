import { useRef } from 'react'
import { VelocityMarquee } from '../components/VelocityMarquee'
import { ArrowIcon, SectionLabel, SplitWords } from '../components/ui'
import { products } from '../data/content'
import { img } from '../data/images'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

const productAlt: Record<string, string> = {
  'Smart ATMs': 'Modern blue self-service ATM with illuminated screen',
  'Cash Recyclers': 'Pair of illuminated cash machines in a self-service lobby',
  'Payment Terminals': 'Handheld card payment terminal being used at a counter',
  'Self-Service Kiosks': 'People interacting with a large touchscreen self-service kiosk',
  'Payment Switch': 'Network switching hardware with organized cabling',
  'Digital Banking Platform': 'Hands holding a smartphone running a mobile application',
}

export function Products() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    gsap.from('.prod-label', {
      y: 16, opacity: 0, duration: 0.8, ease: EASE.soft,
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    })
    gsap.from('.prod-title .split-word', {
      yPercent: 110, duration: 1.1, ease: EASE.out, stagger: 0.04,
      scrollTrigger: { trigger: root.current, start: 'top 78%' },
    })
    gsap.from('.prod-tile', {
      clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: EASE.expo, stagger: 0.08,
      scrollTrigger: { trigger: '.prod-rail', start: 'top 88%' },
    })
  })

  return (
    <section id="products" ref={root} className="relative overflow-hidden bg-navy-ink pt-20 md:pt-28" aria-labelledby="products-title">
      <div className="w-full px-6 pb-12 sm:px-10 md:px-16 md:pb-16 lg:px-20 xl:px-28">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="prod-label"><SectionLabel light>{products.label}</SectionLabel></div>
            <h2 id="products-title" className="prod-title mt-6 max-w-3xl font-worksans text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
              <SplitWords text={products.title} />
            </h2>
          </div>
          <a href="#contact" className="group inline-flex items-center gap-3 font-manrope font-semibold text-white/80 transition-colors hover:text-white">
            Request a product overview
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-cyan-accent group-hover:bg-cyan-accent group-hover:text-navy">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      <div className="prod-rail">
        <VelocityMarquee speed={38}>
          {products.items.map((p) => (
            <a
              key={p.no}
              href="#contact"
              className="prod-tile group relative h-[340px] bg-navy w-[300px] shrink-0 overflow-hidden md:h-[460px] md:w-[380px]"
              aria-label={`${p.name}: ${p.text}`}
            >
              <img
                src={img(p.image, 900)}
                alt={productAlt[p.name]}
                loading="lazy"
                className="photo-warm h-full w-full transform-gpu object-cover transition-transform duration-700 [backface-visibility:hidden] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/20 to-navy/10" />
              <div className="absolute inset-0 bg-electric/0 mix-blend-color transition-colors duration-500 group-hover:bg-electric/20" />
              <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-navy-ink/40 px-3 py-1 font-manrope text-xs font-semibold tracking-[0.2em] text-white backdrop-blur">
                {p.no}
              </span>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="font-worksans text-xl font-semibold md:text-2xl">{p.name}</p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-white/75 md:text-base">
                    <span className="block pt-2">{p.text}</span>
                  </p>
                </div>
              </div>
            </a>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  )
}
