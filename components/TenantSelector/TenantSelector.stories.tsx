import { faker } from "@faker-js/faker";
import { Button } from "@ui5/webcomponents-react/Button";
import { fn, userEvent, waitFor, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { TenantSelector } from "./TenantSelector";
import type { TenantEntry } from "./TenantSelector.types";

faker.seed(42);

const ENVIRONMENTS = [
	"EUS102-DEVELOP",
	"EUS105-PRODUCTION",
	"WUS201-STAGING",
	"EUC301-PRODUCTION",
	"TST01-TEST",
];

const makeTenant = (): TenantEntry => {
	const slug = faker.helpers.slugify(faker.commerce.department()).toLowerCase();
	return {
		customerName: faker.company.name(),
		tenantName: `${slug}-${faker.string.alpha({ length: 3, casing: "lower" })}`,
		tenantId: faker.string.alphanumeric(12),
		environment: faker.helpers.arrayElement(ENVIRONMENTS),
	};
};

const tenants: TenantEntry[] = Array.from({ length: 8 }, makeTenant);

const meta = preview.meta({
	component: TenantSelector,
	parameters: { layout: "centered" },
	args: {
		onSelect: fn(),
		tenants,
	},
});

export default meta;

/** Dual-theme renders the component twice; this drives the first instance. UI5
 * `Button`/`Dialog` keep their ARIA role inside Shadow DOM, so role-based queries
 * don't reach them — we click the first `ui5-button` (the trigger always precedes
 * the dialog buttons in the DOM) and resolve the single opened `ui5-dialog[open]`,
 * then scope content assertions to that dialog so the closed instance never clashes. */
const openFirstDialog = async (canvasElement: HTMLElement) => {
	const trigger = canvasElement.querySelector<HTMLElement>("ui5-button");
	if (!trigger) {
		throw new Error("TenantSelector trigger button not found");
	}
	await userEvent.click(trigger);
	return waitFor(() => {
		const dialog = document.body.querySelector<HTMLElement>("ui5-dialog[open]");
		if (!dialog) {
			throw new Error("TenantSelector dialog did not open");
		}
		return dialog;
	});
};

export const Default = meta.story({});

export const Selected = meta.story({
	args: {
		selectedTenantId: tenants[0].tenantId,
	},
});

export const LongLabel = meta.story({
	args: {
		tenants: [
			{
				customerName: `${faker.company.name()} ${faker.company.buzzNoun()} Multi-Region Worldwide`,
				tenantName: `${faker.commerce.department().toLowerCase()}-internal`,
				tenantId: faker.string.alphanumeric(16),
				environment: "EUS102-DEVELOP",
			},
		],
	},
	render: (args) => (
		<TenantSelector {...args} selectedTenantId={args.tenants[0].tenantId} />
	),
});

export const Loading = meta.story({
	args: {
		loading: true,
	},
});

export const CustomTrigger = meta.story({
	args: {
		selectedTenantId: tenants[0].tenantId,
		trigger: <Button design="Emphasized">Switch tenant</Button>,
	},
});

export const Open = meta.story({
	play: async ({ canvasElement }) => {
		const dialog = await openFirstDialog(canvasElement);
		await within(dialog).findByText("Customer name");
	},
});

export const NoTenants = meta.story({
	args: { tenants: [] },
	play: async ({ canvasElement }) => {
		const dialog = await openFirstDialog(canvasElement);
		// The empty state renders an IllustratedMessage whose copy lives in Shadow
		// DOM, so assert on the element itself rather than its text.
		await waitFor(() => {
			if (!dialog.querySelector("ui5-illustrated-message")) {
				throw new Error("empty-state illustration not rendered");
			}
		});
	},
});

export const DuplicateTenantAcrossEnvironments = meta.story({
	args: {
		tenants: [
			{
				customerName: "Acme Corp",
				tenantName: "acme-prod",
				tenantId: "tenant-acme-01",
				environment: "EUS105-PRODUCTION",
			},
			{
				customerName: "Acme Corp",
				tenantName: "acme-prod",
				tenantId: "tenant-acme-01",
				environment: "EUS102-DEVELOP",
			},
			{
				customerName: "Acme Corp",
				tenantName: "acme-prod",
				tenantId: "tenant-acme-01",
				environment: "WUS201-STAGING",
			},
			...tenants.slice(0, 3),
		],
		selectedTenantId: "tenant-acme-01",
		selectedEnvironment: "EUS105-PRODUCTION",
	},
	play: async ({ canvasElement }) => {
		const dialog = await openFirstDialog(canvasElement);
		await waitFor(() => {
			const idCells = [...dialog.querySelectorAll("ui5-table-cell")].filter(
				(cell) => cell.textContent === "tenant-acme-01",
			);
			if (idCells.length !== 3) {
				throw new Error(
					`expected 3 rows with tenant-acme-01, got ${idCells.length}`,
				);
			}
			const selectedRows = [...dialog.querySelectorAll("ui5-table-row")].filter(
				(row) =>
					[...row.classList].some((className) =>
						className.includes("selectedRow"),
					),
			);
			if (selectedRows.length !== 1) {
				throw new Error(
					`expected exactly 1 selected row, got ${selectedRows.length}`,
				);
			}
		});
	},
});

/** 1000 tenants — exercises the virtualized rendering path (kicks in above ~50
 * visible rows). The rendered DOM should contain only the rows currently in the
 * viewport plus overscan, not all 1000 `ui5-table-row` elements. */
export const LargeList = meta.story({
	args: {
		tenants: Array.from({ length: 1000 }, makeTenant),
	},
	play: async ({ canvasElement }) => {
		const dialog = await openFirstDialog(canvasElement);
		await waitFor(() => {
			if (!dialog.querySelector("ui5-table-virtualizer")) {
				throw new Error("TableVirtualizer not rendered for large tenant list");
			}
		});
	},
});
