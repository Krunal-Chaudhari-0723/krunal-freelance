import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react'
import { lazy, Suspense, useMemo, useState } from 'react'
import {
  hasOnlyPlaceholderProjects,
  projectCategories,
  projects,
} from '../data/projects'
import { EASE, fadeUp } from '../lib/motion'
import { GithubIcon } from './ui/BrandIcons'
import Button from './ui/Button'
import Section from './ui/Section'
import SectionHeading from './ui/SectionHeading'

// The dialog is only needed once someone opens a case study, so it ships in
// its own chunk instead of weighing down the first paint.
const CaseStudy = lazy(() => import('./CaseStudy'))

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openProject, setOpenProject] = useState(null)

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  )

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="Portfolio"
        title="Selected Work"
        subtitle="A selection of websites and applications I've built."
      />

      {/*
        Development-only reminder. Never shown to visitors in a production
        build — replace the entries in src/data/projects.js to clear it.
      */}
      {import.meta.env.DEV && hasOnlyPlaceholderProjects && (
        <p className="mx-auto mt-8 max-w-2xl rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-center text-sm text-muted">
          Every project here is a placeholder. Replace them in{' '}
          <code className="text-accent">src/data/projects.js</code> — this notice
          only appears during development.
        </p>
      )}

      {/* Category filter */}
      {projectCategories.length > 2 && (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {projectCategories.map((category) => {
            const isActive = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-line text-muted hover:border-line-strong hover:text-fg'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      )}

      {/*
        Grid.

        Each card runs its own `whileInView` rather than inheriting a variant
        from a parent group. That matters here because the list is filterable:
        a card mounted after the group's one-shot reveal has already fired would
        inherit the "hidden" variant and never animate out of it, leaving the
        grid blank after a filter change.
      */}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <AnimatePresence>
          {visibleProjects.map((project, index) => (
            <m.li
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              exit={{
                opacity: 0,
                scale: 0.97,
                transition: { duration: 0.2, ease: EASE },
              }}
              transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
            >
              <ProjectCard
                project={project}
                onOpenCaseStudy={() => setOpenProject(project)}
              />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Closing CTA — the natural moment to act after browsing the work */}
      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="text-muted">
          Want something like this built for your business?
        </p>
        <Button href="#contact" size="lg" icon={ArrowRight}>
          Get a Free Quote
        </Button>
      </div>

      <Suspense fallback={null}>
        <CaseStudy project={openProject} onClose={() => setOpenProject(null)} />
      </Suspense>
    </Section>
  )
}

function ProjectCard({ project, onOpenCaseStudy }) {
  return (
    <m.article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        // Featured work gets a subtly warmer border rather than a larger tile,
        // so the grid stays even at every breakpoint.
        project.featured
          ? 'border-accent/30 hover:border-accent/50'
          : 'border-line hover:border-line-strong'
      }`}
    >
      {/* Preview */}
      <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface-2">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width="960"
          height="600"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {project.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-md border border-accent/30 bg-canvas/85 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
            Placeholder
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {project.category}
        </p>

        <h3 className="mt-2.5 text-lg font-semibold leading-snug">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-faint"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
          {project.caseStudy && (
            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              <FileText className="size-4" aria-hidden="true" />
              Read Case Study
              <span className="sr-only"> for {project.title}</span>
            </button>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              View Project
              <span className="sr-only"> {project.title} (opens in a new tab)</span>
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="size-4" />
              GitHub
              <span className="sr-only">
                {' '}
                repository for {project.title} (opens in a new tab)
              </span>
            </a>
          )}

          {/* Placeholder cards have no links yet — say so plainly */}
          {!project.liveUrl && !project.githubUrl && !project.caseStudy && (
            <span className="text-sm text-faint">Links coming soon</span>
          )}
        </div>
      </div>
    </m.article>
  )
}
