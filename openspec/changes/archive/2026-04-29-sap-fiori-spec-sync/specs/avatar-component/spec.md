## MODIFIED Requirements

### Requirement: Size Variants
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: SAP-aligned size names and rem-based dimensions
- **WHEN** `size` is set
- **THEN** use names `"xs"` | `"s"` | `"m"` | `"l"` | `"xl"` (replacing any numeric or small/medium/large names)
- **AND** dimensions: xs=2rem, s=3rem, m=4rem, l=5rem, xl=7rem
- **AND** font-size scales proportionally: xs=12px, s=16px, m=20px, l=28px, xl=36px

### Requirement: Color Scheme
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: 10 accent color schemes via colorScheme prop
- **WHEN** `colorScheme` is set to a number 1-10
- **THEN** use `--sapAvatar_{N}_Background` for the avatar background
- **AND** use `--sapAvatar_{N}_BorderColor` for the border
- **AND** use `--sapAvatar_{N}_TextColor` for initials/icon color

### Requirement: Content Fallback Chain
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: 3-level fallback
- **WHEN** rendering avatar content
- **THEN** display `src` image if provided and loads successfully
- **AND** on image error or no `src`, fall back to `children` (initials or custom icon)
- **AND** if neither `src` nor `children`, render a default Person icon
