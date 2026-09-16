import { ArrowUp, Mail } from 'lucide-react'
import siteConfig, {
  getEmailUrl,
  getWhatsAppDisplayNumber,
  getWhatsAppUrl,
  isEmailConfigured,
  isWhatsAppConfigured,
} from '../config/siteConfig'
import { footerServiceLinks, navLinks } from '../data/navigation'
import { handleAnchorClick, scrollToSection } from '../lib/scroll'
import { getSocialLinks } from '../lib/socialLinks'
import { WhatsappIcon } from './ui/BrandIcons'
import Button from './ui/Button'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const socialLinks = getSocialLinks()

  return (
    <footer className="border-t border-line bg-surface/40">
      {/* Closing call to action */}
      <div className="container-page border-b border-line py-14 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to start your project?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Tell me what you need and I&apos;ll come back with a clear plan
              and a quote — no obligation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg">
              Get a Free Quote
            </Button>
            {isWhatsAppConfigured && (
              <Button
                href={getWhatsAppUrl()}
                external
                variant="secondary"
                size="lg"
                icon={WhatsappIcon}
                iconPosition="left"
                animateIcon={false}
              >
                Chat on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="text-base font-bold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {siteConfig.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Building modern websites and web applications for businesses,
              startups and personal brands.
            </p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex gap-2">
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
            )}
          </div>

          {/* Navigation */}
          <FooterColumn title="Navigation">
            {navLinks.map((link) => (
              <li key={link.id}>
                <FooterLink href={`#${link.id}`} id={link.id}>
                  {link.label}
                </FooterLink>
              </li>
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Services">
            {footerServiceLinks.map((service) => (
              <li key={service.label}>
                <FooterLink href={`#${service.id}`} id={service.id}>
                  {service.label}
                </FooterLink>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            {isEmailConfigured && (
              <li>
                <a
                  href={getEmailUrl()}
                  className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{siteConfig.email}</span>
                </a>
              </li>
            )}

            {isWhatsAppConfigured && (
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <WhatsappIcon className="size-4" />
                  {getWhatsAppDisplayNumber()}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}

            <li className="text-sm text-muted">{siteConfig.location}</li>

            <li>
              <FooterLink href="#contact" id="contact">
                Get a Free Quote
              </FooterLink>
            </li>
          </FooterColumn>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs text-faint sm:text-left">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="group inline-flex items-center gap-2 rounded-lg text-xs font-medium text-faint transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, id, children }) {
  return (
    <a
      href={href}
      onClick={(event) => handleAnchorClick(event, id)}
      className="inline-block text-sm text-muted transition-colors hover:text-accent"
    >
      {children}
    </a>
  )
}
