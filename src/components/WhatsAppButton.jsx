import { AnimatePresence, m } from 'framer-motion'
import { getWhatsAppUrl, isWhatsAppConfigured } from '../config/siteConfig'
import { useScrolled } from '../hooks/useScrolled'
import { EASE } from '../lib/motion'
import { WhatsappIcon } from './ui/BrandIcons'

/**
 * Floating WhatsApp chat button.
 *
 * Appears once the visitor has scrolled past the hero — where the hero's own
 * CTAs are already on screen, it would only compete with them.
 *
 * Renders nothing at all until a WhatsApp number is set in siteConfig, so it
 * can never become a dead link.
 */
export default function WhatsAppButton() {
  const scrolled = useScrolled(560)

  if (!isWhatsAppConfigured) {
    if (import.meta.env.DEV) {
      console.info(
        '[siteConfig] WhatsApp button hidden: set `whatsappNumber` in src/config/siteConfig.js to enable it.',
      )
    }
    return null
  }

  return (
    <AnimatePresence>
      {scrolled && (
        <m.a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-[#06281a] shadow-lift transition-colors hover:bg-[#2ee377] sm:bottom-6 sm:right-6"
        >
          <span className="inline-flex size-14 items-center justify-center">
            <WhatsappIcon className="size-6" />
          </span>

          {/* Label expands on hover on pointer devices; the icon alone is
              enough on touch, where space is tighter. */}
          <span className="hidden max-w-0 whitespace-nowrap text-sm font-semibold transition-[max-width,padding] duration-300 ease-out group-hover:max-w-[12rem] group-hover:pr-5 group-focus-visible:max-w-[12rem] group-focus-visible:pr-5 sm:inline-block">
            Chat on WhatsApp
          </span>
        </m.a>
      )}
    </AnimatePresence>
  )
}
