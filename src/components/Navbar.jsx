import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import siteConfig from '../config/siteConfig'
import { navLinks } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { useScrolled } from '../hooks/useScrolled'
import { EASE } from '../lib/motion'
import { handleAnchorClick, scrollToSection } from '../lib/scroll'
import Button from './ui/Button'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(24)

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), [])
  const activeId = useActiveSection(sectionIds)

  useLockBodyScroll(menuOpen)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Escape closes the mobile menu, and returning to a desktop width does too,
  // so the menu can never be left open behind the desktop layout.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onBreakpointChange = (event) => {
      if (event.matches) closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpointChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpointChange)
    }
  }, [menuOpen, closeMenu])

  const handleNavClick = (event, id) => {
    handleAnchorClick(event, id)
    closeMenu()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/*
        Below xl the bar is a simple two-item row (brand + hamburger). From xl
        it becomes a three-column grid with equal side columns, so the links sit
        on the true centre of the viewport — with flex `justify-between` they
        drift by half the difference between the brand and CTA widths.

        The desktop bar starts at xl rather than lg because the brand block,
        seven links and the CTA leave only ~18px of breathing room at 1024px.
        Tablets in landscape get the mobile menu instead, which has the space
        to show every link properly.
      */}
      <nav
        aria-label="Main"
        className={`container-page flex items-center justify-between transition-all duration-300 xl:grid xl:grid-cols-[1fr_auto_1fr] ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, 'home')}
          className="group flex min-w-0 items-center gap-3 xl:justify-self-start"
        >
          {siteConfig.avatar && (
            <img
              src={siteConfig.avatar}
              alt=""
              width="120"
              height="120"
              /* Shrinks with the bar as it compacts on scroll. */
              className={`shrink-0 rounded-full object-cover ring-1 ring-accent/40 transition-all duration-300 group-hover:ring-accent/70 ${
                scrolled ? 'size-9' : 'size-10'
              }`}
            />
          )}

          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[0.95rem] font-bold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-base">
              {siteConfig.name}
            </span>
            <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted sm:block">
              {siteConfig.shortTitle}
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 xl:flex xl:justify-self-center">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => handleNavClick(event, link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                  {/* Underline for the section currently in view */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden xl:block xl:justify-self-end">
          <Button href="#contact" size="sm">
            Get a Quote
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <Button
            href="#contact"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={closeMenu}
          >
            Get a Quote
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong text-fg transition-colors hover:border-accent/50 hover:bg-surface-2"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const isActive = activeId === link.id
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(event) => handleNavClick(event, link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-surface-2 text-fg'
                        : 'text-muted hover:bg-surface-2 hover:text-fg'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="size-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                )
              })}

              <Button
                size="lg"
                className="mt-3 w-full"
                onClick={() => {
                  closeMenu()
                  scrollToSection('contact')
                }}
              >
                Get a Free Quote
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
