import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

faker.seed(200);

export const mockEnvironments = [
	{
		label: "Development",
		name: faker.string.alphanumeric(6).toUpperCase(),
		apiPath: `https://${faker.internet.domainWord()}-dev.reltio.com/reltio/api`,
	},
	{
		label: "Staging",
		name: faker.string.alphanumeric(6).toUpperCase(),
		apiPath: `https://${faker.internet.domainWord()}-stg.reltio.com/reltio/api`,
	},
];

// --- adminToolsConfig — environment list for tenant discovery -------------

/** Returns the full environment list — TenantSelector discovers tenants. */
export const adminToolsConfigSuccess = http.get(
	"*/api/config/service/adminToolsConfig*",
	() => HttpResponse.json({ data: { environments: mockEnvironments } }),
);

/** Empty environment list — TenantSelector stays empty. */
export const adminToolsConfigEmpty = http.get(
	"*/api/config/service/adminToolsConfig*",
	() => HttpResponse.json({ data: { environments: [] } }),
);

/** Config service error — environment discovery fails. */
export const adminToolsConfigError = http.get(
	"*/api/config/service/adminToolsConfig*",
	() => HttpResponse.json({ error: "internal_server_error" }, { status: 500 }),
);

// --- consoleApps — sidebar navigation groups ------------------------------

/** Empty navigation — the shell renders without menu items. */
export const consoleAppsSuccess = http.get(
	"*/api/config/service/consoleApps*",
	() => HttpResponse.json({ data: [] }),
);

/** Config service error — navigation fails to load. */
export const consoleAppsError = http.get(
	"*/api/config/service/consoleApps*",
	() => HttpResponse.json({ error: "internal_server_error" }, { status: 500 }),
);

// --- common — cross-product app switcher ----------------------------------

/** Empty app list — AppSelector renders without items. */
export const commonSuccess = http.get(
	"*/api/config/service/common*",
	() => HttpResponse.json({ data: { apps: [] } }),
);

/** Config service error — app switcher fails to load. */
export const commonError = http.get(
	"*/api/config/service/common*",
	() => HttpResponse.json({ error: "internal_server_error" }, { status: 500 }),
);

// --- catch-all for any other config namespace -----------------------------

/** Returns empty data so unknown namespaces don't 404. */
export const configCatchAllSuccess = http.get(
	"*/api/config/service/*",
	() => HttpResponse.json({ data: {} }),
);

/** Config service error for unknown namespaces. */
export const configCatchAllError = http.get(
	"*/api/config/service/*",
	() => HttpResponse.json({ error: "internal_server_error" }, { status: 500 }),
);
