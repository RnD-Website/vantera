import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { VanteraCard } from './VanteraCard'

const AMOUNT = '$48.60'

/**
 * Animated hero visual: a VANTERA card taps a smart POS terminal →
 * the terminal processes → payment approved → receipt prints. Loops.
 */
export function PaymentFlow({ className = '' }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current!
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el)

      if (prefersReducedMotion()) {
        gsap.set(q('.pf-s1, .pf-s2'), { autoAlpha: 0 })
        gsap.set(q('.pf-s3'), { autoAlpha: 1 })
        gsap.set(q('.pf-check'), { strokeDashoffset: 0 })
        gsap.set(q('.pf-receipt'), { height: 170 })
        return
      }

      // Pointer tilt on the whole scene
      const rx = gsap.quickTo(q('.pf-tilt'), 'rotationX', { duration: 0.8, ease: 'power3.out' })
      const ry = gsap.quickTo(q('.pf-tilt'), 'rotationY', { duration: 0.8, ease: 'power3.out' })
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        ry(nx * 10)
        rx(-ny * 8)
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      // Idle float
      gsap.to(q('.pf-float'), { y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, delay: 1.2, defaults: { ease: 'power3.out' } })
      tl.set(q('.pf-card'), { x: -280, y: 260, rotation: -22, autoAlpha: 0, scale: 1 })
        .set(q('.pf-s1'), { autoAlpha: 1 })
        .set(q('.pf-s2, .pf-s3'), { autoAlpha: 0 })
        .set(q('.pf-check'), { strokeDashoffset: 1 })
        .set(q('.pf-receipt'), { height: 0 })
        .set(q('.pf-receipt-inner'), { y: 0, autoAlpha: 1 })
        .set(q('.pf-toast'), { y: 16, autoAlpha: 0 })
        .set(q('.pf-wave'), { scale: 0.5, autoAlpha: 0 })
        .set(q('.pf-glow'), { autoAlpha: 0.35 })

        // 1 · card approaches
        .to(q('.pf-card'), { x: -40, y: 50, rotation: -10, autoAlpha: 1, duration: 1.1 })
        // 2 · tap
        .to(q('.pf-card'), { x: 0, y: 0, rotation: -6, scale: 0.97, duration: 0.45, ease: 'power2.inOut' })
        .to(q('.pf-wave'), { scale: 1.7, autoAlpha: 0, duration: 1.1, stagger: 0.18, ease: 'power1.out', startAt: { scale: 0.5, autoAlpha: 0.9 } }, '<0.1')
        .to(q('.pf-glow'), { autoAlpha: 0.8, duration: 0.4 }, '<')
        // 3 · processing
        .to(q('.pf-s1'), { autoAlpha: 0, duration: 0.25 }, '<0.2')
        .to(q('.pf-s2'), { autoAlpha: 1, duration: 0.25 }, '<')
        .to(q('.pf-card'), { y: -6, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, '<')
        // 4 · approved
        .to(q('.pf-s2'), { autoAlpha: 0, duration: 0.25 }, '+=0.35')
        .to(q('.pf-s3'), { autoAlpha: 1, duration: 0.25 }, '<')
        .to(q('.pf-check'), { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, '<0.1')
        .fromTo(q('.pf-approved-ring'), { scale: 0.6, autoAlpha: 0.8 }, { scale: 1.6, autoAlpha: 0, duration: 0.9 }, '<')
        // 5 · card leaves, receipt prints, toast pops
        .to(q('.pf-card'), { x: -300, y: 240, rotation: -24, autoAlpha: 0, duration: 0.9, ease: 'power2.in' }, '<0.3')
        .to(q('.pf-receipt'), { height: 170, duration: 1.4, ease: 'steps(14)' }, '<0.2')
        .to(q('.pf-toast'), { y: 0, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.6)' }, '<0.3')
        .to(q('.pf-glow'), { autoAlpha: 0.35, duration: 0.8 }, '<')
        // 6 · reset
        .to(q('.pf-receipt-inner'), { y: -24, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '+=1.6')
        .to(q('.pf-toast'), { y: -10, autoAlpha: 0, duration: 0.4 }, '<')
        .to(q('.pf-s3'), { autoAlpha: 0, duration: 0.3 }, '<0.2')
        .to(q('.pf-s1'), { autoAlpha: 1, duration: 0.3 }, '<')

      // Pause the loop when off-screen
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()))
      io.observe(el)
      return () => {
        window.removeEventListener('pointermove', onMove)
        io.disconnect()
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className={`relative h-[620px] w-[560px] ${className}`} aria-hidden="true">
      {/* ambient glow */}
      <div className="pf-glow absolute left-1/2 top-[48%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric blur-[110px]" />

      <div className="absolute inset-0" style={{ perspective: 1400 }}>
        <div className="pf-tilt absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          <div className="pf-float absolute inset-0">
            {/* The scene sits on a diagonal like a hand-held moment */}
            <div className="absolute left-[150px] top-[40px] h-[480px] w-[270px]" style={{ transform: 'rotate(24deg) rotateX(12deg)', transformStyle: 'preserve-3d' }}>
              {/* receipt (prints out of the top slot) */}
              <div className="pf-receipt absolute left-1/2 w-[176px] -translate-x-1/2 overflow-hidden" style={{ bottom: 'calc(100% - 24px)', height: 0 }}>
                <div className="pf-receipt-inner absolute bottom-0 left-0 right-0 h-[170px] rounded-t-[4px] bg-[#FFFBF7] px-4 pt-4 text-ink shadow-xl">
                  <div className="text-center font-worksans text-[11px] font-bold tracking-[0.25em]">VANTERA PAY</div>
                  <div className="mt-1 text-center font-manrope text-[8px] uppercase tracking-[0.2em] text-muted">Card payment</div>
                  <div className="my-2 border-t border-dashed border-ink/20" />
                  <div className="flex justify-between font-manrope text-[9px] text-muted"><span>Card</span><span>•••• 4821</span></div>
                  <div className="mt-1 flex justify-between font-manrope text-[9px] text-muted"><span>Method</span><span>Contactless</span></div>
                  <div className="my-2 border-t border-dashed border-ink/20" />
                  <div className="flex items-baseline justify-between font-worksans">
                    <span className="text-[10px] font-semibold">TOTAL</span>
                    <span className="text-[16px] font-bold">{AMOUNT}</span>
                  </div>
                  <div className="mt-2 text-center font-manrope text-[9px] font-bold uppercase tracking-[0.2em] text-electric">Approved</div>
                </div>
              </div>

              {/* terminal body */}
              <div
                className="absolute inset-0 rounded-[42px] shadow-[0_60px_90px_-30px_rgba(0,0,0,.85),0_0_0_1px_rgba(255,255,255,.08)_inset,0_2px_0_rgba(255,255,255,.12)_inset]"
                style={{ background: 'linear-gradient(160deg,#3D2C22 0%,#26180F 38%,#170E09 75%,#0E0805 100%)' }}
              >
                {/* printer head + slot */}
                <div className="absolute inset-x-0 top-0 h-16 rounded-t-[42px] bg-gradient-to-b from-white/10 to-transparent" />
                <div className="absolute left-1/2 top-[18px] h-[6px] w-[188px] -translate-x-1/2 rounded-full bg-black/70 shadow-[0_1px_0_rgba(255,255,255,.12)]" />
                {/* side buttons */}
                <div className="absolute -right-[3px] top-28 h-14 w-[4px] rounded-r bg-[#2B1D14]" />

                {/* screen */}
                <div className="absolute inset-x-[14px] bottom-[70px] top-[52px] overflow-hidden rounded-[28px] bg-gradient-to-b from-[#FFF8F2] to-[#F3E2D6] shadow-[0_0_0_3px_#0B0604]">
                  {/* status bar */}
                  <div className="flex items-center justify-between px-5 pt-3 font-manrope text-[9px] font-semibold text-ink/60">
                    <span>VANTERA POS</span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" /> Online
                    </span>
                  </div>

                  {/* state 1 · ready */}
                  <div className="pf-s1 absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <span className="font-manrope text-[10px] uppercase tracking-[0.25em] text-muted">Total due</span>
                    <span className="mt-1 font-worksans text-[38px] font-bold leading-none tracking-tight text-ink">{AMOUNT}</span>
                    <div className="relative mt-8 grid h-20 w-20 place-items-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-electric/15" />
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-electric text-white shadow-lg shadow-electric/40">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M8.5 14.5a4 4 0 0 0 0-5" /><path d="M11.5 17a8 8 0 0 0 0-10" /><path d="M14.5 19.5a12 12 0 0 0 0-15" />
                        </svg>
                      </span>
                    </div>
                    <span className="mt-5 font-manrope text-[11px] font-semibold text-ink/70">Tap, insert or swipe</span>
                  </div>

                  {/* state 2 · processing */}
                  <div className="pf-s2 invisible absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
                    <svg viewBox="0 0 50 50" className="h-16 w-16 animate-spin [animation-duration:900ms]">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#F2611D" strokeOpacity=".15" strokeWidth="5" />
                      <path d="M25 5a20 20 0 0 1 20 20" fill="none" stroke="#F2611D" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                    <span className="mt-6 font-worksans text-[17px] font-bold text-ink">Processing</span>
                    <span className="mt-1 font-manrope text-[10px] text-muted">Securing transaction…</span>
                    <div className="mt-6 flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 font-manrope text-[9px] font-semibold text-ink/70">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                      Encrypted
                    </div>
                  </div>

                  {/* state 3 · approved */}
                  <div className="pf-s3 invisible absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
                    <div className="relative grid h-20 w-20 place-items-center">
                      <span className="pf-approved-ring absolute inset-0 rounded-full border-2 border-cyan-accent" />
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-electric to-cyan-accent shadow-lg shadow-electric/40">
                        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path className="pf-check" d="m6 12.5 4 4 8-9" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
                        </svg>
                      </span>
                    </div>
                    <span className="mt-6 font-worksans text-[19px] font-bold text-ink">Payment approved</span>
                    <span className="mt-1 font-worksans text-[26px] font-bold tracking-tight text-electric">{AMOUNT}</span>
                    <span className="mt-6 rounded-full bg-navy px-6 py-2 font-manrope text-[10px] font-semibold text-white">Done</span>
                  </div>
                </div>

                {/* bottom brand + indicator */}
                <div className="absolute inset-x-0 bottom-[26px] flex flex-col items-center gap-2">
                  <span className="font-worksans text-[10px] font-bold tracking-[0.35em] text-white/50">VANTERA</span>
                  <span className="h-[3px] w-16 rounded-full bg-white/20" />
                </div>
              </div>

              {/* NFC waves from the reader area */}
              <div className="pointer-events-none absolute left-[46%] top-[58%] -translate-x-1/2 -translate-y-1/2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="pf-wave absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-accent opacity-0" />
                ))}
              </div>

              {/* the card */}
              <div className="pf-card invisible absolute left-[-150px] top-[300px] opacity-0" style={{ transform: 'translateZ(40px)' }}>
                <VanteraCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* flat UI chips (not tilted) */}
      <div className="pf-toast invisible absolute right-0 top-[70px] flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-ink/60 px-4 py-3 opacity-0 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-electric to-cyan-accent">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 12.5 4 4 8-9" /></svg>
        </span>
        <div>
          <p className="font-manrope text-[12px] font-semibold text-white">Payment approved</p>
          <p className="font-manrope text-[11px] text-white/60">{AMOUNT} · Contactless</p>
        </div>
      </div>
    </div>
  )
}
