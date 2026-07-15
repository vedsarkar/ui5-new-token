import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Fail fast if the app is not configured. Next loads `.env` / `.env.local` into
// `process.env` before evaluating this file, so an incomplete config stops
// `next dev` / `next build` / `next start` from starting at all — with one clear
// message — instead of surfacing a cryptic runtime crash on the first request.
//
// The environment holds the secrets AND the build-time `BASE_PATH`. Runtime,
// non-secret settings live in config/*.json (resolved at startup by APP_CONFIG).
const REQUIRED_ENV = [
	// OAuth client for the Reltio auth service.
	"AUTH_CLIENT_ID",
	"AUTH_CLIENT_SECRET",
	// Separate OAuth client for the Reltio API services.
	"API_CLIENT_ID",
	"API_CLIENT_SECRET",
	// The sub-path this app is served under (e.g. /my-app). Everything —
	// routing, links, assets, the auth flow — is prefixed with it, so the app can
	// be mounted behind a platform's path rewrite. Required: no sensible default.
	"BASE_PATH",
];
const missingEnv = REQUIRED_ENV.filter((name) => !process.env[name]);
if (missingEnv.length > 0) {
	throw new Error(
		[
			"",
			"✗ Reltio app is not configured.",
			"",
			`  Missing environment variable(s): ${missingEnv.join(", ")}`,
			"",
			"  Copy .env.local.example to .env.local and fill in the Reltio OAuth",
			"  client secrets + BASE_PATH, then restart.",
			"",
		].join("\n"),
	);
}

// basePath is a BUILD-TIME setting in Next — it is baked into the artifact
// (routing, <Link>, assets) and cannot change at runtime. So it cannot come
// from the runtime-resolved `@/config`; it stays an environment variable.
const basePath = process.env.BASE_PATH;
if (!basePath.startsWith("/") || basePath.endsWith("/")) {
	throw new Error(
		`✗ BASE_PATH must start with "/" and not end with "/" (e.g. /my-app). Got: "${basePath}"`,
	);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Serve the whole app under this sub-path so it can be mounted behind a
	// platform's path rewrite. Next prefixes routing, <Link>, router navigation,
	// and static assets automatically.
	basePath,
	// Expose the base path to client components. `process.env.BASE_PATH` is
	// server-only; client-side redirects to the auth endpoints (login on 401,
	// logout) need the prefix to stay inside the app.
	env: {
		NEXT_PUBLIC_BASE_PATH: basePath,
	},
	// A request to the bare origin root is outside `basePath`, so send it to the
	// app's real entry point. `basePath: false` keeps the source as the literal
	// "/" (Next would otherwise prefix it with basePath).
	async redirects() {
		return [
			{
				source: "/",
				destination: basePath,
				basePath: false,
				permanent: false,
			},
		];
	},
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
