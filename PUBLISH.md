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

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — Decisions (do not reopen)

| | |
|---|---|
| source | the markdown notes + `assets/*.svg` |
| editor | Obsidian |
| magazine | GitHub Pages, not github.com raw md |
| press | [Quartz](https://quartz.jzhao.xyz) — Obsidian wikilinks, callouts, folders |
| look | paper `#f4efe4`, desk `#d9d0c0`, ink / rust / blue / sage — [[AGENTS.md]] page 3 |
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
| paper | `#f4efe4` |
| desk | `#d9d0c0` |
| ink | `#241c14` |
| rust | `#b44a28` titles |
| blue | `#3d5f86` wikilinks |
| type | Georgia body, Bradley Hand titles, Menlo code |
| nav | folders as shelves — same list as [[00 how to read this]] |
| mark | `assets/in-06-mark.svg` at the top of the desk |
| home | 00, not PATH, not a changelog |

A drawing that is only a slogan table does not belong. Use / skip is **bullets** in the note.

---

## Page 6 — Next session (ordered)

Do **not** start a new 01. Publishing is freeze-legal.

1. **Spike** (page 3). Branch. Four checks. Stop if wikilink or SVG fails.
2. **Paper CSS** until 00 + linear look like leaves, not Quartz-default.
3. **Ignore list** locked (page 2).
4. **Actions + CNAME** (page 4). Empty Pages is fine until the spike is pretty.
5. **Ship the first walk:** 00, linear 01, logistic 01, train/test 01.
6. **Then `--all`:** rest of the sketchbooks. Same build, no extra personality.
7. Retire `scripts/note_to_html.py` only after Quartz has been the press for a while. Do not delete it on the spike day.

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
