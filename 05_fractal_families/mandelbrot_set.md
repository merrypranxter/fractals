# Mandelbrot Set

## Definition

The Mandelbrot Set **M** is the set of complex parameters `c` for which the orbit of `z = 0` under iteration of `f_c(z) = z^2 + c` remains bounded:

```
M = { c ∈ ℂ : lim_{n→∞} |f_c^n(0)| ≠ ∞ }
```

Each pixel in a rendering represents one complex number `c`. If the orbit stays within a bailout radius (typically 2.0), the pixel is "in the set" — usually colored black. If it escapes, the pixel color encodes *how fast* it escaped.

---

## Structure

### Main Cardioid
The largest region, centered near c = -0.25. Parameter values here produce fixed-point orbits (period 1). All orbits converge to a single attracting fixed point.

### Period-2 Bulb
The circular blob to the left of the cardioid, centered near c = -1.0. Orbits here cycle between two values. Periods double at each attached bulb.

### Period Bulbs
Each circular attachment on the cardioid boundary corresponds to a specific periodic orbit. The `p/q` bulb (fraction p over q along the cardioid) has period q. Bulbs at 1/3 = period 3, 1/4 = period 4, etc.

### Filaments
Thin fractal branches extending from the boundary of every bulb. These are the "hairy" structures. Within the filaments, all orbits are eventually periodic or pre-periodic (Misiurewicz points).

### Minibrots
Embedded copies of the entire Mandelbrot Set exist at infinitely many locations throughout the filaments. Each minibrot is topologically equivalent to the whole set but not geometrically identical.

---

## Key Parameters for Rendering

| Parameter | Effect | Typical Value |
|-----------|--------|---------------|
| `max_iter` | Detail level — more iterations = finer boundary | 256–4096 |
| `bailout` | Escape radius² — larger = smoother coloring | 256–65536 |
| `zoom` | Magnification level | 1 – 10^15 |
| `center_c` | Which region to show | See notable regions below |

---

## Coloring Methods

### Escape Time Banding (naive)
Color = iteration count at escape, modulo palette size. Produces discrete color bands. Fast but visually rough.

### Smooth Escape Time (recommended)
```glsl
float log_zn = log(dot(z,z)) * 0.5;
float nu      = log(log_zn / log(2.0)) / log(2.0);
float smooth  = float(iter) - nu;
```
Removes banding by incorporating `|z|` at escape into the count. Produces smooth gradients.

### Orbit Traps
Track minimum distance from the orbit to a geometric shape (cross, circle, point, line). Map trap distance to color. Produces intricate, organic secondary patterns layered onto the escape structure.

### Distance Estimation
Track the derivative `dz` alongside `z`. At escape:
```glsl
float de = sqrt(dot(z,z) / dot(dz,dz)) * log(dot(z,z)) * 0.5;
```
DE approximates the distance from the pixel to the fractal boundary. Use for boundary glow effects, anti-aliasing, and pseudo-3D lighting.

### Buddhabrot (histogram density)
Instead of coloring by escape time, count how many times escaping orbits pass through each *pixel position* (treating z as position, not c). Results in nebula-like glowing forms.

---

## Notable Zoom Coordinates

| Region | Center c | Zoom Level | Character |
|--------|----------|------------|-----------|
| Full view | -0.5 + 0i | 1× | Cardioid + main bulbs |
| Seahorse Valley | -0.745 + 0.113i | 500× | Dense spiral tendrils |
| Elephant Valley | 0.3 + 0i | 50× | Elephant trunk spirals |
| Double Spiral | -0.7269 + 0.189i | 1000× | Nested double spirals |
| Deep Minibrot | -0.7435669 + 0.1314023i | 10^6× | Full Mandelbrot replica |
| Julia Island | -0.16 + 1.0405i | 10^4× | Embedded Julia-like structure |

---

## Mathematical Properties

- **Hausdorff dimension of boundary**: 2 (the boundary is "maximally thick")
- **Area of M**: approximately 1.5065918849 square units (not exactly known)
- **Connectedness**: M is connected (Douady & Hubbard, 1982)
- **Local connectivity**: conjectured but not proven (MLC conjecture — open problem)
- **Self-similarity**: M contains infinitely many embedded copies of itself in its filaments

---

## Relationship to Julia Sets

For every parameter `c`:
- If `c ∈ M` → `J(c)` is a *connected* Julia set
- If `c ∉ M` → `J(c)` is a Cantor set (totally disconnected)

The Mandelbrot Set is therefore the "index" of all Julia sets: its shape encodes the topology of every Julia set in the quadratic family.

---

## GLSL Shader
See `shaders/mandelbrot.frag` — implements smooth escape time, orbit traps (cross), distance estimation glow, animated zoom, and mouse-reactive Julia preview overlay.

---

## Prompt Vocabulary

For AI art generation, prefer these specific terms over generic "fractal":
- `escape-time coloring`, `smooth iteration count`, `orbit trap shimmer`
- `Mandelbrot filaments`, `boundary tendrils`, `minibrot satellites`
- `period-doubling cascade`, `cardioid main body`, `Seahorse Valley spirals`
- `fractal halo`, `infinite zoom`, `self-similar boundary structure`
