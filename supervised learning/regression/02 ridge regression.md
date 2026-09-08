---
tags:
  - sketchbook
  - statistics
  - ml
aliases:
  - Ridge Regression
  - Ridge Regression Sketchbook
  - ridge regression
---

# Ridge regression — a sketchbook

> [!abstract] In one sentence
> Same line as before — but you **tax huge knobs**. The line gets a bit more boring, and a lot more trustworthy on new people.

![rr-00-hero](../../assets/rr-00-hero.svg)

Read [[01 linear regression]] first. This is the sequel: what to do when that line goes feral.

Flip it like a notebook. One page = one idea. Done.

---

## Page 1 — The line you already know

You still have points. You still want a line:

$$\hat y = a + b \cdot x$$

Ordinary linear regression picks *a* and *b* by making the residuals as small as possible. Least squares. No extra rules.

That is a great recipe when:

- you have plenty of points
- the cloud is honest
- *x* is just one clear thing

It is a shaky recipe when the line can **overreact**.

This sketchbook is about that overreaction — and a quiet fix called **ridge**.

---

## Page 2 — When the ordinary line goes feral

Same story as last time: hours studied, grade.

Only now the cloud is messier. One person in the corner had a weird day.

![rr-02-feral](../../assets/rr-02-feral.svg)

Ordinary least squares **must** chase that yank. Big misses cost a lot (they get squared). So the line leans hard, just to shave a little error off one point.

On the old points it looks clever.
Clever is not the same as true.

Ridge is **not** the seatbelt for one wild *y*. It still squares leftover, so a yank still screams. Ridge’s job is **huge knobs**: few people, noisy *x*, or twins that fight. A single corner grade wants a check, or a method that does not square the miss — not λ.

> [!tip] Margin note
> Few points, noisy *x*, or two *x* that say almost the same thing: the ordinary line can go wild. Ridge is a seatbelt for **that** — not for one weird grade.

---

## Page 3 — Old points are a trap

The job is not “look smart on the people you already asked.”
The job is: **guess well for the next person.**

![rr-03-newpoints](../../assets/rr-03-newpoints.svg)

Left: the line hugs the old cloud. Right: new people arrive. The clever tilt is suddenly just… wrong.

This has a name: **overfitting**.
The line memorized noise and called it a pattern.

On **one** machine, that is a problem. Later, a forest will grow jumpy trees **on purpose** and **vote** — the choir is the tax, not a calmer tree ([[02 random forest]]). Not this notebook.

Ridge’s whole personality is: *be a little worse on the old points, so you do not embarrass yourself on the new ones.*

---

## Page 4 — Two *x* that say the same thing

Worse than one noisy point: two levers that are almost copies.

Hours studied and minutes studied. Same fact, two units.

Ordinary regression can do this:

| lever | ordinary *b* |
|---|---:|
| hours | +48 |
| minutes | −47 |

Net effect ≈ 1. A fight. The math found a cancellation, not a story.

![rr-04-explode](../../assets/rr-04-explode.svg)

Ridge does not let knobs get theatrical. It asks both to **share the job** with small numbers.

You still cannot say which of the twins “really” did it. You *can* stop the explosion.

No magic cutoff (“corr 0.7 → ridge”). The test is the **fight**: ordinary *b*s huge and opposite, net effect ordinary. Hours and minutes on page 14 do that. Two honest, different levers with corr 0.5 can be fine.

---

## Page 5 — Change the score, not the line-shape

Ridge does not invent a new kind of curve. Still a straight line. Still ŷ = a + b x.

It changes **what “best” means**.

![rr-05-score](../../assets/rr-05-score.svg)

**Old score** (ordinary):

> how wrong am I on the points?

**Ridge score:**

> how wrong am I on the points
> **+** λ × (how huge the knobs are)

That second piece is a **tax**. Big *b* costs extra, even if it helps a little on the old points.

So the computer still rolls downhill. The bowl just got a new slope: “don’t wander far from zero.”

The intercept *a* usually does **not** pay the tax. Starting height is allowed. Wild *slopes* are the problem.

---

## Page 6 — λ is a volume knob

λ (lambda) is not magic. It is **how loud the tax is**.

![rr-06-lambda](../../assets/rr-06-lambda.svg)

| λ | what happens |
|---|---|
| 0 | tax is off. Ordinary line. Can go feral. |
| medium | slope shrinks. A bit more boring. Usually the point. |
| huge | knobs almost zero. Line ≈ the plain average. Too shy. |

