import { useCallback, useEffect, useMemo, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type Direction = 'up' | 'down'

const breakpoints: Record<Breakpoint, string> = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 40rem)',
  md: '(min-width: 48rem)',
  lg: '(min-width: 64rem)',
  xl: '(min-width: 80rem)',
  '2xl': '(min-width: 96rem)'
}

/**
 * Usage:
 * const currentBreakpoint = useMediaQuery().get(). Returns 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 *
 * const isMobile = useMediaQuery().is('sm')
 *
 * const isMdOrBigger = useMediaQuery().is('md', 'up'). Inclusive of md
 *
 * const isMdOrSmaller = useMediaQuery().is('md', 'down'). Inclusive of md
 */
export const useMediaQuery = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>()

  useEffect(() => {
    const checkBreakpoint = () => {
      const breakpointEntries = Object.entries(breakpoints)
      for (let i = breakpointEntries.length - 1; i >= 0; i--) {
        const [key, query] = breakpointEntries[i]
        if (window.matchMedia(query).matches) {
          setCurrentBreakpoint(key as Breakpoint)
          break
        }
      }
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  /**
   * Usage:
   */
  const is = useCallback(
    (breakpoint: Breakpoint, direction?: Direction) => {
      if (!currentBreakpoint) {
        return undefined
      }

      const breakpointIndex = Object.keys(breakpoints).indexOf(breakpoint)
      const currentIndex = Object.keys(breakpoints).indexOf(currentBreakpoint)

      if (!direction) {
        return currentBreakpoint === breakpoint
      }

      if (direction === 'up') {
        return currentIndex >= breakpointIndex
      }

      return currentIndex <= breakpointIndex
    },
    [currentBreakpoint]
  )

  const isMobile = useMemo(() => is('sm', 'down'), [is])

  const get = useCallback(
    (): Breakpoint | undefined => currentBreakpoint,
    [currentBreakpoint]
  )

  return { is, isMobile, get }
}
