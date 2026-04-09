# Neighboring Domains

This document maps the domains adjacent to fractal geometry, defines how they relate to fractals, and clarifies which aspects are in scope for this repo.

---

## Chaos Theory

**What it is**: The study of dynamical systems that exhibit sensitive dependence on initial conditions — systems where small differences in starting state lead to exponentially diverging trajectories.

**Relationship to fractals**: Chaotic systems often produce fractal structures. The boundaries of basins of attraction in chaotic systems are typically fractal. Strange attractors (Lorenz, Henon, Rossler) are both chaotic (sensitive dependence) and fractal (non-integer Hausdorff dimension).

**In scope**: Strange attractors with non-integer dimension, Julia set bifurcation structure, Lyapunov exponents as measures of chaos in fractal systems.

**Out of scope**: Chaos theory as a general field, the logistic map without its fractal bifurcation diagram, chaotic systems whose attractors are not fractal.

---

## Complex Analysis

**What it is**: The study of functions of complex variables, including holomorphic functions, conformal maps, and analytic continuation.

**Relationship to fractals**: The theory of iteration of complex functions (Fatou, Julia, 1918) is the mathematical foundation of complex-dynamics fractals. The Mandelbrot Set and Julia Sets live in the complex plane and are defined by iteration of complex functions.

**In scope**: All of complex dynamics as it applies to fractal generation. Complex number arithmetic, the complex plane, polar form, iteration theory.

**Out of scope**: Complex analysis topics not connected to iteration or fractal structure (residue theorem, Cauchy integral formula as standalone topics).

---

## Cellular Automata

**What it is**: Discrete computational systems where cells on a grid update their state based on local neighbor rules.

**Relationship to fractals**: Some cellular automata produce fractal-dimension outputs. Rule 90 on a 1D grid produces the Sierpinski Triangle. Some 2D automata produce fractal-dimension cluster boundaries.

**In scope**: Cellular automata that produce measurable fractal-dimension structures.

**Out of scope**: Cellular automata as a general computational framework (Conway's Game of Life, traffic models, etc.) unless fractal structure is demonstrated.

---

## Sacred Geometry

**What it is**: Geometric patterns and proportions associated with spiritual and metaphysical traditions (Flower of Life, Metatron's Cube, Platonic solids, golden ratio spirals).

**Relationship to fractals**: Occasional overlap: some sacred geometry patterns use recursive subdivision. But most sacred geometry is Euclidean (integer dimensions, exact symmetry groups, no infinite detail).

**In scope**: Nothing from sacred geometry unless fractal dimension is rigorously demonstrated.

**Out of scope**: Sacred geometry as a domain. The visual overlap is not mathematical overlap.

---

## Noise Functions

**What it is**: Pseudorandom functions designed to produce smooth, spatially coherent random values. Perlin noise (1983), Simplex noise, Value noise, Worley noise.

**Relationship to fractals**: Standard noise functions are smooth and have integer dimension. Fractional Brownian motion (fBm), constructed by summing octaves of noise at different scales, does have fractal properties (Hurst exponent, self-similar statistics).

**In scope**: Fractional Brownian motion and its fractal dimension properties. Multi-octave noise specifically when analyzed as fractal.

**Out of scope**: Perlin noise, Simplex noise, and other smooth noise functions used purely as procedural texture without fractal dimension analysis.

---

## Tilings and Tessellations

**What it is**: Division of the plane into non-overlapping tiles. Periodic tilings (square, hexagonal), aperiodic tilings (Penrose), Escher-type tilings.

**Relationship to fractals**: Most tilings are not fractal (they tile periodically or quasi-periodically with integer dimension). Some fractal tilings exist (rep-tiles, sphinx tiles) where the tiles can be subdivided into smaller copies of themselves.

**In scope**: Rep-tiles, sphinx tiles, and other self-similar tilings with fractal subdivision properties.

**Out of scope**: Periodic and aperiodic tilings without fractal structure.

---

## Topology

**What it is**: The study of properties preserved under continuous deformation — connectedness, compactness, genus, homotopy.

**Relationship to fractals**: Topological properties of fractal sets (connectedness of Julia sets, local connectedness of the Mandelbrot Set boundary) are essential to understanding fractal structure. The topological dimension is one of the two dimensions compared in the definition of a fractal.

**In scope**: Topological properties of specific fractal sets (connectedness, local connectedness, dimension comparisons).

**Out of scope**: Topology as a general field, knot theory, manifold theory without fractal connection.

---

## Dynamical Systems Theory

**What it is**: Mathematical study of systems that evolve over time according to fixed rules. Includes fixed points, periodic orbits, stability analysis, bifurcations, and attractors.

**Relationship to fractals**: Fractal structure emerges naturally in dynamical systems: Julia sets are invariant sets of complex dynamical systems, bifurcation diagrams are fractal, strange attractors have fractal dimension.

**In scope**: Bifurcation structure relevant to fractal families, stability of fixed points and cycles in iteration, basin boundaries.

**Out of scope**: Dynamical systems theory as a general field when not connected to fractal structure or generation.

---

## Summary Table

| Domain | Relationship | In Scope |
|---|---|---|
| Chaos theory | Strange attractors are fractal; bifurcation diagrams fractal | Fractal attractors and bifurcation structure only |
| Complex analysis | Foundation of complex-dynamics fractals | All of complex dynamics and iteration theory |
| Cellular automata | Some produce fractal outputs (Rule 90, etc.) | Only CA with demonstrated fractal dimension |
| Sacred geometry | Visual overlap only; not mathematically fractal | Nothing unless dimension is demonstrated |
| Noise functions | fBm is fractal; smooth noise is not | fBm and multi-scale noise with fractal properties only |
| Tilings | Most are not fractal; rep-tiles are | Self-similar and fractal-subdivision tilings only |
| Topology | Fractal sets have important topological properties | Topological properties of fractal sets |
| Dynamical systems | Fractals emerge in dynamical system analysis | Bifurcation, basin structure, attractor dimension |
