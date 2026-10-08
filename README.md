# Mauro Gerardi — Portfolio

Personal portfolio of **Mauro Alejandro Gerardi**, Front-End Developer (React & Angular) and Business Analyst.

**Live:** https://maure-dev.vercel.app

## Features

- **React 19 + Vite 8** single-page app in TypeScript, with lazy-loaded route screens
- **Dark / light theme** (dark by default, applied before first paint, persisted in `localStorage`, synced with `theme-color` and `color-scheme`)
- **Bilingual UI** (English / Español) with `react-i18next`: browser-language detection on the first visit, persisted choice, and a test that keeps both catalogs in sync
- **Downloadable CV** in both languages, generated as real-text, tagged, one-page PDFs from JSON data (`cv/`)
- **Design system** in `src/main.css`: colour tokens for both themes, a fluid type scale, a shared section/heading/card/button/tag component set, self-hosted Sora
- **Window-scroll layout**: fixed header, mobile menu with focus management, scroll progress, back-to-top, scroll restoration per route
- **Contact form** via **EmailJS** with **reCAPTCHA v2** (token verified by EmailJS), honeypot, SDK rate limiting, labelled fields and inline, localized validation
- **SEO**: per-route title/description/canonical/Open Graph/Twitter meta, JSON-LD (`ProfilePage` → `Person`, `WebSite`), `sitemap.xml`, `robots.txt`, web manifest, a real `404.html`
- **Accessibility**: landmarks, one `h1` per route, visible focus ring, skip link, keyboard-operable menu, live regions, `prefers-reduced-motion` respected, 16px inputs (no iOS zoom)
- **Hardened delivery**: Content Security Policy and companion headers, immutable caching for hashed assets (see [Security](#security))
- **Vercel Analytics** and **Speed Insights**
- Optimized **WebP** imagery with responsive `srcset`, tree-shaken **Font Awesome** SVG icons

## Tech stack

React 19 · Vite 8 · TypeScript 6 · Tailwind CSS v4 · react-router-dom 7 · i18next / react-i18next · EmailJS · @google-recaptcha/react · Font Awesome (SVG) · Vercel Analytics + Speed Insights · Vitest + Testing Library · playwright-core + pdf-lib (CV generator)

## Getting started

Requires **Node 24** (`.nvmrc`, `engines`).

```bash
nvm use           # Node 24
npm ci            # install from the lockfile
npm run dev       # dev server with HMR
npm run build     # type-check + production build (+ postbuild: dist/404.html)
npm run preview   # serve the production build locally
npm run lint      # ESLint (flat config), zero warnings allowed
npm test          # Vitest (jsdom): components, router, data, i18n parity, contact form, CV drift
```

## Environment variables

Copy `.env.example` to **`.env.local`** (git-ignored and excluded from CLI uploads) and fill in your own values:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_SITE_KEY=your_recaptcha_v2_checkbox_site_key
```

Vite inlines `VITE_*` variables into the browser bundle, so these are public identifiers, not secrets. The reCAPTCHA **secret** key is never part of this project: it lives in the EmailJS dashboard (see [Security](#security)). On Vercel, define the same four variables under Project → Settings → Environment Variables.

## CV

Both PDFs are built from data, not edited by hand:

```bash
npm run cv:build                          # writes public/Mauro-Gerardi-CV-{EN,ES}.pdf
node cv/build-cv.mjs --out /tmp/cv-draft  # render somewhere else to inspect a draft
node cv/build-cv.mjs --body-size 8.5pt    # override the template's --body-size for a tight fit
```

- **Sources:** `cv/data.en.json` and `cv/data.es.json` (content), `cv/template.html` (layout), `cv/fonts/` (static Sora subsets), `cv/build-cv.mjs` (renderer).
- **Browser:** the renderer prints the page with headless **Google Chrome** (Playwright's `chrome` channel). Without Chrome, point `CV_BROWSER_PATH` at any Chromium binary.
- **One-page rule:** the build fails if a CV renders to more than one page (or if Sora did not load, or a bracketed placeholder leaked into the copy). Trim the text or lower `--body-size`.
- **Drift test:** `src/test/cv.test.ts` compares the CV data with the site's catalogs (employer and role periods, education periods, no placeholders). When a date changes, update `src/i18n/locales/*/translation.json` and `cv/data.*.json` together, rebuild, and commit the PDFs.
- **Fonts:** `cv/fonts/*.woff2` only need regenerating when Sora is upgraded (`cv/fonts/instance.py`, requires `pip install fonttools brotli`).

## Security

**Headers** (`vercel.json`, applied by Vercel on every response): a Content Security Policy, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy` and `Cross-Origin-Opener-Policy: same-origin`, plus `Cache-Control` rules (hashed `/assets/*` and `/fonts/*` are immutable for a year; icons, PDFs and the manifest get 1 h / 1 day on the edge). Vercel does not apply these headers to `npm run dev` or `npm run preview`, so check them on a preview deployment: DevTools → Console shows any `Refused to …` message; https://securityheaders.com and https://csp-evaluator.withgoogle.com validate the policy.

The CSP only trusts the origins the app actually uses:

| Directive     | Origins                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- |
| `script-src`  | `'self'`, the hash of the inline theme script, `www.google.com/recaptcha/`, `www.gstatic.com/recaptcha/`, `va.vercel-scripts.com` |
| `connect-src` | `'self'` (`/_vercel/insights`, `/_vercel/speed-insights`), `api.emailjs.com`, `api.github.com`, `www.google.com/recaptcha/`, `vitals.vercel-insights.com`, `va.vercel-scripts.com` |
| `frame-src`   | `www.google.com/recaptcha/`, `recaptcha.google.com/recaptcha/`                           |
| `style-src`   | `'self' 'unsafe-inline'` (Font Awesome injects its stylesheet)                           |
| `font-src` / `img-src` | `'self'` (Sora is self-hosted) / `'self' data:` + `www.gstatic.com/recaptcha/`  |

**CSP hash maintenance.** The inline `<script>` in `index.html` that applies the saved theme before first paint is allowed by its SHA-256 hash. If you change a single byte of that script, recompute the hash from a build and paste it into the `script-src` directive of `vercel.json`:

```bash
npm run build && node -e 'const h=require("fs").readFileSync("dist/index.html","utf8").match(/<script>([\s\S]*?)<\/script>/)[1];console.log("sha256-"+require("crypto").createHash("sha256").update(h).digest("base64"))'
```

**Contact form.**

- The reCAPTCHA v2 token is sent to EmailJS as `g-recaptcha-response`. For EmailJS to reject requests without a valid token, enable verification once in the dashboard: **Email Templates → open the template behind `VITE_EMAILJS_TEMPLATE_ID` → Settings → enable reCAPTCHA v2 → paste the reCAPTCHA *secret* key** of the same site whose site key is `VITE_SITE_KEY` → Save. Keep "Allow EmailJS API for non-browser applications" disabled (Account → Security), and restrict the reCAPTCHA key to `maure-dev.vercel.app` (plus `localhost` for development) in the Google reCAPTCHA admin.
- The SDK is configured with `blockHeadless` and a 10 s `limitRate` per browser; the form also has a honeypot field, length limits and trimming. Values are inserted into the e-mail by EmailJS's template engine; nothing is rendered as HTML on the site.

**Supply chain.** `package-lock.json` is committed and Vercel installs with `npm ci`; Node is pinned to 24 (`engines`, `.nvmrc`); `.vercelignore` keeps `.env*`, builds and the CV generator sources out of CLI uploads (never the lockfile).

## Deployment

The project is **Git-connected** on Vercel: every push to `master` is a production deployment and every other branch (or pull request) gets a preview URL. For a manual preview from your machine run `vercel` (and `vercel --prod` for production); the CLI respects `.vercelignore`.

`vercel.json` installs with `npm ci`, rewrites the real routes (`/projects`, `/about`, `/contact`) to the SPA shell and lets every other unknown path fall through to `dist/404.html` (a copy of the shell made by `postbuild`), so missing pages return a real 404 status while the app still renders its own not-found screen.

If the production domain changes, update it in `index.html` (canonical, Open Graph, JSON-LD), `src/constants.ts`, `public/robots.txt`, `public/sitemap.xml`, the reCAPTCHA key's allowed domains and `README.md`.

## Project structure

```
cv/                      # CV generator: data.{en,es}.json, template.html, fonts/, build-cv.mjs
public/                  # Static files served from the root: CV PDFs, icons, fonts, og.png, sitemap, robots
src/
  constants.ts           # Site URL, navigation, social links, theme colours
  main.css               # Design tokens (both themes), type scale, global styles
  containers/
    contexts/            # Theme, Outlet (layout state) and Contact contexts
    entities/            # Shared TypeScript types
  data/                  # Static content: projects, skills, stats, GitHub repos
  hooks/                 # usePageMeta (per-route document head)
  i18n/                  # i18next setup + en/es translation catalogs
  interfaces/            # UI components: design-system primitives, header, footer, sections per page
  routes/                # Router (lazy-loaded screens, error boundary)
  screens/               # Route screens that compose the sections
  test/                  # Vitest setup and tests (router, i18n parity, contact form, CV drift)
vercel.json              # Install/build commands, SPA rewrites, security and cache headers
```
