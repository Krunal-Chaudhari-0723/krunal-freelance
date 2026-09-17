import { m } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { EASE, fadeUp, staggerContainer } from '../lib/motion'
import BrowserMockup from './BrowserMockup'
import Button from './ui/Button'

/** Short, scannable proof points under the calls to action. */
const trustLine = [
  'Fast',
  'Responsive',
  'SEO-Friendly',
  'Built for Your Business',
]

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Backdrop: faint dot grid fading out, plus a single soft accent bloom */}
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-20 h-[36rem] w-[64rem] -translate-x-1/2 opacity-70"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(240,180,41,0.10), transparent 70%)',
        }}
      />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
          {/* Copy */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.09)}
            className="max-w-2xl"
          >
            <m.p variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2/70 px-3.5 py-1.5 text-xs font-medium text-muted">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {siteConfig.availability}
              </span>
            </m.p>

            <m.h1
              id="hero-heading"
              variants={fadeUp}
              className="mt-6 text-[2.5rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.75rem]"
            >
              Websites That Help{' '}
              <span className="text-accent-gradient">Businesses Grow.</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              I&apos;m a freelance web developer building fast, modern and
              conversion-focused websites for businesses, startups and personal
              brands.
            </m.p>

            <m.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#contact" size="lg" icon={ArrowRight}>
                Get a Free Quote
              </Button>
              <Button href="#work" size="lg" variant="secondary" icon={Sparkles}>
                View My Work
              </Button>
            </m.div>

            <m.ul
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-faint"
            >
              {trustLine.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  <span>{item}</span>
                  {/* Separator trails its item so a wrap never starts a new
                      line with a stray dot. */}
                  {index < trustLine.length - 1 && (
                    <span
                      className="size-1 rounded-full bg-line-strong"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </m.ul>
          </m.div>

          {/* Product preview */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <BrowserMockup />
          </m.div>
        </div>
      </div>
    </section>
  )
}
