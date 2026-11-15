import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Infinite horizontal loop whose speed reacts to scroll velocity
 * (the same "scroll-boosted" marquee behaviour as the reference).
 */
export function VelocityMarquee({
  children,
  speed = 40,
  direction = -1,
  className = '',
  trackClassName = '',
}: {
  children: ReactNode
  speed?: number // px per second
  direction?: 1 | -1
  className?: string
  trackClassName?: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current!
    let x = 0
    let boost = 0
    let half = el.scrollWidth / 2
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2))
    ro.observe(el)

    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        boost = gsap.utils.clamp(-1600, 1600, self.getVelocity())
      },
    })

    const tick = (_t: number, dt: number) => {
      boost *= 0.92
      const v = (speed + Math.abs(boost) * 0.35) * direction * (dt / 1000)
      x += v
      if (x <= -half) x += half
      if (x > 0) x -= half
      gsap.set(el, { x })
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      ro.disconnect()
    }
  }, [speed, direction])

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div ref={track} className={`flex w-max will-change-transform ${trackClassName}`}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
