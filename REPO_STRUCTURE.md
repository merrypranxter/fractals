# FRACTALS REPO STRUCTURE

This document defines the intended architecture of the FRACTALS repository — how it is organized, why it is organized that way, what each folder contains, and what the expected record format looks like.

---

## Design Principles

1. **Separate math foundations from visual behavior.** The rules governing a fractal's formula are not the same as the rules governing how it looks when rendered. These are different layers.
2. **Separate fractal families from generation methods.** The Mandelbrot Set is a *complex dynamics* fractal. It is *generated* by escape-time iteration. These are not the same classification — many families share generation methods, and many generation methods can produce multiple families.
3. **Separate human-readable docs from machine-readable data.** Markdown files are for explanation. JSON and CSV files are for indexing, querying, and tool integration.
4. **Include translation layers.** Fractals are not only mathematical objects. This repo explicitly covers how to implement them in GLSL, p5.js, TouchDesigner, and AI prompt systems.
5. **Include anti-drift documents.** Without explicit scope guards, a fractals repo tends to absorb all "recursive-looking" or "psychedelic" aesthetic content regardless of mathematical relevance. The `16_drift_control/` folder is load-bearing.

---

## Folder Reference

### `00_meta/`
Repository-level metadata and operational conventions.

| File | Type | Purpose |
|---|---|---|
| `repo_manifest.yaml` | YAML | Machine-readable summary of repo purpose, structure, and status |
| `contribution_rules.md` | Markdown | Rules for adding or editing content |
| `naming_conventions.md` | Markdown | File and field naming standards |
| `coverage_targets.md` | Markdown | What must be covered before each milestone is considered complete |

---

### `01_foundation/`
Conceptual boundaries and grounding for the entire repo.

| File | Purpose |
|---|---|
| `fractals_definition.md` | Comprehensive definition of fractals and fractal structure |
| `why_fractals_matter.md` | Use cases in science, art, engineering, and computation |
| `scope_and_boundaries.md` | What is and is not in scope for this repo |
| `core_visual_traits.md` | Visual properties common across fractal families |
| `core_math_traits.md` | Mathematical properties that define fractal structure |
| `use_cases.md` | Practical applications in generative art, shaders, prompting, etc. |
| `neighboring_domains.md` | Related fields and how they differ from fractals |

---

### `02_taxonomy/`
Classification structures: family maps, named indexes, and cross-reference tables.

| File | Type | Purpose |
|---|---|---|
| `fractal_family_map.md` | Markdown | Hierarchical map of fractal families and sub-families |
| `generation_method_map.md` | Markdown | Map of generation methods and the families that use them |
| `named_fractals_index.csv` | CSV | Index of named fractals with family, method, dimensions, and tags |
| `family_to_method_map.csv` | CSV | Cross-reference: family → primary and secondary generation methods |
| `family_to_dimension_map.csv` | CSV | Cross-reference: fractal name → dimensional measurements |
| `related_domains_map.md` | Markdown | Adjacent mathematical and artistic domains and their relationship to fractals |

---

### `03_core_math/`
Shared mathematical concepts used across fractal systems.

| File | Purpose |
|---|---|
| `glossary.md` | Definitions of all core technical terms |
| `notation_legend.md` | Standard notation used throughout the repo |
| `complex_numbers.md` | Complex number arithmetic, the complex plane, and polar form |
| `iteration_and_orbits.md` | Iteration mechanics, orbit sequences, and convergence |
| `fixed_points_and_cycles.md` | Fixed points, periodic orbits, and their role in fractal structure |
| `escape_conditions.md` | How escape radius, bailout conditions, and iteration counts are defined |
| `recursion_basics.md` | Recursion as a structural concept distinct from iteration |
| `self_similarity.md` | Exact, quasi, and statistical self-similarity |
| `scaling_laws.md` | Power laws, scaling exponents, and scale-invariant behavior |
| `invariance.md` | What remains unchanged under transformation |
| `parameter_spaces.md` | How parameter spaces relate to fractal structure (e.g., the Mandelbrot Set as parameter space for Julia Sets) |

---

### `04_generation_methods/`
How fractals are produced — the algorithmic and mathematical mechanisms.

| File | Purpose |
|---|---|
| `escape_time_systems.md` | Iteration until escape: Mandelbrot, Julia, Multibrot, Burning Ship |
| `iterated_function_systems.md` | IFS: contractive affine transformations, random iteration, Barnsley |
| `l_systems.md` | Lindenmayer systems: string rewriting and geometric interpretation |
| `substitution_systems.md` | Symbolic substitution: Cantor, Thue-Morse, Fibonacci rules |
| `recursive_geometry.md` | Geometric subdivision: Koch, Sierpinski, fractal trees |
| `stochastic_fractals.md` | Random processes: Brownian motion, random midpoint displacement |
| `diffusion_limited_aggregation.md` | DLA: growth by random-walk accretion |
| `percolation_and_cluster_growth.md` | Percolation thresholds and fractal cluster boundaries |
| `newton_methods.md` | Newton's method iteration on complex polynomials |
| `orbit_trap_methods.md` | Coloring by orbit proximity to geometric traps |
| `distance_estimation.md` | Computing distance to fractal boundaries for rendering |
| `domain_coloring.md` | Visualizing complex functions by phase and modulus |

