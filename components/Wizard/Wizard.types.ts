import type { Wizard } from "@ui5/webcomponents-react/Wizard";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Wizard.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Wizard` — no Reltio
 * wrapping or prop renaming. Pair with `WizardStep` (also re-exported from
 * `@reltio/design/components`) for each step.
 *
 * A Reltio-flavored Stepper component is intentionally out of scope for v1;
 * it would land as a separate OpenSpec change if the CoE decides to author one.
 */
export type WizardProps = ComponentPropsWithoutRef<typeof Wizard>;
