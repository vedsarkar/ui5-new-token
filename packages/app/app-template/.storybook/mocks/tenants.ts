import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

faker.seed(300);

export const mockTenants = Array.from({ length: 5 }, () => ({
	tenantId: faker.string.uuid(),
	tenantName: faker.company.name(),
	customerName: faker.company.name(),
}));

/** Returns a list of mock tenants. */
export const tenantsSuccess = http.get(
	"*/proxy?reltio-target-url=*/enhancedTenants*",
	() => HttpResponse.json(mockTenants),
);

/** No tenants available — TenantSelector renders an empty state. */
export const tenantsEmpty = http.get(
	"*/proxy?reltio-target-url=*/enhancedTenants*",
	() => HttpResponse.json([]),
);

/** Proxy error — tenant discovery fails for all environments. */
export const tenantsError = http.get(
	"*/proxy?reltio-target-url=*/enhancedTenants*",
	() => HttpResponse.json({ error: "bad_gateway" }, { status: 502 }),
);
