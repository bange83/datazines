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

# Datazines — a sketchbook for data science

> [!abstract] In one sentence
> Short, visual guides to data science: one idea, one picture, and one honest example at a time.

![in-00-hero](assets/in-00-hero.svg)

Data science has a lot of names. This is the part you can hold in your head.

No course registration. No required route. Start with the question that brought you here.

---

## Start with a question

### “What does a model learn from a number?”

Start with [[01 linear regression]]. A cloud of exam results becomes a line. The line makes a guess; the leftover shows where it missed.

### “Will it work on someone new?”

Open [[01 train test validate]]. A model can look clever on the people it has already seen. This is how you check the leftover on new people.

### “Is the answer yes or no?”

Read [[01 logistic regression]]. The line stays inside, but the answer comes out as a probability: pass or fail, spam or not spam.

### “How do models learn?”

Take [[01 gradient descent]]. Picture a bowl, take a step downhill, and change the knobs a little at a time.

### “How do LLMs work?”

Follow the short staircase: [[01 neural net]] → [[02 embeddings]] → [[03 attention]] → [[04 LLM]]. The last stop is next-token prediction, not magic.

---

## What is inside

**Predict** — lines, probabilities, trees, forests, and margins.
Start with [[01 linear regression]] or [[01 logistic regression]].

**Learn** — gradient descent, a tiny neural net, embeddings, attention, and LLMs.
Start with [[01 gradient descent]] or [[01 neural net]].

**Check** — train/test splits, bias and variance, metrics, t-tests, and bootstrap.
Start with [[01 train test validate]].

**See the world differently** — distributions, causes, time, PCA, and clusters.
Start with [[01 distributions]], [[01 confounding]], [[01 lag trend season]], or [[01 PCA]].

**Choose and act** — priors, MCMC, rewards, bandits, and Q values.
Start with [[01 prior]] or [[01 the loop]].

---

## How to read a zine

Every zine is a small notebook:

1. A picture comes before the formula.
2. The idea gets one plain-English sentence.
3. Real numbers keep the story honest.
4. The last page says when to use the method — and when to skip it.

Read the first note in a sequence before its numbered sequels. The first note builds the picture; later notes change one thing: a tax, a walk, a camera, or a different kind of outcome.

You do not need to finish one subject before trying another. Follow your curiosity, then come back when a word starts to feel familiar.

---

## The thread running through it

Most of these notes ask one quiet question:

> **How wrong was the guess?**

The difference between what happened and what the model expected is the **leftover**. It can be a missed grade, a wrong prediction on a new person, a surprising next word, or the gap between what happened and what would have happened without an intervention.

The methods differ in what they do with that miss. They fit a line, tax its knobs, split the crowd, walk downhill, redraw the people, or ask whether the pattern might have another cause.

---

## If you want a gentle first walk

1. [[01 linear regression]] — make a guess from a number.
2. [[01 train test validate]] — ask whether the guess travels.
3. [[01 logistic regression]] — turn a score into yes / no.
4. [[01 gradient descent]] — see how a model changes its knobs.
5. [[01 neural net]] — stack the same move a few times.

Then go wherever the next question points.

---

## Cheat sheet

| if you want to… | open… |
|---|---|
| predict a number | [[01 linear regression]] |
| predict a yes / no | [[01 logistic regression]] |
| test a model on new people | [[01 train test validate]] |
| understand a leftover | [[01 distributions]] |
| learn how models change | [[01 gradient descent]] |
| understand an LLM | [[01 neural net]] → [[04 LLM]] |
| ask whether a pattern is a cause | [[01 confounding]] |

### Use / skip

**Reach for this page** when you are new, unsure where to begin, or want the shortest route to a useful picture.

**Skip it** once you know the question. Open the relevant zine and start drawing.

*Pick a question. Open a sketchbook. Leave with one idea you can explain.*
