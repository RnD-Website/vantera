import { useRef } from 'react'
import { Logo } from '../components/Logo'
import { ArrowIcon } from '../components/ui'
import { brand, footer } from '../data/content'
import { useGsap } from '../lib/useGsap'
import { gsap, EASE } from '../lib/gsap'

const socials = [
  { label: 'LinkedIn', d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z' },
  { label: 'X', d: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.17h1.7L7.4 4.74H5.58z' },
  { label: 'YouTube', d: 'M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z' },
  { label: 'Instagram', d: 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 4.6c2.4 0 2.7 0 3.6.05 2.4.1 3.6 1.3 3.7 3.7.04.95.05 1.2.05 3.65s0 2.7-.05 3.65c-.1 2.4-1.3 3.6-3.7 3.7-.95.04-1.2.05-3.6.05s-2.7 0-3.65-.05c-2.4-.1-3.6-1.3-3.7-3.7C4.6 14.7 4.6 14.4 4.6 12s0-2.7.05-3.65c.1-2.4 1.3-3.6 3.7-3.7C9.3 4.6 9.6 4.6 12 4.6zM12 3c-2.45 0-2.75 0-3.7.05-3.3.15-5.1 1.95-5.25 5.25C3 9.25 3 9.55 3 12s0 2.75.05 3.7c.15 3.3 1.95 5.1 5.25 5.25.95.05 1.25.05 3.7.05s2.75 0 3.7-.05c3.3-.15 5.1-1.95 5.25-5.25.05-.95.05-1.25.05-3.7s0-2.75-.05-3.7c-.15-3.3-1.95-5.1-5.25-5.25C14.75 3 14.45 3 12 3z' },
]

export function Footer() {
  const root = useRef<HTMLElement>(null)
  useGsap(root, () => {
    gsap.from('.foot-col', {
      y: 30, opacity: 0, duration: 0.9, ease: EASE.out, stagger: 0.08,
      scrollTrigger: { trigger: root.current, start: 'top 85%' },
    })
    gsap.from('.foot-word', {
      yPercent: 100, duration: 1.4, ease: EASE.expo,
      scrollTrigger: { trigger: '.foot-word', start: 'top 98%' },
    })
  })

  return (
    <footer ref={root} className="w-full overflow-hidden bg-soft pt-16 font-manrope text-ink md:pt-24">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
        <div className="grid gap-12 lg:grid-cols-[4fr_8fr]">
          <div className="foot-col">
            <Logo />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">{brand.statement}</p>
            <form
              className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-ink/10 bg-white p-1.5 pl-5 shadow-sm focus-within:border-electric"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">Work email</label>
              <input id="footer-email" type="email" required placeholder="Work email" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70" />
              <button type="submit" className="group flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric">
                Subscribe <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title} className="foot-col">
                <h4 className="mb-5 font-worksans text-xs font-bold uppercase tracking-[0.2em] text-ink/50">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="group relative inline-block text-[15px] leading-relaxed text-muted transition-colors hover:text-electric">
                        {l}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="foot-col">
              <h4 className="mb-5 font-worksans text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Contact</h4>
              <ul className="space-y-3 text-[15px] text-muted">
                <li><a href={`mailto:${footer.contact.email}`} className="hover:text-electric">{footer.contact.email}</a></li>
                <li><a href={`tel:${footer.contact.phone.replace(/[^\d+]/g, '')}`} className="hover:text-electric">{footer.contact.phone}</a></li>
                <li className="leading-relaxed">{footer.contact.note}</li>
                <li><a href="#careers" className="font-semibold text-ink hover:text-electric">Careers →</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-8 border-y border-ink/15 py-10 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={`VANTERA on ${s.label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric hover:bg-electric hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
            <p className="text-sm text-muted">© {new Date().getFullYear()} VANTERA. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            {footer.legal.map((l) => (
              <a key={l} href="#" className="text-muted transition-colors hover:text-electric">{l}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 pt-6" aria-hidden="true">
        <p className="foot-word select-none text-center font-worksans text-[22vw] font-extrabold leading-[0.78] tracking-tight text-navy/[0.09]">
          VANTERA
        </p>
      </div>
    </footer>
  )
}
