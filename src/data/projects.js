/**
 * ---------------------------------------------------------------------------
 * PROJECTS
 * ---------------------------------------------------------------------------
 * Add, remove or reorder projects here - the Work section and the case study
 * viewer both read from this file. Nothing else needs to change.
 *
 * Shape:
 *   title        string    Project name
 *   category     string    'Business Website' | 'Web Application' | 'Landing Page' | 'E-commerce'
 *   description  string    One or two sentences a non-technical client understands
 *   image        string    Path in /public (e.g. '/projects/my-project.webp')
 *   imageAlt     string    Describe the screenshot for screen readers and SEO
 *   technologies string[]  Short tags
 *   liveUrl      string    Public URL, or '' to hide the button
 *   githubUrl    string    Repository URL, or '' to hide the button
 *   featured     boolean   Featured cards get a highlighted border
 *   isPlaceholder boolean  Optional - shows a "Placeholder" badge on the card
 *   caseStudy    object    Optional - omit for a simple card with no case study
 *
 * --- Adding a case study -----------------------------------------------------
 * None of the projects below have one yet, because a case study needs facts
 * only you have: what the client's actual problem was, and what happened after
 * launch. Add this key to any project once you can answer those honestly:
 *
 *   caseStudy: {
 *     challenge: 'The problem the client came to you with.',
 *     solution:  'What you built, and the job it does for them.',
 *     approach:  ['Step one', 'Step two', 'Step three'],
 *     outcome:   ['Only real, verifiable results. Omit this key entirely
 *                  if you do not have any - the section simply will not render.'],
 *   }
 * ---------------------------------------------------------------------------
 */

export const projects = [
  {
    id: 'seloria',
    title: 'Seloria',
    category: 'E-commerce',
    description:
      'A complete online store built end to end — product pages, image handling and online payments through Razorpay, all managed from one system.',
    image: '/projects/seloria.webp',
    imageAlt:
      'Seloria online store homepage, an e-commerce site built with Next.js, MongoDB and Razorpay payments',
    technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Razorpay', 'Cloudinary'],
    liveUrl: 'https://www.getseloria.com/',
    githubUrl: 'https://github.com/Krunal-Chaudhari-0723/getseloria',
    featured: true,
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery App',
    category: 'Web Application',
    description:
      'A food ordering platform where customers browse restaurants, build a cart and place orders, with user accounts and an admin panel for managing the business side.',
    image: '/projects/food-delivery.webp',
    imageAlt:
      'Food delivery web application built on the MERN stack, showing the restaurant browsing screen',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://krunalchaudhari-fooddel-frontend.netlify.app/',
    githubUrl: 'https://github.com/Krunal-Chaudhari-0723/FoodDelivery',
    featured: true,
  },
  {
    id: 'jadoo-travels',
    title: 'Jadoo — Travels Website',
    category: 'Business Website',
    description:
      'A responsive tours and travel website for browsing destinations, packages and deals, with a modern interface that works from desktop down to mobile.',
    image: '/projects/jadoo-travels.webp',
    imageAlt:
      'Jadoo tours and travels website built with React and Tailwind CSS, showing destinations and services',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://lovely-stardust-c4a5fb.netlify.app/',
    githubUrl: 'https://github.com/Krunal-Chaudhari-0723/Technical-Task',
    featured: false,
  },
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio',
    category: 'Portfolio',
    description:
      'My own portfolio site: an animated introduction, a project showcase and a skills breakdown, with one clear path to getting in touch. The same approach suits any personal brand.',
    image: '/projects/developer-portfolio.webp',
    imageAlt:
      'krunalchaudhari.dev developer portfolio homepage, built with React, Vite and Framer Motion',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://www.krunalchaudhari.dev/',
    githubUrl: 'https://github.com/Krunal-Chaudhari-0723/krunalchaudhari.dev',
    featured: false,
  },
]

/** Filter chips above the grid. Derived from the data so they stay in sync. */
export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
]

/** True while every project on the site is still a placeholder. */
export const hasOnlyPlaceholderProjects = projects.every(
  (project) => project.isPlaceholder,
)
