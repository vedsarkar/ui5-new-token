import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const ROOT_DIR = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: `${ROOT_DIR}.storybook`,
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: "chromium" }],
					},
				},
			},
		],
		coverage: {
			exclude: [
				"**/node_modules/**",
				".storybook/**",
				".next/**",
				"**/*.module.css",
				"test-utils/**",
			],
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL(".", import.meta.url)),
		},
		conditions: ["import", "module", "browser", "default"],
	},
});
