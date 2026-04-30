import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Match.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Match",
	description:
		"Search and explain matches between entities, mark pairs as match / not-match (single + bulk), inspect match tokens and documents, and call low-level matching tools (comparator classes, token classes, comparison and explanation utilities). Spans entity-scoped operations under /services/reltio/api/{tenantId}/... and global tools under /services/reltio/tools/matching/...",
});

// --- Search & Explain ---

export const PostReltioApiEntitiesMatches = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/_matches",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_matches`,
	),
	args: {
		description: `This API returns the matches for the records provided in the body of the request. The matches returned in the response are the ones that are identified by all match rules. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_matches`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

export const PostReltioApiEntitiesScoredmatches = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/_scoredmatches",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_scoredmatches`,
	),
	args: {
		description: `The matches returned in the response are the ones that are identified by all match rules. In addition to match pairs, this API also returns their corresponding match scores. matchScore is an aggregate integer from configured scoreStandalone/scoreIncremental on all matching rules. For relevance-based rules, relevance and actionLabel may be returned when applicable, alongside the other match rule details in each match's matchGroups list.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_scoredmatches`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

export const PostReltioApiEntitiesVerifyMatches = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/_verifyMatches",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_verifyMatches`,
	),
	args: {
		description: `his can be used for the tuning of match rules and/or for troubleshooting why any pair matched or did not match. The API accepts either the URIs of existing objects or any two records with attribute values. The explanation can be invoked using the existing match groups by default or with the custom match rules`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_verifyMatches`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

export const PostReltioApiEntitiesVerifyUnmerge = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/_verifyUnmerge",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_verifyUnmerge`,
	),
	args: {
		description: `This can be used for the tuning of match rules and/or for troubleshooting why an entity unmerged or did not unmerge. The API accepts either the URIs of existing object or an record with attribute values. The explanation can be invoked using the existing match groups by default or with the custom match rules`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/_verifyUnmerge`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

export const GetApiEntitiesIdMatches = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/_matches",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_matches`,
	),
	args: {
		description: `The potential matches returned in the response are the ones that are identified by Suspect match rules. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_matches`,
		},
	},
});

export const GetApiEntitiesIdTransitiveMatches = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/_transitiveMatches",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_transitiveMatches`,
	),
	args: {
		description: `Transitive matches are records that matched with the potential matches of an entityThe information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_transitiveMatches`,
		},
	},
});

export const GetApiEntitiesIdMatchedEntities = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/matchedEntities",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchedEntities`,
	),
	args: {
		description: `The potential matches returned in the response are the ones that are identified by Suspect match rules. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchedEntities`,
		},
	},
});

export const PostReltioApiEntitiesFindMatchCandidates = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/findMatchCandidates",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/findMatchCandidates`,
	),
	args: {
		description: `This API retrieves match candidates for a given entity ID`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/findMatchCandidates`,
			body: {
				entityUri: "entities/abc123",
			},
		},
	},
});

export const PostReltioApiEntitiesMatchedEntities = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/matchedEntities",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/matchedEntities`,
	),
	args: {
		description: `This API returns the matches for the records provided in the body of the request. The matches returned in the response are the ones that are identified by all match rules. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/matchedEntities`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

// --- Mark Match / Not Match ---

export const GetApiEntitiesIdNotMatch = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/_notMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
	),
	args: {
		description: `In addition to entity URIs, it also returns the date and time when the entities were updated. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
		},
	},
});

export const PostApiEntitiesIdNotMatch = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/{id}/_notMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
	),
	args: {
		description: `This API allows users to manually mark an entity pair as not a match of each other. In addition to entity URIs, it also returns the date and time when the entities were updated and names of users who updated the entities. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
			body: {
				uri: "entities/def456",
			},
		},
	},
});

export const DeleteApiEntitiesIdNotMatch = meta.story({
	name: "DELETE /services/reltio/api/{tenantId}/entities/{id}/_notMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
	),
	args: {
		description: `This API removes not a match mark between two entities which was created earlier`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_notMatch`,
		},
	},
});

export const GetApiEntitiesIdSetAMatch = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/_setAMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
	),
	args: {
		description: `The list of entities returned in the responses are the ones that are marked by the user either using UI or API. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
		},
	},
});

export const PostApiEntitiesIdSetAMatch = meta.story({
	name: "POST /services/reltio/api/{tenantId}/entities/{id}/_setAMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
	),
	args: {
		description: `This API allows users to manually mark an entity pair as a match of each other. In addition to entity URIs, it also returns the date and time when the entities were updated and names of users who updated the entities. The information returned in the response can be controlled using the parameters supported by this API`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
			body: {
				uri: "entities/def456",
			},
		},
	},
});

