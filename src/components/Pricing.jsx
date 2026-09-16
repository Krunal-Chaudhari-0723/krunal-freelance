import { Check, Info } from 'lucide-react'
import { pricingNote, pricingPlans } from '../data/pricing'
import Button from './ui/Button'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * @param {object} props
 * @param {(prefill: { projectType: string, budget: string }) => void} props.onRequestQuote
 */
export default function Pricing({ onRequestQuote }) {
  return (
    <Section
      id="pricing"
      labelledBy="pricing-heading"
      className="border-y border-line bg-surface/30"
    >
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="Choose a starting point and we'll tailor the project around your requirements."
      />

      <RevealGroup
        as="ul"
        stagger={0.09}
        className="mt-14 grid items-start gap-5 lg:grid-cols-3 lg:gap-6"
      >
        {pricingPlans.map((plan) => (
          <RevealItem as="li" key={plan.id} className="h-full">
            <article
              className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 sm:p-8 ${
                plan.popular
                  ? 'border-accent/40 bg-surface-2 shadow-lift lg:-mt-4 lg:pb-10'
                  : 'border-line bg-surface hover:border-line-strong hover:bg-surface-2'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                {plan.name}
              </h3>

              <p className="mt-5 flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-faint">
                  {plan.priceNote}
                </span>
                <span className="mt-1 text-4xl font-extrabold tracking-tight">
                  {plan.startingAt}
                </span>
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {plan.bestFor}
              </p>

              <div
                className="divider-fade my-7"
                role="presentation"
                aria-hidden="true"
              />

              <ul className="flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.popular ? 'primary' : 'secondary'}
                className="mt-8 w-full"
                onClick={() =>
                  onRequestQuote({
                    projectType: plan.projectType,
                    budget: plan.budget,
                  })
                }
              >
                {plan.cta}
                <span className="sr-only"> with the {plan.name} package</span>
              </Button>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Honest pricing disclaimer — starting prices are not final quotes */}
      <Reveal className="mt-10">
        <p className="mx-auto flex max-w-2xl items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
          <Info
            className="mt-0.5 size-4 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>{pricingNote}</span>
        </p>
      </Reveal>
    </Section>
  )
}
