# FRACTALS ROADMAP

This document tracks the build plan for the FRACTALS knowledge base — what gets built, in what order, and what completion looks like at each milestone.

---

## Philosophy

Build in layers of increasing specificity. Start with the skeleton that makes everything else coherent, then add the meat, then the tooling layers. Do not add examples before the taxonomy exists. Do not add shader translation before the generation methods are documented.

**Priority rule:** A section that other sections depend on comes first.

---

## Milestone 0 — Seed (Complete)

The minimum starting structure. Establishes repo purpose, architecture, and core conventions.

- [x] `README.md` — full purpose and structure overview
- [x] `REPO_STRUCTURE.md` — folder architecture with file-level descriptions
- [x] `ROADMAP.md` — this document
- [x] `CHANGELOG.md` — version history
- [x] `00_meta/repo_manifest.yaml` — machine-readable repo summary
- [x] `00_meta/contribution_rules.md` — editorial standards
- [x] `00_meta/naming_conventions.md` — naming standards
- [x] `00_meta/coverage_targets.md` — milestone completion criteria

---

## Milestone 1 — Foundation (In Progress)

Establishes what fractals are, what belongs here, and what the repo is built on.

- [x] `01_foundation/fractals_definition.md`
- [x] `01_foundation/why_fractals_matter.md`
- [x] `01_foundation/scope_and_boundaries.md`
- [x] `01_foundation/core_visual_traits.md`
- [x] `01_foundation/core_math_traits.md`
- [x] `01_foundation/use_cases.md`
- [x] `01_foundation/neighboring_domains.md`

**Completion criteria:** Any reader unfamiliar with fractals can understand what this repo covers and why, using only the `01_foundation/` documents.

---

## Milestone 2 — Taxonomy (In Progress)

Establishes classification structures. Without this, the rest of the repo is a pile of disconnected entries.

- [x] `02_taxonomy/fractal_family_map.md`
- [x] `02_taxonomy/generation_method_map.md`
- [x] `02_taxonomy/named_fractals_index.csv` — at least 25 rows
- [x] `02_taxonomy/family_to_method_map.csv`
- [x] `02_taxonomy/family_to_dimension_map.csv`
- [x] `02_taxonomy/related_domains_map.md`

**Completion criteria:** Any named fractal can be located in the index and traced back to a family and a generation method.

---

## Milestone 3 — Core Math (In Progress)

Documents the shared mathematical foundations that appear across multiple fractal families.

- [x] `03_core_math/glossary.md`
- [x] `03_core_math/notation_legend.md`
- [x] `03_core_math/complex_numbers.md`
- [x] `03_core_math/iteration_and_orbits.md`
- [x] `03_core_math/fixed_points_and_cycles.md`
- [x] `03_core_math/escape_conditions.md`
- [x] `03_core_math/recursion_basics.md`
- [x] `03_core_math/self_similarity.md`
- [x] `03_core_math/scaling_laws.md`
- [x] `03_core_math/invariance.md`
- [x] `03_core_math/parameter_spaces.md`

**Completion criteria:** A developer can understand the math behind any escape-time, IFS, or L-system fractal using only the `03_core_math/` documents.

---

## Milestone 4 — Generation Methods

Documents the algorithmic mechanisms that produce fractals.

- [ ] `04_generation_methods/escape_time_systems.md`
- [ ] `04_generation_methods/iterated_function_systems.md`
- [ ] `04_generation_methods/l_systems.md`
- [ ] `04_generation_methods/substitution_systems.md`
- [ ] `04_generation_methods/recursive_geometry.md`
- [ ] `04_generation_methods/stochastic_fractals.md`
- [ ] `04_generation_methods/diffusion_limited_aggregation.md`
- [ ] `04_generation_methods/percolation_and_cluster_growth.md`
- [ ] `04_generation_methods/newton_methods.md`
- [ ] `04_generation_methods/orbit_trap_methods.md`
- [ ] `04_generation_methods/distance_estimation.md`
- [ ] `04_generation_methods/domain_coloring.md`

**Completion criteria:** Each major generation method has a complete doc with at least one worked example, the core algorithm, and notes on which fractal families use it.

---

## Milestone 5 — Fractal Families

