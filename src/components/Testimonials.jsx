import { Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

/**
 * Renders real client testimonials from src/data/testimonials.js.
 * While that list is empty it shows an honest placeholder instead of invented
 * quotes, names, companies or photos.
 */
export default function Testimonials() {
  const hasTestimonials = testimonials.length > 0

  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Testimonials"
        title="What Clients Say"
        subtitle={
          hasTestimonials
            ? 'In their words, from projects I have delivered.'
            : undefined
        }
      />

      {hasTestimonials ? (
        <RevealGroup
          as="ul"
          stagger={0.08}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <RevealItem
              as="li"
              key={`${testimonial.name}-${testimonial.quote.slice(0, 24)}`}
              className="h-full"
            >
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <Reveal className="mt-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface/60 px-6 py-12 text-center sm:px-10">
            <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
              <Quote className="size-5" aria-hidden="true" />
            </span>

            <p className="mt-6 text-lg font-semibold">
              Client testimonials coming soon.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              I would rather show nothing here than publish a review that
              isn&apos;t real. As projects wrap up and clients agree to be
              quoted, their words will appear in this space.
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  )
}

function TestimonialCard({ testimonial }) {
  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface-2">
      <Quote className="size-6 text-accent/60" aria-hidden="true" />

      <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
        <p>{testimonial.quote}</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-10 shrink-0 rounded-full border border-line object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-elevated text-sm font-semibold text-accent"
          >
            {initials}
          </span>
        )}

        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-fg">
            {testimonial.name}
          </span>
          {testimonial.role && (
            <span className="block truncate text-xs text-faint">
              {testimonial.role}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
