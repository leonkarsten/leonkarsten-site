# Working notes for Claude Code

Read `docs/handover.md` first for current state, decisions and the task list.
`README.md` has the layout, routes and content rules.

## Ground rules

- Static Astro 7 site on GitHub Pages. No server-side features. If something needs a
  backend, propose an external service (Giscus, Formspree, Plausible) rather than building one.
- Design tokens are CSS variables in `src/styles/global.css`. Change colours there, never inline.
  `:root` is the warm print theme; `[data-theme='night']` is the synthwave theme used by Games.
- Retro lives in the accents only: stripe motif, Righteous on headings, the palette, light grain.
  Body text stays Inter and high-contrast. No scanlines, neon glow or animated grids outside Games.
- The hero ribbon (`src/components/Ribbon.astro`) keeps geometrically clean edges. Wear is flecks
  and scratches only; no displacement or edge warping (explicitly rejected by Leon).
- `public/apps/` and `public/play/` hold built apps from other repos. Never edit those builds here;
  rebuild in the source repo and re-import (`scripts/import-sankey-studio.ps1`).
- Privacy: no photos or real data about Leon or his family anywhere in the repo, including sample
  data inside bundled apps. Check what a tool loads by default before copying it in.
- Do not mention Claude, Claude Code or AI tooling in any visitor-facing copy (pages, posts,
  guides, footer, metadata). Repo-internal files like this one are fine.
- Posts and guides default to `draft: true` until Leon says they are ready.
- Keep `package-lock.json` committed; the deploy uses `npm ci`.
- Windows machine. Scripts are PowerShell. Line endings: LF in the repo (`core.autocrlf false`).

## Verify before finishing

`npm run build` must pass with no errors. Open the affected pages in the preview
(`npm run preview`) at desktop and phone width. Then update `docs/handover.md` so the next
session starts from the current state.