Per-family deep documentation for all major fractal groups.

**Complex Dynamics:**
- [ ] `05_fractal_families/mandelbrot_set.md`
- [ ] `05_fractal_families/julia_sets.md`
- [ ] `05_fractal_families/multibrot_sets.md`
- [ ] `05_fractal_families/buddhabrot.md`
- [ ] `05_fractal_families/burning_ship.md`
- [ ] `05_fractal_families/newton_fractals.md`
- [ ] `05_fractal_families/lyapunov_fractals.md`
- [ ] `05_fractal_families/kleinian_limit_sets.md`

**Classical Geometric:**
- [ ] `05_fractal_families/cantor_family.md`
- [ ] `05_fractal_families/koch_family.md`
- [ ] `05_fractal_families/sierpinski_family.md`
- [ ] `05_fractal_families/dragon_curves.md`
- [ ] `05_fractal_families/levy_c_curve.md`
- [ ] `05_fractal_families/gosper_curve.md`
- [ ] `05_fractal_families/space_filling_curves.md`

**IFS and Organic:**
- [ ] `05_fractal_families/barnsley_fern.md`
- [ ] `05_fractal_families/fractal_trees.md`
- [ ] `05_fractal_families/apollonian_gaskets.md`
- [ ] `05_fractal_families/multifractals.md`

**Strange Attractors:**
- [ ] `05_fractal_families/strange_attractors_overview.md`
- [ ] `05_fractal_families/lorenz_attractor.md`
- [ ] `05_fractal_families/henon_attractor.md`
- [ ] `05_fractal_families/rossler_attractor.md`

**3D Fractals:**
- [ ] `05_fractal_families/mandelbulb_and_mandelbox.md`

**Completion criteria:** Every family in the `named_fractals_index.csv` has a corresponding family doc.

---

## Milestone 6 — Recursion and Symbolic Systems

- [ ] `06_recursion_and_symbolic_systems/recursion_patterns.md`
- [ ] `06_recursion_and_symbolic_systems/rewrite_rules.md`
- [ ] `06_recursion_and_symbolic_systems/symbolic_substitution.md`
- [ ] `06_recursion_and_symbolic_systems/self_reference_logic.md`
- [ ] `06_recursion_and_symbolic_systems/recursive_design_grammar.md`
- [ ] `06_recursion_and_symbolic_systems/l_system_grammar_library.json`

---

## Milestone 7 — Measurement and Metrics

- [ ] `07_measurement_and_metrics/hausdorff_dimension.md`
- [ ] `07_measurement_and_metrics/box_counting_dimension.md`
- [ ] `07_measurement_and_metrics/similarity_dimension.md`
- [ ] `07_measurement_and_metrics/lacunarity.md`
- [ ] `07_measurement_and_metrics/entropy_and_complexity.md`
- [ ] `07_measurement_and_metrics/lyapunov_exponents.md`
- [ ] `07_measurement_and_metrics/multifractal_spectrum.md`
- [ ] `07_measurement_and_metrics/measurement_comparison_table.csv`

---

## Milestone 8 — Dynamics and Chaos

- [ ] `08_dynamics_and_chaos/bifurcation.md`
- [ ] `08_dynamics_and_chaos/attractors_and_basins.md`
- [ ] `08_dynamics_and_chaos/stability_vs_instability.md`
- [ ] `08_dynamics_and_chaos/parameter_sensitivity.md`
- [ ] `08_dynamics_and_chaos/feedback_loops.md`
- [ ] `08_dynamics_and_chaos/chaos_vs_fractals.md`

---

## Milestone 9 — Visual Behavior

- [ ] `09_visual_behavior/branching_logic.md`
- [ ] `09_visual_behavior/filaments_and_tendrils.md`
- [ ] `09_visual_behavior/dust_clouds_and_speckle.md`
- [ ] `09_visual_behavior/bulbs_satellites_and_minibrots.md`
- [ ] `09_visual_behavior/edge_density.md`
- [ ] `09_visual_behavior/fill_vs_void.md`
- [ ] `09_visual_behavior/self_similarity_modes.md`
- [ ] `09_visual_behavior/symmetry_modes.md`
- [ ] `09_visual_behavior/zoom_behavior.md`
- [ ] `09_visual_behavior/animation_behavior.md`

