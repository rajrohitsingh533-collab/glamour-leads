# 🌸 Glamour Glow — Lead Generation Web App

A production-ready lead generation platform for a cosmetic brand, built with **Next.js 15** (App Router), **Tailwind CSS v4**, and **Supabase**.

---

## ✨ Features

| Feature | Details |
|---|---|
| Landing Page | Hero · About · Benefits · Testimonials · Lead Form |
| Lead Capture | Validated form → Supabase PostgreSQL |
| Admin Auth | Supabase email/password login |
| Admin Dashboard | Search · Sort · Delete leads · Export CSV |
| Email Alerts | Resend integration (optional) |
| Deployment | Vercel-ready |

---

## 🚀 Quick Start

### 1. Clone / Open the Project

```bash
cd "glamour-leads"
```

### 2. Create a Supabase Project

1. Go to **[https://supabase.com](https://supabase.com)** → New Project
2. Copy your **Project URL** and **anon public key** from:
   - Settings → API → Project URL
   - Settings → API → Project API keys → `anon public`

### 3. Set up the Database

In your Supabase project → **SQL Editor** → New query → paste and run:

```sql
-- Create leads table
CREATE TABLE public.leads (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  phone      TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  message    TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a new lead (public form)
CREATE POLICY "Allow public insert"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated admins to read all leads
CREATE POLICY "Allow auth select"
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated admins to delete leads
CREATE POLICY "Allow auth delete"
  ON public.leads
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 4. Create Admin User

In Supabase dashboard → **Authentication** → **Users** → **Add User**:
- Set email + password for the admin account
- No code changes needed

### 5. Configure Environment Variables

Copy `.env.local` (already created) and fill in your values:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Optional – for email notifications
RESEND_API_KEY=re_xxxx
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
glamour-leads/
├── app/
│   ├── (public)/          # Public routes (landing page)
│   │   ├── layout.tsx     # Navbar + Footer shell
│   │   └── page.tsx       # Landing page (assembles all sections)
│   ├── login/
│   │   ├── page.tsx       # Admin login form
│   │   └── actions.ts     # signIn / signOut server actions
│   ├── admin/
│   │   ├── layout.tsx     # Auth guard (redirects if not logged in)
│   │   ├── page.tsx       # Dashboard — stats + leads table
│   │   └── actions.ts     # deleteLead server action
│   ├── api/
│   │   └── notify/
│   │       └── route.ts   # POST — email notification via Resend
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Design tokens, animations, utilities
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Benefits.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactSection.tsx
│   │   └── LeadForm.tsx   # Form with Zod validation + Supabase insert
│   ├── admin/
│   │   ├── AdminNav.tsx   # Top bar with sign-out
│   │   └── LeadsTable.tsx # Search / sort / delete / CSV export
│   └── ui/
│       ├── Navbar.tsx     # Sticky responsive navbar
│       └── Footer.tsx
├── lib/
│   └── supabase/
│       ├── client.ts      # Browser client
│       └── server.ts      # Server client (RSC / Server Actions)
├── types/
│   └── lead.ts            # Lead interface + Zod schema
├── utils/
│   ├── formatDate.ts
│   └── exportCsv.ts
├── middleware.ts           # Auth guard + session refresh
└── .env.local             # Environment variables (fill in yours)
```

---

## 🌍 Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — GitHub Import

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables in Vercel dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (optional)
   - `ADMIN_EMAIL` (optional)
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL)
5. Click **Deploy** 🚀

---

## 🔐 Security Notes

- **RLS is enabled**: unauthenticated users can **only insert** leads — they cannot read or delete.
- **Admin route** is protected by both middleware and server-side session check in layout.
- Admin user is created manually in Supabase (no self-registration on the site).
- `.env.local` is in `.gitignore` by default — never commit it.

---

## 📧 Email Notifications (Optional)

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify your sender domain
3. Create an API key
4. Set `RESEND_API_KEY` and `ADMIN_EMAIL` in `.env.local`

When a new lead submits the form, a notification email is sent to `ADMIN_EMAIL` with all the lead details and a link to the admin dashboard.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Validation | Zod + react-hook-form |
| Email | Resend (optional) |
| Deployment | Vercel |
