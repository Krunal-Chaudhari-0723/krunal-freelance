import { m } from 'framer-motion'
import { EASE, fadeUp, staggerContainer, viewportOnce } from '../../lib/motion'

/**
 * Reveals its children once, as they scroll into view.
 * Honours `prefers-reduced-motion` through <MotionConfig> in App.jsx.
 */
export default function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className = '',
  as = 'div',
  ...rest
}) {
  const Component = m[as] ?? m.div

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      // A bare `transition` prop replaces the variant's own transition, so the
      // duration and easing are restated here rather than lost to defaults.
      transition={delay ? { duration: 0.55, ease: EASE, delay } : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * Reveals a list of children one after another. Each child should be wrapped
 * in <RevealItem> (or any element using the `fadeUp` variant).
 *
 * Use this for STATIC lists only. The reveal is one-shot (`once: true`), and
 * children inherit their animation state from this parent — so a child mounted
 * after the reveal has fired stays stuck on the "hidden" variant and never
 * appears. For a list that changes at runtime (filtering, pagination, async
 * data), give each item its own `whileInView` instead; see Projects.jsx.
 */
export function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  className = '',
  as = 'div',
  ...rest
}) {
  const Component = m[as] ?? m.div

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delay)}
      {...rest}
    >
      {children}
    </Component>
  )
}

/** A single child inside <RevealGroup>. */
export function RevealItem({
  children,
  className = '',
  as = 'div',
  variants = fadeUp,
  ...rest
}) {
  const Component = m[as] ?? m.div

  return (
    <Component className={className} variants={variants} {...rest}>
      {children}
    </Component>
  )
}
