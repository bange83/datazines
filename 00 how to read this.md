---
tags:
  - sketchbook
  - statistics
  - ml
aliases:
  - How to read this
  - Front door
  - Introduction
---

# How to read this — a sketchbook

> [!abstract] In one sentence
> Folders are **shelves**. Open a folder, read **01**. Picture, one sentence, real numbers. Same paper everywhere.

![in-00-hero](assets/in-00-hero.svg)

This is the front door. You are a reader. Start here, then pick a folder.

Job-interview version. Derivations live elsewhere.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — What this is

Each note is a **zine**: paper, ink, one idea per page.

A picture before a formula. A cheat sheet that says when to reach for the method and when to skip it. Numbers that were **run**, not guessed.

It is not a textbook. It is not a blog. It is the version you would sketch on a whiteboard if someone asked “what *is* ridge?” and you had four minutes.

The site is those zines in a browser. Same pencils.

---

## Page 2 — The shelves are folders

The library **is** the folder list.  Those are ideas *inside* a folder.

| folder                 | what is in it                           |
| ---------------------- | --------------------------------------- |
| `supervised learning/` | regression, classification, ensembles   |
| `fundamentals/`        | train / test, bias vs variance, metrics |
| `optimization/`        | gradient descent                        |
| `probability/`         | distributions, beta                     |
| `neural nets/`         | tiny net → embeddings → attention → LLM |
| `inference/`           | t-test, bootstrap                       |
| `causal/`              | confounding, causal impact              |
| `time series/`         | lag, trend, season                      |
| `unsupervised/`        | PCA, k-means                            |
| `bayes/`               | prior, MCMC                             |
| `rl/`                  | the loop, bandits, Q                    |

Inside a folder, **file sort is reading order.** `01` is the ordinary idea. `02` is a sequel — shorter.

You do **not** have to finish `supervised learning/` before you open `unsupervised/`. You **do** read `01` before `02` in the same family.

---

## Page 3 — How to walk

![in-04-walk](assets/in-04-walk.svg)

1. **Pick a folder.**
2. **Read 01.** Then the numbered sequels if you want them.
3. **Use / skip** on the last page of that note. Honest: when this method pays you, what it costs, what to open instead.

Lost? Three honest starts:

- a number: [[01 linear regression]] (`supervised learning/regression/`)
- leftover on new people: [[01 train test validate]] (`fundamentals/`)
- yes / no: [[01 logistic regression]] (`supervised learning/classification/`)

An LLM lives in `neural nets/`, after a tiny net. Not the whole library.

---

## Page 4 — Leftover (the thread, not the map)

You have a cloud of people. You draw a machine. Almost nobody sits on it.

The **gap** — real minus guess — is leftover.

![in-02-leftover](assets/in-02-leftover.svg)

Notes reuse that miss: a grade miss, a miss on **new** people, a surprise of the next word, actual − would-have. Ridge taxes **knobs**, not leftover. A t-test asks if leftover could have faked a number.

That is why the voice feels like one notebook. It is **not** how you navigate. Folders are.

---

## Page 5 — Same exam world, different piles

Hours, sleep, tutor, coffee — one story. **Not** one pile of people.

![in-03-rooms](assets/in-03-rooms.svg)

When a note says “same people,” it means **this pile**, not the whole vault.

| pile | *y* | *n* (side fact) | typical folder |
|---|---|---:|---|
| **the line** | grade | 8 | regression 01, inference |
| **twins** | grade + minutes | 30 | ridge → LARS, fundamentals 01–02 |
| **pass / fail** | yes / no | 80 | classification, ensembles, metrics |
| **unlabeled** | none | 80 | unsupervised |

A grade is not a pass. No *y* is not a grade. Two crowds can both be 80.

---

## Page 6 — Mini recipe

1. This file is the **door**.
2. Open a **folder**, then **01**.
3. Picture, then the name. Cheat sheet last.
4. “Same people” → which pile (page 5).
5. If you wanted a derivation, you are in the wrong building. Leave by Use / skip.

If you keep only one thing:

> folders are shelves. read 01. leftover is the voice, not the map.

---

## Last page — cheat sheet

| word | meaning |
|---|---|
| folder | a shelf (`supervised learning/`, `fundamentals/`, …) |
| 01 | first note in that family; sort order is reading order |
| Use / skip | when to reach for it, when not |
| leftover | real − guess (the voice) |
| pile | the line / twins / pass-fail / unlabeled |

**Also called** (in a room):

| here | there |
|---|---|
| leftover | residual / error |
| 01 | first sketchbook of a family |
| zine | one note |

![in-05-when](assets/in-05-when.svg)

### Use / skip

**Reach for it when** you just walked in, you mixed the piles, or you are lost between folders.

**Skip it when** you wanted a textbook; you wanted a chapter list as 01.

**Pays you:** the folder map, three honest starts. Permission not to finish one shelf before another.

**Costs you:** no sklearn page — this is a map, not a fit. No derivation.

---

*Front door. First folder: `supervised learning/regression/` — [[01 linear regression]].*
