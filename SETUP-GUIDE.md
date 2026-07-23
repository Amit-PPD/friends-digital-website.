# Design Catalog — One-Time Setup Guide

You will do this ONCE (30–40 minutes). After this, your team only ever uses the
admin page in a browser. No files, no software, nothing to install ever again.

You will create two free accounts yourself (GitHub and Cloudflare). Keep the
passwords safe with you — they are yours, not to be shared in chat.

---

## Part 1 — Put the code on GitHub (10 min)

1. Go to github.com → Sign up (free) → verify email.
2. Click the "+" (top right) → "New repository".
   - Name: `design-catalog`
   - Keep it **Private**
   - Click "Create repository".
3. On the new repo page click "uploading an existing file".
4. Unzip the project ZIP I gave you. Drag ALL its contents
   (the `public` folder, `functions` folder, `schema.sql`) into the upload box.
   GitHub keeps the folder structure automatically when you drag folders in.
5. Click "Commit changes".

## Part 2 — Cloudflare account + database (10 min)

1. Go to dash.cloudflare.com → Sign up (free) → verify email.
2. Left menu → **Storage & Databases → D1** → "Create database".
   - Name: `catalog-db` → Create.
3. Open the database → **Console** tab → paste the entire contents of
   `schema.sql` → click Execute. You should see "Success".

## Part 3 — Image storage (5 min)

1. Left menu → **R2 Object Storage** → "Create bucket".
   - Name: `catalog-images` → Create.
   - Note: Cloudflare may ask to verify a card for R2. The free allowance
     (10 GB storage, free bandwidth) is far more than this catalog needs;
     you will not be charged within it.

## Part 4 — The website (10 min)

1. Left menu → **Workers & Pages** → "Create" → **Pages** →
   "Connect to Git" → authorize GitHub → pick `design-catalog`.
2. Build settings:
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `public`
   - Click "Save and Deploy". Wait ~1 minute.
3. Now connect the database and images. In the Pages project:
   **Settings → Functions (Bindings)**:
   - Add **D1 database binding** → Variable name: `DB` → Database: `catalog-db`
   - Add **R2 bucket binding** → Variable name: `BUCKET` → Bucket: `catalog-images`
4. **Settings → Environment variables** → Add:
   - Name: `ADMIN_PASSWORD` → Value: a strong password you choose
     (this is what your team types to enter the admin page). Mark as Secret.
   - Add it for **Production**.
5. **Deployments** tab → "Retry deployment" (so the bindings take effect).

Your catalog is now live at `design-catalog-xxx.pages.dev`:
- Public catalog: the main URL
- Team admin: the main URL + `/admin.html`

## Part 5 — Your domain (10 min)

1. In the Pages project → **Custom domains** → "Set up a custom domain"
   → enter `catalog.paperplanedesign.in` (or whatever subdomain you prefer).
2. Cloudflare shows you a CNAME record. Add that record wherever your
   paperplanedesign.in DNS is managed (your domain/DNS provider panel).
3. Wait a few minutes — done. Same URL + `/admin.html` for the team.

---

## Daily use (the whole workflow)

1. Team member opens `catalog.yourdomain.in/admin.html` on any computer.
2. Enters the admin password.
3. Picks Print type → Category → Collection (for 3D Wall Art and Leather Paintings there is no category — just drop images), drops the images.
4. Reviews the batch table (flagged files are skipped automatically).
5. Clicks "Upload to live catalog". Numbers assigned by the server — the
   public catalog updates the same second.

Mistake? Open "Manage / remove designs", find the SKU, Remove. The number is
retired forever, never reused.

---

## Safety & disaster recovery (read once, follow forever)

**What is already safe automatically:**
- Cloudflare stores your database and images replicated across many machines
  and cities. There is no single server or hard disk whose failure can
  destroy the catalog. Your office computers hold nothing the catalog needs.
- The database keeps automatic point-in-time history for ~30 days. If a
  serious mistake is ever made (wrong mass-delete, numbering issue), the
  database can be rolled back to any moment in the last 30 days — this is a
  guided procedure, ask Claude when needed.
- Deleted design numbers are retired forever, never reused — old screenshots
  and PDFs with customers can never point to the wrong design.

**Your three habits:**
1. MONTHLY: open the admin page → "Download full backup" → keep the ZIP on a
   computer + a Google Drive copy. This ZIP alone can rebuild everything.
2. DAY ONE: enable 2-step verification (2FA) on BOTH the Cloudflare and
   GitHub accounts, and write the recovery codes on paper kept in the office.
   Losing these accounts is the only disaster software cannot undo.
3. Keep original master image files in your normal design storage as always —
   the catalog stores web versions; your originals remain the print source.

**PDF versions:**
- Public catalog visitors get the WITH-MESH PDF automatically.
- Admin page → "Catalog PDF" lets your team generate either version:
  With mesh (trade) or Clean (interior designers, hotels, direct clients).
