# Nidus Trading — E-Commerce Platform

Premium B2B/B2C industrial trading website for **Nidus Trading**.

**Tagline:** Premium Industrial & Electronic Solutions – Quality, Reliability, Competitive Pricing  
**Phone:** 0349-0307920

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + custom glassmorphism UI
- **Prisma** + SQLite (local) / PostgreSQL (production)
- **Auth.js (NextAuth v5)** credentials auth
- **Zustand** cart, **pdf-lib** invoices, **Framer Motion** animations
- Deploy-ready for **Vercel**

## Features

### Public site
- Glassmorphism hero, categories, best sellers, testimonials
- Product catalog with search, filters, sorting
- Product detail pages + JSON-LD (Organization, Product, Breadcrumb)
- Cart + checkout
- Bulk inquiry form
- Order tracking by Order ID / email
- Blog/news portal (SEO keyword-ready)
- About, Contact, Services
- Dark/light mode

### Admin portal (`/admin`)
- Secure admin login
- Dashboard stats (orders, inquiries, revenue, products)
- Product CRUD + JSON bulk upload
- Order status management + notes
- Invoice PDF generation with discount/tax/shipping/remarks controls
- Inquiry reply + conversion status
- Blog create/edit/publish + SEO meta helper

## Quick start

```bash
cd nidus-trading
npm install
cp .env.example .env
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Seed credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@nidustrading.com` | `Admin@Nidus2026` |
| Customer | `customer@example.com` | `Customer@123` |

Demo trackable order: `NT-DEMO-1001`

## Environment variables

See `.env.example`:

- `DATABASE_URL` — SQLite `file:./dev.db` locally; PostgreSQL in production
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` / `AUTH_URL` / `NEXT_PUBLIC_APP_URL`
- Optional Cloudinary keys for CDN image hosting

## Production database (PostgreSQL)

1. Create a Postgres database (Vercel Postgres, Supabase, or Neon)
2. In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Set `DATABASE_URL` in Vercel env vars
4. Run:

```bash
npx prisma db push
npm run db:seed
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Use PostgreSQL for `DATABASE_URL` (SQLite is not suitable for serverless)
5. Deploy

Post-deploy:

```bash
npx prisma db push
npm run db:seed
```

## Useful scripts

```bash
npm run dev          # local development
npm run build        # production build
npm run db:generate  # prisma generate
npm run db:push      # sync schema
npm run db:seed      # seed catalog + admin
```

## Project structure

```
src/app/(shop)/     # public storefront pages
src/app/admin/      # protected admin portal
src/app/api/        # REST API routes
src/components/     # UI, layout, home, products, admin
src/lib/            # auth, prisma, invoice, utils
prisma/             # schema + seed
public/images/      # placeholder assets
```

## SEO notes

- Metadata + Open Graph configured in root layout
- JSON-LD for Organization, Product, Breadcrumb, Article
- Blog posts target keywords like `industrial caster wheels Pakistan`, `electronic components supplier`, `mild steel plates price`
- Admin blog includes a **Suggest SEO meta** helper
- Code comments document meta description hints and internal linking strategy

## License

Private — Nidus Trading.
