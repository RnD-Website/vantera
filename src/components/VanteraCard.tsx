import { LogoMark } from './Logo'

/** VANTERA-branded contactless payment card (used in the hero payment flow). */
export function VanteraCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative h-[190px] w-[300px] overflow-hidden rounded-[18px] text-white shadow-[0_30px_60px_-15px_rgba(20,10,5,.75),0_0_0_1px_rgba(255,255,255,.12)_inset] ${className}`}
      style={{
        background:
          'radial-gradient(120% 140% at 0% 0%, #FF8A4C 0%, #F2611D 28%, #7A2A1A 58%, #1F1611 100%)',
      }}
      aria-hidden="true"
    >
      {/* fine guilloché lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 300 190" preserveAspectRatio="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M-20 ${150 - i * 14} C 80 ${90 - i * 14}, 200 ${210 - i * 14}, 320 ${120 - i * 14}`} fill="none" stroke="#fff" strokeWidth="0.6" />
        ))}
      </svg>
      {/* glow orb */}
      <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-cyan-accent/40 blur-2xl" />
      {/* moving sheen */}
      <div className="card-sheen absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <span className="font-worksans text-[13px] font-bold tracking-[0.22em]">VANTERA</span>
          </div>
          {/* contactless symbol */}
          <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 opacity-90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8.5 14.5a4 4 0 0 0 0-5" />
            <path d="M11.5 17a8 8 0 0 0 0-10" />
            <path d="M14.5 19.5a12 12 0 0 0 0-15" />
          </svg>
        </div>

        {/* EMV chip */}
        <div
          className="relative h-9 w-12 rounded-md"
          style={{ background: 'linear-gradient(135deg,#FBE7C2 0%,#D9AE6A 45%,#F5DCAA 60%,#C8954D 100%)' }}
        >
          <div className="absolute inset-[5px] rounded-[3px] border border-[#a8783c]/70" />
          <div className="absolute inset-x-[5px] top-1/2 h-px bg-[#a8783c]/70" />
          <div className="absolute inset-y-[5px] left-1/2 w-px bg-[#a8783c]/70" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-manrope text-[15px] font-semibold tracking-[0.18em]">•••• •••• •••• 4821</p>
            <p className="mt-1 font-manrope text-[10px] uppercase tracking-[0.2em] text-white/70">Business · Debit &nbsp; 08/29</p>
          </div>
          <span className="font-worksans text-[11px] font-bold italic tracking-wider text-white/90">PAY</span>
        </div>
      </div>
    </div>
  )
}
