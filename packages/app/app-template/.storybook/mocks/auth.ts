import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

faker.seed(100);

export const mockUser = {
	username: faker.person.fullName(),
	email: faker.internet.email(),
};

/** Valid session — the shell renders its chrome. */
export const checkTokenSuccess = http.post("*/auth/checkToken", () =>
	HttpResponse.json({ user: mockUser }),
);

/** Expired / invalid session (401) — triggers the refresh → login flow. */
export const checkTokenUnauthorized = http.post("*/auth/checkToken", () =>
	HttpResponse.json({ error: "unauthorized" }, { status: 401 }),
);

/** Server unreachable — fetch rejects with TypeError, no response at all. */
export const checkTokenNetworkError = http.post("*/auth/checkToken", () =>
	HttpResponse.error(),
);
