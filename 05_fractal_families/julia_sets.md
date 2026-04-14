# Julia Sets

## Definition

For a fixed complex parameter `c`, the Julia set `J(c)` is the boundary of the set of initial values `z_0` whose orbit under `f_c(z) = z^2 + c` remains bounded:

```
J(c) = ∂{ z_0 ∈ ℂ : lim_{n→∞} |f_c^n(z_0)| ≠ ∞ }
```

Unlike the Mandelbrot Set (where `z_0 = 0` is fixed and `c` varies), in Julia sets **the pixel is the starting value `z_0`** and `c` is a fixed parameter that determines the *shape of the entire fractal*.

Choosing a different `c` gives a completely different fractal — from smooth connected blobs to spindly trees to dust clouds.

---

## The Fundamental Duality with the Mandelbrot Set

- **c inside M** → `J(c)` is *connected* (one piece)
- **c outside M** → `J(c)` is *totally disconnected* (Cantor dust)
- **c on the boundary of M** → `J(c)` is the most complex (dendrite, Siegel disk, etc.)

The Mandelbrot Set is literally the map of all possible Julia set topologies. Each point in the Mandelbrot Set *is* a possible `c` value, and its location in M tells you what `J(c)` looks like.

---

## Famous Julia Set Parameters

| Name | c value | Character |
|------|---------|-----------|
| **Rabbit** | -0.12256 + 0.74486i | Three-lobed, period-3. Connected. Rabbit-ear symmetry. |
| **Basilica** | -0.75 + 0i | Two symmetric lobes. The Fatou set boundary. |
| **Siegel Disk** | -0.39054 - 0.58679i | Smooth quasiperiodic rotation of interior. |
| **Airplane** | -1.75488 + 0i | Period-4 orbit. Insect-like, four wings. |
| **San Marco Dragon** | -0.7269 + 0.1889i | Dragon-like with sweeping wings. |
| **Dendrite** | 0 + 1i | Totally disconnected tree. Fractal dimension ≈ 1. |
| **Douady Rabbit** | -0.12256 + 0.74486i | Three-fold rabbit symmetry. |
| **Spiral Julia** | 0.285 + 0.01i | Tight spiral filaments with dense boundary. |
| **Fat Basilica** | -0.75 + 0.1i | Slightly perturbed basilica — one side collapsed |

---

## Visual Structure by Region

### Interior Regions (Fatou Components)
Where orbits converge — the smooth, colored bodies inside the Julia set. Different interior regions correspond to:
- **Attracting cycles**: orbits converge to a periodic attractor (visible as smooth filled regions)
- **Siegel disks**: quasiperiodic rotation (circular-ish smooth regions)
- **Parabolic components**: orbits approach a parabolic fixed point (cusps at region boundaries)

### Boundary (The Julia Set Itself)
The actual fractal — the boundary between convergent and divergent orbits. This is where all the complexity lives. At the boundary, orbits are chaotically sensitive.

### Exterior (Escape Region)
Where orbits diverge to infinity. Colored by escape time — these colors form the decorative halos and banding patterns.

---

## Symmetry

Julia sets have **2-fold symmetry**: `J(c)` is symmetric under `z → -z` (rotation by π). This is because `f_c(-z) = z^2 + c = f_c(z)`.

For special parameter values:
- `c` on the real axis → J(c) is symmetric under complex conjugation (reflection in real axis)
- The Rabbit Julia has approximate 3-fold symmetry from its period-3 orbit

---

## Rendering

Same escape-time algorithm as Mandelbrot, but:
- `z_0 = pixel position` (the varying quantity)
- `c = fixed per-frame parameter`

**Key difference in coordinate mapping:** Julia sets are centered at the origin and extend roughly to radius 2. Map the viewport to `[-2, 2] × [-2, 2]` (adjusting for aspect ratio).

### Coloring Tips
- The classic Mandelbrot coloring methods (smooth escape time, orbit traps, DE) all apply directly
- Orbit traps are *especially* effective on Julia sets because the orbit paths are more varied
- Interior coloring matters more here — the Fatou components are large and prominent

---

## GLSL Shader
See `shaders/julia.frag` — implements smooth escape time, point orbit traps, distance estimation, animated parameter cycling through 7 presets, and mouse-controlled c value.

---

## Prompt Vocabulary

- `Julia set with c = [specific value]`, `connected Julia`, `Cantor dust Julia`
- `period-3 rabbit Julia`, `Siegel disk quasiperiodic rotation`
- `Julia set boundary filaments`, `Fatou component glow`
- `orbit trap shimmer`, `smooth escape-time gradients`
- `San Marco dragon`, `Douady rabbit`, `dendrite Julia`
