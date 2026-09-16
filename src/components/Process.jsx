import { ArrowRight } from 'lucide-react'
import { processSteps } from '../data/process'
import Button from './ui/Button'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'

export default function Process() {
  return (
    <Section id="process" labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="Process"
        title="From Idea to Launch"
        subtitle="Four straightforward steps, so you always know what happens next."
      />

      <RevealGroup
        as="ol"
        stagger={0.1}
        className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {/* Connecting line, desktop only */}
        <div
          aria-hidden="true"
          className="divider-fade absolute inset-x-0 top-12 hidden lg:block"
        />

        {processSteps.map(({ step, icon: Icon, title, description }) => (
          <RevealItem as="li" key={step} className="relative h-full">
            <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-elevated text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span
                  className="text-3xl font-extrabold text-fg/15 transition-colors duration-300 group-hover:text-accent/25"
                  aria-hidden="true"
                >
                  {step}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                <span className="sr-only">Step {step}: </span>
                {title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button href="#contact" size="lg" icon={ArrowRight}>
          Start a Project
        </Button>
      </div>
    </Section>
  )
}