export const DeleteApiEntitiesIdSetAMatch = meta.story({
	name: "DELETE /services/reltio/api/{tenantId}/entities/{id}/_setAMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
	),
	args: {
		description: `This API removes potential match between two entities which was created earlier`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/_setAMatch`,
		},
	},
});

export const PostReltioApiMatchesBulkNotMatch = meta.story({
	name: "POST /services/reltio/api/{tenantId}/matches/_bulkNotMatch",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/matches/_bulkNotMatch`,
	),
	args: {
		description: `This API returns results for the records provided in the body of the request.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/matches/_bulkNotMatch`,
			body: [
				{
					uri1: "entities/abc123",
					uri2: "entities/def456",
				},
			],
		},
	},
});

// --- Tokens & Documents ---

export const GetApiEntitiesIdMatchDocument = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/matchDocument",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchDocument`,
	),
	args: {
		description: `This API builds matching documents for a particular entity and compares them. Generated document builds based on current business configuration, the stored document reads from the database`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchDocument`,
		},
	},
});

export const GetApiEntitiesIdMatchTokens = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/matchTokens",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchTokens`,
	),
	args: {
		description: `This API builds matching tokens for a particular entity and compares them. Generated set of tokens built based on current business configuration, the stored set of tokens is read from the database`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchTokens`,
		},
	},
});

export const GetApiEntitiesIdMatchTokensDetailed = meta.story({
	name: "GET /services/reltio/api/{tenantId}/entities/{id}/matchTokensDetailed",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchTokensDetailed`,
	),
	args: {
		description: `This API explain how each token builds for a particular entity`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/api/{tenantId}/entities/{id}/matchTokensDetailed`,
		},
	},
});

// --- Matching Tools ---

export const GetReltioToolsMatchingComparatorClasses = meta.story({
	name: "GET /tools/matching/comparatorClasses",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/comparatorClasses`,
	),
	args: {
		description: `Returns a list of available comparator classes that can be used in the match rule configuration`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/comparatorClasses`,
		},
	},
});

export const PostReltioToolsMatchingCompare = meta.story({
	name: "POST /tools/matching/compare",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/compare`,
	),
	args: {
		description: `The endpoint returns a comparison result of given values`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/compare`,
			body: {
				class: "EqualsComparator",
				value1: "John",
				value2: "John",
			},
		},
	},
});

export const PostToolsMatchingCompareMulti = meta.story({
	name: "POST /tools/matching/compare/multi",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/compare/multi`,
	),
	args: {
		description: `The endpoint returns a comparison result of given values`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/compare/multi`,
			body: {
				class: "EqualsComparator",
				value1: "John",
				value2: "John",
			},
		},
	},
});

export const PostReltioToolsMatchingFixGroupingMatchesState = meta.story({
	name: "POST /tools/matching/fixGroupingMatchesState",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/fixGroupingMatchesState`,
	),
	args: {
		description: `Fixes grouping matches and associations state for provided entity and association IDs`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/fixGroupingMatchesState`,
			body: {},
		},
	},
});

export const GetReltioToolsMatchingMatchTokenClasses = meta.story({
	name: "GET /tools/matching/matchTokenClasses",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/matchTokenClasses`,
	),
	args: {
		description: `Returns a list of available match token classes that can be used in the match rule configuration`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/matchTokenClasses`,
		},
	},
});

export const PostReltioToolsMatchingMatchTokenIntersections = meta.story({
	name: "POST /tools/matching/matchTokenIntersections",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/matchTokenIntersections`,
	),
	args: {
		description: `This endpoint calculates the token intersection for a given pair of values using the supplied token class`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/matchTokenIntersections`,
			body: {
				attribute1: "FirstName",
				attribute2: "LastName",
				value1: "John",
				value2: "Doe",
			},
		},
	},
});

export const PostReltioToolsMatchingMatchTokens = meta.story({
	name: "POST /tools/matching/matchTokens",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/matchTokens`,
	),
	args: {
		description: `This API builds matching tokens for a particular entity and compares them. Generated set of tokens builds based on the current business configuration, the stored set of tokens is read from the database`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/matchTokens`,
			body: {
				values: ["John", "Doe"],
			},
		},
	},
});

export const PostToolsMatchingMatchTokensMulti = meta.story({
	name: "POST /tools/matching/matchTokens/multi",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/matchTokens/multi`,
	),
	args: {
		description: `This API builds match token phrases for given values based on tokenization classes.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/matchTokens/multi`,
			body: {
				values: ["John", "Doe"],
			},
		},
	},
});

export const PostReltioToolsMatchingTokensExplanation = meta.story({
	name: "POST /tools/matching/tokensExplanation",
	...urlControls(
		`https://{environment}.reltio.com/services/reltio/tools/matching/tokensExplanation`,
	),
	args: {
		description: `Explains how match tokens are built for any given entity`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/reltio/tools/matching/tokensExplanation`,
			body: {
				entityUri: "entities/abc123",
			},
		},
	},
});
