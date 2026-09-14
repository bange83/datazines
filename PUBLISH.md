---
tags:
  - sketchbook
  - agents
aliases:
  - Publish
  - GitHub Pages
  - Quartz
---

# Publish — markdown on GitHub Pages

> [!abstract] In one sentence
> Notes stay **markdown**. A **build** (Quartz) turns them into paper leaves. GitHub Pages hosts the build. Never commit a second `html/` copy next to the vault.

Read [[AGENTS.md]] for *how a note is shaped*. Read [[PATH.md]] for *what exists*. A human’s door is [[00 how to read this]]. This file is how the library becomes [datazines.com](https://datazines.com).

---

## Page 1 — Decisions (do not reopen)

| | |
|---|---|
| source | the markdown notes + `assets/*.svg` |
| editor | Obsidian |
| magazine | GitHub Pages, not github.com raw md |
| press | [Quartz](https://quartz.jzhao.xyz) — Obsidian wikilinks, callouts, folders |
| look | desk `#e8e3d8`, paper `#fdfbf7`, Caveat titles / Inter body — organic sketch panels |
| pictures | live SVG, never PNG |
| home | [[00 how to read this]] — library, not a feed |
| domain | datazines.com |
| not in the vault | generated HTML (the old `html/` folder is gone on purpose) |

github.com markdown is **not** the zine (`[[wikilinks]]` don’t walk). Quartz is the press. The vault is still the book.

**Do not:** Jekyll-from-md, a docs theme, Obsidian Publish as the long-term desk, WordPress, a blog index of dates.

---

## Page 2 — What to publish

**Leaves (the magazine):**

- `00 how to read this.md`
- every sketchbook under the folder shelves (`supervised learning/`, `fundamentals/`, …)
- `assets/` (all SVG)

**Writer maps (ignore in Quartz):**

- `AGENTS.md` · `PATH.md` · this file · `README.md` (GitHub greeting only)
- `scripts/` (old `note_to_html.py` — keep until Quartz is proven; do not run it as the site)

**First ship, when the spike looks like paper:**

1. [[00 how to read this]]
2. [[01 linear regression]]
3. [[01 logistic regression]]
4. [[01 train test validate]]

Then the rest. Do not wait for BSTS.

---

## Page 3 — Spike (do this first)

A **branch**, not a rewrite of the encyclopedia. Prove four things on **one nested note**:

1. `[[01 linear regression]]` from `00` becomes a click.
2. `![lr-00-hero](../../assets/lr-00-hero.svg)` renders (spaces in `supervised learning/`).
3. `> [!abstract]` is a callout, not a quote.
4. `$ŷ = a + b x$` is math.

**Recipe:**

1. Branch `pages-spike`.
2. Add Quartz **as a submodule or `npx`**, config at vault root — do not copy the notes into a second tree.
3. `quartz.config.ts`: `ignorePatterns` for writer maps; page title from the note `#` heading.
4. Custom CSS: paper body, Georgia, Bradley Hand titles, rust h1. Kill the default “digital garden” chrome.
5. Local: `npx quartz build --serve`. Open the door. Click linear. Check the hero SVG.
6. If the image path breaks: **one rewrite rule** in the builder, not hand-edits in 37 notes.

Stop when that walk works. Do not theme the whole library yet.

**Spike status (13 Sep 2026):** **walk works.** Press lives *beside* the vault, not inside it:

```
/Volumes/Samsung990/git/quartz-press   Quartz 5 clone (content/ → symlink to this vault)
```

Node 22 is needed (`~/.local/node` on this machine). `npx quartz create` was skipped; `quartz.config.yaml` was copied from the default and edited.

| check | result |
|---|---|
| `[[01 linear regression]]` from 00 | click: `./supervised-learning/regression/01-linear-regression` |
| nested SVG | **bug:** Quartz emitted `../.././../assets/lr-00-hero.svg`. Fix: `python3 fix-asset-paths.py` after build → `../../assets/lr-00-hero.svg` (file exists in `public/assets/`) |
| `> [!abstract]` | `<blockquote class="callout abstract">` |
| `$…$` math | KaTeX on the linear leaf |

Also: OG-image plugin **off**. Writer maps ignored (37 sketchbooks emitted). SPA / popovers / graph / darkmode / reader-mode / breadcrumbs **off**. YAML parsed with the properties panel hidden. Look: Caveat titles, Inter body, organic paper, **top-bar shelves** + content / TOC. Overlays live in `press/` and are copied onto a Quartz 5 clone at build. Nested SVG paths still need `fix-asset-paths.py`. Door: post-build copy of `00-how-to-read-this.html` → `index.html`.

Local preview: `export PATH="$HOME/.local/node/bin:$PATH"` then `cd /Volumes/Samsung990/git/quartz-press && npx quartz build && python3 fix-asset-paths.py && npx quartz build --serve` then open `/`.

---

## Page 4 — GitHub Pages (after the spike)

1. Repo → Settings → Pages → **GitHub Actions** (not “deploy from `/docs`”).
2. Workflow on `main` (or the pages branch): checkout → `npx quartz build` → upload `public/` as Pages artifact.
3. `CNAME` file: `datazines.com`. DNS at the registrar → GitHub.
4. `.nojekyll` in the build output (Quartz usually writes it).
5. Build output lives in CI / Pages — **never** committed as `html/` in the vault.

Custom domain checklist: HTTPS, `www` vs apex (pick one, redirect the other).

---

## Page 5 — Look (non-negotiable)

Quartz default is a garden. Restyle until a stranger would swear it is the same notebook:

| thing | rule |
|---|---|
| desk | `#e8e3d8` |
| paper | `#fdfbf7` |
| card | `#f3ebd9` |
| ink | `#2d2b2a` |
| muted | `#6e6862` |
| rust | `#c85a32` titles |
| blue | `#2b6cb0` wikilinks / active |
| pencil | `rgba(45, 43, 42, 0.35)` borders |
| type | Inter body, Caveat titles / nav, IBM Plex Mono code |
| panels | organic radius `20px 8px 18px 10px / 10px 18px 8px 20px`, 2px pencil, tiny tilt |
| nav | folders as shelves — same list as [[00 how to read this]] |
| brand | Caveat “datazines” + “one idea per page” |
| home | 00, not PATH, not a changelog |

A drawing that is only a slogan table does not belong. Use / skip is **bullets** in the note.

---

## Page 6 — Next session (ordered)

Do **not** start a new 01. Publishing is freeze-legal.

1. **Spike** (page 3). **Done** on branch `pages-spike`. Four checks pass after the asset-path rewrite.
2. **Paper CSS.** **Done.** Caveat + Inter, organic panels, top-bar shelves, content + TOC. Graph / darkmode off. 00 is `/`.
3. **Ignore list** locked (page 2). Press overlays live in `press/` (not emitted as notes).
4. **Actions + CNAME.** Workflow: `.github/workflows/pages.yml`. CI clones Quartz v5, overlays `press/`, builds, deploys `public/`. After merge to `main`: repo Settings → Pages → GitHub Actions. Custom domain `datazines.com` (CNAME emitter writes it from `baseUrl`). DNS at the registrar still needs the GitHub A / CNAME records.
5. **Ship the first walk:** 00, linear 01, logistic 01, train/test 01 — same build as `--all`.
6. Retire `scripts/note_to_html.py` only after Quartz has been the press for a while.

**Watch:**

- aliases on wikilinks (`[[Linear Regression]]` vs `[[01 linear regression]]`)
- `[[3]]` inside a sklearn printout must stay code, not a link
- nested `../../assets/` vs Quartz `assets/` root
- `$` / `$$` → KaTeX on

---

## Last page — cheat sheet

| | |
|---|---|
| source | markdown + SVG |
| press | Quartz |
| host | GitHub Pages (Actions) |
| door | [[00 how to read this]] |
| first walk | 00 · linear 01 · logistic 01 · train/test 01 |
| never | `html/` in the vault · blog theme · PATH as home |
| freeze | no new rooms. this file is the site to-do |

### Use / skip

**Reach for this file** when the notes should become datazines.com.

**Skip** treating it as “write BSTS.” Skip committing generated HTML. Skip restyling one leaf by hand.

---

*Publishing receipt. Notes stay the book. Quartz is the press. Pages is the desk.*
