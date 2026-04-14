# Mandelbulb & 3D Fractals

## The Problem with 3D Mandelbrot

The Mandelbrot Set is fundamentally a complex-number construction. The complex number system `ℂ` is 2D with a natural multiplication rule. There is no direct higher-dimensional analog — the quaternions (`ℍ`) are 4D, with nothing in between.

Naive attempts to extend Mandelbrot to 3D using quaternions produce smooth, round-looking surfaces with no fractal boundary detail — mathematically valid but visually disappointing.

The Mandelbulb solves this by defining a *new* multiplication rule in spherical coordinates that produces fractal-like behavior in 3D.

---

## The Mandelbulb

### Formula

For a 3D vector `(x, y, z)`, define the "power n" operation in spherical coordinates:

```
r     = sqrt(x^2 + y^2 + z^2)
theta = acos(z / r)            [polar angle from z-axis]
phi   = atan2(y, x)            [azimuthal angle in xy-plane]

v^n   = r^n * (sin(n*theta)*cos(n*phi),
               sin(n*theta)*sin(n*phi),
               cos(n*theta))
```

Then iterate: `z = z^n + c` starting from `z = 0`, with `c = pixel position`.

### Powers and Their Characters

| Power | Visual Character |
|-------|-----------------|
| 2 | Fuzzy sphere, minimal fractal detail |
| 3 | Alien organic form, asymmetric |
| 4 | More tentacles, intermediate complexity |
| 8 | **Classic Mandelbulb** — spiky tentacled sphere, dense fractal surface |
| 16 | Very thin, extremely complex needle-like spikes |

Power 8 is canonical because it produces the best balance of visual complexity and computational tractability.

### Why Power 8?

The spherical formula isn't truly "multiplication" in any algebraic sense. For power 2, the formula degenerates. Power 8 was chosen empirically by Daniel White and Paul Nylander (2009) because it produces the richest fractal boundary structure.

---

## Rendering the Mandelbulb: Ray Marching + DE

The Mandelbulb cannot be rendered with the escape-time method — we can't iterate and color a 2D image directly because the fractal lives in 3D volume. Instead, use **ray marching against a distance estimator**.

### Distance Estimator

Track the derivative `dr` alongside `z`:
```
dr = power * r^(power-1) * dr + 1
```

At escape (|z| > bailout):
```
DE = 0.5 * log(r) * r / dr
```

This gives the approximate distance from the current 3D point to the Mandelbulb surface.

### Ray Marching Algorithm

```
for each pixel:
  emit ray from camera through pixel
  march along ray, stepping by DE each iteration
  if DE < surface_threshold: hit! shade the surface
  if distance > max_distance: miss (background)
```

### Surface Shading

Once a surface hit is found:
- Estimate surface normal via DE gradient (6 DE evaluations at ±epsilon offsets)
- Apply ambient occlusion from nearby DE values
- Apply Phong lighting or more complex PBR
- Color surface by orbit trap (minimum |z| during iteration = `trap`) — maps to surface material

### GLSL Shader
See `shaders/mandelbulb.frag` — implements full ray marching pipeline, animated power, orbit camera, ambient occlusion, rim lighting, and orbit trap surface coloring.

---

## Mandelbox

An alternative 3D fractal using a different iteration rule:

```
fold: if x > 1 then x = 2-x; if x < -1 then x = -2-x  (box fold)
if |z| < minR: z *= fixedRadius^2 / minR^2
else if |z| < fixedRadius: z *= fixedRadius^2 / dot(z,z)
z = scale * z + c
```

The Mandelbox produces boxy, crystalline structures with cubic symmetry, as opposed to the Mandelbulb's spherical symmetry.

| Property | Mandelbulb | Mandelbox |
|----------|-----------|-----------|
| Symmetry | Spherical (octahedral at power 8) | Cubic |
| Visual | Spiky organic tentacles | Boxy crystalline towers |
| Interesting parameter | power | scale (typically -1.5 to -3) |
| Interior | Bulbous body | Open cubic structure |

---

## Other 3D Fractals

### Menger Sponge
Recursive removal of cross-shaped sections from a cube. Hausdorff dimension ≈ 2.727. Renders cleanly as a CSG operation in raymarching.

### Sierpinski Tetrahedron (Tetrix)
IFS applied in 3D: 4 half-scale tetrahedra at corners. Hausdorff dimension ≈ 2.0. Exactly self-similar.

### 3D Newton Fractal
Newton's method for polynomial root finding extended to the 3D quaternion plane (restricted to 3D). Produces basin-of-attraction structures with complex boundaries.

### Distance-Folded Fractals
Domain folding / modular repetition applied recursively. `p = abs(p) - 1.0` creates the "Abox" (Amazeing Box) structure: infinitely repeated rooms with fractal doorways.

---

## Performance Notes

3D fractal raymarching is expensive:
- 8-10 iterations per DE evaluation inside the loop
- 64-128 march steps per pixel to converge
- 6× DE calls for normal estimation

Optimizations:
- Reduce `max_iter` (8 is usually enough for Mandelbulb)
- Conservative stepping: multiply DE by 0.9 to avoid overshoot
- Early exit if DE stays large (clearly in open space)
- Reduce resolution and upscale
- Precompute orbit traps in a separate pass

---

## Prompt Vocabulary

- `Mandelbulb power 8`, `fractal planet surface`, `tentacled cosmic sphere`
- `3D fractal raymarching`, `DE-based fractal glow`
- `Mandelbox cubic interior`, `crystalline fractal architecture`
- `orbit trap surface coloring`, `fractal ambient occlusion`
- `Menger sponge`, `fractal void interior`, `infinitely recursive structure`
