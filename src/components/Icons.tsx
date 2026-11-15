import type { SolutionIcon, HighlightIcon } from '../data/content'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, pathLength: 1, className: 'draw' }

/** Large line illustrations for the solution cards (paths animate with a stroke "draw"). */
export function SolutionArt({ name, className = '' }: { name: SolutionIcon; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {name === 'banking' && (
        <g>
          <rect x="34" y="14" width="44" height="86" rx="8" {...S} />
          <path d="M50 22h12" {...S} />
          <rect x="41" y="32" width="30" height="20" rx="3" {...S} />
          <path d="M45 60h22M45 68h14M45 76h18" {...S} />
          <circle cx="56" cy="91" r="3" {...S} />
          <path d="M84 40c8 4 12 10 12 18s-4 14-12 18M90 30c12 6 18 16 18 28s-6 22-18 28" {...S} />
        </g>
      )}
      {name === 'payments' && (
        <g>
          <rect x="14" y="34" width="62" height="40" rx="6" {...S} />
          <path d="M14 46h62M24 62h18" {...S} />
          <rect x="60" y="48" width="40" height="58" rx="7" {...S} />
          <rect x="67" y="56" width="26" height="16" rx="2" {...S} />
          <path d="M70 82h4M78 82h4M86 82h4M70 90h4M78 90h4M86 90h4M70 98h20" {...S} />
          <path d="M92 20c4 3 6 7 6 11M100 14c6 5 9 11 9 18" {...S} />
        </g>
      )}
      {name === 'atm' && (
        <g>
          <path d="M26 108V20a6 6 0 0 1 6-6h56a6 6 0 0 1 6 6v88" {...S} />
          <rect x="36" y="24" width="48" height="30" rx="3" {...S} />
          <path d="M42 62h8M54 62h8M66 62h8M42 70h8M54 70h8M66 70h8M42 78h8M54 78h8M66 78h8" {...S} />
          <path d="M80 62h4v16h-4zM36 88h48M44 96h32M18 108h84" {...S} />
        </g>
      )}
      {name === 'software' && (
        <g>
          <rect x="12" y="20" width="96" height="64" rx="6" {...S} />
          <path d="M12 32h96M20 26h2M26 26h2M32 26h2" {...S} />
          <path d="M24 72l14-16 12 8 16-22 14 12 16-14" {...S} />
          <path d="M44 100h32M60 84v16" {...S} />
          <circle cx="66" cy="42" r="3" {...S} />
        </g>
      )}
      {name === 'security' && (
        <g>
          <path d="M60 10 98 24v30c0 26-16 44-38 56C38 98 22 80 22 54V24z" {...S} />
          <rect x="44" y="52" width="32" height="26" rx="4" {...S} />
          <path d="M50 52v-8a10 10 0 0 1 20 0v8M60 62v6" {...S} />
          <path d="M34 32l26-10 26 10" {...S} />
        </g>
      )}
      {name === 'infrastructure' && (
        <g>
          <rect x="18" y="14" width="40" height="92" rx="4" {...S} />
          <path d="M24 28h28M24 42h28M24 56h28M24 70h28M24 84h28M28 98h4" {...S} />
          <rect x="70" y="40" width="34" height="34" rx="4" {...S} />
          <circle cx="87" cy="57" r="7" {...S} />
          <path d="M58 30h20v10M58 92h29V74M87 40V20" {...S} />
          <circle cx="87" cy="16" r="4" {...S} />
        </g>
      )}
    </svg>
  )
}

export function HighlightGlyph({ name, className = 'h-10 w-10' }: { name: HighlightIcon; className?: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {name === 'reliable' && <path d="M6 30h28M10 30V14l10-6 10 6v16M16 30v-8h8v8M14 18h12" {...p} />}
      {name === 'intelligent' && (
        <g {...p}>
          <rect x="11" y="11" width="18" height="18" rx="3" />
          <path d="M16 6v5M24 6v5M16 29v5M24 29v5M6 16h5M6 24h5M29 16h5M29 24h5M16 20h8" />
        </g>
      )}
      {name === 'secure' && (
        <g {...p}>
          <path d="M20 5 32 9v9c0 8-5 14-12 17C13 32 8 26 8 18V9z" />
          <path d="m15 19 4 4 7-8" />
        </g>
      )}
      {name === 'connected' && (
        <g {...p}>
          <circle cx="20" cy="20" r="4" />
          <circle cx="8" cy="10" r="3" />
          <circle cx="32" cy="10" r="3" />
          <circle cx="8" cy="30" r="3" />
          <circle cx="32" cy="30" r="3" />
          <path d="m10.5 12 6.5 5.5M29.5 12 23 17.5M10.5 28l6.5-5.5M29.5 28 23 22.5" />
        </g>
      )}
    </svg>
  )
}

/** Fictional partner marks — simple geometric placeholders, not real institutions. */
export function PartnerMark({ mark }: { mark: string }) {
  const c = 'currentColor'
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      {mark === 'hex' && <path d="M16 3 27 9.5v13L16 29 5 22.5v-13z" fill="none" stroke={c} strokeWidth="2.4" />}
      {mark === 'arc' && <path d="M5 24a11 11 0 0 1 22 0M10 24a6 6 0 0 1 12 0" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" />}
      {mark === 'stack' && <path d="M4 10h24M8 16h16M12 22h8" stroke={c} strokeWidth="3" strokeLinecap="round" />}
      {mark === 'diamond' && <path d="M16 3 29 16 16 29 3 16zM16 10l6 6-6 6-6-6z" fill="none" stroke={c} strokeWidth="2.2" />}
      {mark === 'ring' && (
        <g fill="none" stroke={c} strokeWidth="2.4">
          <circle cx="12" cy="16" r="8" />
          <circle cx="20" cy="16" r="8" />
        </g>
      )}
      {mark === 'chevron' && <path d="m5 9 11 8 11-8M5 17l11 8 11-8" fill="none" stroke={c} strokeWidth="2.6" strokeLinejoin="round" />}
      {mark === 'wing' && <path d="M3 22C9 10 19 6 29 6c-4 4-6 9-7 16H3z" fill={c} />}
      {mark === 'grid' && (
        <g fill={c}>
          <rect x="4" y="4" width="10" height="10" rx="2" />
          <rect x="18" y="4" width="10" height="10" rx="5" />
          <rect x="4" y="18" width="10" height="10" rx="5" />
          <rect x="18" y="18" width="10" height="10" rx="2" />
        </g>
      )}
    </svg>
  )
}
