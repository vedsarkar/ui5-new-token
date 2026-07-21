---
"@reltio/design": minor
---

Add `appSelector` to `ShellBar` and disambiguate `TenantSelector` across environments.

- New optional `appSelector` prop on `ShellBar` for composing `<AppSelector>` into the right actions cluster
- `AppSelector` trigger forwards UI5 `Button` props; its popover is portaled so ShellBar does not reserve a phantom layout slot
- New optional `selectedEnvironment` on `TenantSelector` so the same `tenantId` in different environments can be selected uniquely
- Align `UserMenu` and notifications with SAP Fiori default-slot placement in ShellBar