There is no holy number. λ is a choice: *how much boring do I want to buy, in exchange for stability?*

---

## Page 7 — Shrink, don’t delete

Ridge’s move is simple to see on the knobs:

![rr-07-shrink](../../assets/rr-07-shrink.svg)

Every *b* gets **pulled toward zero**. Not to zero, unless it was already tiny.

Hours still hours. Sleep still sleep. Coffee still in the model — just quieter.

That is the personality difference you will meet later with **lasso**: lasso is happy to *kill* a knob. Ridge is not. Ridge keeps everyone in the room and turns the volume down.

---

## Page 8 — A bit wrong, much less jumpy

Here is the trade, as a dartboard.

Bullseye = the true line, if you could see it.

![rr-08-biasvar](../../assets/rr-08-biasvar.svg)

**Ordinary:** darts average around the center, but they fly everywhere. Ask 8 new people, get 8 different wild lines.

**Ridge:** darts sit a little off-center (a small, systematic “hmm, too shy”) — and they cluster.

A name for this, if you want one:

- **variance** — how much the line jumps if the sample jumps
- **bias** — how much the line is systematically off

Ridge buys lower variance with a little bias. For prediction, that deal is often excellent.

You are not trying to be unbiased and heroic. You are trying not to flail. The dartboard as its own notebook: [[02 bias variance]].

---

## Page 9 — The circle picture

One more way to see it, if two knobs *b₁* and *b₂* are on the page.

Ordinary “best” is some point far out, where the residual-error rings are smallest.

Ridge says: **you may only pick a point inside a circle around zero.**

![rr-09-circle](../../assets/rr-09-circle.svg)

The best allowed point is where an error-ring just kisses the circle.

Bigger λ → smaller circle → smaller knobs.

λ = 0: the circle is the whole page. You sit at ordinary’s point. λ huge: the circle is a dot at the origin. Knobs ≈ 0. The line is the plain average.

Same idea as the tax. Just drawn as a fence.

---

## Page 10 — Scale, or the tax is unfair

Ridge punishes **big numbers**.

Hours studied live around 1–6.
Minutes studied live around 60–360.

Same fact. Different spelling. The tax treats them differently unless you fix the spelling first.

![rr-10-scale](../../assets/rr-10-scale.svg)

Recipe, boring and important:

1. For each *x*, subtract its average.
2. Divide by its spread (standard deviation).
3. *Then* run ridge.

Now every knob is in “how many typical steps away from average.” The tax is fair.

Ordinary least squares with one *x* does not need this. Ridge does. Always scale.

---

## Page 11 — How to pick λ

Do not pick λ because it looks pretty on the old cloud. The old cloud is the thing you are trying *not* to overfit.

Hide some people. Fit on the rest. Score the hidden ones. Repeat. Average the pain.

Three piles: hide pile 1, fit 2+3. Then hide 2. Then hide 3. Three pains, one average. That ritual is **cross-validation**. Fancy name, simple idea: *grade the line on people it has not seen.*

![rr-11-folds](../../assets/rr-11-folds.svg)

![rr-11-cv](../../assets/rr-11-cv.svg)

The curve of “error on new data” is usually a U:

- λ too small → too wild → bad on new people
- λ too big → too shy → also bad
- somewhere in the middle: **sweet spot**

You do not need the formula. You need the habit: **tune on held-out pain, not on pride.** The ritual as its own notebook: [[01 train test validate]].

---

## Page 12 — Ridge vs lasso, one glance

Same family. Different fence.

![rr-12-lasso](../../assets/rr-12-lasso.svg)

| | ridge | lasso |
|---|---|---|
| fence | circle | diamond |
| knobs | shrink, all stay | some can hit exactly zero |
| good at | many small, correlated *x* | picking a few *x* and ignoring the rest |
| personality | “everyone quieter” | “some people leave the room” |

If two *x* are twins, ridge lets them share.
Lasso tends to keep one and fire the other.

Lasso is a sibling, not the same kid: [[03 lasso]].
If you want both gifts (share *and* fire junk): [[04 elastic-net]].
If you want the film of knobs walking in: [[05 LARS]].

---

## Page 13 — Mini recipe

1. **Start from the ordinary line.** Same ŷ = a + b x. Same cloud.
2. **Ask:** will this line overreact? Few points? Noise? Twin *x*?
3. **Scale the *x*.** Always, before ridge.
4. **Add the tax.** Score = old error + λ × (size of knobs)².
5. **Pick λ** by hiding people and scoring the hidden ones.
6. **Read the knobs smaller.** Direction often the same. Drama gone.
7. **Judge on new points**, not on how tightly you hugged the old ones.

