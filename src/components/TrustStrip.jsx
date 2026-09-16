import { trustPoints } from '../data/trust'
import { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * Compact value strip between the hero and the services section.
 * Deliberately minimal: icons and labels, no claims that need proving.
 */
export default function TrustStrip() {
  return (
    <section
      aria-label="What every project includes"
      className="relative border-y border-line bg-surface/40"
    >
      <div className="container-page py-8 sm:py-10">
        <RevealGroup
          as="ul"
          stagger={0.05}
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {trustPoints.map(({ icon: Icon, label }) => (
            <RevealItem
              as="li"
              key={label}
              className="flex items-center gap-3 sm:flex-col sm:gap-2.5 sm:text-center"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-muted">{label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
