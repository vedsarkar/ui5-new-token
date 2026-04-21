import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest(),
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
						"api/**",
						"test-utils/**",
						"**/*.json",
					],
				},
				optimizeDeps: {
					include: ["react/jsx-dev-runtime"],
				},
			},
		],
		coverage: {
			exclude: [
				"**/node_modules/**",
				".storybook/**",
				"**/*.module.css",
				"api/**",
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
