import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * The canonical origin, with `www`.
 *
 * This is not a style preference: chaudharikrunal.me issues a 301 to
 * www.chaudharikrunal.me, so `www` is the host that actually serves the site.
 * Canonical, Open Graph, sitemap, robots and the JSON-LD @ids must all agree
 * with it — pointing them at the redirecting host splits crawl signals.
 */
const SITE_ORIGIN = 'https://www.chaudharikrunal.me'
const SITE_URL = SITE_ORIGIN + '/'

/**
 * Production is the only environment that should be indexable. Vercel preview
 * deployments get their own *.vercel.app URLs, and if those get crawled they
 * compete with the real domain for the same content.
 */
const isProductionDeploy =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

/**
 * Fails the build if index.html and this file disagree about the origin —
 * cheaper than discovering a split canonical in Search Console weeks later.
 */
function assertCanonicalPlugin() {
  return {
    name: 'assert-canonical-origin',
    apply: 'build',
    buildStart() {
      const html = readFileSync(resolve('index.html'), 'utf8')
      const found = [
        ...html.matchAll(/https:\/\/(?:www\.)?chaudharikrunal\.me/g),
      ].map((m) => m[0])
      const wrong = found.filter((u) => u !== SITE_ORIGIN)
      if (wrong.length) {
        this.error(
          `index.html uses ${wrong.length} URL(s) that are not ${SITE_ORIGIN}: ` +
            `${[...new Set(wrong)].join(', ')}. Update them so canonical, ` +
            `Open Graph and JSON-LD all point at the host that serves the site.`,
        )
      }
      if (found.length === 0) {
        this.error('index.html contains no absolute site URLs — check canonical.')
      }
    },
  }
}

/**
 * Emits robots.txt and sitemap.xml at the end of every build.
 *
 * Generated rather than committed so the sitemap's `lastmod` can never go
 * stale, and so preview deployments are automatically marked noindex.
 */
function seoFilesPlugin() {
  const buildSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

  const buildRobots = () =>
    isProductionDeploy
      ? `# ${SITE_URL}
User-agent: *
Allow: /

# No private, admin or API routes exist on this site - it is a single static
# page. These rules are defensive, so anything added later is excluded by
# default rather than by accident.
Disallow: /api/
Disallow: /admin/

Sitemap: ${SITE_URL}sitemap.xml
`
      : `# Non-production deployment (VERCEL_ENV=${process.env.VERCEL_ENV}).
# Kept out of the index so preview URLs never compete with ${SITE_URL}
User-agent: *
Disallow: /
`

  let isBuild = false

  return {
    name: 'generate-seo-files',

    configResolved(config) {
      isBuild = config.command === 'build'
    },

    /**
     * Serve the same content in `npm run dev`. Without this the SPA fallback
     * answers /robots.txt with index.html and a 200, which is more misleading
     * than a 404 — it looks like a valid robots file until you read it.
     */
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end(buildRobots())
        }
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          return res.end(buildSitemap())
        }
        return next()
      })
    },

    /**
     * Writes into `public/` (not `dist/`) at the start of the build.
     *
     * That keeps real, committed, greppable files on disk where you expect
     * them, while Vite's normal public-dir copy puts them in `dist/`. One
     * generator, one output location, nothing silently overwritten later.
     */
    buildStart() {
      if (!isBuild) return

      writeFileSync(resolve('public/sitemap.xml'), buildSitemap())
      writeFileSync(resolve('public/robots.txt'), buildRobots())

      console.log(
        `  public/sitemap.xml lastmod ${new Date().toISOString().slice(0, 10)} | ` +
          `public/robots.txt ${
            isProductionDeploy ? 'indexable' : 'NOINDEX (preview build)'
          } | origin ${SITE_ORIGIN}`,
      )
    },
  }
}

/**
 * Injects the FAQPage structured data into index.html, generated from the same
 * src/data/faq.js the visible accordion reads.
 *
 * Doing it here rather than in the FAQ component means crawlers get it without
 * executing JavaScript, while the answers still cannot drift from what the page
 * actually says — there is only one copy of the text.
 */
function faqSchemaPlugin() {
  return {
    name: 'inject-faq-schema',
    async transformIndexHtml() {
      const { faqs } = await import('./src/data/faq.js')
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': SITE_URL + '#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(schema),
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    assertCanonicalPlugin(),
    seoFilesPlugin(),
    faqSchemaPlugin(),
  ],
  build: {
    // Keep the long-lived vendor code in its own chunks so a content edit
    // doesn't invalidate the whole bundle for returning visitors.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // Matches react and react-dom, but not lucide-react.
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'react'
          }
          if (id.includes('framer-motion') || id.includes('motion-dom')) {
            return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
