import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '../components/ui/BrandIcons'
import siteConfig, {
  getWhatsAppUrl,
  isWhatsAppConfigured,
} from '../config/siteConfig'

/**
 * Social links, built from siteConfig and filtered down to the ones that are
 * actually configured — an unset profile is never rendered as a dead link.
 *
 * Order is deliberate: the professional profile first, then the social ones,
 * with WhatsApp last since it is the channel that actually starts a
 * conversation and already has its own buttons everywhere.
 *
 * @returns {Array<{ id: string, label: string, href: string, Icon: Function }>}
 */
export function getSocialLinks() {
  const links = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: siteConfig.social.linkedin,
      Icon: LinkedinIcon,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: siteConfig.social.instagram,
      Icon: InstagramIcon,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: siteConfig.social.facebook,
      Icon: FacebookIcon,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: siteConfig.social.github,
      Icon: GithubIcon,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: isWhatsAppConfigured ? getWhatsAppUrl() : '',
      Icon: WhatsappIcon,
    },
  ]

  return links.filter((link) => Boolean(link.href))
}
