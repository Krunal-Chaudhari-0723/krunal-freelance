import { useEffect, useState } from 'react'

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used to compact the navbar and reveal its background blur.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return scrolled
}
