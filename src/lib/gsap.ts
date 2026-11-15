import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Motion tokens — shared easing & timing so every section moves with the same language.
export const EASE = {
  out: 'power4.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  soft: 'power2.out',
} as const

export const DUR = { fast: 0.45, base: 0.8, slow: 1.2 } as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
