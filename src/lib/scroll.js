/** True when the visitor has asked their system for reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smoothly scrolls to a section by id and moves keyboard focus there, so the
 * jump works for mouse, touch and keyboard users alike.
 *
 * Vertical offset for the sticky navbar comes from `scroll-padding-top` in
 * index.css rather than manual pixel maths.
 *
 * @param {string} id Section id, with or without a leading '#'.
 */
export function scrollToSection(id) {
  if (typeof document === 'undefined') return
  const targetId = id.startsWith('#') ? id.slice(1) : id
  const element = document.getElementById(targetId)
  if (!element) return

  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  // Focus the section without a second scroll jump, then restore its natural
  // tab behaviour so it never becomes a stop in the tab order.
  const hadTabIndex = element.hasAttribute('tabindex')
  if (!hadTabIndex) element.setAttribute('tabindex', '-1')
  element.focus({ preventScroll: true })
  if (!hadTabIndex) {
    element.addEventListener(
      'blur',
      () => element.removeAttribute('tabindex'),
      { once: true },
    )
  }

  // Keep the URL shareable without triggering the browser's own jump.
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', `#${targetId}`)
  }
}

/**
 * Click handler for in-page anchor links. Keeps the href intact so the link
 * still works without JavaScript and on middle-click.
 */
export function handleAnchorClick(event, id) {
  // Let modified clicks (new tab, download, etc.) behave normally.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
    return
  }
  event.preventDefault()
  scrollToSection(id)
}
