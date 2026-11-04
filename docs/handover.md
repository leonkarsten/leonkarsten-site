# leonkarsten.com — handover

Last updated: 2026-11-03. Keep this file current: it is the shared state between
Claude (chat), Claude Code and Leon.

## What it is

Leon's personal "workshop" site: browser tools, retro games, writing (dated posts) and guides
(reference material, shown by last-updated). Deliberately mixed; no single theme.
Nothing personal: interests, facts, instructions, coaching, experiences only.

## Current state

- **Live:** https://leonkarsten.com — deploys on every push to `main` via
  `.github/workflows/deploy.yml` (GitHub Actions → Pages). First deploy 2026-11-01.
- **Repo:** `github.com/leonkarsten/leonkarsten-site`, public, on Leon's personal account
  `leonkarsten` (separate from his business GitHub account; keep it that way).
- **Local:** `C:\Users\leon\Documents\leonkarsten-site`. Node 24.
- **DNS:** registrar and DNS host is domains.co.za (nameservers `ns*.tld-ns.com/.net`).
  Root → GitHub's four A records; `www` → CNAME `leonkarsten.github.io`. No AAAA, no MX.
  Verified correct from public resolvers.
- **HTTPS:** working since 2 Nov 2026: Let's Encrypt certificate for leonkarsten.com (valid to
  31 Jan 2027, GitHub renews it), and http now redirects to https (Enforce HTTPS on).
- **Previous occupant:** the domain served Leon's wife's Wix site. Wix is disconnected and
  cancelled; nothing to migrate.
