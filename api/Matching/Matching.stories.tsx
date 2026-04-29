import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import spec from "./matching.spec.json";

const BASE = "https://{environment}.reltio.com/reltio/api/{tenantId}";

const api = apiMetaConfig({
	url: `${BASE}/entities`,
	spec,
	defaultPath: "/entities/{entityId}/_matches",
});

const meta = preview.meta({
	...api,
	title: "API/Matching",
	description:
		"Duplicate detection, match verification, merge/unmerge operations, and manual match stewardship.",
});

// ── Potential Matches ─────────────────────────────────

export const GetEntityMatches = meta.story({
	name: "GET /entities/{entityId}/_matches",
	args: {
		description:
			"Retrieves potential matches (suspected duplicates) for a specific entity. Use `forceMatch=true` for real-time recalculation, `transitive=true` for transitive matches.",
		request: {
			url: `${BASE}/entities/{entityId}/_matches`,
			method: "GET",
		},
	},
});

export const FindMatches = meta.story({
	name: "POST /entities/_matches",
	args: {
		description:
			'Finds matches for input entities against the existing population in real-time. Useful for "what-if" scenarios — check if incoming data would match before ingesting.',
		request: {
			url: `${BASE}/entities/_matches`,
			method: "POST",
			body: [
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "John" }],
						LastName: [{ value: "Smith" }],
					},
				},
			],
		},
	},
});

export const FindScoredMatches = meta.story({
	name: "POST /entities/_scoredmatches",
	args: {
		description:
			"Like `_matches` but includes numeric similarity scores per match rule. Essential for match review UIs where stewards need to see match confidence.",
		request: {
			url: `${BASE}/entities/_scoredmatches`,
			method: "POST",
			body: [
				{
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "John" }],
						LastName: [{ value: "Smith" }],
					},
				},
			],
		},
	},
});

export const VerifyMatches = meta.story({
	name: "POST /entities/_verifyMatches",
	args: {
		description:
			"Explains *why* two entities match or don't match. Returns rule-by-rule breakdown with token comparisons and scores. The primary debugging endpoint for match tuning.",
		request: {
			url: `${BASE}/entities/_verifyMatches`,
			method: "POST",
			body: {
				first: { uri: "entities/abc123" },
				second: { uri: "entities/def456" },
			},
		},
	},
});

export const FindMatchCandidates = meta.story({
	name: "POST /entities/findMatchCandidates",
	args: {
		description:
			"Low-level candidate discovery — shows which entity URIs would be evaluated as potential matches, grouped by match method. For diagnosing why matches are or aren't found.",
		request: {
			url: `${BASE}/entities/findMatchCandidates`,
			method: "POST",
			body: {
				entity: {
					type: "configuration/entityTypes/Person",
					attributes: {
						FirstName: [{ value: "John" }],
						LastName: [{ value: "Smith" }],
					},
				},
			},
		},
	},
});

export const GetTransitiveMatches = meta.story({
	name: "GET /entities/{entityId}/_transitiveMatches",
	args: {
		description:
			"Retrieves transitive matches — if A matches B and B matches C, then C is a transitive match of A. Use `deep` for depth, `showPath=true` to see the match chain.",
		request: {
			url: `${BASE}/entities/{entityId}/_transitiveMatches`,
			method: "GET",
		},
	},
});

// ── Merge & Unmerge ───────────────────────────────────

export const MergeEntities = meta.story({
	name: "POST /entities/{entityId}/_sameAs",
	args: {
		description:
			"Manually merges two entities into one golden record. All crosswalks are consolidated and survivorship is re-evaluated. Use `explicitWinner` to force which entity survives.",
		request: {
			url: `${BASE}/entities/{entityId}/_sameAs`,
			method: "POST",
		},
	},
});

export const UnmergeEntity = meta.story({
	name: "POST /entities/{entityId}/_unmerge",
	args: {
		description:
			"Splits a contributor out of a merged entity back into an independent profile. Returns both resulting entities as a pair.",
		request: {
			url: `${BASE}/entities/{entityId}/_unmerge`,
			method: "POST",
		},
	},
});

export const VerifyUnmerge = meta.story({
	name: "POST /entities/_verifyUnmerge",
	args: {
		description:
			"Previews an unmerge operation — checks if match rules would immediately re-merge the entities after separation.",
		request: {
			url: `${BASE}/entities/_verifyUnmerge`,
			method: "POST",
			body: {
				profile: { uri: "entities/abc123" },
				contributor: { uri: "entities/abc123/crosswalks/xyz" },
			},
		},
	},
});

// ── Manual Match Stewardship ──────────────────────────

export const GetNotMatches = meta.story({
	name: "GET /entities/{entityId}/_notMatch",
	args: {
		description:
			'Retrieves entities explicitly marked as "not a match" — suppressed from future match suggestions.',
		request: {
			url: `${BASE}/entities/{entityId}/_notMatch`,
			method: "GET",
		},
	},
});

export const MarkNotMatch = meta.story({
	name: "POST /entities/{entityId}/_notMatch",
	args: {
		description:
			'Marks two entities as "not a match" — a steward decision that suppresses future match suggestions for this pair.',
		request: {
			url: `${BASE}/entities/{entityId}/_notMatch`,
			method: "POST",
		},
	},
});

export const RemoveNotMatch = meta.story({
	name: "DELETE /entities/{entityId}/_notMatch",
	args: {
		description:
			"Removes a not-match mark, allowing the matching engine to suggest the pair as potential matches again.",
		request: {
			url: `${BASE}/entities/{entityId}/_notMatch`,
			method: "DELETE",
		},
	},
});

export const GetSetAMatches = meta.story({
	name: "GET /entities/{entityId}/_setAMatch",
	args: {
		description:
			"Retrieves entities manually confirmed as matches (pending merge).",
		request: {
			url: `${BASE}/entities/{entityId}/_setAMatch`,
			method: "GET",
		},
	},
});

export const MarkSetAMatch = meta.story({
	name: "POST /entities/{entityId}/_setAMatch",
	args: {
		description:
			"Manually confirms two entities as a match. Unlike `_sameAs` (immediate merge), this marks them for future merge processing.",
		request: {
			url: `${BASE}/entities/{entityId}/_setAMatch`,
			method: "POST",
		},
	},
});

export const RemoveSetAMatch = meta.story({
	name: "DELETE /entities/{entityId}/_setAMatch",
	args: {
		description: "Removes a manual match confirmation between two entities.",
		request: {
			url: `${BASE}/entities/{entityId}/_setAMatch`,
			method: "DELETE",
		},
	},
});

export const BulkNotMatch = meta.story({
	name: "POST /matches/_bulkNotMatch",
	args: {
		description:
			"Marks multiple entity pairs as not-match in a single batch request. Use `failFast` to stop on first error.",
		request: {
			url: `${BASE}/matches/_bulkNotMatch`,
			method: "POST",
			body: {
				failFast: false,
				pairs: [
					{ first: "entities/abc123", second: "entities/def456" },
					{ first: "entities/ghi789", second: "entities/jkl012" },
				],
			},
		},
	},
});
