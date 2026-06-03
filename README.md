# Mauro Gerardi — Portfolio

Personal portfolio of **Mauro Alejandro Gerardi**, Semi-Senior Front-End Developer (Angular & React) and Business Analyst.

🔗 **Live:** https://maure-dev.vercel.app

## Features

- ⚡️ **React 19 + Vite 8** SPA with TypeScript and route-based code splitting
- 🌗 **Dark / light theme** toggle (dark by default, no flash, persisted to `localStorage`)
- 🌐 **Bilingual UI** (English / Español) with `react-i18next`, persisted and type-safe keys
- 📄 **Downloadable CV** (served from `public/`)
- 🔍 **SEO ready**: Open Graph + Twitter cards, JSON-LD, per-route titles, `sitemap.xml`, `robots.txt`, web manifest
- ♿️ **Accessible**: keyboard navigation, visible focus, ARIA labels, `prefers-reduced-motion` support, skip link
- 🖼️ Optimized **WebP** imagery and tree-shaken **Font Awesome** SVG icons
- ✉️ Contact form via **EmailJS** with **reCAPTCHA v2** and inline status feedback

## Tech stack

React 19 · Vite 8 · TypeScript 6 · Tailwind CSS v4 · react-router-dom 7 · react-i18next · motion · EmailJS · Font Awesome (SVG)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the build
npm run lint     # ESLint (flat config)
```

## Environment variables

Create a `.env` file in the project root:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SITE_KEY=your_recaptcha_v2_site_key
```

## Project structure

```
src/
  containers/contexts/   # Theme, Outlet and Contact React contexts
  i18n/                  # i18next config + en/es translation catalogs
  interfaces/            # UI components (sections, header, footer, toggles, ...)
  screens/               # Route screens that compose the sections
  routes/                # Router (lazy-loaded screens)
  hooks/                 # usePageMeta (per-route document head)
```

## Deployment

Deployed on **Vercel**. `vercel.json` rewrites all routes to `/` for client-side routing.
If the production domain changes, update it in `index.html`, `src/constants.ts`,
`public/robots.txt` and `public/sitemap.xml`.
