import { AnimatePresence, m } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { EASE } from '../lib/motion'
import { GithubIcon } from './ui/BrandIcons'
import Button from './ui/Button'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Case study dialog: The Challenge / The Solution / The Approach, plus an
 * optional Outcome that only renders when a project actually has real,
 * verifiable results recorded in src/data/projects.js.
 *
 * @param {object} props
 * @param {object|null} props.project Project to display, or null when closed.
 * @param {() => void} props.onClose
 */
export default function CaseStudy({ project, onClose }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useLockBodyScroll(Boolean(project))

  useEffect(() => {
    if (!project) return

    previouslyFocused.current = document.activeElement
    // Move focus into the dialog so screen readers and keyboards follow along.
    const frame = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector(FOCUSABLE)
      ;(first ?? panelRef.current)?.focus()
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Keep Tab cycling inside the dialog while it is open.
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          {/* Backdrop */}
          <m.button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
          />

          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface shadow-lift sm:max-h-[88vh] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-line bg-surface-2/60 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {project.category}
                </p>
                <h2
                  id="case-study-title"
                  className="mt-2 text-xl font-bold sm:text-2xl"
                >
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto overscroll-contain p-5 sm:p-6">
              {project.isPlaceholder && (
                <p className="mb-6 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-muted">
                  This is a placeholder case study showing the structure. Replace
                  it with a real project in{' '}
                  <code className="text-accent">src/data/projects.js</code>.
                </p>
              )}

              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-line bg-surface-2"
              />

              <p className="mt-6 text-base leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-8 space-y-8">
                <CaseStudyBlock
                  label="The Challenge"
                  body={project.caseStudy.challenge}
                />
                <CaseStudyBlock
                  label="The Solution"
                  body={project.caseStudy.solution}
                />

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    The Approach
                  </h3>
                  <ol className="mt-4 space-y-3">
                    {project.caseStudy.approach.map((step, index) => (
                      <li key={step} className="flex gap-3.5">
                        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-xs font-semibold text-accent">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Only rendered when real, measurable results exist */}
                {project.caseStudy.outcome?.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                      The Outcome
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {project.caseStudy.outcome.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    Built With
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-line bg-surface-2/60 p-5 sm:p-6">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  external
                  icon={ArrowUpRight}
                  size="sm"
                >
                  View Project
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  external
                  variant="secondary"
                  size="sm"
                  icon={GithubIcon}
                  iconPosition="left"
                  animateIcon={false}
                >
                  GitHub
                </Button>
              )}
              <Button
                href="#contact"
                variant={project.liveUrl ? 'outline' : 'primary'}
                size="sm"
                onClick={onClose}
                className="ms-auto"
              >
                Start a Similar Project
              </Button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function CaseStudyBlock({ label, body }) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
        {label}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </section>
  )
}
