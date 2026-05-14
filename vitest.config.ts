import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// Absolute path to this config file's directory. Used to make the storybook
// plugin's `.storybook` resolution and the auth-project aliases independent
// of the process CWD — so `npm test --workspace=@reltio/auth` works whether
// it's invoked from the repository root or from inside `packages/auth/`.
const ROOT_DIR = fileURLToPath(new URL(".", import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({ configDir: `${ROOT_DIR}.storybook` }),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: "chromium" }],
					},

					// Exclude Storybook template files from tests
					exclude: [
						"**/node_modules/**",
						"openApi/**",
						"test-utils/**",
						"**/*.json",
					],
				},
				optimizeDeps: {
					include: ["react/jsx-dev-runtime"],
				},
			},
			// Auth package — Node-mode tests. The actual configuration lives in
			// the package itself (packages/auth/vitest.config.ts) so it can also
			// be used by `npm test --workspace=@reltio/auth`.
			"./packages/auth/vitest.config.ts",
		],
		coverage: {
			exclude: [
				"**/node_modules/**",
				".storybook/**",
				"**/*.module.css",
				"openApi/**",
				"test-utils/**",
				"**/*.json",
			],
			// thresholds: {
			// 	statements: 80,
			// 	branches: 80,
			// 	functions: 80,
			// 	lines: 80,
			// },
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL(".", import.meta.url)),
		},
		conditions: ["import", "module", "browser", "default"],
	},
});
