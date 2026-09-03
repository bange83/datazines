---
tags:
  - sketchbook
  - statistics
  - ml
  - agents
aliases:
  - Encyclopedia path
  - What to learn next
  - Path to LLMs
---

# Path — a library, not a ladder

> [!abstract] In one sentence
> This series is a **data-science encyclopedia** in sketchbooks. LLMs are **one room in the nets wing**, not the building. Walk wings in order so later rooms don’t go hollow.

![[private/data science/assets/pa-00-hero.svg]]

House style lives in [[private/data science/AGENTS.md]]. This file is only **what to write next**, and how the shelves fit together.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — Two jobs, one voice

**Job A.** A readable encyclopedia: line, chance, tests, cause, optimization, nets, time, unsupervised. Simple terms. Real numbers. Use / skip.

**Job B.** Enough foundation that an LLM is not magic: *P(next token)* is softmax on a deep score, trained by walking downhill.

A is the building. B is a marked staircase through it. Do not skip A to finish B. Do not pretend B is the only staircase.

Same pencils as always. Same “one idea per page.” New family = new folder under `private/data science/` (or under `supervised learning/` only if it *is* supervised).

---

## Page 2 — The first wing is already standing

![[private/data science/assets/pa-02-done.svg]]

**Supervised learning** (done enough — do not fatten it):

- Regression 01–06: line, tax, shortlist, mix, walk, glasses for *y*
- Classification 01–03: S, blobs, **softmax**
- Ensembles 01–04: tree, choir, leftover-chain, boosting dialects

**Also standing (path page 4, done):**

- [[01 gradient descent]] — walk the bowl
- [[01 distributions]] — bell, coin, counts
- [[03 softmax]] — many-class S; LLM last layer

You already own: score, leftover, tax, squash, impurity, vote vs chain, learning rate (as volume). That is the furniture later wings reuse.

**Do not write next:** SVM, another boosting brand, kernel ridge, attention, a 12-page XGBoost. Next 01 is a **tiny net**. Side doors when a project knocks.

---

## Page 3 — The wings (encyclopedia)

Write **left to right**. Inside a wing, 01 is the ordinary idea.

| wing | folder (suggested) | 01 is | later rooms (not all at once) |
|---|---|---|---|
| **1. Supervised** | `supervised learning/…` | line, S, tree | *standing* |
| **2. Chance** | `probability/` then `inference/` | a distribution is a shape for leftovers | Gaussian, Bernoulli, Poisson (you met them in GLM); sampling; SE; CI; t-test / p-value; bootstrap |
| **3. Cause** | `causal/` | pattern ≠ mechanism (already a page) | confounding, DAGs, experiments vs obs; difference-in-differences / causal impact |
| **4. Walk** | `optimization/` | gradient descent | step size; local minima; SGD; Bayesian optimization as “search the knobs when the bowl is expensive” |
| **5. Nets** | `neural nets/` | a tiny net | softmax; embeddings; attention; transformer / LLM (one sketchbook, not a career) |
| **6. Time** | `time series/` | lag, trend, season | holdouts in time; simple forecast; *then* causal impact on a series |
| **7. Unsupervised** | `unsupervised/` | “no y” | PCA as rotating the cloud; k-means; a page on embeddings you already have |

Optional side doors, when a project knocks: SVM / margins, clustering extras, recommenders, RL. Not on the main walk.

---

## Page 4 — Those three rooms exist. Next is a tiny net.

![[private/data science/assets/pa-03-next.svg]]

**Written:** [[01 gradient descent]] · [[01 distributions]] · [[03 softmax]]

Stop arguing about transformers until a **tiny net** exists too.

**Next 01:** `neural nets/01 neural net` — one hidden layer on the exam (or the 3-class pile). Score → squash → score → squash. Backprop = leftover flowing backward.

Then embeddings, then attention, then **one** LLM sketchbook.

Chance wing in parallel: `inference/01 t-test` after distributions. **Do not** do attention before the tiny net.

---

## Page 5 — Staircase to “how LLMs work” (marked, not exclusive)

Reuse the encyclopedia; don’t clone it.

1. Line + leftover + tax *(have)*  
2. Logistic S *(have)*  
3. **GD** *(have)*  
4. **Distributions** + **softmax / cross-entropy** *(have)*  
5. Tiny net + backprop as leftover flowing backward *(next)*  
6. Embeddings (tokens as points in a cloud)  
7. Attention (which other tokens matter)  
8. Transformer block = attention + net, stacked; train = next token; use = sample from softmax  
9. Cheap extras as *pages*, not shelves: tokenizer, context window, temperature, pretrain vs chat

Weight decay = ridge. Dropout ≈ bagging. Pages, not wings.

---

## Page 6 — Other summits, same building

When someone says “we also need…” — they are usually **already on the map**:

| they want | lives in |
|---|---|
| t-test, p-value, “is this real?” | inference, after distributions |
| Bayesian optimization | optimization, after GD (expensive bowl) |
| causal impact | causal, after chance + a little time |
| A/B test | inference + cause (experiment) |
| forecast | time series |
| “why did the model do that?” | start: *b*, Gini gain, importances; later: a small explainability page — not SHAP as 01 |

Do not start a wing from the summit. Causal impact without confounding is a demo. Bayesian opt without GD is a slogan. LLM without softmax is a box cartoon.

---

## Page 7 — How to walk (for future sessions)

1. Open **this file**. Next room is page 4 until those three exist. Then the next empty 01 in the table on page 3.
2. One sketchbook per session if it is 01 of a wing. Sequels can be shorter.
3. Same story when the wing allows it (exam / grades) until the idea *needs* a new story (tokens, time).
4. Update the shelf table in [[private/data science/AGENTS.md]] when a note lands. Update **page 2 of this file** when a wing’s 01 exists.
5. If a topic is shiny (SVM, GAN, agents): ask “which wing, which 01 does it need?” If the 01 is missing, write that first.

If you keep only one thing:

> encyclopedia first. LLM is a room in the nets wing. next three: **descent, distributions, softmax.**

---

## Last page — cheat sheet

| | |
|---|---|
| building | data-science encyclopedia, sketchbook voice |
| LLM | one room, nets wing, after GD + softmax + a tiny net |
| standing | supervised: line, S, blobs, tree, forest, boosting |
| **next** | **01 neural net** (one hidden layer) |
| then | embeddings → attention → one LLM sketchbook |
| parallel | inference / t-test (chance wing) |
| don’t | SVM / XGB encyclopedia / attention as the next file |
| style | [[private/data science/AGENTS.md]] |

### Use / skip

**Reach for this file** at the start of a session: “what do we write?”

**Skip** turning this path into twelve empty stub notes. Write the next 01. Stubs rot.

---

*Map for the library. House rules stay in AGENTS. Next brick: a tiny neural net.*
