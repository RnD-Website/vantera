import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from './gsap'

/**
 * Scoped GSAP context with automatic cleanup (reverts tweens + ScrollTriggers on unmount).
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context, mm: gsap.MatchMedia) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const mm = gsap.matchMedia()
    const ctx = gsap.context((self) => setup(self, mm), scope.current)
    return () => {
      mm.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
