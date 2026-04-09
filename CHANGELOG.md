# CHANGELOG

All notable changes to the FRACTALS knowledge base are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned
- `04_generation_methods/` — full build of all generation method docs
- `05_fractal_families/` — per-family documentation for all 25+ named families
- `07_measurement_and_metrics/` — dimension and metric docs
- `11_shader_and_genart_translation/` — GLSL and p5.js implementation docs
- `14_structured_data/` — JSON master records and structured CSVs
- `16_drift_control/` — scope enforcement and quality checklist docs

---

## [0.1.0] — 2025-07-16

### Added — Repository Seed

**Root-level files:**
- `README.md` — full repository overview with purpose, structure, trait vocabulary, and anti-drift boundary
- `REPO_STRUCTURE.md` — complete folder architecture with file-level descriptions and record template
- `ROADMAP.md` — full milestone build plan with completion criteria
- `CHANGELOG.md` — this file

**`00_meta/`:**
- `repo_manifest.yaml` — machine-readable repository manifest with purpose, structure, status, and anti-drift goals
- `contribution_rules.md` — editorial standards for adding and editing content
- `naming_conventions.md` — file naming, field naming, and tag conventions
- `coverage_targets.md` — milestone completion criteria and coverage requirements

**`01_foundation/`:**
- `fractals_definition.md` — comprehensive definition of fractals, mathematical properties, and what qualifies as fractal structure
- `why_fractals_matter.md` — use cases in science, art, engineering, computation, and AI systems
- `scope_and_boundaries.md` — explicit in-scope and out-of-scope definitions
- `core_visual_traits.md` — systematic catalog of visual properties across fractal families
- `core_math_traits.md` — mathematical properties that define fractal structure: dimension, iteration, self-similarity, parameter sensitivity
- `use_cases.md` — practical applications across generative art, shaders, prompting, simulation, and education
- `neighboring_domains.md` — adjacent fields (chaos theory, sacred geometry, cellular automata, noise functions) and boundary definitions

**`02_taxonomy/`:**
- `fractal_family_map.md` — hierarchical map of all fractal families and sub-families
- `generation_method_map.md` — map of generation methods with family cross-references
- `named_fractals_index.csv` — 25-row index of named fractals with family, method, dimension, and tag data
- `family_to_method_map.csv` — cross-reference table: family → primary and secondary generation methods
- `family_to_dimension_map.csv` — cross-reference table: fractal → Hausdorff, topological, and similarity dimensions
- `related_domains_map.md` — adjacent mathematical and artistic domains with relationship definitions

**`03_core_math/`:**
- `glossary.md` — definitions for all core technical terms
- `notation_legend.md` — standard notation reference
- `complex_numbers.md` — complex number arithmetic, the complex plane, and polar form for fractal use
- `iteration_and_orbits.md` — iteration mechanics, orbit sequences, convergence, and divergence
- `fixed_points_and_cycles.md` — fixed points, periodic orbits, and their structural role
- `escape_conditions.md` — escape radius, bailout conditions, and iteration count definitions
- `recursion_basics.md` — recursion as a structural concept with fractal-specific applications
- `self_similarity.md` — exact, quasi, and statistical self-similarity with examples
- `scaling_laws.md` — power laws, scaling exponents, and scale-invariant behavior
- `invariance.md` — transformation invariance in fractal systems
- `parameter_spaces.md` — parameter spaces, the Mandelbrot Set as parameter space, and parameter sensitivity

### Repository structure
- Established folder hierarchy for 17 top-level sections
- Set naming conventions, contribution rules, and coverage targets
- Defined record template for fractal entries

---

## Version History Notes

- `0.x.x` — Seed and foundation phase: establishing structure, taxonomy, and core math
- `0.5.x` — Generation methods and fractal families complete
- `0.8.x` — Measurement, rendering, shader translation complete
- `1.0.0` — All primary sections complete with structured data and quality validation
- `1.x.x` — Maintenance, additions, and example expansion
