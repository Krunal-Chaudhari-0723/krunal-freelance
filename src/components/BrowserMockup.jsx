import { m } from 'framer-motion'
import { Lock } from 'lucide-react'
import { heroShowcase } from '../data/heroShowcase'
import { EASE } from '../lib/motion'

/**
 * The hero's product preview: a real project shown inside a browser window,
 * with a phone frame beside it showing the same site responsively.
 *
 * The frames are drawn in markup (so they stay sharp and re-theme with the
 * accent); only the screenshots inside them are images. Swap the project in
 * src/data/heroShowcase.js.
 */
export default function BrowserMockup() {
  return (
    <div className="relative">
      {/* Soft accent bloom behind the window */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(45% 45% at 70% 25%, rgba(240,180,41,0.16), transparent 70%)',
        }}
      />

      {/* Browser window */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-lift"
      >
        {/* Chrome */}
        <div
          aria-hidden="true"
          className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3"
        >
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex max-w-[16rem] items-center gap-1.5 truncate rounded-md bg-canvas/70 px-3 py-1 text-[0.65rem] text-faint">
              <Lock className="size-2.5 shrink-0" />
              <span className="truncate">{heroShowcase.url}</span>
            </div>
          </div>
          <div className="flex w-10 justify-end">
            <span className="h-0.5 w-3 rounded-full bg-line-strong" />
          </div>
        </div>

        {/*
          Above the fold, so this loads eagerly at high priority rather than
          lazily — it is the largest element in the viewport on desktop.
        */}
        <img
          src={heroShowcase.desktopImage}
          alt={heroShowcase.alt}
          width={heroShowcase.desktopWidth}
          height={heroShowcase.desktopHeight}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block w-full"
        />
      </m.div>

      {/* Phone frame, overlapping the window to show the same site on mobile */}
      <m.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 20, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        className="absolute -bottom-10 -left-7 hidden w-[6.5rem] overflow-hidden rounded-[1.25rem] border border-line-strong bg-surface p-1.5 shadow-lift sm:block lg:-left-20 lg:w-32"
      >
        <img
          src={heroShowcase.mobileImage}
          alt=""
          width={heroShowcase.mobileWidth}
          height={heroShowcase.mobileHeight}
          loading="eager"
          decoding="async"
          className="block w-full rounded-[0.9rem]"
        />
      </m.div>

      {/*
        Quiet proof that this is real work rather than a stock template.
        Sits below the window and right-aligned, clear of the phone frame on
        the left and of whatever the screenshot itself has in its corners.
      */}
      {heroShowcase.label && (
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
          className="mt-5 flex items-center justify-end gap-2 text-xs text-faint"
        >
          <span className="size-1 rounded-full bg-accent/70" aria-hidden="true" />
          {heroShowcase.label}
        </m.p>
      )}
    </div>
  )
}
