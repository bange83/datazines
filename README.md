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

House style lives in [`AGENTS.md`](AGENTS.md). The map of shelves lives in [`PATH.md`](PATH.md). **Freeze:** no new rooms. The product is **[datazines.com](https://datazines.com)**. Publishing: [`PUBLISH.md`](PUBLISH.md).

## How to read

Start at the front door: [`00 how to read this.md`](00%20how%20to%20read%20this.md) — folders are shelves, read 01.

Then:

1. [Linear regression](supervised%20learning/regression/01%20linear%20regression.md) — cloud → straight line
2. Or jump: leftover on new people ([train / test](fundamentals/01%20train%20test%20validate.md)), yes/no ([logistic](supervised%20learning/classification/01%20logistic%20regression.md))

This is a **library**, not a ladder. File sort is reading order *inside a family*. Writers’ map: [`PATH.md`](PATH.md). LLMs are one room in a later wing, not the building.

## Layout

```
00 how to read this.md  front door (folders are shelves; leftover is the voice)
supervised learning/
  regression/          01–06  line, tax, shortlist, mix, walk, glasses for y
  classification/      01–04  S, blobs, softmax, SVM
  ensembles/           01–04  tree, forest, leftover-chain, boosting dialects
optimization/          01     gradient descent
probability/           01–02  distributions, beta (coin’s cousin)
neural nets/           01–04  tiny net, embeddings, attention, one LLM
inference/             01–02  t-test, bootstrap (leftover replayed)
causal/                01–02  confounding, causal impact (actual − would-have)
time series/           01     lag, trend, season
unsupervised/          01–02  PCA, k-means (no y; sausage, then rooms)
fundamentals/            01–03  train / test; bias vs variance; metrics
bayes/                 01–02  prior; MCMC (walk the height)
rl/                    01–03  the loop; bandits; Q (the table)
assets/                drawings (prefix per series: lr-, rr-, dt-, nn-, …)
scripts/note_to_html.py  old press (do not commit html/). Site: PUBLISH.md
AGENTS.md              how a note is shaped (freeze: no new rooms)
PATH.md                map of what exists
PUBLISH.md             Quartz + GitHub Pages; markdown stays source
```

**Freeze:** no new wings. Next: fix, refine, then magazine leaves on datazines.com. [`PUBLISH.md`](PUBLISH.md).

## Viewing

Clone, then **Open folder as vault** in Obsidian. Note-to-note wikilinks (`[[01 linear regression]]`) work there.

Drawings use ordinary markdown images (`![](…svg)`), so they also render on GitHub.

The magazine is GitHub Pages, not raw GitHub markdown (wikilinks won’t walk). Plan: [`PUBLISH.md`](PUBLISH.md).
