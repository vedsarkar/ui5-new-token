import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DatabricksShareManagement.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Databricks Share Management",
});

export default meta;

export const PostCatalog = meta.story({
	name: "POST /catalog",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/catalog`,
	),
	args: {
		description: `Create a catalog for a tenant in Databricks Unity Catalog`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/catalog`,
			body: {
				catalogName: "reltio_my_catalog",
				comment: "Reltio shared data catalog.",
			},
		},
	},
});

export const PostCatalogSchema = meta.story({
	name: "POST /catalog-schema",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/catalog-schema`,
	),
	args: {
		description: `Create a catalog and schema for a tenant in Databricks Unity Catalog`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/catalog-schema`,
			body: {
				catalogName: "reltio_my_catalog",
				schemaName: "entities",
				comment: "Schema for entity exports.",
			},
		},
	},
});

export const PostCompleteShare = meta.story({
	name: "POST /complete-share",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/complete-share`,
	),
	args: {
		description: `Create recipient, share, and grant access in one operation`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/complete-share`,
			body: {
				recipientName: "partner_acme",
				sharingIdentifier: "abc-123-def-456",
				shareName: "reltio_entities_share",
				privileges: ["SELECT"],
				comment: "Complete share for partner Acme.",
			},
		},
	},
});

export const PostGrant = meta.story({
	name: "POST /grant",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/grant`,
	),
	args: {
		description: `Grant access to a share for a tenant-specific recipient`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/grant`,
			body: {
				shareName: "reltio_entities_share",
				recipientName: "partner_acme",
				privileges: ["SELECT"],
			},
		},
	},
});

export const PostRecipient = meta.story({
	name: "POST /recipient",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/recipient`,
	),
	args: {
		description: `Create a recipient for a tenant in Databricks Unity Catalog`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/recipient`,
			body: {
				recipientName: "partner_acme",
				sharingIdentifier: "abc-123-def-456",
			},
		},
	},
});

export const PostSchema = meta.story({
	name: "POST /schema",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/schema`,
	),
	args: {
		description: `Create a schema for a tenant in Databricks Unity Catalog`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/schema`,
			body: {
				catalogName: "reltio_my_catalog",
				schemaName: "entities",
				comment: "Schema for entity exports.",
			},
		},
	},
});

export const PostShare = meta.story({
	name: "POST /share",
	...urlControls(
		`https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/share`,
	),
	args: {
		description: `Create a share for a tenant in Databricks Unity Catalog`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/share`,
			body: {
				shareName: "reltio_entities_share",
				comment: "Share with partner Acme.",
			},
		},
	},
});
