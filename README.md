# chaudharikrunal.me

Freelance client-acquisition website for **Krunal Chaudhari**, Freelance Full
Stack Web Developer.

Built with React + Vite + Tailwind CSS v4 + Framer Motion + Lucide.
JavaScript only, no TypeScript, no backend.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # ESLint
```

---

## 1. Fill in your details first

Everything personal lives in **`src/config/siteConfig.js`**. Search it for
`TODO` — these are the only values that must be filled in before launch:

| Field                           | What it does                                                 |
| ------------------------------- | ------------------------------------------------------------ |
| `email`                         | Powers the email link and the "send by email" fallback        |
| `whatsappNumber`                | Powers every WhatsApp CTA and the floating chat button        |
| `social.github` / `.linkedin` / `.instagram` | Footer and contact social icons              |
| ~~`photo`~~                     | Done — About-section portrait is set                          |
| `contactForm.*`                 | Where enquiries get delivered (see section 3)                 |

**Nothing is faked when a value is missing.** Unset social links are not
rendered, the floating WhatsApp button stays hidden until a number exists, and
WhatsApp CTAs fall back to the contact form. Fill them in and the UI switches on
by itself.

`whatsappNumber` must be digits only, in full international format —
for India: `919876543210` (country code `91`, no `+`, spaces or dashes).

---

## 2. Add your real content

| What              | Where                          | Notes                                                        |
| ----------------- | ------------------------------ | ------------------------------------------------------------ |
| Projects          | `src/data/projects.js`         | Three real projects, imported from krunalchaudhari.dev         |
| Testimonials      | `src/data/testimonials.js`     | Empty on purpose; the section shows an honest "coming soon"   |
| Services          | `src/data/services.js`         |                                                               |
| Pricing           | `src/data/pricing.js`          |                                                               |
| Process / FAQ     | `src/data/process.js`, `faq.js`| FAQ also generates the FAQPage structured data automatically  |
| Tech badges       | `src/data/techStack.js`        |                                                               |
| Nav / footer menu | `src/data/navigation.js`       |                                                               |
| Form dropdowns    | `src/data/contactOptions.js`   | Keep in sync with `projectType` / `budget` in the data above  |

### The projects

Three real projects are live in `src/data/projects.js`, carried over from
krunalchaudhari.dev with descriptions rewritten for a business audience:

| Project              | Category         | Live                  |
| -------------------- | ---------------- | --------------------- |
| Seloria              | E-commerce       | getseloria.com        |
| Food Delivery App    | Web Application  | Netlify               |
| Jadoo — Travels      | Business Website | Netlify               |

Screenshots were pulled from the old site and converted to WebP
(3.0 MB → 189 KB total).

To add another project:

1. Put a screenshot in `public/projects/` (WebP, ~1600px wide).
2. Add an entry with `image: '/projects/your-file.webp'` and a descriptive
   `imageAlt`.
3. Add a `caseStudy` object if you want a "Read Case Study" button on the card.

Setting `isPlaceholder: true` on an entry marks it with a "Placeholder" badge,
and a reminder banner appears in the Work section **during development only**
while every project is a placeholder.

> **Case studies aren't filled in yet.** They need two things only you know:
> what problem the client actually came to you with, and what happened after
> launch. `src/data/projects.js` has a ready-to-paste template. The `outcome`
> key is optional — omit it unless you have real, verifiable results, and the
> section simply won't render.

---

## 3. Connecting the contact form

The form is fully built and validated but has no backend. Until you configure a
provider it tells visitors honestly that submissions aren't connected and offers
WhatsApp / email instead — **it never pretends a message was sent.**

Pick one provider in `siteConfig.contactForm`:

**Web3Forms** (free, no account needed for basic use)

```js
contactForm: {
  provider: 'web3forms',
  web3formsAccessKey: 'your-access-key-from-web3forms.com',
  // ...
}
```

**Formspree**

```js
contactForm: {
  provider: 'formspree',
  formspreeEndpoint: 'https://formspree.io/f/xxxxxxxx',
  // ...
}
```

**Your own API**

```js
contactForm: {
  provider: 'custom',
  customEndpoint: '/api/contact', // receives a JSON POST
  // ...
}
```

**EmailJS** needs a package, so it isn't wired up by default. To use it:
`npm i @emailjs/browser`, then add an `emailjs` case to `submitContactForm` in
`src/lib/contactForm.js` and the matching keys to `isContactFormConfigured`.
The file has a comment marking exactly where.

The form includes a honeypot field, so basic bot submissions are dropped
silently before they reach your inbox.

---

## 4. Deploying

The build output is a static site — both platforms work with zero extra config.

**Vercel:** import the repo. Framework preset "Vite" is detected automatically
(build `npm run build`, output `dist`).

**Netlify:** import the repo. `netlify.toml` already sets the build command,
publish directory and long-lived caching for hashed assets.

Then point `chaudharikrunal.me` at the deployment and enable HTTPS.

### After deploying

- `public/sitemap.xml` has a hardcoded `lastmod` date — update it when you make
  significant content changes.
- Submit the site to [Google Search Console](https://search.google.com/search-console).
- **Replace the social share image.** `public/og-image.svg` is a real, branded
  1200×630 card, but X/Twitter and several other platforms don't render SVG
  previews. Export it to `public/og-image.png` (any design tool, or open the SVG
  in a browser and screenshot at 1200×630), then change the three `og-image.svg`
  references in `index.html` to `og-image.png`.

---

## 5. Project structure

```
public/
  avatar-coder.svg     Navbar avatar (original illustration)
  krunal-avatar.webp   Photo alternative for the navbar avatar
  favicon-avatar.svg   Favicon source (avatar tuned for small sizes)
  favicon.ico          Avatar mark, 16/32/48px in one file
  favicon-96x96.png    Higher-DPI tab icon
  apple-touch-icon.png iOS home screen (180px)
  web-app-icon-*.png   PWA / Android install icons (192, 512)
  favicon-monogram.svg Unused KC monogram, kept as an alternative
  og-image.svg         Social share card (export to PNG — see above)
  hero/                Hero showcase screenshots (desktop + mobile WebP)
  projects/            Project screenshots (WebP)
  robots.txt, sitemap.xml, site.webmanifest

