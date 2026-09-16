import { techStack } from '../data/techStack'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * Deliberately understated and placed late in the page: clients decide on
 * outcomes, but some want to know what their site is actually built on.
 */
export default function TechStack() {
  return (
    <Section
      id="tech"
      labelledBy="tech-heading"
      className="border-y border-line bg-surface/30 !py-16 sm:!py-20"
    >
      <SectionHeading
        id="tech-heading"
        eyebrow="Technology"
        title="Built With Modern Technology"
        subtitle="Reliable, widely-supported tools — so your website is maintainable by any competent developer, not just by me."
      />

      <RevealGroup
        as="ul"
        stagger={0.04}
        className="mt-10 flex flex-wrap justify-center gap-2.5"
      >
        {techStack.map((tech) => (
          <RevealItem as="li" key={tech.name}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent/40 hover:text-fg">
              <span
                className="size-1.5 rounded-full bg-accent/60"
                aria-hidden="true"
              />
              {tech.name}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
