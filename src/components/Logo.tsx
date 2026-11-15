type Props = { className?: string; tone?: 'dark' | 'light'; showWord?: boolean }

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vt-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2611D" />
          <stop offset="1" stopColor="#FFB067" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="#1F1611" />
      <path d="M10.5 12.5h7.6l5.9 15.2 5.9-15.2h7.6L27.9 36h-7.8z" fill="url(#vt-mark)" />
      <path d="M24 27.7 29.9 12.5h7.6L32 26.6z" fill="#fff" opacity=".18" />
    </svg>
  )
}

export function Logo({ className = '', tone = 'dark', showWord = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />
      {showWord && (
        <span
          className={`font-worksans text-[1.35rem] font-bold tracking-[0.18em] ${
            tone === 'dark' ? 'text-navy' : 'text-white'
          }`}
        >
          VANTERA
        </span>
      )}
    </span>
  )
}
