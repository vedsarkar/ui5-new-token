## Approach

Replace the existing Chip component with a new Token component that follows SAP Fiori Token semantics. The Chip directory is deleted and Token is created from scratch — no incremental migration, since the API is fundamentally different.

## Key Decisions

### Complete Replacement, Not Wrapper

The Chip API (5 colors × 2 variants × 2 sizes = 20 visual combinations) has no mapping to the SAP Token (1 neutral style + selected state). A wrapper or adapter would be more complex than a clean rewrite.

### Simplified API

SAP Token is intentionally simpler than Chip:
- No `variant`/`color`/`size` — one visual style
- `text` (string) instead of `children` (ReactNode) — tokens show text only
- `selected` + `readOnly` replace the semantic color system
- `onSelect` + `onDelete` replace `onClick` + `onRemove`

### Keyboard Delete Support

Unlike Chip (which had no keyboard deletion), Token supports Delete and Backspace keys for deletion when focused and not readonly. This matches SAP's keyboard pattern for tokens inside tokenizers.

### role="option"

SAP Token uses `role="option"` (not `role="button"`) because tokens represent selected values in a listbox-like container (tokenizer). This is correct even for standalone usage — the token semantically represents a discrete value.

## Token Mapping from SAP

| SAP Token | Our Implementation |
|-----------|-------------------|
| `--sapButton_TokenBackground` | Default background |
| `--sapButton_TokenBorderColor` | Default border |
| `--sapButton_Selected_*` | Selected state (background, border, text) |
| `--sapFontSemiboldDuplexFamily` | Selected text font-family |
| `--sapField_ReadOnly_BorderColor` | ReadOnly border |
| `--sapContent_LabelColor` | ReadOnly text |
| `--sapButton_Hover_Background` | Hover (default) |
| `--sapButton_Selected_Hover_Background` | Hover (selected) |
| `--sapContent_FocusColor` | Focus ring |
| `--sapButton_BorderWidth` | Border width |
| Height: 26px, radius: 6px | Horizon Cozy sizing |

## Migration Notes

Any consumer currently using `<Chip>` must switch to `<Token>`. The mapping:
- `<Chip onClick={...}>Label</Chip>` → `<Token text="Label" onSelect={...} />`
- `<Chip onRemove={...}>Label</Chip>` → `<Token text="Label" onDelete={...} />`
- `<Chip color="primary">Label</Chip>` → `<Token text="Label" selected />` (closest semantic match)
- `<Chip variant="outlined">Label</Chip>` → `<Token text="Label" readOnly />` (closest visual match)