- **Sankey Studio** is imported at `public/apps/sankey-studio/index.html` (single-file Vite build,
  ~1.5 MB). Source repo: `C:\Users\leon\Documents\sankey-studio`. Since 3 Nov 2026 it draws
  Sankey AND chord diagrams (more charts Excel can't draw are on its `docs/chart-roadmap.md`);
  Leon kept the name. The tool page shows "What you can make" (one card per chart: line,
  analogy, use it when, you get, your sheet), "How to use it" steps and "Coming next", from the
  optional `charts`, `steps` and `coming` fields in `src/content/tools/sankey-studio.json`. That
  chart text is copied from the app's `src/charts.js`: change both together. Since 3 Nov a third chart,
  In & out (daily or weekly snapshots of a list), and the app's Content Security Policy refuses every
  network request (proven 0 of 6 attempts get out with it, 6 of 6 without).
- **Games:** source repo `C:\Users\leon\Documents\leonkarsten-arcade` (local only, no remote
  yet). Style: real 1980–85 raster arcade inside the screen (black, pixel sprites, bitmap font,
  attract mode, top-ten initials), synthwave only on the page around it; rules in that repo's
  `docs/style.md`. Import with `.\scripts\import-arcade.ps1 -Build`. Games, both ported from Leon's
  Qlaim arcade on 2026-11-01: **Lamplight** (`/play/lamplight/`, maze) and **Launch Window**
  (`/play/launch-window/`, word guessing, upright screen with on-screen letter keys) and **Dust Off**
  (`/play/dust-off/`, lunar lander), **Six Cities** (`/play/six-cities/`, missile defence) and **Fence**
  (`/play/fence/`, territory), **Say Again** (`/play/say-again/`, memory) and **Loading Bay**
  (`/play/loading-bay/`, crate puzzle) and **House Call** (`/play/house-call/`, action; egg sacs
  moved to head height because the Qlaim height was unreachable) and **Sorted** (`/play/sorted/`,
  bead puzzle) and **Two Hills** (`/play/two-hills/`, artillery, CPU opponent added) and **No Crossing**
  (`/play/no-crossing/`, light-trail duel, CPU opponent added) and **Last Line** (`/play/last-line/`,
  dots and boxes, CPU opponent added) and **Kings Row** (`/play/kings-row/`, checkers, CPU opponent
  added) and **Wings Level** (`/play/wings-level/`, tilt maze; real tilt needs a phone to test) and **Soft Focus**
  (`/play/soft-focus/`, hidden-picture dots), all thirteen
  built overnight 1-2 Nov while Leon slept. **Supply Line** (`/play/supply-line/`, 2 Nov) is the first ORIGINAL
  game, not a Qlaim port: a lane battle (trucks, rifles, rockets, tanks, turrets, two HQs) made after the
  Command & Conquer fan page; same rules and money for both sides, exactly mirrored field, CPU improves by
  playing better each round. Leon has
  seen Lamplight live; neither has been played through on his iPhone yet. Card pictures: each game draws its own 4:3 card (`npm run cards` in the arcade repo
  saves `cards/<slug>.png`); the import copies it to `public/play/<slug>/card.png` and the
  catalogue entry's optional `image` field shows it on `/games/`.
- **Fan page:** `/games/command-and-conquer/` (2 Nov), Red Alert 2 and Renegade: Leon's own words
  on why he plays them, facts checked against sources, where to play them today, linked from the
  Games page. Pictures are original pixel art drawn as SVG from text grids (`src/lib/pixels.ts`,
  `src/components/Pixels.astro`, the arcade's 5x7 font plus `&`); never EA logos, box art,
  screenshots or unit sprites, and the footer says it is unaffiliated. Art pixels stay whole CSS
  pixels at every width (`--px` per breakpoint), checked at 14 widths from 320 to 1280.
  Astro drops a space between text and a link that starts a new line: keep such links on one line.
- **Content:** one draft post and one draft guide, both `draft: true` placeholders. About page
  has a bracketed contact placeholder.
- **Post LIVE 3 Nov 2026:** `writing/what-happened-to-westwood.md`, linked from the fan page's
  "Play them today" list. Leon: the post must NOT mention the MBA or that it was an assignment
  (it is his own work, his to publish). It began as his 2025 assignment on EA, rewritten for gamers. Every fact was checked against a source,
  with APA 7 in-text citations and a `## References` list (global.css gives it a hanging indent;
  `.prose a` now wraps long URLs, which had pushed phone pages sideways). It corrects three things
  in the original assignment: the 2020 margin was a Swiss tax benefit, not COVID; Ultimate Team
  (2009) came before Mass Effect 3; and Activision was bought, not shut down. No EA images, and no
  cover page or student number. Published on Leon's go; linked from
  the fan page (done).

## Architecture

```
src/
  pages/           index, tools/ (index + [slug] info pages), games/, writing/ (index + [id]),
                   guides/ (index + [id]), about, rss.xml.ts, 404
  layouts/Base.astro          <head>, fonts, grain overlay, Nav, Footer; takes theme + section
  components/      Nav, Footer, Ribbon (hero + worn filter), SectionCard, PageHead, EntryList
  content/
    writing/*.md   title, summary, date, tags, draft
    guides/*.md    title, summary, updated, tags, draft
    tools/*.json   name, slug, summary, app (path under /public), repo?, version?, updated?, tags
    games/*.json   same schema
  content.config.ts
  styles/global.css           all design tokens; print theme on :root, night on [data-theme='night']
public/
  apps/<slug>/     built tools (the app itself; /tools/<slug>/ is the *about* page)
  play/<slug>/     built games
  CNAME            leonkarsten.com
scripts/import-sankey-studio.ps1   copies sankey-studio/dist/index.html in; -Build rebuilds first
```

Routes: `/tools/<slug>/` describes a tool, `/apps/<slug>/` runs it. Same split for games
(`/games/` lists, `/play/<slug>/` runs). This split exists because a page and a public file at
the same path collide in Astro.

## Design decisions (settled — don't relitigate without Leon)

- Direction A: warm 70s/80s print retro as the base; the Games section flips to a synthwave
  night theme. "Retro in the accents, modern in the bones."
- Palette from the stripe references: navy `#1b3a5c`, teal `#3c8d9e`, light teal `#7db9c1`,
  cream `#f6e3bb`, peach `#f7c78e`, mustard `#f2c35b`, orange `#f2994a`, red `#e8542f`,
  on paper `#f6ecd8`. Night: purple `#130b30` with cyan/violet/pink/peach/yellow.
- Each section owns a colour: Tools teal, Games orange, Writing red, Guides mustard.
- Type: Righteous (display, headings only) + Inter (everything else). Google Fonts.
- Hero: the seven-band ribbon *is* the hero, full-bleed, text over it. Worn-print texture is an
  SVG filter (flecks + scratches, no displacement). Leon rejected a version with warped edges.
- Paper grain overlay at 9% (5% on night).
- Mockups are on the Claude Design canvas "leonkarsten.com mockups" (two artboards: Home, Games).

## Open tasks, in rough priority

1. ~~HTTPS~~ done 2 Nov (certificate issued, Enforce HTTPS on).
2. **Contact method** on `/about/` (replace the bracketed placeholder). Leon to decide:
   email alias, form service, or link.
3. **First real post and guide.** Edit the placeholders in `src/content/writing/` and
   `src/content/guides/`, set `draft: false` when Leon approves. The guide should be drafted from
   the Sankey Studio README.
4. **Sankey Studio retro themes** — brief at `sankey-studio/docs/retro-theme-brief.md` (in the
   Sankey repo, not this one). After that ships, rerun `scripts/import-sankey-studio.ps1 -Build`
   here and push.
5. **Games.** Sixteen are live (Supply Line, 2 Nov, is new and untested by Leon); fifteen were (Lamplight, Launch Window, then thirteen built overnight 1-2 Nov).
   Next, for Leon:
   - Play them on his iPhone with sound on; decide on the CRT switch. Nobody has heard the sound.
   - **Wings Level** real tilt and **Soft Focus** (whether eyes fuse the pixel stereogram) can only
     be checked by a person; the checks cover the d-pad/keys path and that the dots encode the shape.
   - **Lamplight**'s walker changed on 4 Nov (Leon: too hard once it sees you): always a little slower than the player when hunting, forgets when out of sight, and a flare (Space or START) makes it flee and lets you banish it. The Qlaim cabinet keeps the old walker.
   - **House Call** has ONE RULE CHANGED from Qlaim: egg sacs hang at head height, because at the
     Qlaim height no spray could reach them (proved in the arcade repo's `test-house.mjs`). The
     Qlaim cabinet still has the bug.
   - **Not ported, deliberately:** Red Doors (Leon's notes: "plays like Elevator Action"), Rock
     Field (Asteroids' exact rock scores 20/50/100, saucer, hyperspace, heartbeat, extra life at
     10,000) and Sky March (Space Invaders' 11x5, 30/20/10, mystery ship, bunkers, four-note
     march). They are recreations of specific games rather than games in a genre; Leon to decide.
   - Two Hills, No Crossing, Last Line and Kings Row gained CPU opponents; the Qlaim two-phone
     mode needs Qlaim's server and was not carried over.
   - The arcade repo (`Documents/leonkarsten-arcade`) has no GitHub remote yet.
   The "How these are made" box links to Writing, which has no build notes yet.
6. Optional: raise DNS TTLs from 600 to 3600 once everything is stable; add a privacy-respecting
   page counter (Plausible or GoatCounter), never Google Analytics.

## Things that bit us (so they don't again)

- GitHub workflow files can't be written through the remote file bridge; they were delivered as
  `scripts/deploy.yml.txt` and moved by hand. Already in place now.
- `npm ci` fails without `package-lock.json`. It's committed; keep it.
- Windows had the business GitHub account's credentials cached; `cmdkey /delete:git:https://github.com`
  then re-auth as `leonkarsten`.
- domains.co.za's DNS panel was a dead letter while the nameservers pointed at Wix. Always check
  `Resolve-DnsName <domain> -Type NS -Server 8.8.8.8` before editing records.
