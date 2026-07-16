import defaultConfig from "./default.json";
import devConfig from "./dev.json";
import prodConfig from "./prod.json";
import { deepMerge } from "./deepMerge";

// One config file per deployment environment. Both files are statically
// imported so the bundler includes them; the active one is chosen at runtime by
// APP_CONFIG. This keeps "build once, deploy anywhere" — the same artifact can run
// on dev or prod, the environment is decided by an env var at boot, not at
// build time. Add another environment by dropping a file here and registering
// it in this map.
const configsByEnv = {
	dev: devConfig,
	prod: prodConfig,
} as const;

export type AppEnv = keyof typeof configsByEnv;

// The resolved shape = shared defaults (`default.json`) deep-merged with the
// active env file. Kept loose for now (an intersection of the JSON shapes) and
// per-app; once the layout stabilizes we can replace it with an explicit type
// and a JSON Schema validated against the MERGED result at load time.
export type AppConfig = typeof defaultConfig & typeof devConfig;

function resolveAppEnv(): AppEnv {
	const value = process.env.APP_CONFIG ?? "dev";
	if (!(value in configsByEnv)) {
		throw new Error(
			`✗ APP_CONFIG must be one of: ${Object.keys(configsByEnv).join(", ")}. Got: "${value}".`,
		);
	}
	return value as AppEnv;
}

// Fully-resolved config for this deployment. Server-side only — reading
// APP_CONFIG happens here, so import this module from server code (route
// handlers, server components), never straight into a client bundle.
//
// APP_CONFIG is a START-TIME variable: build artifacts are identical across
// environments and carry no APP_CONFIG; the value is injected when the artifact
// boots. So this selection must run at runtime, never at build. Consume it from
// a dynamic server context (the config route below is `force-dynamic`) so Next
// never evaluates it during build/prerender, where APP_CONFIG would be absent.
//
// `default.json` holds settings common to every environment; the active env
// file is deep-merged on top of it (objects extend, arrays/primitives replace).
const config = deepMerge(defaultConfig, configsByEnv[resolveAppEnv()]) as AppConfig;

// Default export = the resolved config, so consumers just do
// `import config from "@/config"`. Kept intentionally structure-agnostic: the
// config layout differs per app, so the template exposes the whole object and
// lets each app pick the parts it needs at the point of use (e.g. the config
// route decides what to forward to the browser).
export default config;
