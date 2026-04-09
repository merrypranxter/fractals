# Coverage Targets

This document defines what "complete" means for each section of the FRACTALS knowledge base. A milestone is not considered complete until all targets in that milestone are met.

---

## How to Use This Document

Each section has:
- A **minimum coverage target** — the minimum required before the section is usable
- A **full coverage target** — what complete looks like
- A **quality gate** — conditions that block completion regardless of quantity

---

## `00_meta/` — Repository Metadata

**Minimum:** All four files exist and are valid.
**Full:** Manifest YAML validates against a schema; all vocabulary tables are current.

Quality gate: `repo_manifest.yaml` must be valid YAML with all required top-level keys.

---

## `01_foundation/` — Foundation

**Minimum:** All 7 foundation files exist with at least 300 words each and cover their stated topic.

**Full:**
- `fractals_definition.md` covers the mathematical definition, self-similarity, non-integer dimension, and iterative/recursive generation
- `scope_and_boundaries.md` lists at least 10 explicit in-scope items and at least 10 explicit out-of-scope items
- `core_visual_traits.md` covers at least 15 distinct visual properties with fractal-specific examples
- `core_math_traits.md` covers at least 8 distinct mathematical properties with formulas
- `use_cases.md` covers at least 5 distinct use-case domains with practical examples
- `neighboring_domains.md` covers at least 6 adjacent domains with explicit boundary definitions
- `why_fractals_matter.md` covers scientific, artistic, computational, and mathematical relevance

Quality gate: No file in this section may use purely decorative language without mathematical grounding.

---

## `02_taxonomy/` — Taxonomy

**Minimum:** All 6 files exist. `named_fractals_index.csv` has at least 15 rows with complete required fields.

**Full:**
- `named_fractals_index.csv` covers at least 25 named fractals
- `family_to_method_map.csv` covers all 11 defined family IDs
- `family_to_dimension_map.csv` covers all 25 fractals in the named index
- `fractal_family_map.md` covers all 11 family categories with at least 2 example members each
- `generation_method_map.md` covers all 12 generation method categories
- `related_domains_map.md` covers at least 8 adjacent domains

Quality gate:
- Every fractal in `named_fractals_index.csv` must have a valid `family` value matching a defined family ID
- Every fractal in `named_fractals_index.csv` must have a valid `generation_method` value matching a defined method ID
- All dimension values must be numeric (not strings like "variable" or "depends")

---

## `03_core_math/` — Core Math

**Minimum:** All 11 files exist with at least 300 words each.

**Full:**
- `glossary.md` defines at least 40 terms used elsewhere in the repo
- `notation_legend.md` covers all symbols and notation used in the repo
- `complex_numbers.md` covers arithmetic, the complex plane, polar form, and relevance to complex dynamics
- `iteration_and_orbits.md` covers orbit sequences, convergence, divergence, and cycle detection
- `fixed_points_and_cycles.md` covers fixed points, period-2 and higher cycles, and their role in fractal boundary structure
- `escape_conditions.md` covers escape radius derivation, bailout tests, and smooth iteration count formulas
- `recursion_basics.md` covers structural recursion distinct from numerical iteration
- `self_similarity.md` covers exact, quasi, and statistical self-similarity with dimension implications
- `scaling_laws.md` covers power laws, log-log linearity, and the relationship to fractal dimension
- `invariance.md` covers conformal invariance, scale invariance, and self-affinity
- `parameter_spaces.md` covers how parameter spaces map to fractal families (e.g., c-plane for Julia Sets)

Quality gate: Every formula mentioned in any other section of the repo must be defined and explained in `03_core_math/` or in the relevant family document.

---

## `04_generation_methods/` — Generation Methods

**Minimum:** At least 6 of 12 method docs exist with at least 400 words each.

**Full:** All 12 method docs exist with:
- Core algorithm description
- At least one worked example
- Mathematical definition or pseudocode
- List of which fractal families use this method
- Implementation notes for shader or code use
- Links to relevant family docs

Quality gate: Each method doc must clearly distinguish the method from adjacent methods (e.g., IFS from recursive geometry, Newton iteration from escape-time iteration).

---

## `05_fractal_families/` — Fractal Families

**Minimum:** At least 10 family docs covering the most important families.

**Priority 10:**
1. `mandelbrot_set.md`
2. `julia_sets.md`
3. `sierpinski_family.md`
4. `koch_family.md`
5. `barnsley_fern.md`
6. `lorenz_attractor.md`
7. `cantor_family.md`
8. `fractal_trees.md`
9. `mandelbulb_and_mandelbox.md`
10. `space_filling_curves.md`

**Full:** All 24 family docs exist. Each doc contains:
- Name, family, aliases
- Core equation or generative rule
- Key parameters and their effects
- Hausdorff dimension (exact or approximate)
- At least 5 visual traits
- At least 3 related forms
- Implementation notes (shader/code)
- At least 5 prompt tags

Quality gate: No family doc may exist without a corresponding entry in `named_fractals_index.csv`.

---

## `07_measurement_and_metrics/` — Measurement

**Minimum:** `hausdorff_dimension.md`, `box_counting_dimension.md`, and `similarity_dimension.md` exist.

**Full:** All 8 files exist. `measurement_comparison_table.csv` covers at least 20 fractals with all dimension types.

Quality gate: Dimension values in `measurement_comparison_table.csv` must be consistent with values in `family_to_dimension_map.csv`.

---

## `11_shader_and_genart_translation/` — Shader Translation

**Minimum:** `shader_primitives.md` and `glsl_translation.md` exist with working code examples.

**Full:** All 9 files exist. At least 5 fractals have explicit GLSL implementation notes.

Quality gate: Code examples must be syntactically correct GLSL or JavaScript. Do not include pseudocode in files intended as implementation references.

---

## `14_structured_data/` — Structured Data

**Minimum:** `fractals_master.json` exists with at least 10 complete fractal records.

**Full:**
- `fractals_master.json` contains all 25 fractals from `named_fractals_index.csv`
- All JSON files validate
- All CSV files have consistent column names matching the naming conventions
- `dimension_reference.csv` is consistent with `family_to_dimension_map.csv`

Quality gate: `fractals_master.json` must be parseable without errors. All `id` values must match IDs in `named_fractals_index.csv`.

---

## `16_drift_control/` — Drift Control

**Minimum:** `what_this_repo_is_not.md` and `quality_checklist.md` exist.

**Full:** All 7 files exist. `quality_checklist.md` covers all required fields from the record template.

Quality gate: The quality checklist must be used to validate every new entry before it is considered complete.

---

## Global Coverage Targets

Before version `1.0.0`, the repo must have:

- [ ] At least 25 named fractals fully documented in the index CSV
- [ ] All 11 fractal families covered in the family map
- [ ] All 12 generation methods documented
- [ ] At least 40 terms in the glossary
- [ ] GLSL implementation notes for at least 5 fractals
- [ ] At least 50 prompt tags in use across all entries
- [ ] No entries in any CSV with empty required fields
- [ ] No Markdown files shorter than 300 words
- [ ] All JSON and YAML files validated
