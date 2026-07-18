# Friends Digital Website — Deployment Guide

You've done GitHub + Cloudflare before, so this will feel familiar. Total cost: ₹0/month hosting. Only the domain costs money.

## Step 1 — Push to GitHub
1. Create a new repository (e.g. `friends-digital-website`), private or public.
2. Upload everything in this folder to the repo root (index.html must be at root).

## Step 2 — Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the repo. Build settings: **Framework = None, Build command = (leave empty), Output directory = /** (it's a plain static site — nothing to build).
3. Deploy. You'll get a free `*.pages.dev` URL immediately — use this to preview and share with your brothers.

## Step 3 — Domain
1. Check if you already own **friendsprintshop.com** (it's on the old company profile). If yes, move its DNS to Cloudflare (free) and skip buying.
2. Otherwise buy the domain (Cloudflare Registrar sells at cost, ~$10/yr; GoDaddy/Hostinger also fine).
3. In the Pages project → **Custom domains → Add** → enter the domain. Cloudflare sets DNS + free SSL automatically.

## Step 4 — Update the domain inside the site (IMPORTANT)
The files currently use `https://www.friendsprintshop.com` as the canonical domain. If you use a different domain, find-and-replace that URL in ALL `.html` files, `sitemap.xml` and `robots.txt` before going live. (VS Code: Ctrl+Shift+H, replace across files.)

## Step 5 — Google (SEO)
1. **Google Search Console** (search.google.com/search-console) → add your domain → verify via DNS (Cloudflare makes this one click) → submit `sitemap.xml`.
2. **Google Business Profile** (business.google.com) → create/claim "Friends Digital Color Print Shop" for BOTH addresses (Okhla + Nehru Place). This is the single biggest thing for local search — do not skip it.
3. Structured data (LocalBusiness schema) is already embedded in the home and contact pages.

## Step 6 — Before running ads
1. Create a **GA4 property** (analytics.google.com) → copy the gtag.js snippet → paste it where every HTML file says `<!-- ANALYTICS: paste your Google tag -->` (in the <head>).
2. Create a **Meta Pixel** (Events Manager in Meta Business Suite) → paste its snippet at the second ANALYTICS comment.
3. Point Instagram/Facebook ads to `print-on-demand.html` — it's built as an ad landing page (single message, strong WhatsApp CTA). You can duplicate it for other campaigns.
4. For YouTube ads, link the GA4 property to Google Ads for conversion tracking on WhatsApp button clicks.

## Editing content later
- All text is plain HTML — open any page and edit the words directly.
- Colors/fonts: `css/style.css` (brand colors are defined at the top under `:root`).
- To swap in real factory photos later: add images to `assets/` and tell Claude (or any developer) to place them — the layout has natural spots for them on Home, About and Infrastructure.

## Notes
- WhatsApp button number: +91 93111 11049 (Nitin Gupta). To change it, find-replace `919311111049` across files.
- Founded year is shown as 1981 / "45 years". Change in `index.html`, `about.html`, `print-on-demand.html` and the footer if needed.