src/
  components/
    Navbar, Hero, TrustStrip, Services, WhyWorkWithMe, Projects,
    CaseStudy, Pricing, Process, About, TechStack, Testimonials,
    FAQ, Contact, WhatsAppButton, Footer, BrowserMockup
    ui/              Button, Section, SectionHeading, Reveal, Field, BrandIcons
  config/siteConfig.js Single source of truth for identity and contact details
  data/                All page content, one file per section
  hooks/               useScrolled, useActiveSection, useLockBodyScroll
  lib/                 motion variants, smooth scrolling, form delivery, socials
  index.css            Theme tokens + base styles
```

### The navbar avatar

The small round avatar beside the wordmark is `public/avatar-coder.svg` — an
original illustration, drawn for this site (no third-party or anime artwork, so
there is nothing to license). Swap it by pointing `avatar` in
`src/config/siteConfig.js` at another file, or set it to `''` to show the
wordmark alone. `public/krunal-avatar.webp` is a photo version of the same
slot, kept if you prefer a real headshot there.

Whatever you use, crop it tight: it renders at 36-40px.

The desktop nav starts at `xl` (1280px). Below that the hamburger takes over —
the brand block, seven links and the CTA only clear each other by ~18px at
1024px, so tablets get the full-width menu instead.

### Changing the hero showcase

The browser and phone frames in the hero show a real project — currently
Seloria. Both frames are drawn in markup; only the screenshots inside them are
images. To showcase a different project, capture it at two viewport sizes, save
them to `public/hero/`, and update `src/data/heroShowcase.js` (paths, address
bar text and caption). Keep each image under ~60KB: they load above the fold.

### Changing the favicon

The favicon is the same coder avatar as the navbar, in a variant tuned for
small sizes: `public/favicon-avatar.svg` (no background glyphs, thicker
headphone band, head scaled to fill the circle). Modern browsers load that SVG
directly; `favicon.ico` (16/32/48) covers older ones, and the PNGs cover iOS
and Android install icons.

After editing `favicon-avatar.svg`, regenerate the raster set — the PNGs and
.ico do not rebuild themselves. Two alternatives are kept in `public/`:
`favicon-monogram.svg` (abstract KC mark) and `krunal-avatar.webp` (photo).

### Changing the look

All colours, fonts and shadows are CSS variables in the `@theme` block at the
top of `src/index.css`. Change `--color-accent` (and its `-hover` / `-dim` /
`-ink` companions) and the whole site re-themes — buttons, links, highlights,
icons, focus rings and the favicon's sibling colours all follow.

---

## 6. What was built in deliberately

- **No invented social proof.** No fake testimonials, client names, logos,
  statistics, ratings, years of experience or project results — anywhere,
  including the structured data in `index.html`.
- **Honest pricing.** Every package says "Starting at", and the disclaimer under
  the cards states that final pricing depends on scope.
- **Accessibility.** Semantic landmarks, one `h1` with a clean `h2`/`h3`
  hierarchy, labelled form fields with errors announced via `role="alert"`,
  visible focus rings, a skip link, keyboard-navigable menu and a focus-trapped
  case study dialog. Errors are never signalled by colour alone.
- **Reduced motion.** `<MotionConfig reducedMotion="user">` plus a CSS media
  query disable animation for visitors whose OS requests it.
- **Performance.** `LazyMotion` ships only the animation features actually used,
  the case study dialog is a lazy-loaded chunk, vendor code is split for
  long-term caching, images are lazy-loaded with explicit dimensions, and the
  hero "screenshot" is rendered markup rather than an image file.

### Conversion path

Hero → trust strip → services → why me → work → pricing → process → about →
tech → testimonials → FAQ → contact. A "Get a Free Quote" CTA is never more
than one screen away, and clicking a service or pricing CTA scrolls to the
contact form with the project type and budget already selected.
