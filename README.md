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

House style lives in [`AGENTS.md`](AGENTS.md). The map of shelves — what exists, what to write next — lives in [`PATH.md`](PATH.md).

## How to read

File sort order **is** reading order. Start here:

1. [Linear regression](supervised%20learning/regression/01%20linear%20regression.md) — cloud → straight line
2. Walk the rest of **regression** (ridge, lasso, elastic-net, LARS, GLM)
3. Then **classification**, **ensembles**, **gradient descent**, **distributions**

Or open [`PATH.md`](PATH.md) and treat it as the library map. LLMs are one room in a later wing, not the building.

## Layout

```
supervised learning/
  regression/          01–06  line, tax, shortlist, mix, walk, glasses for y
  classification/      01–03  S, blobs, softmax
  ensembles/           01–04  tree, forest, leftover-chain, boosting dialects
optimization/          01     gradient descent
probability/           01     distributions
assets/                drawings (prefix per series: lr-, rr-, dt-, …)
AGENTS.md              how to write the next note
PATH.md                which shelf is next
```

**Next brick:** a tiny neural net. Not SVM, not attention yet.

## Viewing

Clone, then **Open folder as vault** in Obsidian. Note-to-note wikilinks (`[[01 linear regression]]`) work there.

Drawings use ordinary markdown images (`![](…svg)`), so they also render on GitHub.
