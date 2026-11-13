# Zini — The Datazines Mascot

Meet **Zini**, the friendly, fluffy blue monster with rectangular glasses who guides readers through the data science sketchbooks.

![Zini Logo](../../assets/zini/zini-logo-drawing.png)

---

## 1. Role & Golden Rule: Sparingly

Zini is a warm, recurring companion — not visual noise:
- **Core diagrams stay SVG:** Every statistical or algorithmic diagram (slopes, trees, distributions, residual vectors) is a hand-drawn SVG. Zini never replaces the math or the chart.
- **Structural landmarks:** Zini appears at predictable structural places to orient the reader across the encyclopedia:
  1. **Site Header / Logo:** Zini sitting with a pencil, drawing on a notepad (`zini-logo-drawing.png`).
  2. **Page Opener ("In one sentence"):** Zini explaining the core intuition (`> [!abstract]` callout automatically decorated via CSS).
  3. **Mini recipe:** A hands-on guide helper (cooking / recipe theme).
  4. **Code mini (sklearn):** A focused coding helper (laptop / terminal theme).
  5. **Cheat Sheet (Use / Skip):** A decision helper (signpost / recommendations).

---

## 2. Available & Planned Assets

All transparent PNGs live in `assets/zini/`:

### Core / Existing:
| Pose | File | Where it belongs |
|---|---|---|
| **Header Logo** | `zini-logo-drawing.png` | Site title & brand header |
| **One Sentence** | `zini-one-sentence.png` | `> [!abstract]` or `> [!zini-sentence]` callouts |
| **Idea / Intuition** | `zini-idea.png` | `> [!zini-idea]` key aha-moments |
| **Inspect / Diagnostics** | `zini-inspect.png` | `> [!zini-inspect]` residual checks, data sanity |
| **Working** | `zini-working.png` | `> [!zini-working]` process / iterative steps |
| **Celebrate / Solved** | `zini-celebrate.png` | `> [!zini-celebrate]` convergence, victories |
| **Confused / Pitfall** | `zini-confused.png` | `> [!zini-confused]` traps, data leakage |

### Target Editorial Landmarks (Planned / In Development):
| Landmark | Concept | Purpose |
|---|---|---|
| **Mini recipe** | **Cooking Zini** (`zini-recipe.png`) | Standing with a chef hat or spoon / recipe book at the `## Page N — Mini recipe` section |
| **Sklearn mini** | **Coding Zini** (`zini-coding.png`) | Huddled over a laptop or terminal typing code at the `## Page N — ..., in sklearn` section |
| **Use / Skip** | **Decision Zini** (`zini-decision.png`) | Pointing at a two-way signpost (Reach / Skip) or thumbs-up / thumbs-down at the cheat sheet |

---

## 3. How to Use in Markdown

### A. Automatic Callout Styling (Quartz)
The standard sketchbook abstract callout automatically receives Zini without extra syntax:

```markdown
> [!abstract] In one sentence
> Same knobs as the line — a + b x — then you squash the score into a number between 0 and 1.
```

For explicit thematic callouts:
```markdown
> [!zini-idea] Intuition
> If you cannot explain the slope in one sentence, you don't know your levers yet.

> [!zini-confused] Watch out!
> Never let test data touch the scaler before fitting. That's a data leak!
```

### B. Structural Floats & Section Companions
To float Zini alongside section headers or paragraphs:

```markdown
![zini-right](assets/zini/zini-inspect.png)
```
or from nested subfolders (e.g. `supervised learning/regression/`):
```markdown
![zini-right](../../assets/zini/zini-inspect.png)
```

Use `zini-right` or `zini-left` in the alt text to trigger CSS float styling.
