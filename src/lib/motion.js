/**
 * Shared Framer Motion variants.
 *
 * Motion is deliberately restrained: short distances, short durations, one
 * easing curve. `<MotionConfig reducedMotion="user">` in App.jsx disables all
 * of it for visitors who ask their OS for reduced motion.
 */

/** A single easing curve used everywhere, so movement feels consistent. */
export const EASE = [0.21, 0.47, 0.32, 0.98]

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

/**
 * Parent variant that reveals children one after another.
 * @param {number} stagger Seconds between children.
 * @param {number} delay   Seconds before the first child.
 */
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/**
 * Standard `whileInView` viewport config: animate once, slightly before the
 * element is fully on screen.
 */
export const viewportOnce = { once: true, amount: 0.15, margin: '0px 0px -60px' }
