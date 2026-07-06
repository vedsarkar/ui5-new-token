import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Pin the project root to this app's own directory. Without it, Next infers
	// the root from the nearest lockfile and warns when several exist up the
	// tree (e.g. when this app lives inside a monorepo).
	turbopack: {
		root: dirname(fileURLToPath(import.meta.url)),
	},
	// UI5 web components (shipped transitively via @reltio/design) publish
	// modern ESM that Next must transpile for both server and client bundles.
	transpilePackages: [
		"@reltio/design",
		"@ui5/webcomponents-react",
		"@ui5/webcomponents",
		"@ui5/webcomponents-base",
		"@ui5/webcomponents-fiori",
		"@ui5/webcomponents-icons",
		"@ui5/webcomponents-theming",
	],
};

export default nextConfig;
