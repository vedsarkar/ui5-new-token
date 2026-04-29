## MODIFIED Requirements

### Requirement: Design Variants
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace variant/color props with unified design prop
- **WHEN** configuring button appearance
- **THEN** use a single `design` prop: `"default"` | `"emphasized"` | `"ghost"` | `"transparent"` | `"positive"` | `"negative"` | `"attention"`
- **AND** remove the separate `variant` (filled/outlined/text) and `color` (primary/inherited) props
- **AND** default value is `"default"`

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP Button tokens
- **WHEN** styling any button design variant
- **THEN** use `--sapButton_Background`, `--sapButton_BorderColor`, `--sapButton_TextColor` for default
- **AND** use `--sapButton_Emphasized_*`, `--sapButton_Lite_*`, `--sapButton_Accept_*`, `--sapButton_Reject_*`, `--sapButton_Attention_*` for other designs
- **AND** no `--reltio-button-*` tokens are referenced in the component CSS

#### Scenario: Icon-only auto-detection preserved
- **WHEN** `children` is a single React component element
- **THEN** the `.iconOnly` class is applied with `aspect-ratio: 1` and `min-width: var(--sapElement_Height)`
- **AND** icon-only mode works with all 7 design variants
