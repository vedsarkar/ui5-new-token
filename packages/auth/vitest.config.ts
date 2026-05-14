/**
 * Vitest configuration for `@reltio/auth`.
 *
 * The auth package's tests are Node-mode (Express + supertest + MSW) and
 * have no React/Storybook dependencies. This config is referenced by the
 * root `vitest.config.ts` so that `npm test` from the repository root
 * runs both the Storybook browser project AND the auth Node project, and
 * is loaded directly by `npm test --workspace=@reltio/auth` for fast
 * iteration on just the auth tests.
 */

import { fileURLToPath } from "node:url";
import { defineProject } from "vitest/config";

// Repository root, two levels up from this config file. Used to make
// aliases and includes independent of the process CWD.
const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));

export default defineProject({
	test: {
		name: "auth",
		environment: "node",
		include: [`${REPO_ROOT}packages/auth/tests/**/*.test.ts`],
		exclude: ["**/node_modules/**", "**/dist/**"],
		coverage: {
			// Only the package's source files count toward coverage. Test
			// helpers (testApp.ts, testHandlers.ts, etc.) are NOT measured —
			// "uncovered helper" is not a meaningful signal.
			include: [`${REPO_ROOT}packages/auth/src/**/*.ts`],
		},
	},
	resolve: {
		// Resolve @reltio/auth/* to source files so tests run without
		// a prior build step. The aliases mirror the four subpath
		// entries declared in packages/auth/package.json's exports map.
		alias: {
			"@reltio/auth/types": `${REPO_ROOT}packages/auth/src/types/index.ts`,
			"@reltio/auth/express": `${REPO_ROOT}packages/auth/src/express/index.ts`,
			"@reltio/auth/next": `${REPO_ROOT}packages/auth/src/next/index.ts`,
			"@reltio/auth/utils": `${REPO_ROOT}packages/auth/src/utils/index.ts`,
		},
		// Node resolution conditions for server-side tests.
		conditions: ["node", "import", "module", "default"],
	},
});
