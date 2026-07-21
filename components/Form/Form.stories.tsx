import { faker } from "@faker-js/faker";
import { Label } from "@ui5/webcomponents-react/Label";
import { Text } from "@ui5/webcomponents-react/Text";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import {
	Button,
	CheckBox,
	Form,
	FormGroup,
	FormItem,
	Input,
	Option,
	RadioButton,
	Select,
} from "@/components";
import preview from "../../.storybook/preview";

faker.seed(11);

// The dual-theme decorator renders each story twice (light + dark containers),
// so interaction tests scope their queries to the first rendered panel to target
// a single instance instead of disabling dual-theme coverage. Selecting the
// first `[data-theme]` container (rather than a specific theme name) keeps this
// robust to theme renames.
const lightCanvas = (canvasElement: HTMLElement) =>
	within(
		(canvasElement.querySelector("[data-theme]") as HTMLElement) ??
			canvasElement,
	);

const person = {
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
	phone: faker.phone.number(),
	city: faker.location.city(),
	country: faker.location.country(),
};

const meta = preview.meta({
	component: Form,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		headerText: "Contact details",
		accessibleMode: "Edit",
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Input value={person.firstName} />
			</FormItem>
			<FormItem labelContent={<Label>Last name</Label>}>
				<Input value={person.lastName} />
			</FormItem>
			<FormItem labelContent={<Label>Email</Label>}>
				<Input value={person.email} />
			</FormItem>
		</Form>
	),
});

/** `id` and `aria-*` apply to the outer native `<form>`, not the UI5 Form. */
export const WithAriaLabel = meta.story({
	args: {
		id: "contact-form",
		"aria-label": "Contact details",
		headerText: undefined,
	},
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Input value={person.firstName} />
			</FormItem>
			<FormItem labelContent={<Label>Last name</Label>}>
				<Input value={person.lastName} />
			</FormItem>
			<FormItem labelContent={<Label>Email</Label>}>
				<Input value={person.email} />
			</FormItem>
		</Form>
	),
	play: async ({ canvasElement }) => {
		const root =
			(canvasElement.querySelector("[data-theme]") as HTMLElement) ??
			canvasElement;
		const form = root.querySelector("form#contact-form");
		await expect(form).not.toBeNull();
		await expect(form?.getAttribute("aria-label")).toBe("Contact details");
		await expect(form?.querySelector("ui5-form")).not.toBeNull();
	},
});

export const MultiColumn = meta.story({
	args: {
		layout: "S1 M2 L2 XL2",
	},
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Input value={person.firstName} />
			</FormItem>
			<FormItem labelContent={<Label>Last name</Label>}>
				<Input value={person.lastName} />
			</FormItem>
			<FormItem labelContent={<Label>Email</Label>}>
				<Input value={person.email} />
			</FormItem>
			<FormItem labelContent={<Label>Phone</Label>}>
				<Input value={person.phone} />
			</FormItem>
		</Form>
	),
});

export const Grouped = meta.story({
	args: {
		layout: "S1 M2 L2 XL2",
	},
	render: (args) => (
		<Form {...args}>
			<FormGroup headerText="Personal">
				<FormItem labelContent={<Label>First name</Label>}>
					<Input value={person.firstName} />
				</FormItem>
				<FormItem labelContent={<Label>Last name</Label>}>
					<Input value={person.lastName} />
				</FormItem>
			</FormGroup>
			<FormGroup headerText="Address">
				<FormItem labelContent={<Label>City</Label>}>
					<Input value={person.city} />
				</FormItem>
				<FormItem labelContent={<Label>Country</Label>}>
					<Input value={person.country} />
				</FormItem>
			</FormGroup>
		</Form>
	),
});

// Labels-on-top is the Reltio default; this overrides `labelSpan` back to UI5's
// side-label proportion (label takes 1/3 of the row from medium up).
export const LabelsBeside = meta.story({
	args: {
		labelSpan: "S12 M4 L4 XL4",
	},
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Input value={person.firstName} />
			</FormItem>
			<FormItem labelContent={<Label>Last name</Label>}>
				<Input value={person.lastName} />
			</FormItem>
		</Form>
	),
});

export const DisplayMode = meta.story({
	args: {
		accessibleMode: "Display",
	},
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Text>{person.firstName}</Text>
			</FormItem>
			<FormItem labelContent={<Label>Last name</Label>}>
				<Text>{person.lastName}</Text>
			</FormItem>
			<FormItem labelContent={<Label>Email</Label>}>
				<Text>{person.email}</Text>
			</FormItem>
		</Form>
	),
});

// Mixed field types — text inputs, a select, a radio group, a single checkbox,
// and a checkbox group — each with a `name`, so the `Submit` button serializes
// them into the JSON object `onSubmit` receives. Fields sharing a `name` (the
// checkbox group) collapse into an array.
export const WithSubmit = meta.story({
	// Opt this story back into the Vitest story-test project (the meta is
	// `doc-only`, which the runner excludes) so the submit serialization is
	// actually verified, not just documented.
	tags: ["!doc-only"],
	args: {
		onSubmit: fn(),
	},
	render: (args) => (
		<Form {...args}>
			<FormItem labelContent={<Label>First name</Label>}>
				<Input name="firstName" value={person.firstName} />
			</FormItem>
			<FormItem labelContent={<Label>Email</Label>}>
				<Input name="email" value={person.email} />
			</FormItem>
			<FormItem labelContent={<Label>Country</Label>}>
				<Select name="country">
					<Option value="us">United States</Option>
					<Option value="de" selected>
						Germany
					</Option>
					<Option value="jp">Japan</Option>
				</Select>
			</FormItem>
			{/* A radio group contributes its `value` to the payload once the user
			    selects an option (UI5 sets the form value on selection, not from
			    an initial `checked`). */}
			<FormItem labelContent={<Label>Plan</Label>}>
				<div style={{ display: "flex", gap: 16 }}>
					<RadioButton name="plan" value="free" text="Free" />
					<RadioButton name="plan" value="pro" text="Pro" />
				</div>
			</FormItem>
			<FormItem labelContent={<Label>Interests</Label>}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<CheckBox name="interests" value="news" text="News" checked />
					<CheckBox name="interests" value="product" text="Product" />
					<CheckBox name="interests" value="events" text="Events" checked />
				</div>
			</FormItem>
			<FormItem>
				<CheckBox name="newsletter" value="yes" text="Subscribe" checked />
			</FormItem>
			<FormItem>
				<CheckBox
					name="acceptTerms"
					value="accepted"
					text="Accept terms"
					checked
				/>
			</FormItem>
			<FormItem>
				<Button type="Submit" design="Emphasized">
					Save
				</Button>
			</FormItem>
		</Form>
	),
	play: async ({ args, canvasElement }) => {
		const canvas = lightCanvas(canvasElement);
		await userEvent.click(canvas.getByText("Save"));
		await waitFor(() => expect(args.onSubmit).toHaveBeenCalledTimes(1));
		const values = (args.onSubmit as ReturnType<typeof fn>).mock
			.calls[0][0] as Record<string, unknown>;
		await expect(values.firstName).toBe(person.firstName);
		await expect(values.email).toBe(person.email);
		await expect(values.country).toBe("de");
		// Standalone checkboxes with unique names → a single scalar value each.
		await expect(values.newsletter).toBe("yes");
		await expect(values.acceptTerms).toBe("accepted");
		// Repeated `name` (checkbox group) → array of the checked values only.
		await expect(values.interests).toEqual(["news", "events"]);
	},
});
