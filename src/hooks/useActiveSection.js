import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can show an active
 * state. A section counts as active while it crosses the vertical middle of
 * the viewport, which matches what a reader perceives as "where I am".
 *
 * @param {string[]} sectionIds Ids to watch, in document order.
 * @returns {string} The id of the active section.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const visible = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        // Pick the first visible section in document order.
        const next = sectionIds.find((id) => visible.has(id))
        if (next) setActiveId(next)
      },
      // Only the section crossing the middle of the viewport intersects.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    // At the very bottom of the page the final section may be too short to
    // reach the middle line, so highlight it explicitly.
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      if (atBottom) setActiveId(sectionIds[sectionIds.length - 1])
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  return activeId
}
