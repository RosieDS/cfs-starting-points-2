import { debounce } from 'lodash'
import { useState, useEffect, useMemo } from 'react'

/**
 * Show a skeleton loading animation when the data is loading, whilst avoiding flicker for short loading times.
 * @param loading - The loading state of the data
 * @param showThreshold - The delay before showing the skeleton loading animation
 * @param minVisibleDuration - The minimum amount of time to keep the skeleton loading animation shown
 * @returns The loading state of the data
 */
export function useSkeletonLoading({
  loading,
  showThreshold = 100, // delay before showing
  minVisibleDuration = 200, // how long to keep it shown
  initShow = false
}: {
  loading: boolean
  showThreshold?: number // delay before showing
  minVisibleDuration?: number // how long to keep it shown
  initShow?: boolean
}) {
  const [showSkeleton, setShowSkeleton] = useState(initShow)

  const debouncedShow = useMemo(
    () =>
      debounce(() => {
        setShowSkeleton(true)
      }, showThreshold),
    [showThreshold]
  )

  const debouncedHide = useMemo(
    () =>
      debounce(() => {
        setShowSkeleton(false)
      }, minVisibleDuration),
    [minVisibleDuration]
  )

  useEffect(() => {
    if (loading) {
      debouncedHide.cancel()
      debouncedShow()
    } else {
      debouncedShow.cancel()
      debouncedHide()
    }

    return () => {
      debouncedShow.cancel()
      debouncedHide.cancel()
    }
  }, [loading, debouncedShow, debouncedHide])

  return showSkeleton
}
