# Portfolio — Konstantinos Kalyvas

A modern personal portfolio built with Vue 3, Vuetify 4, and Vite. Deployed on GitHub Pages.

## Project Structure

```
├── public/                  # Static assets (copied as-is to dist)
│   ├── .nojekyll            # Disables Jekyll on GitHub Pages
│   ├── 404.html             # SPA redirect for GitHub Pages
│   ├── profile.png          # Profile avatar
│   └── resume.pdf           # Downloadable CV
├── src/
│   ├── App.vue              # Root component (nav, footer, router-view)
│   ├── main.js              # App entry point (Vue + Vuetify + Router)
│   ├── assets/              # Bundled assets (images, etc.)
│   ├── composables/
│   │   └── useContent.js    # Reactive content store (localStorage + defaults)
│   ├── data/
│   │   └── defaults.json    # Default portfolio content
│   ├── router/
│   │   └── index.js         # Vue Router config (history mode)
│   └── views/
│       ├── HomePage.vue     # Landing / hero page
│       ├── SkillsPage.vue   # Skills, certifications, reading list
│       ├── ProjectsPage.vue # Projects showcase
│       ├── ContactPage.vue  # Contact form / info
│       └── AdminPage.vue    # CMS admin panel (localStorage editor)
├── vite.config.js           # Vite config (base path, plugins)
├── package.json             # Scripts, dependencies
└── CHANGELOG.md             # Auto-generated changelog
```

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **Vuetify 4** (Material Design components)
- **Vite** (Build tool)
- **Vue Router** (History mode)
- **standard-version** (Semantic versioning)
- **Husky** (Git hooks for auto version bump)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment (GitHub Pages)

The site is deployed to `https://pateras95.github.io/cv/`.

### Deploy command

```bash
npm run deploy
```

This runs `vite build && npx gh-pages -d dist --dotfiles` which:
1. Builds the project into `dist/`
2. Pushes `dist/` to the `gh-pages` branch (including dotfiles like `.nojekyll`)

### Important configuration

| File | Setting | Purpose |
|------|---------|---------|
| `vite.config.js` | `base: '/cv/'` | Sets asset base path for the GitHub repo name |
| `src/router/index.js` | `createWebHistory(import.meta.env.BASE_URL)` | Router respects the base path |
| `public/.nojekyll` | (empty file) | Prevents Jekyll from ignoring `_` prefixed files |
| `public/404.html` | SPA redirect script | Redirects sub-routes back to index.html |

### GitHub Pages setup

1. Go to repo **Settings → Pages**
2. Set source to **Deploy from a branch**
3. Select branch: `gh-pages` / `/ (root)`
4. Run `npm run deploy`

## Versioning

Uses `standard-version` + a Husky `post-commit` hook:

- **Every commit** → auto-bumps patch version (e.g., 1.1.1 → 1.1.2)
- **`npm run release`** → bumps minor/major based on conventional commits, updates CHANGELOG, creates a git tag, and pushes

### Commit message format (Conventional Commits)

- `feat: ...` → minor bump
- `fix: ...` → patch bump
- `feat!: ...` or `BREAKING CHANGE:` → major bump
