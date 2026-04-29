## MODIFIED Requirements

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP tokens
- **WHEN** styling the dialog surface, backdrop, and shadows
- **THEN** use `--sapBackgroundColor` for the dialog surface background
- **AND** use `--sapContent_Shadow2` for the dialog box-shadow
- **AND** use `--sapBlockLayer_Background` for the backdrop overlay
- **AND** no `--reltio-color-*` tokens are referenced in the component CSS

### Requirement: Native Dialog Integration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: showModal/close lifecycle details
- **WHEN** `open` changes to `true`, call `dialogRef.showModal()` to render in the top layer
- **WHEN** `open` changes to `false`, call `dialogRef.close()` to remove from the top layer
- **AND** use `closedby="any"` attribute for native Esc and light-dismiss support

#### Scenario: Auto-focus with data-autofocus
- **WHEN** the dialog opens and a child element has `data-autofocus` attribute
- **THEN** that element receives focus instead of the default first-focusable behavior
