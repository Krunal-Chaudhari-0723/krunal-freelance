import { benefits } from '../data/benefits'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * Benefit-led reasons to hire, deliberately written without statistics —
 * no client counts, no percentages, nothing that cannot be backed up.
 */
export default function WhyWorkWithMe() {
  return (
    <Section
      id="why"
      labelledBy="why-heading"
      className="border-y border-line bg-surface/30"
    >
      <SectionHeading
        id="why-heading"
        eyebrow="Why Me"
        title="Why Businesses Choose to Work With Me"
        subtitle="What you actually get when you hand your website to one developer instead of an agency pipeline."
      />

      <RevealGroup
        as="ul"
        stagger={0.06}
        className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {benefits.map(({ icon: Icon, title, description }) => (
          <RevealItem
            as="li"
            key={title}
            className="group bg-canvas p-7 transition-colors duration-300 hover:bg-surface-2 sm:p-8"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-105">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
