import { useEffect, useRef } from 'react'

/** Interactive dot field — dots swell and tint electric blue near the pointer. */
export function DotGrid({ className = '', gap = 26, color = '42,36,32', accent = '242,97,29' }: { className?: string; gap?: number; color?: string; accent?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    let w = 0, h = 0
    const resize = () => {
      const b = canvas.getBoundingClientRect()
      w = b.width
      h = b.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      m.tx = e.clientX - b.left
      m.ty = e.clientY - b.top
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    let raf = 0
    const R = 180
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      m.x += (m.tx - m.x) * 0.12
      m.y += (m.ty - m.y) * 0.12
      ctx.clearRect(0, 0, w, h)
      const ox = (w % gap) / 2, oy = (h % gap) / 2
      for (let x = ox; x < w; x += gap) {
        for (let y = oy; y < h; y += gap) {
          const d = Math.hypot(x - m.x, y - m.y)
          const f = Math.max(0, 1 - d / R)
          const r = 1.1 + f * 2.2
          ctx.fillStyle = f > 0 ? `rgba(${accent},${0.25 + f * 0.6})` : `rgba(${color},0.16)`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [gap, color, accent])

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
