/**
 * Pricing packages. `startingAt` is deliberately a starting point, never a
 * final quote - the disclaimer under the cards says so explicitly.
 *
 * `projectType` and `budget` preselect the matching options in the contact
 * form when a visitor clicks a plan's call to action.
 */
export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    startingAt: '₹4,999',
    priceNote: 'Starting at',
    bestFor: 'Landing pages, personal websites and simple one-page sites.',
    features: [
      'Responsive design across devices',
      'Essential sections built around your content',
      'Clear contact call-to-action',
      'Deployment support',
    ],
    cta: 'Get Started',
    popular: false,
    projectType: 'Landing Page',
    budget: '₹5,000 – ₹10,000',
  },
  {
    id: 'business',
    name: 'Business',
    startingAt: '₹8,999',
    priceNote: 'Starting at',
    bestFor:
      'Small businesses, local businesses and professional service websites.',
    features: [
      'Custom design built around your brand',
      'Multiple sections or pages',
      'Responsive design across devices',
      'Basic SEO setup',
      'Contact form integration',
      'Deployment and handover',
    ],
    cta: 'Get Started',
    popular: true,
    badge: 'Most Popular',
    projectType: 'Business Website',
    budget: '₹10,000 – ₹20,000',
  },
  {
    id: 'custom',
    name: 'Custom',
    startingAt: '₹15,000+',
    priceNote: 'Starting at',
    bestFor: 'Advanced websites, online stores and custom web applications.',
    features: [
      'Scoped to your specific requirements',
      'Advanced functionality',
      'API integrations where required',
      'Deployment and environment setup',
      'Post-launch support',
    ],
    cta: 'Discuss Your Project',
    popular: false,
    projectType: 'Web Application',
    budget: '₹20,000+',
  },
]

export const pricingNote =
  'Final pricing depends on project requirements, functionality and scope. Every quote is prepared after we discuss what you actually need.'
