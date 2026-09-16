import { ArrowRight, Check } from 'lucide-react'
import { services } from '../data/services'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * @param {object} props
 * @param {(prefill: { projectType: string }) => void} props.onRequestQuote
 *   Scrolls to the contact form with this service preselected.
 */
export default function Services({ onRequestQuote }) {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow="Services"
        title="How I Can Help Your Business"
        subtitle="From landing pages to complete web applications, I build solutions around your goals — not around a template."
      />

      <RevealGroup
        as="ul"
        stagger={0.07}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <RevealItem as="li" key={service.id} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2 hover:shadow-lift sm:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-elevated text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-faint"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-accent/70"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    onRequestQuote({ projectType: service.projectType })
                  }
                  className="mt-7 inline-flex items-center gap-2 self-start rounded-lg text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  {service.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> — opens the contact form</span>
                </button>
              </article>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
