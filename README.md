# Aditya Madhok — Portfolio

A light, editorial portfolio for **Aditya Madhok**, a web designer and
developer building modern websites for businesses.

The site presents a small, honest catalogue of live work — currently a
multi-category business storefront and a 3D fashion e-commerce remake —
with a clear note that more websites are in progress.

Design intent: white space first, one idea per screen, quiet type, a single
warm accent, and no decorative 3D background.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, `clsx` + `tailwind-merge` + `cva` |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Icons | `lucide-react` (plus a small local brand-icon set) |
| Tests | `@playwright/test` |

---

## Getting started

```bash
npm install
cp .env.example .env.local     # optional — the site runs without it
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint over `src` and `tests` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Playwright suite (desktop + mobile) |
| `npm test:desktop` | Playwright, desktop project only |
| `npm test:ui` | Playwright with the HTML report |

The Playwright config starts the dev server automatically if one is not
already running. Point the suite at an existing deployment with:

```bash
PLAYWRIGHT_BASE_URL=https://your-deployment.vercel.app npm test
```

---

## Content

All content lives in typed data files. Nothing about a website, service or
link is hardcoded inside a component.

```
src/data/
├── projects.ts    the website catalogue — the single source of truth
├── skills.ts      capabilities, grouped and linked to websites
├── services.ts    Topmate consultations and digital products
├── experience.ts  the timeline, journey, education, credentials and links
└── articles.ts    published writing
```

### Adding a website

Add a record to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-website",                 // becomes /projects/my-website
  title: "My Website",
  description: "One line for the card and the project page.",
  category: "Business & Commerce Website",
  tags: ["Web Design", "E-commerce"],
  technologies: ["Responsive Web Design", "Storefront Architecture"],
  status: "Live",
  problem: "What was not working.",
  solution: "What the redesign does differently.",
  implementation: "How it was built.",
  details: [{ label: "Client", value: "..." }],
  pipeline: ["Research", "Structure", "Build", "Launch"],
  liveUrl: "https://example.com/",
  featured: true,
  accent: "amber",                    // amber | cyan | violet
}
```

The home page, library, project pages, sitemap and metadata all read from
the same array, so one record is enough.

### Writing

Keep every claim honest. If a URL cannot be verified, leave it out rather
than guessing — the UI hides links that are not present. If a status is
uncertain, say so.

---

## Design notes

- The whole site runs on a light theme (`src/app/globals.css`).
- Sections share a 1180px editorial frame with generous vertical padding.
- Surfaces are white or warm off-white, separated by hairlines rather than
  heavy borders or background patterns.
- Primary actions are black pills; amber and teal are used sparingly for
  labels, status and small accents.
- Motion is limited to quiet fades and colour transitions, and respects
  `prefers-reduced-motion`.
