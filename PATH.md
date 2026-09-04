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

![pa-00-hero](assets/pa-00-hero.svg)

House style lives in [[AGENTS.md]]. This file is only **what to write next**, and how the shelves fit together.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — Two jobs, one voice

**Job A.** A readable encyclopedia: line, chance, tests, cause, optimization, nets, time, unsupervised, fundamentals, Bayes, RL. Simple terms. Real numbers. Use / skip.

**Job B.** Enough foundation that an LLM is not magic: *P(next token)* is softmax on a deep score, trained by walking downhill.

A is the building. B is a marked staircase through it. Do not skip A to finish B. Do not pretend B is the only staircase.

Same pencils as always. Same “one idea per page.” New family = new folder at vault root (or under `supervised learning/` only if it *is* supervised). **Language of the notes is English**, even when the chat is German.

---

## Page 2 — The first wing is already standing

![pa-02-done](assets/pa-02-done.svg)

**Supervised learning** (01–06 / 01–03 / 01–04 standing — do not fatten *those* notes; SVM still belongs, **short**):

- Regression 01–06: line, tax, shortlist, mix, walk, glasses for *y*
- Classification 01–03: S, blobs, **softmax**
- Ensembles 01–04: tree, choir, leftover-chain, boosting dialects

**Also standing (path page 4, done):**

- [[01 gradient descent]] — walk the bowl
- [[01 distributions]] — bell, coin, counts
- [[03 softmax]] — many-class S; LLM last layer
- [[01 neural net]] — one hidden layer; leftover walks home
- [[02 embeddings]] — a word is a point; nearby = same notes
- [[03 attention]] — look around, share 1, mix
- [[04 LLM]] — P(next token); this block, stacked
- [[01 t-test]] — could leftover have faked this number?
- [[01 confounding]] — pattern ≠ mechanism; a loud *b* can be a passenger
- [[02 bootstrap]] — redraw the people; the pile is leftover
- [[01 lag trend season]] — yesterday is a lever; the calendar repeats
- [[02 causal impact]] — actual − would-have, after a start date
- [[01 PCA]] — no y; turn the sausage; drop the thin axis
- [[02 k-means]] — no y; paint k rooms; you pick k

You already own: score, leftover, tax, squash, impurity, vote vs chain, learning rate (as volume), a tiny net, a lookup table of points, a look, a next-token pile, a judge for a mean and a slope, see vs do, leftover replayed without a bell, a series with a holdout in time, a gap vs would-have, a cloud with no grade, rooms in that cloud. That is the furniture later wings reuse.

**Order, not a ban.** SVM, kernels, MCMC, BSTS, another boosting dialect, fundamentals, Bayes, RL — they belong in the building. Write them **after** their 01, **short**. Do not start a wing from the summit. Do not fatten one brand into a second textbook. Ridge / lasso / LARS stay as written until someone asks to cut.

---

## Page 3 — The wings (encyclopedia)

Write **left to right**. Inside a wing, 01 is the ordinary idea.

| wing | folder (suggested) | 01 is | later rooms (not all at once) |
|---|---|---|---|
| **1. Supervised** | `supervised learning/…` | line, S, tree | *standing*; still due, **short**: SVM / margin |
| **2. Chance** | `probability/` then `inference/` | a distribution is a shape for leftovers | Gaussian, Bernoulli, Poisson; **beta** (coin’s cousin); sampling; SE; CI; t-test / p-value; bootstrap |
| **3. Cause** | `causal/` | pattern ≠ mechanism (already a page) | confounding, DAGs, experiments vs obs; difference-in-differences / causal impact; BSTS as an *engine*, not as 01 |
| **4. Walk** | `optimization/` | gradient descent | step size; local minima; SGD; MCMC (walk a *posterior*); Bayesian optimization as “search the knobs when the bowl is expensive” |
| **5. Nets** | `neural nets/` | a tiny net | softmax; embeddings; attention; transformer / LLM (one sketchbook, not a career) |
| **6. Time** | `time series/` | lag, trend, season | holdouts in time; simple forecast; *then* causal impact on a series |
| **7. Unsupervised** | `unsupervised/` | “no y” | PCA as rotating the cloud; k-means; a page on embeddings you already have |
| **8. Fundamentals** | `fundamentals/` | leftover on **new** people | train / test / validate; bias vs variance; metrics (RMSE, accuracy, precision / recall); significance already lives in [[01 t-test]] — don’t clone it as 01 |
| **9. Bayes** | `bayes/` | a prior is a starting costume | beta; posterior; MCMC; **PyMC is the engine, not 01** |
| **10. Act** | `rl/` | state, action, reward, next state | bandits; Q; policy gradient; not PPO / DQN as 01 |

Rooms on the map get written. Short. In the wing they belong to. **Which remaining room is next is not locked** — pick one when a session starts. Do not omit a wing because it is fancy. Do not start Bayes from PyMC or RL from PPO.

