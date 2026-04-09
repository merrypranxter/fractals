# Contribution Rules

This document defines editorial standards for adding and editing content in the FRACTALS knowledge base. Follow these rules before submitting any new content.

---

## Core Principle

Every piece of content in this repo must be:

1. **Technically accurate** — mathematically correct, using established terminology
2. **Precisely scoped** — inside the defined scope of `01_foundation/scope_and_boundaries.md`
3. **Practically useful** — actionable for generative art, shader development, prompting, or research
4. **Anti-drift** — free of vague decorative language masquerading as technical content

If content fails any of these, it does not belong here.

---

## Content Types

### Markdown Files

All markdown documentation should:

- Use ATX-style headers (`#`, `##`, `###`) — not underline-style
- Use tables for structured comparative data
- Use fenced code blocks (` ``` `) for formulas, pseudocode, and code samples
- Include a one-paragraph summary at the top before any headers
- Be organized with increasing specificity: definition → math → visual behavior → implementation
- Avoid emoji in technical documentation (allowed only in examples and prompt modules)
- Not exceed 1500 words without a clear reason

### CSV Files

All CSV files must:

- Have a header row with snake_case column names
- Use consistent data types per column — do not mix numeric and string in the same column
- Use empty string (`""`) or `null` (as string) for missing values — not `N/A`, `TBD`, `?`
- Be sorted by a meaningful primary key (typically `id` or `name`)
- Have at least 10 rows before being considered non-trivial

### JSON Files

All JSON files must:

- Be valid JSON (validate before committing)
- Use `snake_case` for all keys
- Include a `"version"` and `"description"` field at the root level
- Use arrays for lists, not comma-delimited strings
- Include `null` for genuinely unknown values — do not omit required fields

### YAML Files

All YAML files must:

- Be valid YAML (validate before committing)
- Use consistent indentation (2 spaces)
- Quote strings containing special characters
- Not use tabs

---

## Adding a New Fractal Entry

Before adding a new fractal to the named index or creating a family document, ensure you have:

**Required fields:**
- [ ] `name` — canonical name
- [ ] `family` — one of the defined family categories
- [ ] `generation_method` — one of the defined method categories
- [ ] `core_rule` — one-sentence description of the generative rule or equation
- [ ] `equation` — the formula in standard mathematical notation
- [ ] `visual_traits` — at least 3 visual properties
- [ ] `related_forms` — at least 1 related fractal

**Recommended fields:**
- [ ] `hausdorff_dimension` — exact or approximate value
- [ ] `topological_dimension` — 0, 1, or 2
- [ ] `key_parameters` — list of parameters with brief descriptions
- [ ] `shader_notes` — at least 1 note on implementation
- [ ] `prompt_tags` — at least 3 tags

**Do not add an entry that has:**
- Only decorative description with no mathematical content
- A dimension value that is topological and integer (unless it is specifically documenting the difference between topological and fractal dimension for that case)
- No clear generation method

---

## Editing Existing Content

- Do not change the semantic meaning of existing definitions without discussion
- Do not replace precise technical language with vague approximations
- Do not remove fields from records — add `null` if a value is unknown
- Do not rename files without updating all cross-references in index CSVs and related docs
- Corrections to factual errors are always welcome; note the correction in the commit message

---

## Scope Enforcement

Before adding anything, check `01_foundation/scope_and_boundaries.md`.

Content that does **not** belong here regardless of how it looks:
- Generic Perlin/Simplex noise without fractal dimension analysis
- Sacred geometry patterns not derived from fractal processes
- Arbitrary tilings unless their dimension has been analyzed
- Purely decorative "fractal-inspired" art without mathematical backing
- Chaos theory content that does not involve fractal structure

When in doubt, check `16_drift_control/what_this_repo_is_not.md`.

---

## Naming New Files

Follow the conventions in `00_meta/naming_conventions.md`. Summary:
- Files: `snake_case.md`, `snake_case.csv`, `snake_case.json`
- Folder names: `##_description/` (two-digit prefix, underscore-separated words)
- IDs in CSV/JSON: `snake_case`, all lowercase, no spaces

---

## Commit Standards

- Commit messages should describe what content was added or changed, not just "update"
- Good: `Add Apollonian gasket entry to named_fractals_index.csv`
- Bad: `Update CSV`
- Reference the relevant section folder in commit messages when the change is localized
- Do not commit invalid YAML, JSON, or CSV — validate before pushing

---

## Quality Checklist

Before marking any section as complete:

- [ ] Every markdown file has a summary paragraph at the top
- [ ] Every CSV has a complete header row and consistent data types
- [ ] Every JSON validates without errors
- [ ] All cross-references in CSV files match actual IDs in the named index
- [ ] No file uses undefined family or method names
- [ ] All dimension values are either cited or marked as approximate
- [ ] No file contains purely decorative content without technical grounding
