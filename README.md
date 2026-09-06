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

Start at the front door: [`00 how to read this.md`](00%20how%20to%20read%20this.md) — leftover, four classrooms, pick a 01.

Then:

1. [Linear regression](supervised%20learning/regression/01%20linear%20regression.md) — cloud → straight line
2. Or jump: leftover on new people ([train / test](fundamentals/01%20train%20test%20validate.md)), yes/no ([logistic](supervised%20learning/classification/01%20logistic%20regression.md))

This is a **library**, not a ladder. File sort is reading order *inside a family*. Writers’ map: [`PATH.md`](PATH.md). LLMs are one room in a later wing, not the building.

## Layout

```
00 how to read this.md  front door (leftover, four classrooms)
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
fundamentals/            01–03  train / test; bias vs variance; metrics
assets/                drawings (prefix per series: lr-, rr-, dt-, nn-, …)
html/                  browser zines (prototype: linear 01). recipe in html/README.md
scripts/note_to_html.py  markdown note → paper leaf (live SVG)
AGENTS.md              how to write the next note
PATH.md                which shelf is next
```

**Next brick:** remaining rooms, short. Order not locked. SVM, Bayes (road to PyMC), RL belong. Not PyMC / PPO as 01.

## Viewing

Clone, then **Open folder as vault** in Obsidian. Note-to-note wikilinks (`[[01 linear regression]]`) work there.

Drawings use ordinary markdown images (`![](…svg)`), so they also render on GitHub.

A browser leaf (same paper, live SVG): [`html/01 linear regression.html`](html/01%20linear%20regression.html). That layout is the seed of datazines.com.
