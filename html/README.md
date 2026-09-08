---
tags:
  - sketchbook
  - agents
aliases:
  - HTML zine recipe
  - datazines.com
---

# HTML zines — the recipe for datazines.com

> [!abstract] In one sentence
> The vault is the source. HTML is a **leaf of paper in a browser**: same pencils, live SVG, no bitmaps. When the shelf is thick enough, that leaf *is* [datazines.com](https://datazines.com).

Prototype (open in a browser): [01 linear regression.html](01%20linear%20regression.html).

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — What this is for

Obsidian is how we **write**. GitHub is how we **store**. The site is how a stranger **reads**.

Do not hand-author HTML. The note stays markdown. A small script turns one note into one zine.

Destination: **datazines.com** — these sketchbooks as zines about data science. Not a blog. Not a docs theme. Paper, ink, one idea per page.

Ship the site when quantity and quality are both there. Until then: keep the converter honest on 01, then the rest of a shelf.

---

## Page 2 — The look (copy, do not freestyle)

Same palette as [[AGENTS.md]] page 3:

| pencil | hex | job |
|---|---|---|
| paper | `#f4efe4` | each leaf |
| desk | `#d9d0c0` | page behind the leaves |
| ink | `#241c14` | body |
| rust | `#b44a28` | titles, the thing we introduce |
| blue | `#3d5f86` | wikilinks, h3 |
| sage | `#4f6d55` | inline code |
| gold | `#c4a35a` | tip callout |
| muted | `#7a6e5e` | spine, captions |
| grain | `#efe8d8` | tables, code fences, callouts |

Type: Georgia for body. Bradley Hand (fallback Apple Chancery, Comic Sans MS) for titles. Menlo for code.

Each `## Page N` becomes a rounded **leaf**. Hero (h1 + abstract + drawing) is the first leaf. Drawings are `<img src="../assets/….svg">` — **SVG, never PNG**.

---

## Page 3 — Mini recipe

1. Note is done by house rules (hero, pages, sklearn mini with real stdout, Use / skip).
2. `python3 scripts/note_to_html.py "supervised learning/regression/01 linear regression.md"`  
   Whole library: `python3 scripts/note_to_html.py --all`  
   `--all` also writes the desk: `html/index.html` (folder nav; zine in a borderless frame). Same paper. Open the file — no server.
3. Opens as `html/<same folders as the note>.html` (e.g. `html/supervised learning/regression/01 linear regression.html`). Images climb to vault `assets/` (`../` × depth). Wikilinks are relative hrefs between leaves. Desk: open `html/index.html`.
4. Open the file in a browser. Check: hero drawing, a formula, the sklearn fence, Use / skip.
5. Do **not** rasterize SVGs. Do **not** inline a matplotlib PNG. Do **not** restyle because HTML “feels like a blog.”

Need `markdown` (`pip install markdown`). MathJax is loaded from a CDN in the page.

Spine line (the muted bit above the title) is `--spine`. Default is generic. The linear prototype used `datazines · sketchbook 01 · the line`.

---

## Page 4 — What the script actually does

`scripts/note_to_html.py`, in this order:

1. Strip YAML.
2. **Stash** fenced code so `[[3]]` inside sklearn is not a wikilink.
3. Obsidian callouts (`> [!abstract]`) → `<aside class="callout">`. Run `**bold**` / `*em*` inside them (markdown will not).
4. `[[01 logistic regression]]` → `<a class="wiki" href="…">` to that zine’s HTML leaf. Unknown / writer-map links (PATH, AGENTS, HANDOFF) stay a dotted span. Skip `[[3]]`.
5. `![alt](../../assets/foo.svg)` → `<figure class="drawing"><img src="../assets/foo.svg">`. Filename only; HTML always lives one folder down from `assets/`.
6. Horizontal rules between pages dropped (the leaf *is* the break).
7. Restore code fences. `markdown` with tables + fenced_code + sane_lists + nl2br.
8. Split on `<h2>`: preamble = hero leaf, each h2 = one leaf.
9. Wrap in the paper CSS. MathJax for `$…$` and `$$…$$`.

If a new note looks wrong, fix the **note** or this recipe. Do not patch one HTML file by hand — it will rot on the next run.

---

## Page 5 — Not yet (the site)

When we cut datazines.com:

- One URL per sketchbook, reading order from [[PATH.md]].
- A library index, not a feed.
- Same CSS. Same SVGs. Same numbers.
- Wikilinks become real hrefs between zines.
- Still no bitmap charts.

Do not start the site from a WordPress theme or a PDF. Start from this leaf.

---

## Last page — cheat sheet

| thing | rule |
|---|---|
| source | the markdown note |
| output | `html/<vault-relative folders>/<stem>.html` |
| pictures | live SVG from `assets/` |
| never | PNG, matplotlib default, hand-edited HTML |
| type | Georgia body, Bradley Hand titles |
| palette | paper / ink / rust — [[AGENTS.md]] |
| math | keep LaTeX, MathJax in the page |
| site | datazines.com — freeze the rooms, ship magazine leaves. [[HANDOFF.md]] |
| script | `scripts/note_to_html.py` |

### Use / skip

**Reach for this** when a note should be readable in a browser as a zine, or when we add the next HTML leaf toward the site.

**Skip** turning one pretty HTML file into a unique layout. Skip bitmaps “so the PDF works.” Skip building the whole site before the next leaf is asked for.

---

*Recipe for the paper leaf. Notes stay the source. The site is the same notebook, on the desk of the web.*
