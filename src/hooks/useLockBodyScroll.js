import { useEffect } from 'react'

/**
 * Prevents the page behind an open overlay (mobile menu, case study dialog)
 * from scrolling, compensating for the scrollbar width so the layout doesn't
 * shift sideways when it disappears.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}
