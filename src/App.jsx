import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Projects from './components/Projects'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Testimonials from './components/Testimonials'
import TrustStrip from './components/TrustStrip'
import WhatsAppButton from './components/WhatsAppButton'
import WhyWorkWithMe from './components/WhyWorkWithMe'
import { scrollToSection } from './lib/scroll'

export default function App() {
  /**
   * Set when a visitor clicks a service or pricing CTA, so the contact form
   * opens with the right project type and budget already selected. A fresh
   * object each time re-applies the selection even for repeat clicks.
   */
  const [quotePrefill, setQuotePrefill] = useState(null)

  const handleRequestQuote = useCallback((prefill) => {
    setQuotePrefill({ ...prefill })
    scrollToSection('contact')
  }, [])

  return (
    // LazyMotion with the `m` components ships only the animation and gesture
    // features this site actually uses, roughly halving the motion bundle.
    // `strict` fails loudly if a plain `motion.*` component ever sneaks back in.
    <LazyMotion features={domAnimation} strict>
      {/* Disables every animation for visitors whose system asks for reduced
          motion, without needing a second set of components. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only z-[70] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <TrustStrip />
          <Services onRequestQuote={handleRequestQuote} />
          <WhyWorkWithMe />
          <Projects />
          <Pricing onRequestQuote={handleRequestQuote} />
          <Process />
          <About />
          <TechStack />
          <Testimonials />
          <FAQ />
          <Contact prefill={quotePrefill} />
        </main>

        <Footer />
        <WhatsAppButton />
      </MotionConfig>
    </LazyMotion>
  )
}
