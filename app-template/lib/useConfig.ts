"use client";

import type { TUseFetch } from "@reltio/design/hooks";
import type { PublicConfig } from "@/app/api/config/route";
import { useFetch } from "@/lib/useFetch";

// Client hook for the public config. Thin wrapper over `lib/useFetch`, so it
// inherits the base-path prefixing and the Reltio session lifecycle
// (401 → refresh → retry → login). The server route decides which parts of the
// config are public; the browser only ever sees `PublicConfig`.
//
// `PublicConfig` is a type-only import from the route module — it is erased at
// build time and pulls no server code (which reads APP_ENV) into the client
// bundle.
export function useConfig(): TUseFetch<PublicConfig, unknown> {
	return useFetch<PublicConfig>("/api/config");
}