---

### `05_fractal_families/`
Per-family documentation for all major fractal groups.

Each file covers: definition, core equation or rule, key parameters, dimensional data, visual traits, generation method, related forms, implementation notes, and prompt/shader tags.

Families covered: Mandelbrot Set, Julia Sets, Multibrot Sets, Buddhabrot, Burning Ship, Newton Fractals, Lyapunov Fractals, Kleinian Limit Sets, Cantor Family, Koch Family, Sierpinski Family, Dragon Curves, Lévy C Curve, Gosper Curve, Space-Filling Curves, Barnsley Fern, Fractal Trees, Apollonian Gaskets, Multifractals, Strange Attractors (Lorenz, Hénon, Rössler), Mandelbulb and Mandelbox.

---

### `06_recursion_and_symbolic_systems/`
Recursion and symbol manipulation as generative mechanisms.

| File | Purpose |
|---|---|
| `recursion_patterns.md` | Common recursive structures across fractal families |
| `rewrite_rules.md` | Formal rewrite rule definitions and examples |
| `symbolic_substitution.md` | Symbolic systems (Cantor, L-systems) as fractal generators |
| `self_reference_logic.md` | Self-reference as a mathematical and conceptual principle |
| `recursive_design_grammar.md` | Design-focused recursive grammar for art/shader use |
| `l_system_grammar_library.json` | Reusable L-system grammar definitions |

---

### `07_measurement_and_metrics/`
Quantitative tools for characterizing fractal structure.

| File | Purpose |
|---|---|
| `hausdorff_dimension.md` | Hausdorff dimension: definition, calculation, examples |
| `box_counting_dimension.md` | Box-counting method and its relationship to Hausdorff dimension |
| `similarity_dimension.md` | Similarity dimension for exactly self-similar fractals |
| `lacunarity.md` | Measuring gappiness and texture in fractal structures |
| `entropy_and_complexity.md` | Information entropy and algorithmic complexity in fractal systems |
| `lyapunov_exponents.md` | Measuring sensitivity to initial conditions |
| `multifractal_spectrum.md` | Multifractal analysis and the singularity spectrum |
| `measurement_comparison_table.csv` | Side-by-side dimension and metric values for major fractals |

---

### `08_dynamics_and_chaos/`
Dynamical systems concepts that underlie or relate to fractal structure.

| File | Purpose |
|---|---|
| `bifurcation.md` | Bifurcation diagrams and period-doubling routes to chaos |
| `attractors_and_basins.md` | Attractors, repellers, and basins of attraction |
| `stability_vs_instability.md` | Stable vs. unstable fixed points and orbits |
| `parameter_sensitivity.md` | Why small parameter changes produce large structural changes |
| `feedback_loops.md` | Feedback as the mechanism underlying iterative fractal generation |
| `chaos_vs_fractals.md` | What chaos and fractals share, and where they diverge |

---

### `09_visual_behavior/`
How fractals appear when rendered — systematic descriptions of visual phenomena.

| File | Purpose |
|---|---|
| `branching_logic.md` | Binary and n-ary branching, depth limits, angle distributions |
| `filaments_and_tendrils.md` | Thin filamentary structures in complex-dynamics fractals |
| `dust_clouds_and_speckle.md` | Cantor dust, Julia dust, and disconnected fractal sets |
| `bulbs_satellites_and_minibrots.md` | Cardioid bulbs, satellite bulbs, and embedded minibrots |
| `edge_density.md` | How boundary complexity scales with zoom depth |
| `fill_vs_void.md` | Interior filling, lacunar gaps, and void structure |
| `self_similarity_modes.md` | Exact, approximate, and statistical self-similarity modes |
| `symmetry_modes.md` | Rotational, reflective, and dihedral symmetry in fractals |
| `zoom_behavior.md` | What happens structurally and visually during deep zoom |
| `animation_behavior.md` | How fractals behave under parameter animation |

---

### `10_rendering_and_coloring/`
Technical methods for rendering fractals visually.

| File | Purpose |
|---|---|
| `escape_time_coloring.md` | Mapping iteration count to color, smooth coloring methods |
| `orbit_trap_coloring.md` | Coloring by orbit proximity to geometric shapes |
| `distance_estimator_lighting.md` | Using DE for surface normal computation and 3D lighting |
| `normal_maps_for_fractals.md` | Generating normal maps from fractal boundaries |
| `palette_logic.md` | Palette design, cycling, and gradient mapping for fractals |
| `density_and_histogram_coloring.md` | Buddhabrot-style density coloring |
| `anti_mud_rendering.md` | Preventing flat, uniform color regions and visual mud |

