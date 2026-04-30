## Why

The existing Chip component was designed as a general-purpose tag/filter element with 5 semantic colors and 2 variants (filled/outlined). The SAP Fiori design system uses a Token component (`ui5-token`) instead — a neutral pill-shaped element with text, selected state, readonly mode, and a close/delete button. Tokens are primarily used inside MultiComboBox and Tokenizer patterns to represent selected values.

Since the project is v0 with no backward compatibility requirement, we replace Chip entirely with the SAP Token API. The component directory is renamed from `Chip/` to `Token/`.

## What Changes

- **Rename** `components/Chip/` → `components/Token/` (all files)
- **Rewrite API** from Chip semantics to SAP Token semantics:

| Chip (old) | Token (new) | Notes |
|------------|-------------|-------|
| `children` (ReactNode) | `text` (string) | Token only shows text, no arbitrary content |
| `variant` (filled/outlined) | — | Removed. Token has one visual style |
| `color` (5 colors) | — | Removed. Token is neutral with selected state |
| `size` (small/medium) | — | Removed. Token has one size (26px Cozy) |
| `icon` (ReactNode) | — | Removed. Token has no leading icon |
| `onClick` | `onSelect` | Fires when token is clicked/Space pressed |
| `onRemove` | `onDelete` | Fires when close icon is clicked or Delete/Backspace pressed |
| `disabled` | `disabled` | Kept |
| — | `selected` (boolean) | New. Visual selected state |
| — | `readOnly` (boolean) | New. Hides close icon, prevents deletion |

**Visual spec (SAP Horizon):**
- Height: 26px, border-radius: 6px, padding: 0 5px
- Default: `--sapButton_TokenBackground`, `--sapButton_TokenBorderColor`, `--sapTextColor`
- Selected: `--sapButton_Selected_Background`, `--sapButton_Selected_BorderColor`, `--sapButton_Selected_TextColor`, `--sapFontSemiboldDuplexFamily`
- Readonly: `--sapField_ReadOnly_BorderColor`, `--sapContent_LabelColor`, no close icon
- Close icon: 12px "decline" icon, hidden when readonly
- Focus: `--sapContent_FocusColor` outline (pseudo-element in Horizon)

## Capabilities

### New Capabilities
- `token-component`: Defines the Token component — a SAP Fiori token pill with text, selected/readonly states, close button, and keyboard-driven deletion.

### Removed Capabilities
- `chip-component`: Replaced entirely by `token-component`.

## Impact

- **Affected code:**
  - `components/Chip/` — deleted entirely
  - `components/Token/` — new directory with all standard files
  - `components/index.ts` — `Chip` export replaced with `Token`
  - `openspec/specs/chip-component/` — replaced by `openspec/specs/token-component/`
- **Breaking changes:** `Chip` component and all its types are removed. Consumers must switch to `Token`.
- **Dependencies:** Close icon from icons library (`Decline` or `Close`)

## Out of scope

- Tokenizer container (manages multiple tokens with overflow)
- MultiComboBox integration
- Truncation / `singleToken` mode
- `overflows` / `toBeDeleted` internal states (tokenizer-managed)
