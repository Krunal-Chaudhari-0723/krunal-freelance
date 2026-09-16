import { ArrowRight, Globe2, MessageSquare, MapPin } from 'lucide-react'
import siteConfig, { getWhatsAppUrl } from '../config/siteConfig'
import { WhatsappIcon } from './ui/BrandIcons'
import Button from './ui/Button'
import Section from './ui/Section'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

/** Short, verifiable facts — not a resume, not a statistics wall. */
const quickFacts = [
  { icon: MapPin, label: `Based in ${siteConfig.location}` },
  { icon: Globe2, label: 'Working with clients remotely' },
  { icon: MessageSquare, label: 'You talk directly to the developer' },
]

export default function About() {
  return (
    // overflow-hidden keeps the portrait's blurred bloom from spilling past the
    // viewport and creating sideways scroll on narrow screens.
    <Section id="about" labelledBy="about-heading" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
              About
            </span>

            <h2
              id="about-heading"
              className="mt-4 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
            >
              Hi, I&apos;m {siteConfig.firstName}.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m a Full Stack Web Developer focused on building modern,
                responsive and practical websites and web applications.
              </p>
              <p>
                I work with businesses, startups and individuals who want a
                professional presence on the web without unnecessary complexity
                — clear scope, clear communication, and a website that does its
                job.
              </p>
            </div>
          </Reveal>

          <RevealGroup as="ul" stagger={0.07} className="mt-8 space-y-3">
            {quickFacts.map(({ icon: Icon, label }) => (
              <RevealItem
                as="li"
                key={label}
                className="flex items-center gap-3 text-sm text-fg"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" icon={ArrowRight}>
              Get a Free Quote
            </Button>
            <Button
              href={getWhatsAppUrl()}
              external={getWhatsAppUrl().startsWith('http')}
              variant="secondary"
              icon={WhatsappIcon}
              iconPosition="left"
              animateIcon={false}
            >
              Chat on WhatsApp
            </Button>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal className="order-first lg:order-none">
          {siteConfig.photo ? <Portrait /> : <AbstractPortrait />}
        </Reveal>
      </div>
    </Section>
  )
}

/** Framed portrait, used whenever `siteConfig.photo` is set. */
function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      {/* Soft accent bloom, matching the hero's treatment */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(45% 45% at 50% 30%, rgba(240,180,41,0.16), transparent 70%)',
        }}
      />

      <img
        src={siteConfig.photo}
        alt={`${siteConfig.name}, ${siteConfig.title}`}
        width="880"
        height="1100"
        loading="lazy"
        decoding="async"
        className="aspect-4/5 w-full rounded-2xl border border-line-strong object-cover shadow-lift"
      />
    </div>
  )
}

/**
 * Stand-in used when no photo is configured: a monogram panel built from the
 * site's own design language. Honest by construction — it never suggests a
 * portrait exists.
 */
function AbstractPortrait() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface shadow-card lg:max-w-none"
    >
      <div className="grid-backdrop absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 30% 15%, rgba(240,180,41,0.16), transparent 70%)',
        }}
      />

      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[6rem] font-extrabold leading-none tracking-tighter text-fg/10 sm:text-[7rem]">
          KC
        </span>
      </div>

      {/* Framing rules */}
      <div className="absolute inset-6 rounded-xl border border-line-strong/60" />
      <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-fg">{siteConfig.name}</p>
          <p className="mt-1 text-xs text-faint">{siteConfig.title}</p>
        </div>
        <span className="rounded-md border border-line bg-canvas/70 px-2 py-1 text-[0.65rem] text-faint backdrop-blur-sm">
          chaudharikrunal.me
        </span>
      </div>
    </div>
  )
}
