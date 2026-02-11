# Change: Add Chip component

## Why

The Reltio MDM from Databricks design requires a Chip component for displaying removable tags/pills showing selected values (e.g., column mappings). No existing component covers this use case. Implements DESIGN-39.

## What Changes

- Add `components/Chip/` with 5 mandatory files (Chip.tsx, Chip.types.ts, Chip.module.css, Chip.stories.tsx, index.ts)
- New capability: `chip-component`

## Impact

- Affected specs: new `chip-component` capability
- Affected code: `components/Chip/` (new directory)
- Dependencies: uses `Close` icon from existing icon library
