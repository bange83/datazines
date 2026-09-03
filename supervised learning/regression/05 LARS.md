---
tags:
  - sketchbook
  - statistics
  - ml
aliases:
  - LARS
  - Least Angle Regression
  - LARS Sketchbook
  - LARS regression
---

# LARS — a sketchbook

> [!abstract] In one sentence
> Not a new tax. A **walk**: start with nobody in the model, inch toward the leftover, let a new *x* join when it **ties**.

![[private/data science/assets/ls-00-hero.svg]]

Read [[01 linear regression]] and [[03 lasso]] first. LARS is how you *travel* across models. Lasso is one of the destinations.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — Taxes vs walks

Ridge, lasso, elastic net: you change the **score**. The computer rolls to the bottom of a new bowl.

LARS is a different verb.

You start at the boring line: every *b* = 0. Just the average grade.
Then you **walk**, in small steps, adding *x* as you go.

At the end of a long walk you are close to the ordinary line (everyone in).
Along the way you have a **path**: a film, not a single still.

The name: **Least Angle Regression.**
The personality: don’t jump. Bisect.

---

## Page 2 — Leftover is the compass

Whatever line you have right now, each person still has a leftover:

> leftover = real grade − current guess

![[private/data science/assets/ls-02-residual.svg]]

That leftover is a direction. “The part we still get wrong.”

Every *x* can be asked: *how much do you point the same way as this leftover?*
Hours might match it well. Coffee might not.

LARS always moves **with** the leftover. The next step should shrink those vertical misses.

---

## Page 3 — Least angle, in one picture

Two *x* on the page: hours and sleep. The leftover is a third arrow.

![[private/data science/assets/ls-03-angle.svg]]

If hours is closer to the leftover, take a step with hours.
If sleep catches up — **same angle** to the leftover — don’t pick a favorite. Walk **between** them.

That is the “least angle.” Stay equally aligned with everyone who is currently tied.

Greedy methods grab one *x* and crank it all the way. LARS is too polite for that. It inches, and it lets a friend join the walk when the friend ties.

---

## Page 4 — Not stepwise

Old-school “stepwise”:

1. Find the best *x*.
2. Throw it in all the way.
3. Repeat with whoever is left.

Jumps. Corners. Easy to overcommit.

![[private/data science/assets/ls-04-steps.svg]]

LARS:

1. Find who currently matches the leftover.
2. Walk in that direction, **slowly**.
3. The moment someone else ties, they join, and you turn onto the angle-bisector.
4. Repeat.

Same “who is useful” instinct. Different gait. A walk, not a staircase.

---

## Page 5 — The path is the product

As you walk, knobs grow. New ones enter at kinks.

![[private/data science/assets/ls-05-path.svg]]

Hours enters first (closest to the leftover).
Sleep joins later, when it ties.
Tutor later still.

Each vertical dashed line is a **join**. After a join, the direction of the walk changes, because the team changed.

You can stop anywhere along this film. Early = short model. Late = almost ordinary least squares.

Stopping point ≈ choosing λ in lasso. Same habit: hide people, see where new-data pain is smallest, pause there.

---

## Page 6 — Lasso is almost this walk

Here is the plot twist.

If you take the LARS walk, and you add one extra rule —

> if a knob hits zero, **drop it** and keep walking without it

— you trace the **lasso path**.

![[private/data science/assets/ls-06-lasso.svg]]

LARS: knobs come in. They tend to stay.
Lasso-via-LARS: a knob can come in, look useful, then get **kicked back out** if it stops helping.

That is why these two live in the same chapter of textbooks. One is a walk. The other is a tax whose solution happens to *look like* that walk, with occasional exits.

You do not need the algebra. You need: **lasso has a film, and LARS is the camera.**

---

## Page 7 — Order of entry is a ranking

Who joins first is already a story, if you stay humble.

![[private/data science/assets/ls-07-order.svg]]

1. Hours — currently the best match to the leftover.
2. Sleep — ties later, then shares the walk.
3. Tutor — weaker, later.

This is **not** “hours causes the grade more than sleep.”
This is “in *this* sample, hours looked most like the leftover first.”

Twins will race. Tiny noise can swap 1 and 2. Same warning as lasso.

Still: if you need a shortlist in order, the LARS path is a clean picture of that order.

---

## Page 8 — What LARS is not

LARS is **not** a better line-shape. Still linear.

LARS is **not** automatically wiser than lasso or ridge. It is a **way to compute a path**. Fast, especially when you have lots of *x* and you want the film, not one still.

LARS does **not** free you from scaling. Angles care about the spelling of *x*. Scale first, same sermon.

