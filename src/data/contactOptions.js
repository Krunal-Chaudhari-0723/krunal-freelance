/**
 * Options for the contact form's two select fields.
 *
 * These exact strings are also referenced by `projectType` / `budget` in
 * src/data/services.js and src/data/pricing.js, which preselect them when a
 * visitor clicks a service or pricing call to action. Keep them in sync.
 */

export const projectTypes = [
  'Business Website',
  'Landing Page',
  'E-commerce',
  'Web Application',
  'Website Redesign',
  'Maintenance',
  'Other',
]

export const budgetRanges = [
  'Under ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹20,000',
  '₹20,000+',
  'Not sure yet',
]
