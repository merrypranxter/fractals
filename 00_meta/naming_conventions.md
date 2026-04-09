# Naming Conventions

This document defines naming standards for files, folders, fields, IDs, tags, and code identifiers across the FRACTALS knowledge base. Consistency here makes the repo navigable, searchable, and machine-readable.

---

## File Names

**Rule: `snake_case`, all lowercase, no spaces, descriptive.**

```
fractals_definition.md          ✓
named_fractals_index.csv        ✓
FractalsDefinition.md           ✗
named fractals index.csv        ✗
NF_Index.CSV                    ✗
```

- Use underscores (`_`) as word separators — never hyphens or spaces
- Use `.md` for all Markdown files
- Use `.csv` for all tabular data files
- Use `.json` for all structured data files
- Use `.yaml` for all configuration/manifest files
- Do not abbreviate unless the abbreviation is universally understood in the domain (`glsl`, `ifs`, `csv`, `l_system`)

---

## Folder Names

**Rule: Two-digit numeric prefix, then `snake_case` description.**

```
00_meta/
01_foundation/
02_taxonomy/
03_core_math/
04_generation_methods/
05_fractal_families/
```

- The numeric prefix controls sort order and build priority
- The description is plural for collections (`families`, `methods`, `examples`) and singular for focused sections (`foundation`, `taxonomy`)
- Do not use hyphens in folder names

---

## IDs in CSV and JSON

**Rule: `snake_case`, all lowercase, no spaces, no special characters except `_`.**

```
mandelbrot_set              ✓
julia_sets                  ✓
sierpinski_triangle         ✓
BurningShip                 ✗
burning-ship                ✗
burning ship                ✗
```

IDs should be stable and unique. Do not change an ID once it is in use — update cross-references if necessary.

For fractals named after people, use the person's last name in lowercase:
- `barnsley_fern` (not `michael_barnsley_fern`)
- `mandelbrot_set` (not `benoit_mandelbrot_set`)
- `lorenz_attractor` (not `edward_lorenz_attractor`)

---

## Column Names in CSV Files

**Rule: `snake_case`, lowercase, descriptive but concise.**

```
hausdorff_dimension         ✓
topological_dimension       ✓
primary_visual_trait        ✓
HausdorffDimension          ✗
h_dim                       ✗
dim                         ✗
```

Use full words for important fields: `hausdorff_dimension` not `hd` or `h_dim`.  
Abbreviations are acceptable for standardized terms: `id`, `csv`, `ifs`, `glsl`.

---

## JSON Keys

**Rule: `snake_case`, lowercase, same conventions as CSV columns.**

```json
{
  "fractal_name": "Mandelbrot Set",
  "hausdorff_dimension": 2.0,
  "generation_method": "escape_time",
  "visual_traits": ["bulbs", "filaments", "boundary complexity"]
}
```

Do not use camelCase or PascalCase for JSON keys in this repo.

---

## Tags

Tags appear in CSV `tags` columns, JSON `prompt_tags` and `tags` arrays, and prompt modules.

**Rule: lowercase, hyphen-separated, descriptive.**

```
escape-time                 ✓
self-similar                ✓
complex-dynamics            ✓
space-filling               ✓
EscapeTime                  ✗
escape_time                 ✗  (use in IDs/keys, not tags)
"escape time"               ✗
```

Use hyphens in tags (not underscores) to match common tagging and search conventions.

Tags should describe the fractal's:
- Family or type: `complex-dynamics`, `ifs`, `strange-attractor`, `geometric`
- Generation method: `escape-time`, `recursive`, `substitution`, `stochastic`
- Visual trait: `branching`, `filamentary`, `self-similar`, `space-filling`, `boundary-dense`
- Dimensional class: `non-integer-dimension`, `dust`, `curve`, `surface`
- Use case: `shader-ready`, `animation-friendly`, `3d-capable`, `prompt-ready`

---

## Family Names (Controlled Vocabulary)

When referencing fractal families in any file, use these exact strings:

| Family ID | Description |
|---|---|
| `complex_dynamics` | Mandelbrot, Julia, Multibrot, Buddhabrot, Burning Ship |
| `classical_geometric` | Cantor, Koch, Sierpinski (constructed by geometric subdivision) |
| `ifs` | Iterated Function System fractals (Barnsley Fern, Sierpinski via IFS) |
| `l_system` | Lindenmayer system fractals (Dragon Curve, Koch via L-system) |
| `space_filling_curves` | Hilbert, Peano, Gosper, and related curves |
| `strange_attractors` | Lorenz, Hénon, Rössler, and other differential/difference equation attractors |
| `stochastic` | Random midpoint displacement, Brownian motion, DLA |
| `3d_fractals` | Mandelbulb, Mandelbox, Quaternion Julia |
| `multifractals` | Systems with multiple scaling exponents |
| `kleinian` | Kleinian groups and limit sets |
| `newton_basins` | Newton's method fractals |

---

## Generation Method Names (Controlled Vocabulary)

When referencing generation methods in any file, use these exact strings:

| Method ID | Description |
|---|---|
| `escape_time` | Iterate until magnitude exceeds escape radius |
| `iterated_function_system` | Repeated application of affine contractions |
| `l_system` | String rewriting with geometric interpretation |
| `substitution` | Symbol or shape replacement rules |
| `recursive_geometry` | Geometric subdivision applied recursively |
| `stochastic` | Random processes with fractal-dimension outputs |
| `diffusion_limited_aggregation` | Growth by random-walk particle accretion |
| `newton_iteration` | Newton's root-finding method on complex polynomials |
| `orbit_trap` | Coloring/classification by orbit proximity to shapes |
| `distance_estimation` | Computing signed distance to fractal boundary |
| `domain_coloring` | Coloring complex functions by phase and modulus |
| `ode_integration` | Numerical integration of differential equations (attractors) |

---

## Headers in Markdown Files

Use ATX-style headers only:

```markdown
# Title (H1 — one per file)
## Section (H2)
### Subsection (H3)
#### Sub-subsection (H4 — use sparingly)
```

Do not use underline-style headers:
```markdown
Title      ✗
=====
Section    ✗
-------
```

---

## Mathematical Notation in Markdown

- Use LaTeX-style notation inside backticks for inline math: `z_{n+1} = z_n^2 + c`
- Use fenced code blocks with no language tag for multi-line formulas
- Subscripts: `z_n` or `z_{n+1}` — use curly braces when subscript is more than one character
- Superscripts: `z^2`, `z^{d_H}` — use curly braces for multi-character exponents
- Sets: use standard notation — `ℂ` (Unicode) or `C` with explanation
- Greek letters: spell out in prose if not in a formula context, use Unicode symbols (`α`, `β`, `λ`) in inline contexts

---

## Summary Reference

| Context | Convention | Example |
|---|---|---|
| File names | `snake_case.ext` | `fractal_family_map.md` |
| Folder names | `##_description/` | `02_taxonomy/` |
| CSV/JSON IDs | `snake_case` | `mandelbrot_set` |
| CSV column names | `snake_case` | `hausdorff_dimension` |
| JSON keys | `snake_case` | `"generation_method"` |
| Tags | `hyphen-case` | `escape-time` |
| Family IDs | `snake_case` | `complex_dynamics` |
| Method IDs | `snake_case` | `escape_time` |
| Markdown headers | ATX-style | `## Section` |
