# 🛒 বাজার দর (BazarDor)

**আজকের বাজারের দাম এক নজরে** — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার প্রতিদিনের দাম দেখুন, তুলনা করুন।

BazarDor is a fully responsive Bengali market-price tracker. It shows today's prices of 33 everyday products across 8 categories, highlights the day's top risers and fallers, and — for signed-in users — breaks every product down market-by-market with minimum, maximum, and average prices across Bangladesh.

🔗 **Live:** https://assignment07-tau.vercel.app
📦 **Repository:** https://github.com/rafidhasansydney/Assignment07

---

## ✨ Key Features

1. **📈 Daily Price Movers** — "আজ দাম বেড়েছে ▲" and "আজ দাম কমেছে ▼" sections automatically surface the top 6 risers and fallers of the day.
2. **🏪 Market-wise Price Breakdown** — every product detail page lists real prices across 12+ markets (কারওয়ান বাজার, সদর বাজার, …) with min / max / average summaries, computed live from the data.
3. **🔐 Authentication with BetterAuth** — email/password sign-up & sign-in on a Neon Postgres database, with session-aware navbar, protected product routes, and toast notifications for every auth action.
4. **🔎 Smart Category Browsing** — 8 category pages with a Bengali sort control (দাম: কম থেকে বেশি / বেশি থেকে কম) that sorts by numeric value behind Bengali numerals, plus skeleton loaders and friendly 404 empty states.
5. **📰 Live Price Ticker** — an infinite scrolling marquee under the navbar streaming every product's price and daily change (▲/▼) with color-coded movement.
6. **👤 Profile & Update Info** — a personal profile page and a dedicated update-info route that renames the account via BetterAuth's `updateUser`.
7. **📱 Fully Responsive** — mobile, tablet, and desktop layouts with collapsing grids, a scrollable category nav, and a stacking hero.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | UI, routing, server components, ISR caching |
| **TypeScript** | Type-safe data models and code |
| **Tailwind CSS 4** | Styling and responsive design |
| **DaisyUI 5** | Component library on top of Tailwind |
| **BetterAuth** | Email/password authentication & session management |
| **Neon Postgres** | Serverless database for users & sessions |
| **react-hot-toast** | Toast notifications |
| **Vercel** | Deployment & CI/CD on every push |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/rafidhasansydney/Assignment07.git
cd Assignment07

# 2. Install dependencies
npm install

# 3. Create .env.local with the variables below

# 4. Run the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string (pooled) |
| `BETTER_AUTH_SECRET` | Secret key for signing auth sessions |
| `BETTER_AUTH_URL` | Base URL of the deployed app |

### Database Schema

The BetterAuth tables (`user`, `session`, `account`, `verification`) are generated from `lib/auth-schema.sql`.

---

## 🌐 Data Source

Product and category data comes from the assignment API, with automatic fallback between two hosts:

```
https://api.api-store.workers.dev/api/bazardor
https://api.abcz.workers.dev/api/bazardor   (alternative)
```

Responses are cached for 5 minutes (Next.js `"use cache"` + `cacheLife`) so pages stay fast without stale prices.

---

## 📁 Project Structure

```
app/                # App Router pages (home, category, product, auth, profile)
components/         # Navbar, Ticker, ProductCard, UserMenu, skeletons…
lib/                # API client, Bengali utilities, BetterAuth setup
app/api/auth/       # BetterAuth route handler
```

---

<div align="center">
সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
</div>
