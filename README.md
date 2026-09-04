# datazines

A data-science encyclopedia in sketchbooks. Paper, ink, one idea per page.

Open it as an [Obsidian](https://obsidian.md) vault. Notes are markdown. Drawings are hand-drawn SVGs in `assets/`.

![hero](assets/sb-00-hero.svg)

## What this is

Each note is a short notebook, not a textbook chapter:

- one running story (exam grades, pass/fail, leftover error)
- a picture before the formula
- a tiny sklearn (or numpy) example with **real** printed numbers
- a cheat sheet that says when to use the method and when to skip it

House style lives in [`AGENTS.md`](AGENTS.md). The map of shelves — what exists, what to write next — lives in [`PATH.md`](PATH.md). The long game is **[datazines.com](https://datazines.com)**: these sketchbooks as zines. HTML recipe: [`html/README.md`](html/README.md).

## How to read

File sort order **is** reading order. Start here:

1. [Linear regression](supervised%20learning/regression/01%20linear%20regression.md) — cloud → straight line
2. Walk the rest of **regression** (ridge, lasso, elastic-net, LARS, GLM)
3. Then **classification**, **ensembles**, **gradient descent**, **distributions**, **a tiny net**

Or open [`PATH.md`](PATH.md) and treat it as the library map. LLMs are one room in a later wing, not the building.

## Layout

```
supervised learning/
  regression/          01–06  line, tax, shortlist, mix, walk, glasses for y
  classification/      01–03  S, blobs, softmax
  ensembles/           01–04  tree, forest, leftover-chain, boosting dialects
optimization/          01     gradient descent
probability/           01     distributions
neural nets/           01–04  tiny net, embeddings, attention, one LLM
inference/             01–02  t-test, bootstrap (leftover replayed)
causal/                01–02  confounding, causal impact (actual − would-have)
time series/           01     lag, trend, season
unsupervised/          01–02  PCA, k-means (no y; sausage, then rooms)
assets/                drawings (prefix per series: lr-, rr-, dt-, nn-, …)
html/                  browser zines (prototype: linear 01). recipe in html/README.md
scripts/note_to_html.py  markdown note → paper leaf (live SVG)
AGENTS.md              how to write the next note
PATH.md                which shelf is next
```

**Next brick:** a side door when a project knocks. Not SVM as 01.

## Viewing

Clone, then **Open folder as vault** in Obsidian. Note-to-note wikilinks (`[[01 linear regression]]`) work there.

Drawings use ordinary markdown images (`![](…svg)`), so they also render on GitHub.

A browser leaf (same paper, live SVG): [`html/01 linear regression.html`](html/01%20linear%20regression.html). That layout is the seed of datazines.com.
