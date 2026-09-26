# Abdal Khalil — Paid Media Site

Dark, single-page agency site built with **Next.js 14 (App Router) + React 18 + Tailwind CSS**.
Design direction: 21st.dev-style — near-black canvas, hairline borders, mono eyebrow labels,
bento grids, ambient gradient light, scroll-reveal motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

`next.config.mjs` uses `output: 'export'`, so `npm run build` produces a fully static site in
`./out` that can be dropped on Vercel, Netlify, Cloudflare Pages or any static host.

## Where to edit

All copy, stats, case studies, services, FAQ and timeline live in **one file**:

```
components/content.js
```

Change text there and everything on the page updates. No content is hardcoded inside components.

## Structure

```
app/
  layout.js        metadata, fonts (Inter + JetBrains Mono + Dancing Script via Google Fonts)
  page.js          section composition order
  globals.css      design tokens, buttons, cards, reveal animation
components/
  content.js       ← all site copy and numbers
  Nav.js           sticky blurred header, script name logo, theme toggle, mobile menu
  Hero.js          headline, stat bar, markets
  Marquee.js       client name ticker
  Services.js      bento grid of the four service areas
  Work.js          four case studies in STAR format
  Process.js       five-step process, sticky heading
  Stack.js         platform / tooling columns
  About.js         profile facts + role timeline
  Faq.js           accordion
  Contact.js       CTA block with email and phone
  Footer.js
  ThemeToggle.js   dark / light switch, persisted in localStorage
  Reveal.js        IntersectionObserver scroll-reveal wrapper
  SectionHead.js   shared section heading
```

## Theming — dark + light

The site ships with both modes. Dark is the default; the toggle sits in the header
(`components/ThemeToggle.js`) and the choice is stored in `localStorage` under `abdal-theme`.
An inline script in `app/layout.js` applies the stored theme before first paint, so there is
no flash of the wrong mode.

Colors are CSS variables in `app/globals.css`, exposed to Tailwind as `fg`, `bg` and `raised`:

```css
:root                      { --fg: 255 255 255; --bg: 5 6 10;     --raised: 15 18 25; }
:root[data-theme='light']  { --fg: 10 13 22;    --bg: 249 250 252; --raised: 255 255 255; }
```

Because every surface is written as `text-fg/60`, `border-fg/[0.07]`, `bg-bg` and so on, both
themes come from that one pair of definitions — change those six values and the whole site
re-skins. `--glow-a`, `--glow-b`, `--grid-alpha`, `--card-border` and `--noise-opacity` tune how
strong the ambient effects are per theme. Accent colors (`brand` `#4F7DFF`, `signal` `#34D399`)
live in `tailwind.config.js` and stay constant across both modes.

Accessibility: semantic landmarks, `aria-expanded` on nav and FAQ toggles, visible focus via
browser defaults, and a `prefers-reduced-motion` block that disables the marquee and reveals.

## Content note

Every figure on the page comes from the CV and portfolio — spend, conversions, call volume,
top impression rate. Client names shown are the ones already disclosed in the portfolio deck.


## Logo wordmark

The logo is the name alone — **Abdal Khalil** set in *Dancing Script* (`font-script` in Tailwind,
`--font-script` in `globals.css`). No icon, no tagline beside it. To try a different script face,
swap the family in the Google Fonts link in `app/layout.js` and in `--font-script` — nothing else
needs to change.
