import type { WizardStep } from "@ui5/webcomponents-react/WizardStep";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori WizardStep.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/WizardStep` — no Reltio
 * wrapping or prop renaming. Used within `Wizard`. See README.
 */
export type WizardStepProps = ComponentPropsWithoutRef<typeof WizardStep>;
