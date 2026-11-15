import type { ReactNode, AnchorHTMLAttributes } from 'react'

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Text that rolls upward on hover (duplicated label inside an overflow mask). */
function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'outline' | 'outlineLight' | 'white'
  size?: 'md' | 'lg'
  arrow?: boolean
}

const variants = {
  primary:
    'bg-brand-gradient text-white shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/35',
  outline: 'border border-ink/15 text-ink hover:border-electric hover:text-electric',
  outlineLight: 'border border-white/25 text-white hover:border-cyan-accent hover:text-cyan-accent',
  white: 'bg-white text-electric shadow-lg shadow-black/10 hover:shadow-xl',
}

export function Button({ variant = 'primary', size = 'md', arrow = true, className = '', children, ...rest }: BtnProps) {
  const sizing = size === 'lg' ? 'px-8 py-4 text-lg' : 'px-7 py-3.5 text-base'
  return (
    <a
      {...rest}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-manrope font-semibold transition-[box-shadow,border-color,color,transform] duration-300 active:scale-[0.98] ${sizing} ${variants[variant]} ${className}`}
    >
      <RollText>{children}</RollText>
      {arrow && (
        <span className="relative flex h-4 w-4 overflow-hidden">
          <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-5" />
          <ArrowIcon className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-0" />
        </span>
      )}
    </a>
  )
}

export function SectionLabel({ children, className = '', light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-manrope text-sm font-semibold uppercase tracking-[0.2em] md:text-base ${
        light ? 'text-cyan-accent' : 'text-electric'
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-cyan-accent' : 'bg-electric'}`} />
      {children}
    </span>
  )
}

/** Splits a string into word spans (wrapped in masks) for GSAP reveals. */
export function SplitWords({ text, className = '', wordClass = 'split-word' }: { text: string; className?: string; wordClass?: string }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span className={`inline-block will-change-transform ${wordClass}`}>{w}</span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