---

## Page 4 — Rooms exist. Remaining rooms, short.

![pa-03-next](assets/pa-03-next.svg)

**Written:** [[01 gradient descent]] · [[01 distributions]] · [[03 softmax]] · [[01 neural net]] · [[02 embeddings]] · [[03 attention]] · [[04 LLM]] · [[01 t-test]] · [[01 confounding]] · [[02 bootstrap]] · [[01 lag trend season]] · [[02 causal impact]] · [[01 PCA]] · [[02 k-means]]

No *y*. The sausage is rotated. The rooms are painted.

**On the map, order not locked** (omit none; write short; after the 01 they need):

- SVM / margin (after logistic / LDA)
- thicker chance: beta next to bell / coin / counts — still not a 40-curve zoo
- fundamentals: train / test / validate; bias–variance; validation metrics
- Bayes 01 (prior) → MCMC → PyMC as engine
- RL 01 (the loop) — later bandits / Q / policy
- BSTS as an engine for would-have, not as cause 01

One sketchbook at a time. Cheap extras as *pages*, not a second personality. Ridge / lasso / LARS: do not shorten unless asked.

---

## Page 5 — Staircase to “how LLMs work” (marked, not exclusive)

Reuse the encyclopedia; don’t clone it.

1. Line + leftover + tax *(have)*  
2. Logistic S *(have)*  
3. **GD** *(have)*  
4. **Distributions** + **softmax / cross-entropy** *(have)*  
5. Tiny net + backprop as leftover flowing backward *(have)*  
6. Embeddings (tokens as points in a cloud) *(have)*  
7. Attention (which other tokens matter) *(have)*  
8. Transformer block = attention + net, stacked; train = next token; use = sample from softmax *(have)*  
9. Cheap extras as *pages*, not shelves: tokenizer, context window, temperature, pretrain vs chat

Weight decay = ridge. Dropout ≈ bagging. Pages, not wings.

---

## Page 6 — Other summits, same building

When someone says “we also need…” — they are usually **already on the map**:

| they want | lives in |
|---|---|
| t-test, p-value, “is this real?” | inference, after distributions |
| train / test / validate, metrics, bias–variance | fundamentals, after a line you can overfit |
| Bayesian optimization | optimization, after GD (expensive bowl) |
| PyMC, posterior, beta prior | Bayes, after distributions + a walk (MCMC) |
| reinforcement learning | RL, after leftover as *reward* makes sense — 01 is the loop |
| causal impact | causal, after chance + a little time |
| A/B test | inference + cause (experiment) |
| forecast | time series |
| “why did the model do that?” | start: *b*, Gini gain, importances; later: a small explainability page — not SHAP as 01 |

Do not start a wing from the summit. Causal impact without confounding is a demo. Bayesian opt without GD is a slogan. LLM without softmax is a box cartoon. PyMC without a prior is a library tour. PPO without the loop is a brand.

---

## Page 7 — How to walk (for future sessions)

1. Open **this file**. Page 4 is the hole list. **Order among remaining rooms is not locked** — pick one; don’t pretend the others are cancelled.
2. One sketchbook per session if it is 01 of a wing. Sequels **must** be shorter than 01. Do not shorten ridge / lasso / LARS unless asked.
3. Same story when the wing allows it (exam / grades) until the idea *needs* a new story (tokens, time, reward).
4. Update the shelf table in [[AGENTS.md]] when a note lands. Update **page 2 of this file** when a wing’s 01 exists.
5. If a topic is shiny (SVM, MCMC, PyMC, PPO): ask “which wing, which 01 does it need?” If the 01 is missing, write that first. Then write the topic **short**. Do not leave it off the shelf because it is fancy.
6. Notes in **English**. Chat language does not change that.

If you keep only one thing:

> encyclopedia first. omit nothing that belongs. keep it short. don’t start a wing from the summit.

---

## Last page — cheat sheet

| | |
|---|---|
| building | data-science encyclopedia, sketchbook voice |
| LLM | one room, nets wing, after GD + softmax + a tiny net |
| standing | supervised + GD + distributions + softmax + tiny net + embeddings + attention + LLM + t-test + cause + bootstrap + time + impact + PCA + **k-means** |
| **next** | remaining rooms, **short** — order not locked |
| named, not next | SVM · fundamentals (train/test, bias–variance, metrics) · Bayes (prior → MCMC → PyMC) · RL 01 (the loop) · beta · BSTS-as-engine |
| don’t | skip a topic; start PyMC / PPO / BSTS as 01; fatten one brand into a textbook; write notes in German |
| style | [[AGENTS.md]] |

### Use / skip

**Reach for this file** at the start of a session: “what do we write?”

**Skip** turning this path into twelve empty stub notes. Write the next 01. Stubs rot.

---

*Map for the library. House rules stay in AGENTS. Remaining rooms, short. Order not locked.*
