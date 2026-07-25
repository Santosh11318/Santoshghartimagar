# Santosh Gharti Magar — AI Website Developer Portfolio

A production-ready, single-page business portfolio built with **pure HTML5, CSS3 and vanilla JavaScript** (no frameworks, no build step).

## Files

| File | Purpose |
|---|---|
| `index.html` | All page markup, SEO meta tags, JSON-LD schema |
| `style.css` | Full styling — glassmorphism, gradients, dark/light mode, animations, responsive layout |
| `script.js` | Interactivity — theme toggle, mobile nav, scroll reveal, counters, hero animation, accordion, testimonial slider, WhatsApp form |
| `robots.txt` | Search engine crawl rules |
| `sitemap.xml` | Sitemap for search engines |
| `README.md` | This file |

## Before you deploy — 4 things to update

1. **Domain** — replace every instance of `https://santoshghartimagar.com/` in `index.html`, `robots.txt` and `sitemap.xml` with your real domain once you buy/host one.
2. **Logo** — no logo image was uploaded with this request, so the navbar, favicon and footer currently use a generated **"SG" gradient monogram** (inline SVG, no image file needed). If you have a real logo file, replace the inline SVG in the `.brand` and favicon `<link>` in `index.html` with `<img src="your-logo.png" ...>`.
3. **OG image** — `og:image` / `twitter:image` point to `/assets/og-cover.jpg`, which doesn't exist yet. Add a 1200×630px cover image at that path (a screenshot of your hero section works well).
4. **Testimonials** — the four testimonials are realistic placeholders written around your actual project categories (salon, restaurant, clinic, business). Swap in real client quotes as you collect them.

## How the WhatsApp integrations work

- **Nav / hero / floating buttons**: direct `wa.me` links with a pre-filled greeting.
- **Contact form**: pure client-side JavaScript — on submit, it reads all form fields, builds a formatted message, and opens `https://wa.me/918799747981?text=...`. Nothing is stored or sent to a server.

## Hosting options

- **GitHub Pages** (free): push these files to a repo, enable Pages in repo settings, done.
- **Google Drive hosting** (as offered in your Services section): works for simple static hosting via drive-to-web tools, though GitHub Pages or Netlify/Vercel will give a cleaner, faster, custom-domain-ready result.
- **Netlify / Vercel** (free tier): drag-and-drop this folder for instant deployment with a free subdomain.

## Performance & SEO checklist already included

- Semantic HTML5 structure, ARIA labels, visible focus states, `prefers-reduced-motion` support
- Meta title/description/keywords, canonical URL, Open Graph + Twitter Card tags
- JSON-LD: `Person`, `LocalBusiness`, `WebSite`, `BreadcrumbList`
- `robots.txt` + `sitemap.xml`
- Lazy-loaded portfolio iframes, minimal external requests (only Google Fonts), no render-blocking scripts
- Mobile-first responsive design (desktop, laptop, tablet, mobile breakpoints)

## Notes for future edits

- All **Services**, **Portfolio**, **Why Choose Me**, **Testimonials** and **FAQ** content is data-driven from arrays at the top of `script.js` (`SERVICES`, `PROJECTS`, `WHY`, `TESTIMONIALS`, `FAQS`) — edit the arrays, not the HTML, to add or change entries.
- Dark mode is the default; the theme toggle remembers the visitor's choice via `localStorage`.
