import Reveal from './Reveal'

/**
 * Section eyebrow + H2 + supporting line.
 * `id` is referenced by the section's aria-labelledby, keeping every section a
 * properly labelled landmark.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = 'center',
  className = '',
}) {
  const alignment =
    align === 'left'
      ? 'text-left items-start'
      : 'text-center items-center mx-auto'

  return (
    <Reveal
      className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
          {eyebrow}
        </span>
      )}

      <h2
        id={id}
        className="text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
