---
tags:
  - sketchbook
  - agents
aliases:
  - Handoff
  - Session receipt
---

# Handoff — 6 Sep 2026 (evening)

> [!abstract] In one sentence
> Encyclopedia still **frozen**. Today: human door cleaned, press nests leaves and **clicks wikilinks**, every sketchbook converted. Next: **debug-read the HTML**, then a desk on datazines.com.

Read [[AGENTS.md]] for *how*. Read [[PATH.md]] for *what exists*. A human’s door is [[00 how to read this]]. This file is what closed today, and what the next session may do.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — Freeze (unchanged)

**Do not write:** a new 01, a new family folder, BSTS, policy-as-04, k-NN, naive Bayes, A/B, F1/ROC, PyMC, PPO, tokenizer-as-wing, a second LLM.

**Do:** bugfix drawings and numbers; tighten prose; stdout **run**, not guessed; HTML zines; desk for [datazines.com](https://datazines.com).

Ridge / lasso / LARS: do not shorten unless asked. Notes **English**. No emoji in the zines. One paper, whole site — not a palette per wing.

---

## Page 2 — What closed today

**Door ([[00 how to read this]]):** reader-only. No PATH / AGENTS / HANDOFF. Shelves = **folders**. Leftover is the voice, not the map. Four piles named by **job**, not two 80s:

| class | *y* | *n* (side fact) |
|---|---|---:|
| **the line** | grade | 8 |
| **twins** | grade + minutes | 30 |
| **pass / fail** | yes / no | 80 |
| **unlabeled** | none | 80 |

Do **not** bump one crowd to 100 to dodge the double 80. Headcounts live in the notebooks; the door leads with the job.

**Copilot review:** skip interview-trap boxes, glossary, classroom stamps. Two beats landed: ridge page 9 (λ = 0 vs huge λ); logistic page 4 (2h 1:1 → +1 hour ×3 odds → 75/25).

**Press (`scripts/note_to_html.py`):**

- `html/` **mirrors the vault** (`html/supervised learning/regression/01 linear regression.html`).
- Images climb to vault `assets/` (`../` × depth).
- `[[01 logistic regression]]` → `<a href>` to that leaf. Aliases resolve. Writer maps stay spans.
- `--all` converts every sketchbook. Skip PATH, AGENTS, HANDOFF, README, Copilot Feedback, hidden folders.
- **37 leaves** written. Flat `html/01 linear regression.html` removed.

Recipe: [[html/README.md]]. Debug-read from [[html/00 how to read this.html]].

---

## Page 3 — Site (still the product)

Vault = source. HTML = leaf. **SVG, never PNG.** Not a blog theme. One style, whole desk.

**Standing:** nested `html/` tree, links between converted zines, drawings if you open from a file URL that can still see `assets/` (or serve repo root).

**Standing also:** desk `html/index.html` — folder nav, zine in a borderless frame. `file://` works. Same paper. Not a unique homepage personality.

**Not yet:**

- GitHub Pages wiring (`.nojekyll`, custom domain, web root so `/assets/` and nested html both resolve).
- Watcher / “convert only what changed” — full `--all` is seconds; forgetting to convert is the real cost.

**GitHub Pages:** good host for **HTML + assets**. github.com markdown is **not** the magazine (wikilinks won’t walk). Prefer Pages over Jekyll-from-md.

**First ship, when the leaves look right:** 00 as door; linear 01, logistic 01, train/test 01 as the first walk; then the rest. Do not wait for BSTS.

---

## Page 4 — Next session

1. Open HTML in a browser. Walk wikilinks from 00. Check a nested leaf (regression) for drawings.
2. Fix converter bugs you actually see (broken href, wrong `../` count, MathJax). Do not restyle as a blog.
3. Optional: tiny index generator (same paper CSS) — not a unique homepage personality.
4. Pages: `.nojekyll`; decide web root (`html/` vs repo root) so assets and links both live.
5. Still freeze. Still no new rooms.

---

## Last page — cheat sheet

| | |
|---|---|
| freeze | no new wings / rooms |
| allowed | bugs, refine, HTML |
| door | [[00 how to read this]] — folders are shelves; leftover is the voice |
| press | `python3 scripts/note_to_html.py --all` |
| leaves | `html/<vault folders>/<stem>.html` |
| links | wiki → sibling leaves |
| browser start | [[html/00 how to read this.html]] |
| host | GitHub Pages for HTML, not for raw md as the zine |
| next | debug-read → desk on datazines.com |

### Use / skip

**Reach for this file** at the start of a session during the freeze.

**Skip** opening PATH to pick a new 01. Skip emoji. Skip a second palette.

---

*Handoff 6 Sep 2026, evening. Rooms frozen. Leaves nested. Next: read them in a browser.*
