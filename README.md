# leonkarsten.com

A personal workshop site: browser tools, retro games, writing and guides.
Static Astro site deployed to GitHub Pages on every push to `main`.

## Design

Warm "print retro" by default (cream paper, stripe palette, light grain), with the
Games section flipped to a synthwave "night" theme. Design tokens live in
`src/styles/global.css`; the night theme is the `[data-theme='night']` block.
The hero ribbon and its worn-print texture are `src/components/Ribbon.astro`.

Design mockups: the Claude Design canvas "leonkarsten.com mockups".

## Layout

```
src/
  pages/            routes (index, tools, games, writing, guides, about, rss, 404)
  layouts/Base.astro
  components/       Nav, Footer, Ribbon, SectionCard, PageHead, EntryList
  content/
    writing/*.md    blog posts  (title, summary, date, tags, draft)
    guides/*.md     reference   (title, summary, updated, tags, draft)
    tools/*.json    tool catalogue entries
    games/*.json    game catalogue entries
  content.config.ts schemas for the above
public/
  apps/<slug>/      self-contained tool apps (Sankey Studio etc.)
  play/<slug>/      self-contained games
  CNAME             custom domain for GitHub Pages
scripts/
  import-sankey-studio.ps1   copies sankey-studio/dist/index.html into public/apps
.github/workflows/deploy.yml GitHub Pages deploy
```

Routes: `/tools/<slug>/` is the *about* page for a tool; the app itself is at `/apps/<slug>/`.
Same split for games: `/games/` lists them, `/play/<slug>/` runs them.

## Local development

```
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

Node 24 (see `.nvmrc`).

## Adding content

- **Post:** add `src/content/writing/<id>.md` with frontmatter `title`, `summary`, `date`, `tags`, `draft`.
  `draft: true` keeps it out of the build. The `<id>` becomes the URL.
- **Guide:** same, in `src/content/guides/`, with `updated` instead of `date`.
- **Tool:** build the app so it is a self-contained folder, copy it to `public/apps/<slug>/`,
  then add `src/content/tools/<slug>.json` (`name`, `slug`, `summary`, `app`, optional `repo`, `tags`).
  For Sankey Studio: `.\scripts\import-sankey-studio.ps1 -Build`.
- **Game:** same as a tool, under `public/play/<slug>/` and `src/content/games/<slug>.json`.

## First deploy

1. Create a **public** GitHub repo (Pages on a free account needs public) and push this folder to `main`.
2. In the repo: Settings → Pages → Source: **GitHub Actions**. The workflow in
   `.github/workflows/deploy.yml` builds and deploys on every push.
3. The site is live at `https://<user>.github.io/<repo>/` within a minute or two.
   (Asset paths assume the custom domain; if you want the interim URL to look right,
   temporarily set `base: '/<repo>'` in `astro.config.mjs`.)

## Custom domain (leonkarsten.com)

`public/CNAME` already contains `leonkarsten.com`. At the registrar's DNS panel:

| Type  | Name | Value                      |
|-------|------|----------------------------|
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |
| CNAME | www  | `<user>.github.io`         |

Then in the repo: Settings → Pages → Custom domain → `leonkarsten.com` → Save, and tick
**Enforce HTTPS** once the certificate is issued (usually under an hour).
Remove any old A/CNAME records that point `@` or `www` at the previous host first.

## Privacy rules for content

No photos or real data about family or self. Interests, facts, instructions, coaching
and experiences only. Strip EXIF from any image before adding it. Analytics, if added,
should be a privacy-respecting counter (Plausible, GoatCounter), not Google.
