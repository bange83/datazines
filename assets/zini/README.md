# Zini — The Datazines Mascot

Meet **Zini**, the friendly, fluffy blue monster with rectangular glasses who guides readers through the world of Data Science.

![Zini Poses](../../assets/zini/zini-explain.png)

---

## 1. Available Poses

All extracted transparent PNGs live in `assets/zini/`:

| Pose | File | Best used for |
|---|---|---|
| **Idea** | `zini-idea.png` | Aha-moments, key intuition, clever tricks |
| **Celebrate** | `zini-celebrate.png` | Breakthroughs, success, model convergence |
| **Explain** | `zini-explain.png` | Walkthroughs, board explanations, front door |
| **Inspect** | `zini-inspect.png` | Residual analysis, diagnostics, checking data |
| **Working** | `zini-working.png` | Code snippets, sklearn fitting, number crunching |
| **Confused** | `zini-confused.png` | Pitfalls, questions, data leaks, 404 pages |

---

## 2. Usage in Markdown

### A. Custom Callouts (Quartz & Web)
You can call upon Zini directly in any markdown note:

```markdown
> [!zini-idea] Zini's intuition
> If you cannot explain the slope in one sentence, you don't know your levers yet.

> [!zini-explain] The Board
> Look at the line: points above are positive residuals, points below are negative.

> [!zini-confused] Watch out!
> Never let test data touch the scaler before fitting. That's a data leak!

> [!zini-celebrate] Solved!
> Leftovers collapsed to zero without blowing up variance.
```

### B. Inline / Floating Images
To float Zini alongside paragraphs in Quartz:

```markdown
![zini-right](assets/zini/zini-inspect.png)
```
or from nested folders:
```markdown
![zini-right](../../assets/zini/zini-inspect.png)
```
*(Use `zini-right` or `zini-left` in the alt text to float Zini to the side).*
