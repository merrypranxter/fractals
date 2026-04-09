# FRACTALS

A hardcore knowledge base for fractals, recursion, self-similarity, iterative systems, fractal families, dimensional metrics, rendering logic, and translation into generative art, shaders, AI prompting, and application systems.

---

## Purpose

This repo is a **fractal intelligence base** — not a gallery, not a gallery of pretty math images, not a vague collection of "trippy recursive things." It answers precise questions:

- What kind of fractal is this?
- How is it generated?
- What numbers matter (dimensions, parameters, escape thresholds)?
- What visual behaviors emerge and why?
- What knobs can be exposed to a shader, a generative art engine, or an AI prompt system?
- What other families is it related to? What does it get confused with?

Everything here is meant to be technically grounded and practically useful to both engineers and artists.

---

## Core Goals

- Document all major named fractals and fractal families with formulas, parameters, and dimensional data
- Build a clean taxonomy separating families, generation methods, and dimensional classes
- Explain how fractals behave visually and mathematically — including zoom behavior, boundary structure, and parameter sensitivity
- Provide translation layers for GLSL shader implementation, p5.js, TouchDesigner, and generative systems
- Support AI prompt engineering with fractal-specific vocabularies and anti-drift definitions
- Store machine-readable CSV and JSON datasets for future tooling and automation
- Prevent drift into generic "psychedelic pattern" language by maintaining strict scope boundaries

---

## Repository Structure

```
fractals/
├── README.md
├── REPO_STRUCTURE.md
├── ROADMAP.md
├── CHANGELOG.md
├── 00_meta/                        # Manifest, conventions, coverage targets
├── 01_foundation/                  # What fractals are, why they matter, scope, traits
├── 02_taxonomy/                    # Family maps, named index, method/dimension tables
├── 03_core_math/                   # Glossary, notation, complex dynamics, recursion, scaling
├── 04_generation_methods/          # Escape-time, IFS, L-systems, stochastic, attractors
├── 05_fractal_families/            # Per-family deep docs (Mandelbrot, Koch, Barnsley, etc.)
├── 06_recursion_and_symbolic_systems/  # Rewrite rules, substitution, self-reference
├── 07_measurement_and_metrics/     # Hausdorff, box-counting, lacunarity, Lyapunov exponents
├── 08_dynamics_and_chaos/          # Bifurcation, attractors, stability, chaos vs. fractals
├── 09_visual_behavior/             # Branching, filaments, fill/void, symmetry, zoom behavior
├── 10_rendering_and_coloring/      # Escape-time coloring, orbit traps, DE lighting, palettes
├── 11_shader_and_genart_translation/  # GLSL, p5.js, TouchDesigner, control knobs
├── 12_prompt_system/               # Prompt formulas, modules, anti-drift prompting
├── 13_app_and_system_integration/  # Schemas, parameter presets, integration notes
├── 14_structured_data/             # JSON/CSV master datasets
├── 15_examples/                    # Example prompts, shaders, zoom sequences
├── 16_drift_control/               # Scope guards, confusions, failure modes, checklists
└── 17_research_backlog/            # Missing entries, open questions, future work
```

---

## Main Sections

### `01_foundation/`
Defines the repo's conceptual boundaries: what fractals are, what makes them mathematically distinct, their core visual and mathematical traits, and use cases across art, science, and engineering.

### `02_taxonomy/`
Maps named fractals to families, families to generation methods, and generation methods to dimensional classes. Includes CSV indexes for machine readability.

### `03_core_math/`
Shared mathematical foundations used across fractal systems: complex number dynamics, iteration and orbits, fixed points, escape conditions, recursion, self-similarity, scaling laws, and parameter spaces.

### `04_generation_methods/`
Organizes fractals by *how* they are produced — escape-time iteration, iterated function systems (IFS), Lindenmayer systems (L-systems), substitution/rewrite systems, recursive geometric construction, stochastic methods, diffusion-limited aggregation, and attractor-based systems.

### `05_fractal_families/`
Per-family documentation for major fractal groups: complex dynamics (Mandelbrot, Julia, Multibrot, Buddhabrot, Burning Ship), classical geometric fractals (Cantor, Koch, Sierpinski), space-filling curves (Hilbert, Peano, Gosper), IFS fractals (Barnsley Fern, fractal trees), and 3D fractals (Mandelbulb, Mandelbox).

### `07_measurement_and_metrics/`
The numeric tools for analyzing fractal structure: Hausdorff dimension, box-counting dimension, similarity dimension, lacunarity, entropy, and Lyapunov exponents.

### `11_shader_and_genart_translation/`
Practical implementation logic for rendering fractals in GLSL, p5.js, and TouchDesigner. Covers control knob design, orbit traps, distance estimators, and audio-reactive parameter bindings.

### `14_structured_data/`
Machine-readable normalized records: `fractals_master.json`, `formula_library.json`, `glossary.json`, and supporting CSV dimension and parameter tables.

### `16_drift_control/`
Scope guards and quality control. Documents what this repo is *not*, common classification errors, failure modes, and quality checklists for new entries.

---

## Intended Use Cases

- **AI art prompt systems** — structured vocabularies for fractal-specific prompting
- **GLSL / p5.js / TouchDesigner** — shader implementation references and control logic
- **Educational reference** — technically accurate fractal math and taxonomy
- **Visual taxonomy work** — classifying visual outputs into correct families and methods
- **Recursive design systems** — grammar-based and rule-based generative pipelines
- **Future agents and repo automation** — machine-readable data for tool integration

---

## Core Trait Vocabulary

The repo centers on these fundamental fractal properties:

| Trait | Description |
|---|---|
| Self-similarity | Structure repeats at different scales |
| Scale invariance | Laws governing structure hold across zoom levels |
| Iteration | Repeated application of a rule or function |
| Recursion | A process that references itself |
| Feedback | Output feeds back into input |
| Attractors | Systems converge toward particular structures |
| Fractal dimension | Non-integer dimension measuring boundary/space complexity |
| Parameter sensitivity | Small parameter changes produce qualitatively different structures |
| Branching | Hierarchical splitting and subdivision |
| Substitution | Replacing symbols or shapes with more complex versions |

---

## Anti-Drift Boundary

This repo does **not** cover:
- Chaos theory in general (only the intersection with fractal structure)
- Sacred geometry in general
- Arbitrary tilings and tessellations (unless fractal dimension is involved)
- Generic noise functions (Perlin, Simplex) unless used to generate fractal-dimension surfaces
- Cellular automata in general (only fractal-dimension cases like Sierpinski in Rule 90)
- "Trippy swirly pattern" art with no mathematical grounding

Overlap with neighboring domains is documented in `02_taxonomy/related_domains_map.md` and `01_foundation/neighboring_domains.md`.

---

## Status

Active build. Foundation, taxonomy, and core math sections are complete. Generation methods, fractal families, measurement, and shader translation sections are in progress.

See `ROADMAP.md` for build priorities and `CHANGELOG.md` for version history.
