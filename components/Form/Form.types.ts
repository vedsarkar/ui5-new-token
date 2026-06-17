import type { Form } from "@ui5/webcomponents-react/Form";
import type { FormGroup } from "@ui5/webcomponents-react/FormGroup";
import type { FormItem } from "@ui5/webcomponents-react/FormItem";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

/**
 * Reltio-endorsed SAP Fiori Form floorplan container.
 *
 * Unlike `FormGroup`/`FormItem`, this is a thin Reltio wrapper (not a 1:1
 * re-export): it renders the UI5 Form inside a native `<form>` element so that
 * the form-associated UI5 fields it contains can be serialized on submit. All
 * UI5 Form props are forwarded unchanged — `layout` (responsive column grid),
 * `labelSpan` (label width), spacing, `headerText`, and edit/display
 * `accessibleMode`. See the component README for the divergence rationale.
 */
export type FormProps = Omit<
	ComponentPropsWithoutRef<typeof Form>,
	"onSubmit" | "layout" | "labelSpan"
> & {
	/**
	 * Number of columns to distribute the form content by breakpoint
	 * (`"S<n> M<n> L<n> XL<n>"`). Reltio diverges from UI5's responsive default
	 * (`"S1 M1 L2 XL3"`) and defaults to a single column on every breakpoint —
	 * predictable and scannable for product forms. Set this explicitly for
	 * denser multi-column layouts (e.g. `"S1 M2 L2 XL2"`).
	 * @default "S1 M1 L1 XL1"
	 */
	layout?: string;

	/**
	 * Width proportion (out of 12 cells) the label occupies per breakpoint;
	 * `12` places the label on top of its field. Reltio diverges from UI5's
	 * default (`"S12 M4 L4 XL4"`, labels beside fields) and defaults to labels
	 * on top on every breakpoint. Set this explicitly for side labels
	 * (e.g. `"S12 M4 L4 XL4"`).
	 * @default "S12 M12 L12 XL12"
	 */
	labelSpan?: string;

	/**
	 * Called when the form is submitted (via a `Button` with `type="Submit"`,
	 * pressing Enter in a field, or `formRef.current.requestSubmit()`). Receives
	 * the form's fields as a flat JSON object ready to send to a JSON API: each
	 * named field becomes a key; a field whose `name` appears more than once
	 * (checkbox group, multi-select) becomes an array of its values; fields
	 * without a `name` are omitted. The wrapper calls `event.preventDefault()`
	 * first. Need the raw `FormData` (e.g. for file fields) — build it from
	 * `event.currentTarget`.
	 */
	onSubmit?: (values: FormValues, event: FormEvent<HTMLFormElement>) => void;
};

/**
 * A single submitted field value — a string (or `File`), or an array of them
 * when the same field `name` is submitted more than once.
 */
export type FormValue = FormDataEntryValue | FormDataEntryValue[];

/**
 * A submitted form's fields as a flat JSON object keyed by each field's `name`.
 * The shape `Form`'s `onSubmit` passes as its first argument.
 */
export type FormValues = Record<string, FormValue>;

/**
 * Reltio-endorsed SAP Fiori FormGroup.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/FormGroup`. Splits a
 * `Form` into labelled groups of `FormItem`s; `columnSpan` controls how many of
 * the Form's columns the group spans.
 */
export type FormGroupProps = ComponentPropsWithoutRef<typeof FormGroup>;

/**
 * Reltio-endorsed SAP Fiori FormItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/FormItem`. One label/field
 * row: the label goes in `labelContent`, the field (e.g. an `Input`) is the
 * children.
 */
export type FormItemProps = ComponentPropsWithoutRef<typeof FormItem>;
