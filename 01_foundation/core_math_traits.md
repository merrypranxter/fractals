# Core Mathematical Traits

This document describes the mathematical properties that define fractal structure. These are the measurable, provable properties that distinguish fractals from non-fractal objects.

---

## Non-Integer Hausdorff Dimension

The Hausdorff dimension `d_H` measures how an object fills space as the measurement scale decreases. For a smooth curve, `d_H = 1`. For a filled area, `d_H = 2`. For a fractal curve that is too irregular to be described as 1D but does not fill a 2D region, `d_H` is a non-integer between 1 and 2.

The defining property of most fractals is that `d_H > d_T`, where `d_T` is the topological dimension. A fractal curve has `d_T = 1` but `d_H > 1`. A fractal surface has `d_T = 2` but `d_H > 2`.

Key examples:
- Cantor Set: `d_T = 0`, `d_H = log(2)/log(3) ≈ 0.631`
- Koch Curve: `d_T = 1`, `d_H = log(4)/log(3) ≈ 1.262`
- Sierpinski Triangle: `d_T = 1`, `d_H = log(3)/log(2) ≈ 1.585`
- Lorenz Attractor: `d_T = 2`, `d_H ≈ 2.06`

---

## Self-Similarity and Scaling

A set `S` is exactly self-similar if it can be decomposed into `N` non-overlapping copies of itself, each scaled by factor `r`. The similarity dimension is:

```
d_s = log(N) / log(1/r)
```

For exactly self-similar fractals, `d_s = d_H`. For quasi-self-similar and statistically self-similar fractals, the scaling relationship holds approximately or in expectation.

Power law scaling: if an object has fractal dimension `d`, then measuring it with boxes of size `epsilon` yields count `N(epsilon) ~ epsilon^(-d)`. The log-log plot of `N(epsilon)` vs `epsilon` is linear with slope `-d`.

---

## Iterative Generation

Most fractals are defined as the limit of an iterative process:

**Escape-time iteration**: Apply `z -> f(z)` repeatedly from each starting point `z_0`. The fractal set is defined by whether orbits remain bounded or escape. The Mandelbrot Set `M` is the set of complex parameters `c` for which `z -> z^2 + c` with `z_0 = 0` remains bounded.

**IFS (Iterated Function Systems)**: Apply a set of contractive transformations `{w_1, w_2, ..., w_n}` to a set. The fractal is the unique invariant set (attractor) satisfying `A = w_1(A) ∪ w_2(A) ∪ ... ∪ w_n(A)`.

**L-system rewriting**: Apply string substitution rules repeatedly, then interpret the resulting string as geometric drawing instructions.

---

## Fixed Points and Invariant Sets

The key objects in fractal mathematics are often defined as invariant sets under transformations.

For an IFS `{w_1, ..., w_n}`, the attractor `A` satisfies:
```
A = ∪ w_i(A)
```
This means `A` maps to itself under the IFS — it is a fixed point of the Hutchinson operator.

For complex iteration `f_c(z) = z^2 + c`, the Julia set `J(c)` is the boundary between initial conditions that escape to infinity and those that remain bounded. `J(c)` is invariant: `f_c^{-1}(J(c)) = J(c)`.

---

## Parameter Sensitivity

Fractal-generating systems are often highly sensitive to parameter values. Small changes in parameters can produce qualitatively different fractal structures:

- For `c` inside the Mandelbrot Set, `J(c)` is connected
- For `c` outside the Mandelbrot Set, `J(c)` is totally disconnected (Cantor dust)
- The transition at the boundary is infinitely complex

This sensitivity is not the same as chaos (sensitive dependence on initial conditions), but is analogous: the Mandelbrot Set boundary itself encodes the parameter sensitivity of the entire family of Julia sets.

---

## Topological Properties

### Connectedness
Fractal sets may be connected (Mandelbrot Set interior), locally connected (Koch curve), totally disconnected (Cantor Set, Cantor-dust Julia sets), or connected but not locally connected (some Julia sets).

### Nowhere Differentiability
Fractal curves are typically nowhere differentiable: they have no tangent at any point. The Koch Curve is a continuous function from [0,1] to R^2 but has no derivative anywhere. This is a mathematical formalization of "rough at all scales."

### Cantor Function and Measure
Many fractal sets have zero Lebesgue measure despite being uncountably infinite. The Cantor Set has measure zero: the lengths removed (1/3 + 2/9 + 4/27 + ...) sum to 1. The Hausdorff measure in fractional dimension is the appropriate measure for these sets.

---

## Escape Radius and Bailout

For complex iteration `z -> z^2 + c`, if `|z_n| > 2`, then `z_n -> infinity`. The escape radius is 2. More generally, for `z -> z^d + c`, the escape radius is `max(|c|, 2)`.

Smooth escape-time coloring uses the normalized iteration count:
```
mu = n - log(log(|z_n|)) / log(d)
```
where `n` is the iteration count at escape and `d` is the exponent. This removes the discrete banding artifact and produces smooth color gradients.

---

## Bifurcation and Period-Doubling

For the quadratic family `f_c(z) = z^2 + c` on the real line:
- For `c > -2` (roughly), orbits are bounded
- As `c` decreases, the orbit period doubles at specific values of `c`
- The Feigenbaum constant `delta ≈ 4.6692` governs the rate of period-doubling
- This period-doubling cascade is itself self-similar and fractal

The bifurcation diagram of the logistic map is a fractal. The Feigenbaum constants are universal — they appear in all period-doubling routes to chaos regardless of the specific family.

---

## Summary of Key Mathematical Properties

| Property | Description | Examples |
|---|---|---|
| Non-integer Hausdorff dimension | `d_H` exceeds topological dimension | Koch, Cantor, Sierpinski |
| Self-similarity | Scaling copies within the set | All classical fractals |
| Iterative generation | Defined as limit of iterative process | All escape-time, IFS |
| Invariant sets | Fixed points of operators | IFS attractors, Julia sets |
| Parameter sensitivity | Qualitative changes from small parameter changes | Julia sets vs. Mandelbrot Set |
| Nowhere differentiability | No tangent at any point | Koch, Weierstrass function |
| Zero Lebesgue measure | Fractal set has measure zero despite infinite point count | Cantor set |
| Fractal boundary | Boundary with dimension > 1 | Mandelbrot boundary (dim 2) |
