/**
 * ---------------------------------------------------------------------------
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * This is the only file you need to edit to personalise the site's identity,
 * contact details and links.
 *
 * Anything left as an empty string is treated as "not configured": the UI
 * degrades gracefully instead of rendering a broken link. Search this file for
 * `TODO` to find everything that still needs your real data.
 * ---------------------------------------------------------------------------
 */

const siteConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'Krunal Chaudhari',
  firstName: 'Krunal',
  title: 'Freelance Full Stack Web Developer',
  shortTitle: 'Freelance Developer',
  positioning:
    'I build modern websites and web applications for businesses, startups and personal brands.',
  // With `www`: the non-www host 301s here, so this is the canonical origin.
  domain: 'https://www.chaudharikrunal.me/',
  /**
   * Shown in About, Contact and the footer, and mirrored by
   * `addressLocality` / `addressRegion` in the JSON-LD in index.html.
   * A specific city is what makes local search work — "web developer in Surat"
   * is winnable in a way that "web developer in India" is not.
   */
  location: 'Surat, Gujarat',

  // Shown as the status pill in the hero. Keep it honest and keep it current.
  availability: 'Available for new projects',

  /**
   * Professional photo for the About section (file lives in /public).
   * Set this to '' to fall back to the abstract monogram panel instead.
   */
  photo: '/krunal-chaudhari.webp',

  /**
   * Small square avatar shown beside the wordmark in the navbar.
   * Crop it tight on the face — it renders at 36-40px, so a full headshot is
   * unreadable. Set to '' to show the wordmark on its own.
   */
  avatar: '/avatar-coder.svg',

  // --- Contact --------------------------------------------------------------
  // TODO: add your public business email (used for the mailto: fallback).
  email: '',

  /**
   * WhatsApp number in full international format, digits only.
   * '91' is the India country code, then the 10-digit number — no +, spaces
   * or dashes. Setting this switches on the floating chat button and every
   * WhatsApp CTA across the site.
   */
  whatsappNumber: '916351924667',

  // Prefilled first message for WhatsApp chats.
  whatsappDefaultMessage:
    "Hi Krunal, I found your website and I'd like to discuss a project.",

  /**
   * --- Social links ---------------------------------------------------------
   * Rendered in the contact card and the footer. An empty string is simply not
   * rendered, so there is never a dead icon.
   *
   * `github` is left empty on purpose: this site sells to business owners, who
   * do not read repositories. Paste the URL below to switch it on —
   * https://github.com/Krunal-Chaudhari-0723
   */
  social: {
    linkedin: 'https://www.linkedin.com/in/krunal-chaudhari-2b9ab5354/',
    instagram: 'https://www.instagram.com/krunalchaudhari.dev',
    facebook: 'https://www.facebook.com/krunalchaudhari.dev',
    github: '',
  },

  // --- SEO ------------------------------------------------------------------
  seo: {
    title: 'Krunal Chaudhari | Freelance Web Developer',
    description:
      'I build modern, fast and responsive websites and web applications for businesses, startups and personal brands.',
    // Relative to the site root. Replace with a 1200x630 PNG for best
    // compatibility across social platforms (see README).
    ogImage: '/og-image.svg',
  },

  /**
   * --- Contact form delivery ------------------------------------------------
   * The form is intentionally backend-free. Pick a provider, fill in the key,
   * and submissions start working — no other code changes required.
   *
   * provider: 'none' | 'web3forms' | 'formspree' | 'custom'
   *
   *  - 'web3forms' : create a free access key at https://web3forms.com
   *  - 'formspree' : create a form at https://formspree.io and paste the endpoint
   *  - 'custom'    : point `endpoint` at your own API route (expects JSON POST)
   *
   * While provider is 'none', the form validates normally but tells the visitor
   * honestly that submissions aren't connected yet and offers WhatsApp / email
   * instead. It never pretends a message was delivered.
   */
  contactForm: {
    provider: 'web3forms',
    /**
     * Web3Forms access keys are tied to your email address, not to a site, so
     * this is the same key the portfolio uses — no second key needed. Both
     * forms share one 250-submission/month quota on the free tier, and each
     * arrives under its own `subject` below so you can tell them apart.
     *
     * The key is public by design: Web3Forms works without a backend, so it
     * ships in the page source. That is expected, not a leak.
     */
    web3formsAccessKey: 'f259c3b2-790e-481a-a6a6-79af0fa56b73',
    formspreeEndpoint: '', // TODO: e.g. 'https://formspree.io/f/xxxxxxxx'
    customEndpoint: '', // TODO: e.g. '/api/contact'
    subject: 'New project enquiry from chaudharikrunal.me',
  },
}

/** True when a WhatsApp number has been configured. */
export const isWhatsAppConfigured = Boolean(siteConfig.whatsappNumber)

/** True when an email address has been configured. */
export const isEmailConfigured = Boolean(siteConfig.email)

/**
 * Builds a wa.me deep link with an optional prefilled message.
 * Falls back to the contact section when no number is configured, so WhatsApp
 * CTAs always lead somewhere useful.
 */
export function getWhatsAppUrl(message = siteConfig.whatsappDefaultMessage) {
  if (!isWhatsAppConfigured) return '#contact'
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Builds a mailto: link, or falls back to the contact section. */
export function getEmailUrl(subject = siteConfig.contactForm.subject) {
  if (!isEmailConfigured) return '#contact'
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
}

/** Human-readable WhatsApp number, e.g. '+91 98765 43210'. */
export function getWhatsAppDisplayNumber() {
  const digits = siteConfig.whatsappNumber
  if (!digits) return ''
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  return `+${digits}`
}

export default siteConfig
