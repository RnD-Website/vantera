# VANTERA — Corporate Website

**Powering the Future of Finance.** Premium fintech corporate site for the US market.

Stack: React 18 · TypeScript · Vite · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Framer Motion · three.js

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Structure

```
src/
  data/content.ts      all copy (edit text here)
  data/images.ts       image sources (Unsplash CDN) + srcset helper
  lib/SmoothScroll.tsx Lenis, driven by the GSAP ticker and synced to ScrollTrigger
  lib/useGsap.ts       scoped gsap.context + matchMedia with automatic cleanup
  lib/gsap.ts          plugin registration + shared easing/timing tokens
  components/          Navbar, Logo, Button, GrainGradient (WebGL), DotGrid (canvas),
                       Emblem3D (three.js), VelocityMarquee, line-art icons
  sections/            Hero → Partners → About (+ pinned showcase) → Solutions →
                       Products → Technology + Why VANTERA → Outline marquee →
                       Careers → Contact → Footer
```

## Motion system (mirrors the reference)

| Section | Motion |
| --- | --- |
| Navbar | Floating white pill drops in; hides on scroll down, returns on scroll up; spring hover pill + active dot |
| Hero | Inset rounded card with animated grain-gradient shader (follows the pointer); line-by-line masked headline reveal; image scale-in; scroll parallax |
| Partners | Masked logo marquee that speeds up with scroll velocity |
| About | Rotating 3D "V" emblem; scroll-scrubbed word-by-word typography reveal; full-bleed image unmasks, pins, and the next section slides over it; hotspot card |
| Solutions | Pinned scene: the dark panel grows out of the CTA button's exact footprint (clip-path) to full screen, cards de-scale, then the staggered 2-column grid scrolls through; line art draws in; cursor-follow glow on cards |
| Products | Clip-revealed tiles in a velocity-reactive horizontal rail; hover zoom + description reveal |
| Technology / Why | Bento grid with staggered rise-in and inner image parallax |
| Marquee | Outline + solid VANTERA rows in opposite directions with extra scroll drift |
| Careers | Sticky intro column, accordion, scroll-rotated 3D blades, clip-reveal photo |
| Contact | Grid backdrop, orbit rings, parallax floating cards, word reveal |

Pins and heavy scrubs are desktop-only (≥1024px via `gsap.matchMedia`); mobile gets lighter reveals. `prefers-reduced-motion` disables Lenis and CSS motion.

## Images

Photos come from [Unsplash](https://unsplash.com) (free Unsplash License) and are served from the Unsplash CDN with responsive sizes. To self-host them:

```bash
npm run images:local   # downloads into public/images
```

then set `USE_LOCAL = true` in `src/data/images.ts`.

## Placeholders to replace before launch

- Partner logos are **fictional placeholders** (Norvane, Halcyra Bank, …) — swap in real partners only with permission.
- Footer email/phone (`hello@vantera.com`, `+1 (000) 000-0000`) and social links are placeholders.
- No statistics, certifications, offices, or partnerships are claimed anywhere in the copy.
