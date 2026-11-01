# Working notes for Claude Code

Read `README.md` first; it has the layout, routes and content rules.

- The site is static Astro on GitHub Pages. Do not add server-side features; if something
  needs a backend, propose an external service instead.
- Design tokens are CSS variables in `src/styles/global.css`. Change colours there, not inline.
- Keep the retro treatment to the accents: stripe motif, display font on headings, palette,
  light grain. Body text stays Inter and high-contrast. No scanlines, neon glow or
  animated grids outside the Games section.
- `public/apps/` and `public/play/` hold built apps from other repos. Never edit those builds
  here; rebuild in the source repo and re-copy (`scripts/import-sankey-studio.ps1`).
- Privacy: no photos or real data about Leon or family anywhere in the repo, including
  sample data inside bundled apps. Check what a tool loads by default before copying it in.
- Posts and guides default to `draft: true` until Leon says they're ready.
