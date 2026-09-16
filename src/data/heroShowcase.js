/**
 * ---------------------------------------------------------------------------
 * HERO SHOWCASE
 * ---------------------------------------------------------------------------
 * The real website shown inside the browser and phone frames in the hero.
 *
 * To showcase a different project, capture it at two sizes, drop the files in
 * /public/hero, and update the paths below:
 *
 *   desktop : ~1400px wide, 16:10 (a 1440x900 viewport screenshot works well)
 *   mobile  : ~440px wide, roughly 1:1.95 (a 400x780 viewport screenshot)
 *
 * Keep both as WebP and under ~60KB each — they load above the fold.
 *
 * `url` is the address drawn in the fake browser address bar. Keep it truthful:
 * it should be the site actually pictured.
 *
 * `label` is the small badge on the preview. Set it to '' to hide the badge.
 * ---------------------------------------------------------------------------
 */

export const heroShowcase = {
  desktopImage: '/hero/showcase-desktop.webp',
  desktopWidth: 1400,
  desktopHeight: 875,

  mobileImage: '/hero/showcase-mobile.webp',
  mobileWidth: 440,
  mobileHeight: 858,

  url: 'getseloria.com',
  label: 'A site I built — Seloria',

  alt: 'Seloria, an online store built by Krunal Chaudhari, shown on a desktop browser and a mobile phone.',
}
