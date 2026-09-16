import {
  Building2,
  LayoutDashboard,
  RefreshCw,
  ShoppingBag,
  Target,
  Wrench,
} from 'lucide-react'

/**
 * Services shown in the "How I Can Help Your Business" section.
 * `cta` is the button label; every card links to the contact section with the
 * project type preselected via `projectType`.
 */
export const services = [
  {
    id: 'business-websites',
    icon: Building2,
    title: 'Business Websites',
    description:
      'Professional websites designed to establish credibility and help customers understand what your business does.',
    points: [
      'Company websites',
      'Service businesses',
      'Local businesses',
      'Personal brands',
    ],
    cta: 'Build My Website',
    projectType: 'Business Website',
  },
  {
    id: 'landing-pages',
    icon: Target,
    title: 'Landing Pages',
    description:
      'Focused, high-converting landing pages built around a single clear action you want visitors to take.',
    points: ['Products', 'Campaigns', 'Services', 'Startups'],
    cta: 'Build a Landing Page',
    projectType: 'Landing Page',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-commerce Websites',
    description:
      'Modern online stores with a clean shopping experience that works as well on a phone as on a desktop.',
    points: [
      'Product pages',
      'Shopping experience',
      'Responsive design',
      'Payment integration where required',
    ],
    cta: 'Start My Store',
    projectType: 'E-commerce',
  },
  {
    id: 'web-applications',
    icon: LayoutDashboard,
    title: 'Custom Web Applications',
    description:
      'For businesses that need more than a website — software built around how your team actually works.',
    points: [
      'Dashboards',
      'Admin panels',
      'Booking systems',
      'Internal business tools',
    ],
    cta: 'Discuss My Idea',
    projectType: 'Web Application',
  },
  {
    id: 'redesign',
    icon: RefreshCw,
    title: 'Website Redesign',
    description:
      'Turn an outdated website into a modern, responsive experience without losing what already works.',
    points: [
      'Better interface',
      'Better mobile experience',
      'Better performance',
      'Better structure',
    ],
    cta: 'Redesign My Website',
    projectType: 'Website Redesign',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & Optimization',
    description:
      'Ongoing support so your website keeps working properly long after launch day.',
    points: [
      'Content updates',
      'Bug fixes',
      'Performance improvements',
      'Basic SEO & technical upkeep',
    ],
    cta: 'Get Support',
    projectType: 'Maintenance',
  },
]
