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
| ~~`whatsappNumber`~~            | Done — +91 63519 24667                                        |
| `social.github`                 | Optional — LinkedIn, Instagram and Facebook are set           |
| ~~`photo`~~                     | Done — About-section portrait is set                          |
| ~~`contactForm.*`~~             | Done — Web3Forms; enquiries go to your key's inbox            |

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
| Projects          | `src/data/projects.js`         | Four real projects, including his own developer portfolio      |
| Testimonials      | `src/data/testimonials.js`     | Empty on purpose; the section shows an honest "coming soon"   |
| Services          | `src/data/services.js`         |                                                               |
| Pricing           | `src/data/pricing.js`          |                                                               |
| Process / FAQ     | `src/data/process.js`, `faq.js`| FAQ also generates the FAQPage structured data automatically  |
| Tech badges       | `src/data/techStack.js`        |                                                               |
| Nav / footer menu | `src/data/navigation.js`       |                                                               |
| Form dropdowns    | `src/data/contactOptions.js`   | Keep in sync with `projectType` / `budget` in the data above  |

### The projects

Four real projects are live in `src/data/projects.js`, with descriptions
rewritten for a business audience:

| Project              | Category         | Live                  |
| -------------------- | ---------------- | --------------------- |
| Seloria              | E-commerce       | getseloria.com        |
| Food Delivery App    | Web Application  | Netlify               |
| Jadoo — Travels      | Business Website | Netlify               |
| Developer Portfolio  | Portfolio        | krunalchaudhari.dev   |

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

### Canonical host

`chaudharikrunal.me` 301-redirects to `www.chaudharikrunal.me`, so **`www` is
the canonical origin** and every absolute URL uses it — canonical, Open Graph,
sitemap, robots and the JSON-LD `@id`s.

`assertCanonicalPlugin` in `vite.config.js` **fails the build** if any absolute
URL in `index.html` drifts off that origin. Verified: changing canonical to
non-www aborts the build with a named error.

If you ever flip the Vercel domain to non-www, change `SITE_ORIGIN` in
`vite.config.js` and the URLs in `index.html` together.

### robots.txt and sitemap.xml

Both live in `public/` as normal committed files — so they are visible in git
and greppable — but `seoFilesPlugin` in `vite.config.js` **rewrites them at the
start of every build**. Vite's usual public-dir copy then puts them in `dist/`.

That means you get both properties at once:

- `lastmod` is always the build date, so the sitemap can never go stale
- **Preview deployments are automatically `Disallow: /`** — when `VERCEL_ENV`
  is not `production`, robots.txt blocks everything so `*.vercel.app` preview
  URLs never compete with the live domain. Verified with
  `VERCEL_ENV=preview npm run build`.
- The dev server serves the same content (`text/plain` / `application/xml`)
  instead of letting the SPA fallback answer `/robots.txt` with index.html and
  a misleading `200`.

Because the build rewrites them, do not hand-edit these two files — change
`SITE_ORIGIN` or the template in `vite.config.js` instead. Expect a one-line
`lastmod` diff the first time you build on a new day.

### Google Search Console setup

1. Add the property as a **Domain property** (`chaudharikrunal.me`) so www,
   non-www and https are all covered by one property. Verify with the DNS TXT
   record Vercel lets you add — easier than the HTML-file method here, because
   the build output is regenerated on every deploy.
2. Under **Sitemaps**, submit `sitemap.xml`.
3. Use **URL Inspection** on `https://www.chaudharikrunal.me/` and click
   *Request indexing* to skip the initial crawl wait.
4. Check **Page indexing** after a week: the non-www URL should report
   "Alternate page with proper canonical tag", not an error.
- Check the share preview once live with the
  [Facebook debugger](https://developers.facebook.com/tools/debug/) and
  [X card validator](https://cards-dev.twitter.com/validator).
- Validate structured data with the
  [Rich Results Test](https://search.google.com/test/rich-results) — the FAQ
  should be eligible for FAQ rich results.

## 4b. What SEO is already handled

| Area | State |
| ---- | ----- |
| Title / description | 42 and 147 chars, target term leads the description |
| Canonical + robots | Set; `max-image-preview:large` for bigger thumbnails |
| Structured data | `ProfessionalService` + `Person` + `WebSite` in one `@graph`, plus `FAQPage` — all in static HTML, no JS needed |
| Social preview | `og-image.png` (1200×630) — PNG because X skips SVG |
| Sitemap | Rewritten on every `npm run build` with that day's `lastmod` |
| Headings | One `h1`, no skipped levels |
| Images | Every image has `alt` plus `width`/`height` (no layout shift) |
| Language | `lang="en-IN"`, `og:locale=en_IN` |
| Performance | Hero image preloaded, vendor chunks split, WebP everywhere |

**No invented trust signals.** There is no `aggregateRating`, review count,
client count or founding date in the structured data — fake review markup is a
manual-action risk with Google, and none of it is verifiable yet. Add
`aggregateRating` only once you have real reviews.

Two optional wins left:

- **Add `sameAs` for GitHub** if you switch that social link on.
- **Link krunalchaudhari.dev → chaudharikrunal.me.** The portfolio currently has
  no link here. A "Hire me for freelance work" link from it is the single best
  way to connect the two sites as one person and pass authority across.
- **Create a Google Business Profile for Surat.** For a local freelancer this
  outranks every on-page tweak in this file.

### Why the two sites target different queries

`krunalchaudhari.dev` already ranks for "Krunal Chaudhari" and
"Krunal Chaudhari React developer" — recruiter-intent queries. This site
deliberately does **not** compete for those: two of your own domains chasing one
query means Google picks one, and the older portfolio wins. Instead this site
targets buyer-intent queries — "freelance web developer in Surat", "website
developer for small business" — which is why the title carries the city and the
schema carries `addressLocality`.

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