If the leftover is bent — if a straight team of *x* cannot point at it — walking more politely will not fix that. Different sketchbook.

---

## Page 9 — Mini recipe

1. **Start empty.** All knobs 0. Just the average.
2. **Look at the leftover.** Who points the same way?
3. **Inch** in that direction.
4. **When someone ties, they join.** Walk on the bisector.
5. **Optional lasso rule:** if a knob hits 0, they leave again.
6. **Stop** where hidden people hurt least.
7. **Read the order** as a shortlist, not as fate.

If you keep only one thing:

> lasso is a tax. LARS is the walk that draws the tax’s film.

---

## Page 10 — The walk, in sklearn

Same eighty students. Scale, then `Lars(n_nonzero_coefs=4)`: stop after four joins. `active_` is the order. `coef_path_` is the film.

```python
import numpy as np
from sklearn.linear_model import Lars
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(7)
n = 80
hours = rng.uniform(1, 6, n)
sleep = rng.uniform(4, 9, n)
tutor = (rng.random(n) > 0.6).astype(float)
coffee = rng.uniform(0, 4, n)
noise = rng.normal(0, 1, n)
minutes = hours * 60 + rng.normal(0, 3, n)
naps = sleep + rng.normal(0, 0.25, n)
grade = 1.8 + 0.9 * hours + 0.35 * sleep + 0.6 * tutor + rng.normal(0, 0.55, n)

X = np.column_stack([hours, minutes, sleep, naps, tutor, coffee, noise])
names = ["hours", "minutes", "sleep", "naps", "tutor", "coffee", "noise"]
Xtr, Xte, ytr, yte = train_test_split(X, grade, test_size=0.3, random_state=0)

Ztr = StandardScaler().fit_transform(Xtr)
lars = Lars(n_nonzero_coefs=4).fit(Ztr, ytr)

print("join order:", [names[i] for i in lars.active_])
print()
print("intercept ", f"{lars.intercept_:7.3f}")
for name, c in zip(names, lars.coef_):
    mark = "  ← 0" if abs(c) < 1e-8 else ""
    print(f"{name:10s} {c:7.3f}{mark}")

print("\ncoef_path_  (columns = steps along the walk)")
path = lars.coef_path_
header = " " * 12 + "".join(f"{s:>8}" for s in range(path.shape[1]))
print(header)
for i, name in enumerate(names):
    print(name.ljust(12) + "".join(f"{v:8.2f}" for v in path[i]))
```

```
join order: ['minutes', 'sleep', 'tutor', 'hours']

intercept    7.418
hours        1.136
minutes     -0.073
sleep        0.377
naps         0.000  ← 0
tutor        0.117
coffee       0.000  ← 0
noise        0.000  ← 0

coef_path_  (columns = steps along the walk)
                    0       1       2       3       4
hours            0.00    0.00    0.00    0.00    1.14
minutes          0.00    0.67    0.93    0.99   -0.07
sleep            0.00    0.00    0.25    0.32    0.38
naps             0.00    0.00    0.00    0.00    0.00
tutor            0.00    0.00    0.00    0.05    0.12
coffee           0.00    0.00    0.00    0.00    0.00
noise            0.00    0.00    0.00    0.00    0.00
```

Empty → minutes walks in first (hours’ twin won the race) → sleep joins → tutor joins → hours joins late, and minutes’ knob **flips**. Twins sharing a leftover: the walk gets dramatic at the end. Coffee, noise, naps: never joined. Still zero.

`LarsCV` would pick the stopping step by hiding people. Same habit as λ.

---

## Last page — cheat sheet

| word | meaning |
|---|---|
| leftover | y − current ŷ. The compass. |
| least angle | stay equally aligned with whoever is tied |
| path | knobs vs steps. a film of models |
| join | a new *x* enters. walk turns |
| LARS | the walk |
| lasso | the tax; its path is LARS plus dropouts |

Ridge / lasso / elastic net = *what you score.*
LARS = *how you walk through the answers.*

### Use / skip

**Reach for it when** you want the **film**: who joins, in what order, how knobs grow. Lots of *x*, you care about the path, not one still. Lasso’s solution happens to look like this walk.

**Skip it when** you only need one fitted line (ordinary / ridge / lasso with a chosen λ is enough); you thought LARS was a smarter shape (it is not); the leftover is bent.

**Pays you:** a ranking of entry. A fast path. A camera for the lasso film.

**Costs you:** not a tax of its own. Order of entry is not fate — twins race. Scale first. Stopping still needs hidden people.

---

*The camera for the lasso film. Family portrait: [[01 linear regression]] → [[02 ridge regression]] → [[03 lasso]] → [[04 elastic-net]] → here. Glasses for other y: [[06 GLM]].*
