# Content Review Remarks

Review scope: factual accuracy, misleading simplifications, internal consistency, and links. No source notes were changed.

## High Priority

1. `causal/02 causal impact.md:27, 182`

   The note equates a historical intervention date with `do()` and says the method provides `do()` on a series without a second group. A pre-period counterfactual forecast does not, by itself, identify a causal effect. It depends on strong assumptions: no concurrent shocks or confounders after the start date, and a counterfactual model that can validly extrapolate. Present this as a causal estimate conditional on those assumptions, rather than as `do()`.

2. `causal/02 causal impact.md:85, 137-160`

   The reported bootstrap interval is presented as a 95% causal-impact interval and used to conclude that zero is excluded. Resampling only pre-period residuals omits post-period noise, time dependence, and uncertainty in the causal assumptions. It could be described as an illustrative model-based forecast uncertainty exercise, or removed from the causal claim.

3. `supervised learning/regression/01 linear regression.md:130`

   “b is the average effect of +1 on x” gives a causal interpretation to an ordinary regression coefficient. Without a causal design, this is an average conditional association or change in the prediction, not an effect.

4. `supervised learning/regression/02 ridge regression.md:45-59`

   Ridge is suggested as a remedy for a single unusual response/outlier pulling the line. Ridge penalizes coefficient magnitude, not residuals, and still uses squared loss, so it remains sensitive to response outliers. Its main job here is stabilizing coefficients with noisy data and correlated predictors. Robust regression, data checks, or explicit outlier diagnosis are the appropriate comparison.

5. `supervised learning/ensembles/03 gradient boosting.md:51`

   For binomial logistic loss, `y - P` is the negative gradient (the pseudo-residual), not the gradient. The gradient of negative log-likelihood is `P - y`. The sign matters because the algorithm moves in the negative-gradient direction.

6. `00 how to read this.md:62`

   “Ridge taxes leftover” is incorrect. Ridge taxes coefficient size; residual error remains in the objective.

7. `neural nets/03 attention.md:157-163`, `neural nets/04 LLM.md:87`

   The attention example lets every token attend to future tokens while explaining an autoregressive LLM that looks left. Causal masking is required to prevent answer leakage during training. The example also lacks positional information, so it cannot represent word order.

8. `rl/01 the loop.md:16, 43`, `rl/02 bandits.md:54`

   Reward and return are conflated with “leftover.” Reward comes from the environment and return is accumulated reward. In Q-learning, the prediction-error-like quantity is the temporal-difference error: `target - Q`. Keeping these distinct is important for the transition from supervised learning to RL.

## Medium Priority

1. `README.md:65`

   Broken link: `html/01 linear regression.html` no longer exists. The generated leaf is `html/supervised learning/regression/01 linear regression.html`.

2. `supervised learning/regression/01 linear regression.md:430`

   The cheat sheet states that R-squared ranges from 0 to 1. Out-of-sample R-squared can be negative, which the time-series note itself demonstrates.

3. `time series/01 lag trend season.md:152-160`

   The holdout lag features use actual earlier holdout outcomes. This is valid for rolling one-step-ahead forecasting after each prior outcome arrives, but leaks future information for a four-week forecast issued entirely at week 20. State which forecast setting the example represents.

4. `supervised learning/classification/02 LDA.md:102-115`

   The generative direction is reversed. LDA models `P(x | class)` and class priors, then uses Bayes’ rule to obtain `P(class | x)`.

5. `supervised learning/classification/04 SVM.md:60-66`

   In a soft-margin SVM, support vectors need not lie exactly on the margin boundary. They can be inside the margin or misclassified. The `C=1` example is soft-margin.

6. `neural nets/02 embeddings.md:172-192`

   Cosine similarity is calculated on two-dimensional PCA display coordinates and presented as embedding similarity. Calculate similarity on the original vectors; PCA coordinates are only a visualization and can distort angles and neighborhoods.

7. `bayes/01 prior.md:148`

   `ppf` is the quantile function, not the posterior “bump.” It produces the reported percentile values.

8. `neural nets/04 LLM.md:105`

   Temperature and a logistic 0.5 decision threshold are not analogous. Temperature changes the probability distribution before sampling; a threshold changes only the decision rule while keeping probabilities unchanged.

9. `bayes/02 MCMC.md:33, 50, 71`

   A retained MCMC histogram is not automatically the posterior. The interpretation needs at least a short caveat about convergence, mixing, burn-in, and correlated samples.

## Low Priority

1. `PATH.md:44`

   Classification is described as “01-03 standing,” but `04 SVM` exists and is listed later in the file.

2. `PATH.md:16, 34, 86, 101`

   Navigation guidance conflicts between “a library, not a ladder” / no fixed remaining-room order and “walk wings in order” / “write left to right.” Clarify whether the intended order is a recommended route or a requirement.

3. `unsupervised/01 PCA.md:15, 49, 90-94`

   “Always scale first” is too absolute. Standardization is appropriate when units are incomparable or arbitrary, but it changes PCA’s objective and is not universally correct when absolute variance is meaningful.

4. `probability/02 beta.md:41-47, 150`

   Beta parameters are useful pseudo-count intuition in a Beta-Binomial model, but they are not generally literal observed counts. In particular, Beta(1,1) is commonly introduced as a uniform prior, not as one observed success and failure.

## Checks Completed

- No broken wiki links were found in the reviewed notes.
- No broken Markdown SVG paths were found in the reviewed notes.
- Note anatomy and the required recipe, mini-example, cheat-sheet, and Use/skip sections are consistently present.
- `python3 -m compileall -q scripts` and `git diff --check` passed.
- HTML conversion could not be executed because the environment does not have the `markdown` package installed.
