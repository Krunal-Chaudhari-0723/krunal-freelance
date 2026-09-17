import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { getWhatsAppUrl } from '../config/siteConfig'
import { faqs } from '../data/faq'
import { EASE } from '../lib/motion'
import { WhatsappIcon } from './ui/BrandIcons'
import Button from './ui/Button'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'

/*
 * The FAQPage structured data for this section is injected into index.html at
 * build time by `faqSchemaPlugin` in vite.config.js, generated from this same
 * src/data/faq.js. That way crawlers see it without running JavaScript, and
 * there is still only one copy of the answers.
 */

export default function FAQ() {
  // Only one answer open at a time keeps the section short and scannable.
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <Section id="faq" labelledBy="faq-heading">
      <SectionHeading
        id="faq-heading"
        eyebrow="FAQ"
        title="Questions, Answered"
        subtitle="The things most people ask before starting a project."
      />

      <RevealGroup
        as="ul"
        stagger={0.05}
        className="mx-auto mt-12 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface"
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const buttonId = `${baseId}-q-${index}`
          const panelId = `${baseId}-a-${index}`

          return (
            <RevealItem as="li" key={faq.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-surface-2 sm:px-7"
                >
                  <span className="text-base font-semibold">{faq.question}</span>
                  <span
                    className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-accent/40 bg-accent/10 text-accent'
                        : 'border-line-strong text-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-7 sm:pr-16">
                      {faq.answer}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Reveal className="mt-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2/60 px-6 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted">
            Still have a question? Ask me directly no obligation.
          </p>
          <Button
            href={getWhatsAppUrl(
              'Hi Krunal, I have a question about a web project.',
            )}
            external={getWhatsAppUrl().startsWith('http')}
            variant="secondary"
            icon={WhatsappIcon}
            iconPosition="left"
            animateIcon={false}
            className="shrink-0"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
