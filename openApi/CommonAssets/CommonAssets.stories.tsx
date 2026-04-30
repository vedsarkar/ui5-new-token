import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./CommonAssets.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Common Assets",
	description:
		"Manage common assets in a Reltio tenant — assets (typically attachments) shared/linked across multiple entities. Provides query (get/total/check), mutation (status/synchronize), and entity-scoped read operations.",
});

export const PostAssetsGet = meta.story({
	name: "POST /assets/_get",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/assets/_get`,
	),
	args: {
		description: `Returns common asset.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/assets/_get`,
			body: {
				entityURI: "entities/abc123",
				attributePath: "Documents",
				crosswalk: "configuration/sources/Reltio",
			},
		},
	},
});

export const PostAssetsTotal = meta.story({
	name: "POST /assets/_total",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/assets/_total`,
	),
	args: {
		description: `Supports flexible querying to get the total count of common assets based on various filter criteria.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/assets/_total`,
			body: {},
		},
	},
});

export const PutAssetsStatus = meta.story({
	name: "PUT /assets/status",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/assets/status`,
	),
	args: {
		description: `Manually marks an asset as common or removes it from being a common asset.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/assets/status`,
			body: {
				entityURI: "entities/abc123",
				attributePath: "Documents",
				crosswalk: "configuration/sources/Reltio",
				isCommon: true,
			},
		},
	},
});

export const PostAssetsStatusCheck = meta.story({
	name: "POST /assets/status/check",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/assets/status/check`,
	),
	args: {
		description: `Returns the status of an asset, indicating whether it is a common asset.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/assets/status/check`,
			body: {
				entityURI: "entities/abc123",
				attributePath: "Documents",
				crosswalk: "configuration/sources/Reltio",
			},
		},
	},
});

export const PutAssetsSynchronize = meta.story({
	name: "PUT /assets/synchronize",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/assets/synchronize`,
	),
	args: {
		description: `This endpoint triggers on-demand synchronization of a specific asset identified by key between the MATCH_ASSETS and COMMON_ASSETS tables.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/assets/synchronize`,
			body: {
				entityURI: "entities/abc123",
				attributePath: "Documents",
				crosswalk: "configuration/sources/Reltio",
			},
		},
	},
});

export const GetEntitiesIdAssets = meta.story({
	name: "GET /entities/{id}/assets",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/assets`,
	),
	args: {
		description: `Fetches the list of common assets associated with the specified entity.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{id}/assets`,
		},
	},
});
