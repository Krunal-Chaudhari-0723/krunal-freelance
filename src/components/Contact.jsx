import {
  AlertCircle,
  CircleCheck,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { useRef, useState } from 'react'
import siteConfig, {
  getEmailUrl,
  getWhatsAppDisplayNumber,
  getWhatsAppUrl,
  isEmailConfigured,
  isWhatsAppConfigured,
} from '../config/siteConfig'
import { budgetRanges, projectTypes } from '../data/contactOptions'
import {
  buildEnquirySummary,
  isContactFormConfigured,
  submitContactForm,
} from '../lib/contactForm'
import { getSocialLinks } from '../lib/socialLinks'
import { WhatsappIcon } from './ui/BrandIcons'
import Button from './ui/Button'
import Field from './ui/Field'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
}

/** Minimal, forgiving validation — enough to catch mistakes, not to nag. */
function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please tell me a little more about your project.'
  }

  return errors
}

/**
 * @param {object} props
 * @param {{ projectType?: string, budget?: string, key?: number }} props.prefill
 *   Set when a visitor arrives from a service or pricing CTA.
 */
export default function Contact({ prefill }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  // 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const honeypotRef = useRef(null)
  const formConfigured = isContactFormConfigured()
  const socialLinks = getSocialLinks()

  // Apply a preselection coming from a service or pricing card. Adjusting
  // state during render (rather than in an effect) is React's recommended
  // pattern for reacting to a changed prop, and avoids a second render pass.
  const [appliedPrefill, setAppliedPrefill] = useState(null)
  if (prefill && prefill !== appliedPrefill) {
    setAppliedPrefill(prefill)
    setValues((current) => ({
      ...current,
      ...(prefill.projectType ? { projectType: prefill.projectType } : null),
      ...(prefill.budget ? { budget: prefill.budget } : null),
    }))
    if (status === 'success') setStatus('idle')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current,
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so keyboard users aren't stranded.
      const firstField = Object.keys(nextErrors)[0]
      document
        .querySelector(`[name="${firstField}"]`)
        ?.focus({ preventScroll: false })
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const result = await submitContactForm(
        values,
        honeypotRef.current?.value ?? '',
      )

      if (result.ok) {
        setStatus('success')
        setValues(EMPTY_FORM)
      } else {
        // Delivery isn't set up — say so plainly rather than faking a send.
        setStatus('unconfigured')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong while sending your message.',
      )
    }
  }

  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Have a Project in Mind?"
        subtitle="Tell me what you're building, what you need and your approximate budget. I'll get back to you with the next steps."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        {/* Direct contact details */}
        <Reveal className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <h3 className="text-base font-semibold">Prefer to talk directly?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Message me and we can discuss your project before you commit to
              anything.
            </p>

            <div className="mt-6 space-y-3">
              {isWhatsAppConfigured && (
                <ContactRow
                  icon={WhatsappIcon}
                  label="WhatsApp"
                  value={getWhatsAppDisplayNumber()}
                  href={getWhatsAppUrl()}
                  external
                />
              )}

              {isEmailConfigured && (
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={siteConfig.email}
                  href={getEmailUrl()}
                />
              )}

              <ContactRow
                icon={MapPin}
                label="Location"
                value={`${siteConfig.location} — working with clients remotely`}
              />
            </div>

            {isWhatsAppConfigured && (
              <Button
                href={getWhatsAppUrl()}
                external
                variant="whatsapp"
                size="lg"
                icon={WhatsappIcon}
                iconPosition="left"
                animateIcon={false}
                className="mt-6 w-full"
              >
                Chat on WhatsApp
              </Button>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                  Elsewhere
                </p>
                <ul className="mt-3 flex gap-2">
                  {socialLinks.map(({ id, label, href, Icon }) => (
                    <li key={id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-surface-2/50 p-6 text-sm leading-relaxed text-muted sm:p-7">
            <p className="font-medium text-fg">What happens next?</p>
            <ol className="mt-3 space-y-2">
              <li>1. I read your enquiry and reply with any questions.</li>
              <li>2. We agree the scope on a short call or over chat.</li>
              <li>3. You get a clear quote and timeline before work starts.</li>
            </ol>
          </div>
        </Reveal>

        {/* Enquiry form */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            {status === 'success' ? (
              <SuccessPanel onReset={() => setStatus('idle')} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot: hidden from people and screen readers, tempting to bots */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto size-px overflow-hidden"
                >
                  <label htmlFor="company-website">
                    Leave this field empty
                  </label>
                  <input
                    ref={honeypotRef}
                    id="company-website"
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required error={errors.name}>
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    )}
                  </Field>

                  <Field
                    label="Email"
                    name="email"
                    required
                    error={errors.email}
                  >
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                      />
                    )}
                  </Field>

                  <Field label="WhatsApp / Phone" name="phone">
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 00000 00000"
                        value={values.phone}
                        onChange={handleChange}
                      />
                    )}
                  </Field>

                  <Field label="Business / Company" name="company">
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        type="text"
                        autoComplete="organization"
                        placeholder="Your business name"
                        value={values.company}
                        onChange={handleChange}
                      />
                    )}
                  </Field>

                  <Field label="Project Type" name="projectType">
                    {(fieldProps) => (
                      <select
                        {...fieldProps}
                        value={values.projectType}
                        onChange={handleChange}
                      >
                        <option value="">Select a project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field label="Budget" name="budget">
                    {(fieldProps) => (
                      <select
                        {...fieldProps}
                        value={values.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select a budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field
                    label="Message"
                    name="message"
                    required
                    error={errors.message}
                    className="sm:col-span-2"
                    hint="What are you building, and what should it do for your business?"
                  >
                    {(fieldProps) => (
                      <textarea
                        {...fieldProps}
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={values.message}
                        onChange={handleChange}
                        className={`${fieldProps.className} resize-y`}
                      />
                    )}
                  </Field>
                </div>

                {status === 'error' && (
                  <StatusPanel tone="error" icon={AlertCircle}>
                    <p className="font-medium text-fg">
                      Your message could not be sent.
                    </p>
                    <p className="mt-1">{errorMessage}</p>
                    <FallbackActions values={values} />
                  </StatusPanel>
                )}

                {status === 'unconfigured' && (
                  <StatusPanel tone="warning" icon={AlertCircle}>
                    <p className="font-medium text-fg">
                      This form isn&apos;t connected yet.
                    </p>
                    <p className="mt-1">
                      Nothing was sent, so please reach me directly using the
                      options below — your details are still filled in above.
                    </p>
                    <FallbackActions values={values} />
                  </StatusPanel>
                )}

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    icon={status === 'submitting' ? LoaderCircle : Send}
                    iconPosition="left"
                    animateIcon={false}
                    className={`w-full sm:w-auto ${
                      status === 'submitting' ? '[&_svg]:animate-spin' : ''
                    }`}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Get My Free Quote'}
                  </Button>

                  <p className="text-xs leading-relaxed text-faint">
                    No spam, no sales calls. Your details are only used to reply
                    to this enquiry.
                  </p>
                </div>

                {/* Visible only while developing, never in a production build */}
                {import.meta.env.DEV && !formConfigured && (
                  <p className="mt-5 rounded-lg border border-accent/25 bg-accent/5 px-4 py-3 text-xs leading-relaxed text-muted">
                    <strong className="text-accent">Setup needed:</strong> set{' '}
                    <code>contactForm.provider</code> and the matching key in{' '}
                    <code>src/config/siteConfig.js</code> to start receiving
                    these enquiries.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function ContactRow({ icon: Icon, label, value, href, external = false }) {
  const content = (
    <>
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-faint">{label}</span>
        <span className="block truncate text-sm text-fg">{value}</span>
      </span>
    </>
  )

  if (!href) {
    return <div className="flex items-center gap-3">{content}</div>
  }

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80"
    >
      {content}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

function StatusPanel({ tone, icon: Icon, children }) {
  const tones = {
    error: 'border-danger/30 bg-danger/5 text-muted',
    warning: 'border-accent/30 bg-accent/5 text-muted',
  }

  return (
    <div
      role="alert"
      className={`mt-6 flex gap-3 rounded-xl border px-4 py-4 text-sm leading-relaxed ${tones[tone]}`}
    >
      <Icon
        className={`mt-0.5 size-4 shrink-0 ${
          tone === 'error' ? 'text-danger' : 'text-accent'
        }`}
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/** Escape hatches so an enquiry is never lost when delivery fails or is unset. */
function FallbackActions({ values }) {
  const summary = buildEnquirySummary(values)
  const hasDirectChannel = isWhatsAppConfigured || isEmailConfigured

  if (!hasDirectChannel) {
    return (
      <p className="mt-3 text-xs">
        No direct contact channel is configured yet either — add an email
        address or WhatsApp number in{' '}
        <code>src/config/siteConfig.js</code>.
      </p>
    )
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {isWhatsAppConfigured && (
        <Button
          href={getWhatsAppUrl(summary)}
          external
          size="sm"
          variant="whatsapp"
          icon={WhatsappIcon}
          iconPosition="left"
          animateIcon={false}
        >
          Send on WhatsApp
        </Button>
      )}
      {isEmailConfigured && (
        <Button
          href={`${getEmailUrl()}&body=${encodeURIComponent(summary)}`}
          size="sm"
          variant="secondary"
          icon={Mail}
          iconPosition="left"
          animateIcon={false}
        >
          Send by Email
        </Button>
      )}
    </div>
  )
}

function SuccessPanel({ onReset }) {
  return (
    <div
      className="flex flex-col items-center py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-success/30 bg-success/10 text-success">
        <CircleCheck className="size-7" aria-hidden="true" />
      </span>

      <h3 className="mt-6 text-xl font-bold">Thanks — your message is in.</h3>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        I&apos;ve received your enquiry and will get back to you with the next
        steps. If it&apos;s urgent, WhatsApp is the fastest way to reach me.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {isWhatsAppConfigured && (
          <Button
            href={getWhatsAppUrl()}
            external
            variant="whatsapp"
            icon={WhatsappIcon}
            iconPosition="left"
            animateIcon={false}
          >
            Chat on WhatsApp
          </Button>
        )}
        <Button variant="secondary" onClick={onReset}>
          Send another message
        </Button>
      </div>
    </div>
  )
}
