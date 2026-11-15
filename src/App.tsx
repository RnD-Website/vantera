import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { SmoothScroll } from './lib/SmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import { Hero } from './sections/Hero'
import { Partners } from './sections/Partners'
import { About } from './sections/About'
import { Solutions } from './sections/Solutions'
import { Products } from './sections/Products'
import { Technology } from './sections/Technology'
import { OutlineMarquee } from './sections/OutlineMarquee'
import { Careers } from './sections/Careers'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  // Recalculate trigger positions once fonts & images have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <SmoothScroll>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Partners />
        <About />
        <Solutions />
        <Products />
        <Technology />
        <OutlineMarquee />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