---

### `11_shader_and_genart_translation/`
Practical code-level translation for artists and engineers.

| File | Purpose |
|---|---|
| `shader_primitives.md` | Core GLSL building blocks for fractal rendering |
| `glsl_translation.md` | GLSL implementations and design patterns |
| `p5js_translation.md` | p5.js sketches and fractal rendering approaches |
| `touchdesigner_translation.md` | TouchDesigner-specific fractal setups |
| `audio_reactive_controls.md` | Binding audio analysis to fractal parameters |
| `fractal_feedback_systems.md` | Feedback-loop rendering architectures |
| `tiling_and_wrapping.md` | Domain repetition and toroidal wrapping |
| `camera_navigation_for_zoom.md` | Precision deep zoom navigation logic |
| `control_knobs.md` | Parameter exposure design for interactive and generative systems |

---

### `12_prompt_system/`
Fractal-specific vocabulary and formulas for AI prompt engineering.

| File | Purpose |
|---|---|
| `prompt_formula_short.md` | Short-form fractal prompt formula |
| `prompt_formula_long.md` | Extended fractal prompt formula with modular slots |
| `fractal_prompt_modules_subject.md` | Subject/entity modules |
| `fractal_prompt_modules_structure.md` | Structure and geometry modules |
| `fractal_prompt_modules_color.md` | Color and light modules |
| `fractal_prompt_modules_motion.md` | Animation and motion modules |
| `fractal_combo_recipes.md` | Pre-built fractal combinations for prompt use |
| `anti_drift_prompting.md` | How to prevent AI models from vague/decorative fractal outputs |
| `model_notes_general.md` | Model-specific behavior notes for fractal prompting |

---

### `13_app_and_system_integration/`
Schemas and integration specs for tool and application use.

| File | Purpose |
|---|---|
| `style_spec_schema.json` | JSON schema for fractal style specifications |
| `fractal_database_schema.json` | Database schema for fractal records |
| `tag_taxonomy.json` | Normalized tag taxonomy for search and filtering |
| `parameter_presets.json` | Pre-tuned parameter sets for major fractals |
| `common_queries.md` | Common data queries and lookup patterns |
| `integration_notes.md` | Notes on integrating this repo with external tools |

---

### `14_structured_data/`
Machine-readable normalized records.

| File | Purpose |
|---|---|
| `fractals_master.json` | Master JSON record for all major named fractals |
| `formula_library.json` | Normalized formula records with variables and notes |
| `glossary.json` | Machine-readable glossary |
| `fractal_family_index.csv` | Family-level index |
| `dimension_reference.csv` | Dimensional data for all major fractals |
| `parameter_reference.csv` | Parameter spaces and key values |
| `use_case_map.csv` | Fractal → use case mapping |
| `visual_traits_matrix.csv` | Fractal × visual trait presence matrix |
| `fractal_to_shader_map.csv` | Fractal → shader approach mapping |
| `fractal_to_prompt_tags.json` | Fractal → AI prompt tag sets |

---

### `15_examples/`
Worked examples for prompt, shader, and code use.

---

### `16_drift_control/`
Scope enforcement and quality control.

| File | Purpose |
|---|---|
| `what_this_repo_is_not.md` | Explicit exclusions and boundary violations |
| `common_confusions.md` | Frequent misclassifications and how to correct them |
| `common_failure_modes.md` | How fractal documentation typically goes wrong |
| `anti_drift.md` | General anti-drift principles for this repo |
| `quality_checklist.md` | Pre-merge checklist for new content |
| `missing_fields_checklist.md` | Required fields for complete fractal records |
| `repair_strategies.md` | How to repair incomplete or incorrect entries |

---

### `17_research_backlog/`
Planned additions and open questions.

---

## Record Template

Every major fractal entry should eventually capture all of these fields:

```yaml
name: ""
family: ""
aliases: []
generation_method: ""
core_rule: ""
equation: ""
parameters: []
dimensions:
  hausdorff: null
  topological: null
  similarity: null
  box_counting: null
visual_traits: []
recursion_type: ""
related_forms: []
use_cases: []
shader_notes: []
prompt_tags: []
references: []
caveats: []
```

---

## Build Priority Order

1. `01_foundation/` — conceptual grounding
2. `02_taxonomy/` — classification structure
3. `03_core_math/` — mathematical foundations
4. `04_generation_methods/` — production mechanisms
5. `05_fractal_families/` — specific family documentation
6. `07_measurement_and_metrics/` — quantitative tools
7. `10_rendering_and_coloring/` — visual production
8. `11_shader_and_genart_translation/` — implementation layer
9. `14_structured_data/` — machine-readable records
10. `16_drift_control/` — quality enforcement
11. `12_prompt_system/` — prompt engineering layer
12. `15_examples/` — worked examples
