/**
 * Compiles `AuthConfig.proxy.allowedTargets` into a URL matcher gating /proxy.
 *
 * DSL: Chrome match-patterns + `**` for multi-label host depth (same
 * convention as Next.js `images.remotePatterns`).
 *
 *   https://rdm.reltio.com/            exact host
 *   https://*.reltio.com/reltio/       one subdomain label
 *   https://**.reltio.com/reltio/      one or more labels
 *
 * Compiled once to `{ hostRegex, pathPrefix }` pairs. Invalid patterns throw
 * `TypeError` at boot — not on the first request.
 *
 * Threat model: token-exfiltration prevention (OWASP SSRF Prevention §
 * "Enforce an allowlist"). DNS-level SSRF defences are out of scope.
 */

type CompiledPattern = { hostRegex: RegExp; pathPrefix: string };

const HTTPS_PREFIX = "https://";
const LITERAL_LABEL = /^[a-z0-9-]+$/i;
const PATH_GLOB_CHARS = /[*[\]{}]/;

/**
 * Top-level entry. Compiles every pattern once, returns a per-request matcher.
 *
 *   const isAllowed = compileTargetPatterns(["https://**.reltio.com/reltio/"]);
 *   isAllowed(new URL("https://tst-01.reltio.com/reltio/enhancedTenants"));    // true
 *   isAllowed(new URL("https://tst-01.irs.reltio.com/reltio/api/v1"));         // true (multi-label)
 *   isAllowed(new URL("https://cdn.reltio.com/admintools.prod.json"));         // false (path)
 *   isAllowed(new URL("https://evil.com/steal"));                              // false (host)
 */
export function compileTargetPatterns(
	patterns: string[],
): (url: URL) => boolean {
	const compiled = patterns.map(compilePattern);
	return (url) => {
		if (url.protocol !== "https:") return false;
		return compiled.some(
			({ hostRegex, pathPrefix }) =>
				hostRegex.test(url.host) && url.pathname.startsWith(pathPrefix),
		);
	};
}

/**
 * Splits one pattern string into the two pieces matching uses at runtime.
 *
 *   compilePattern("https://**.reltio.com/api/")
 *   → { hostRegex: /^(?:[^.]+\.)+reltio\.com$/i, pathPrefix: "/api/" }
 */
function compilePattern(pattern: string): CompiledPattern {
	if (
		!pattern.startsWith(HTTPS_PREFIX) ||
		pattern.includes("?") ||
		pattern.includes("#")
	) {
		throw new TypeError(`Invalid allowedTargets pattern "${pattern}".`);
	}

	const { hostPart, rawPath } = splitHostAndPath(pattern);

	return {
		hostRegex: buildHostRegex(hostPart, pattern),
		pathPrefix: buildPathPrefix(rawPath, pattern),
	};
}

/**
 * Splits `https://<host>/<path>` into its two parts; no path → `/`.
 *   "https://**.reltio.com/reltio/" → { hostPart: "**.reltio.com", rawPath: "/reltio/" }
 *   "https://rdm.reltio.com"        → { hostPart: "rdm.reltio.com", rawPath: "/" }
 */
function splitHostAndPath(pattern: string): {
	hostPart: string;
	rawPath: string;
} {
	const afterScheme = pattern.slice(HTTPS_PREFIX.length);
	const slashAt = afterScheme.indexOf("/");
	if (slashAt === -1) {
		return { hostPart: afterScheme, rawPath: "/" };
	}
	return {
		hostPart: afterScheme.slice(0, slashAt),
		rawPath: afterScheme.slice(slashAt),
	};
}

/**
 * Builds the host regex for one pattern. Three shapes:
 *
 *   *.reltio.com    → /^[^.]+\.reltio\.com$/i         (matches tst-01.reltio.com)
 *   **.reltio.com   → /^(?:[^.]+\.)+reltio\.com$/i    (matches tst-01.irs.reltio.com)
 *   rdm.reltio.com  → /^rdm\.reltio\.com$/i           (matches only rdm.reltio.com)
 */
function buildHostRegex(hostPart: string, pattern: string): RegExp {
	const reject = new TypeError(`Invalid allowedTargets pattern "${pattern}".`);

	// "tst-01.irs.reltio.com" → leading="tst-01", parent=["irs","reltio","com"].
	const [leadingLabel, ...parentLabels] = hostPart.split(".");
	if (parentLabels.length === 0) throw reject;

	// Parent labels must be literal DNS labels — no wildcards. Validate
	// + escape so they match the host literally.
	for (const label of parentLabels) {
		if (!LITERAL_LABEL.test(label)) throw reject;
	}
	const parent = parentLabels.map(escapeRegex).join("\\.");

	if (leadingLabel === "*") return new RegExp(`^[^.]+\\.${parent}$`, "i");
	if (leadingLabel === "**") return new RegExp(`^(?:[^.]+\\.)+${parent}$`, "i");
	if (LITERAL_LABEL.test(leadingLabel)) {
		return new RegExp(`^${escapeRegex(leadingLabel)}\\.${parent}$`, "i");
	}
	throw reject;
}

/**
 * Normalises the path to a literal prefix for `startsWith` matching. Trailing
 * `*` is sugar for "anything after"; any other glob char throws — keeps the
 * rule trivially auditable (path is always a literal prefix).
 *
 *   "/reltio/*"   → "/reltio/"
 *   "/reltio/{x}" → throws
 */
function buildPathPrefix(rawPath: string, pattern: string): string {
	const prefix = rawPath.endsWith("*") ? rawPath.slice(0, -1) : rawPath;
	if (PATH_GLOB_CHARS.test(prefix)) {
		throw new TypeError(`Invalid allowedTargets pattern "${pattern}".`);
	}
	return prefix;
}

/** Escapes regex metacharacters so a literal can be embedded in a pattern. `"reltio.com"` → `"reltio\\.com"`. */
function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