If you keep only one thing:

> ordinary line + a tax on huge knobs → a calmer line for the next person

---

## Page 14 — Twins, in sklearn

Thirty students — few enough that the ordinary line can overreact. Grade from hours, sleep, tutor. **Minutes** is hours in another unit (a twin). Coffee and noise are junk.

Ordinary least squares, unscaled: hours and minutes start a fight. Ridge, scaled, `alpha=10`: they share. Train R² dips (the tax). Test R² **rises** (the point).

```python
import numpy as np
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(7)
n = 30
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

ols = LinearRegression().fit(Xtr, ytr)
ridge = make_pipeline(StandardScaler(), Ridge(alpha=10)).fit(Xtr, ytr)

print("mean grade (train)", round(ytr.mean(), 3))

def show(title, coef, intercept, train, test):
    print(title)
    print(f"  intercept  {intercept:7.3f}")
    for name, b in zip(names, coef):
        print(f"  {name:10s} {b:7.3f}")
    print(f"R² train {train:.3f}   R² test {test:.3f}\n")

show("ordinary (no scale, no tax)", ols.coef_, ols.intercept_,
     ols.score(Xtr, ytr), ols.score(Xte, yte))
show("ridge (scaled, alpha=10)", ridge.named_steps["ridge"].coef_,
     ridge.named_steps["ridge"].intercept_,
     ridge.score(Xtr, ytr), ridge.score(Xte, yte))
```

```
mean grade (train) 7.241
ordinary (no scale, no tax)
  intercept    1.475
  hours        5.653
  minutes     -0.079
  sleep       -0.258
  naps         0.555
  tutor        0.775
  coffee       0.112
  noise        0.068
R² train 0.955   R² test 0.626

ridge (scaled, alpha=10)
  intercept    7.241
  hours        0.564
  minutes      0.555
  sleep        0.124
  naps         0.136
  tutor        0.318
  coffee       0.122
  noise        0.094
R² train 0.907   R² test 0.748
```

Read the ordinary pair: +5.65 hours and −0.079 minutes. Minutes live around 60–360, so that tiny *b* is huge in real life. Together they still add up to about **+0.92 grade per extra hour** — a cancellation, not a story. Train R² **0.955**, test **0.626**. Pride on the old 21, embarrassment on the new 9.

Ridge, after scaling: hours 0.56, minutes 0.56. Twins share. Train R² **0.907** — a bit worse (the tax). Test R² **0.748** — better on people it has not seen. That is the deal from page 3. Do not pick the method by train R².

Ridge’s intercept **7.241** is not a tax on *a*. It is the **mean grade** on the trainers. After `StandardScaler`, every *x* is 0 at the average person, so ŷ at “all knobs typical” *is* ȳ. Ordinary’s 1.475 is “grade if hours, sleep, minutes were all **literally zero**” — a fantasy. Page 5 still holds: *a* does not pay. The number jumped because **zero moved**.

`alpha` here is λ. sklearn’s name, same volume knob.

---

## Last page — cheat sheet

| symbol | meaning |
|---|---|
| ŷ = a + b x | still the line |
| ordinary | smallest sum of (residuals)² |
| ridge | that, plus λ × (knobs)² |
| λ | volume of the tax. 0 = ordinary |
| shrink | knobs pulled toward 0, not deleted |
| scale | make every *x* comparable first; then *a* is ȳ, not “all x = 0” |
| bias | a bit systematically off |
| variance | how much the line jumps |

**Also called** (in a room):

| here | there |
|---|---|
| tax | L2 penalty / regularization |
| knobs | weights |
| λ | `alpha` in sklearn |

Ridge does **not** fix a bent cloud. If the truth curves, you still need a different shape.

Ridge **does** fix a drama queen of a straight line.

### Use / skip

**Reach for it when** the ordinary line overreacts: few points, noisy points, or twin *x* that should **share**. You care more about the next person than about hugging the old cloud.

**Skip it when** you want a **shortlist** (that is [[03 lasso]]); one honest *x* and plenty of points (ordinary line is enough); the cloud is bent (wrong shape, not wrong tax).

**Pays you:** calmer knobs. Twins share. Prediction on new people usually less embarrassed.

**Costs you:** every knob stays, even junk. A bit of shyness (bias). You must **scale**, and you must pick λ.

---

*Sequel to the linear sketchbook. Same notebook, tighter belt. Next: [[03 lasso]].*
