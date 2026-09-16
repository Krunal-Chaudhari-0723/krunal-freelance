import siteConfig from '../config/siteConfig'

/**
 * ---------------------------------------------------------------------------
 * CONTACT FORM DELIVERY
 * ---------------------------------------------------------------------------
 * There is no backend here, and nothing pretends there is one. Pick a provider
 * in src/config/siteConfig.js and submissions start working immediately.
 *
 * Adding another provider means adding one case to `submitContactForm` below.
 * ---------------------------------------------------------------------------
 */

/** True when a delivery provider is configured with the credential it needs. */
export function isContactFormConfigured() {
  const { provider, web3formsAccessKey, formspreeEndpoint, customEndpoint } =
    siteConfig.contactForm

  switch (provider) {
    case 'web3forms':
      return Boolean(web3formsAccessKey)
    case 'formspree':
      return Boolean(formspreeEndpoint)
    case 'custom':
      return Boolean(customEndpoint)
    default:
      return false
  }
}

/** Human-readable labels for the payload sent to the inbox. */
const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'WhatsApp / Phone',
  company: 'Business / Company',
  projectType: 'Project Type',
  budget: 'Budget',
  message: 'Message',
}

/** Builds a readable plain-text body, used by providers that email the result. */
function buildMessageBody(values) {
  return Object.entries(FIELD_LABELS)
    .map(([key, label]) => `${label}: ${values[key] || '—'}`)
    .join('\n')
}

async function submitToWeb3Forms(values) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: siteConfig.contactForm.web3formsAccessKey,
      subject: siteConfig.contactForm.subject,
      from_name: values.name,
      replyto: values.email,
      ...values,
      message: buildMessageBody(values),
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Web3Forms rejected the submission.')
  }
}

async function submitToFormspree(values) {
  const response = await fetch(siteConfig.contactForm.formspreeEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: siteConfig.contactForm.subject,
      _replyto: values.email,
      ...values,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Formspree rejected the submission.')
  }
}

async function submitToCustomEndpoint(values) {
  const response = await fetch(siteConfig.contactForm.customEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }
}

/**
 * Sends an enquiry using the configured provider.
 *
 * @param {object} values       The validated form values.
 * @param {string} [honeypot]   Hidden field value; a non-empty value means a bot.
 * @returns {Promise<{ ok: boolean, reason?: 'unconfigured' }>}
 * @throws  {Error} When the provider is configured but the request fails.
 *
 * To use EmailJS instead: `npm i @emailjs/browser`, add an 'emailjs' case here
 * calling `emailjs.send(serviceId, templateId, values, publicKey)`, and extend
 * `isContactFormConfigured` with the same keys.
 */
export async function submitContactForm(values, honeypot = '') {
  // Silently drop bot submissions without telling the bot anything useful.
  if (honeypot) return { ok: true }

  if (!isContactFormConfigured()) {
    return { ok: false, reason: 'unconfigured' }
  }

  switch (siteConfig.contactForm.provider) {
    case 'web3forms':
      await submitToWeb3Forms(values)
      break
    case 'formspree':
      await submitToFormspree(values)
      break
    case 'custom':
      await submitToCustomEndpoint(values)
      break
    default:
      return { ok: false, reason: 'unconfigured' }
  }

  return { ok: true }
}

/**
 * Turns the form values into a WhatsApp-friendly summary, used by the fallback
 * CTA so an enquiry is never lost when delivery is not configured.
 */
export function buildEnquirySummary(values) {
  const lines = ['Hi Krunal, I would like to discuss a project.', '']
  if (values.name) lines.push(`Name: ${values.name}`)
  if (values.company) lines.push(`Business: ${values.company}`)
  if (values.projectType) lines.push(`Project type: ${values.projectType}`)
  if (values.budget) lines.push(`Budget: ${values.budget}`)
  if (values.message) lines.push('', values.message)
  return lines.join('\n')
}