---

## Milestone 10 — Rendering and Coloring

- [ ] `10_rendering_and_coloring/escape_time_coloring.md`
- [ ] `10_rendering_and_coloring/orbit_trap_coloring.md`
- [ ] `10_rendering_and_coloring/distance_estimator_lighting.md`
- [ ] `10_rendering_and_coloring/normal_maps_for_fractals.md`
- [ ] `10_rendering_and_coloring/palette_logic.md`
- [ ] `10_rendering_and_coloring/density_and_histogram_coloring.md`
- [ ] `10_rendering_and_coloring/anti_mud_rendering.md`

---

## Milestone 11 — Shader and Genart Translation

- [ ] `11_shader_and_genart_translation/shader_primitives.md`
- [ ] `11_shader_and_genart_translation/glsl_translation.md`
- [ ] `11_shader_and_genart_translation/p5js_translation.md`
- [ ] `11_shader_and_genart_translation/touchdesigner_translation.md`
- [ ] `11_shader_and_genart_translation/audio_reactive_controls.md`
- [ ] `11_shader_and_genart_translation/fractal_feedback_systems.md`
- [ ] `11_shader_and_genart_translation/tiling_and_wrapping.md`
- [ ] `11_shader_and_genart_translation/camera_navigation_for_zoom.md`
- [ ] `11_shader_and_genart_translation/control_knobs.md`

---

## Milestone 12 — Prompt System

- [ ] `12_prompt_system/prompt_formula_short.md`
- [ ] `12_prompt_system/prompt_formula_long.md`
- [ ] `12_prompt_system/fractal_prompt_modules_subject.md`
- [ ] `12_prompt_system/fractal_prompt_modules_structure.md`
- [ ] `12_prompt_system/fractal_prompt_modules_color.md`
- [ ] `12_prompt_system/fractal_prompt_modules_motion.md`
- [ ] `12_prompt_system/fractal_combo_recipes.md`
- [ ] `12_prompt_system/anti_drift_prompting.md`
- [ ] `12_prompt_system/model_notes_general.md`

---

## Milestone 13 — Structured Data

- [ ] `14_structured_data/fractals_master.json` — all major fractals as structured records
- [ ] `14_structured_data/formula_library.json`
- [ ] `14_structured_data/glossary.json`
- [ ] `14_structured_data/fractal_family_index.csv`
- [ ] `14_structured_data/dimension_reference.csv`
- [ ] `14_structured_data/parameter_reference.csv`
- [ ] `14_structured_data/use_case_map.csv`
- [ ] `14_structured_data/visual_traits_matrix.csv`
- [ ] `14_structured_data/fractal_to_shader_map.csv`
- [ ] `14_structured_data/fractal_to_prompt_tags.json`

---

## Milestone 14 — Drift Control

- [ ] `16_drift_control/what_this_repo_is_not.md`
- [ ] `16_drift_control/common_confusions.md`
- [ ] `16_drift_control/common_failure_modes.md`
- [ ] `16_drift_control/anti_drift.md`
- [ ] `16_drift_control/quality_checklist.md`
- [ ] `16_drift_control/missing_fields_checklist.md`
- [ ] `16_drift_control/repair_strategies.md`

---

## Milestone 15 — Examples and Research Backlog

- [ ] `15_examples/example_prompts.md`
- [ ] `15_examples/example_shader_recipes.md`
- [ ] `15_examples/example_p5js_sketches.md`
- [ ] `15_examples/example_zoom_sequences.md`
- [ ] `15_examples/example_combo_systems.md`
- [ ] `17_research_backlog/missing_fractals_to_add.md`
- [ ] `17_research_backlog/books_papers_and_sources.md`
- [ ] `17_research_backlog/open_questions.md`
- [ ] `17_research_backlog/future_expansions.md`

---

## Long-Term Goals

- Full JSON structured records for every fractal in `named_fractals_index.csv`
- Working GLSL implementations for at least 10 major fractals
- Prompt module library with 50+ tested modules
- Automated quality checking via CI (validates CSV headers, YAML schema, required fields)
- Integration examples for generative art tools and AI agent pipelines
