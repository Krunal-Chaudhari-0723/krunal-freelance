import {
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
 * @returns {Array<{ id: string, label: string, href: string, Icon: Function }>}
 */
export function getSocialLinks() {
  const links = [
    {
      id: 'github',
      label: 'GitHub',
      href: siteConfig.social.github,
      Icon: GithubIcon,
    },
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
      id: 'whatsapp',
      label: 'WhatsApp',
      href: isWhatsAppConfigured ? getWhatsAppUrl() : '',
      Icon: WhatsappIcon,
    },
  ]

  return links.filter((link) => Boolean(link.href))
}
