import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataPipelines.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Pipelines",
});

export default meta;

// --- Adapters ---

export const GetApiAdaptersAdapterNameActions = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/actions",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/actions`,
	),
	args: {
		description: `It calls the corresponding Adapter based on the parameters`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/actions`,
		},
	},
});

export const PostAdaptersAdapterNameActionsActionType = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/actions/{actionType}",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/actions/{actionType}`,
	),
	args: {
		description: `It calls the corresponding Adapter based on the parameters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/actions/{actionType}`,
			body: {
				params: {},
			},
		},
	},
});

export const PostApiAdaptersAdapterNameScripts = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/scripts",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/scripts`,
	),
	args: {
		description: `This API allows you to get the script content for the Adapters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/scripts`,
			body: {
				scriptName: "myScript",
			},
		},
	},
});

export const PostApiAdaptersAdapterNameValidate = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/validate",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/validate`,
	),
	args: {
		description: `Validate if Adapter configured correctly`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/validate`,
			body: {
				config: {},
			},
		},
	},
});

export const GetApiAuthInfo = meta.story({
	name: "GET /api/tenants/{tenantId}/authInfo",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/authInfo`,
	),
	args: {
		description: `This API allows you to get the auth info for the Adapters`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/authInfo`,
		},
	},
});

export const GetApiStatus = meta.story({
	name: "GET /api/tenants/{tenantId}/status",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/status`,
	),
	args: {
		description: `Get Adapter Statuses`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/status`,
		},
	},
});

// --- Workspace ---

export const GetApiAdaptersAdapterNameConnectionString = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/connectionString",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/connectionString`,
	),
	args: {
		description: `Get Connection String`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/connectionString`,
		},
	},
});

export const PostApiAdaptersAdapterNameConnectionString = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/connectionString",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/connectionString`,
	),
	args: {
		description: `Create Connection String`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/connectionString`,
			body: {
				name: "primary",
			},
		},
	},
});

export const PostApiAdaptersAdapterNameDltPipeline = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/dltPipeline",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/dltPipeline`,
	),
	args: {
		description: `Manage DLT Pipeline`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/dltPipeline`,
			body: {
				action: "create",
				pipelineName: "reltio-dlt-pipeline",
			},
		},
	},
});

export const PostAdapterNameFabricResourcesRegionRegion = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/fabricResources/region/{region}",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/fabricResources/region/{region}`,
	),
	args: {
		description: `Create Workspace and Lakehouse`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/fabricResources/region/{region}`,
			body: {
				workspaceName: "reltio-workspace",
				lakehouseName: "reltio-lakehouse",
			},
		},
	},
});

export const PostApiAdaptersAdapterNameFabricSchemaEvolution = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/fabricSchemaEvolution",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/fabricSchemaEvolution`,
	),
	args: {
		description: `Process Fabric Schema Evolution`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/fabricSchemaEvolution`,
			body: {
				schemaUpdates: [],
			},
		},
	},
});

export const GetApiAdaptersAdapterNameLakehouse = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/lakehouse",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/lakehouse`,
	),
	args: {
		description: `Get Lakehouse`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/lakehouse`,
		},
	},
});

export const GetApiAdaptersAdapterNameShareLink = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/shareLink",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shareLink`,
	),
	args: {
		description: `Share Data with External Users`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shareLink`,
		},
	},
});

export const PostApiAdaptersAdapterNameShareLink = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/shareLink",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shareLink`,
	),
	args: {
		description: `Share Data with External Users`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shareLink`,
			body: {
				recipientEmail: "partner@example.com",
				expiresInDays: 30,
			},
		},
	},
});

export const PostApiAdaptersAdapterNameShortcuts = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/shortcuts",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shortcuts`,
	),
	args: {
		description: `Create Shortcuts`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/shortcuts`,
			body: {
				sourcePath: "/Files/source",
				targetPath: "/Files/target",
			},
		},
	},
});

export const GetApiAdaptersAdapterNameWorkspace = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/workspace",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/workspace`,
	),
	args: {
		description: `Get Workspace`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/workspace`,
		},
	},
});

export const GetApiShareLinks = meta.story({
	name: "GET /api/tenants/{tenantId}/shareLinks",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/shareLinks`,
	),
	args: {
		description: `Share Data with External Users`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/shareLinks`,
		},
	},
});

// --- DLT Pipelines ---

export const GetApiPipelinesPipelineIdEvents = meta.story({
	name: "GET /api/tenants/{tenantId}/pipelines/{pipelineId}/events",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/events`,
	),
	args: {
		description: `Returns pipeline error events from Databricks. Errors sorted by timestamp (latest first). Use 'expanded=false' for latest update only, 'expanded=true' for all errors. Supports offset/limit pagination.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/events`,
		},
	},
});

export const PutApiPipelinesPipelineIdStop = meta.story({
	name: "PUT /api/tenants/{tenantId}/pipelines/{pipelineId}/stop",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/stop`,
	),
	args: {
		description: `Stops the pipeline by canceling the active update. If there is no active update for the pipeline, this request is a no-op.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/stop`,
		},
	},
});

export const PutApiPipelinesPipelineIdTrigger = meta.story({
	name: "PUT /api/tenants/{tenantId}/pipelines/{pipelineId}/trigger",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/trigger`,
	),
	args: {
		description: `Starts a new update for the specified pipeline. Supports full refresh and validation-only modes. All pipeline triggers are recorded with cause set to API_CALL. If no request body is provided, triggers a standard pipeline update.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/{pipelineId}/trigger`,
		},
	},
});

export const GetApiPipelinesStatus = meta.story({
	name: "GET /api/tenants/{tenantId}/pipelines/status",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/status`,
	),
	args: {
		description: `Returns DLT pipelines from both Fabric and Deltashare Databricks workspaces for the specified tenant with pagination support. Includes pipeline ID, name, adapter ID, current pipeline state (RUNNING, IDLE), and latest update state (COMPLETED, FAILED, etc.). Use offset-based pagination with offset and limit parameters.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/pipelines/status`,
		},
	},
});

// --- Monitoring & Status ---

export const GetApiMonitoringEntityMonitoring = meta.story({
	name: "GET /api/tenants/{tenantId}/monitoring/_entityMonitoring",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_entityMonitoring`,
	),
	args: {
		description: `get Datapipeline entity events report`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_entityMonitoring`,
		},
	},
});

export const GetApiMonitoringEventFailed = meta.story({
	name: "GET /api/tenants/{tenantId}/monitoring/_eventFailed",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventFailed`,
	),
	args: {
		description: `Returns events that reached DATAPIPELINE_PROCESSED state but were skipped due to processing failures. Response includes the count of failed events and a list of events with their event_id, event_type, and error_message (skippedProcessingReason). The 'from' and 'to' timestamps MUST fall within the same calendar day in UTC timezone. Requests spanning multiple days will be rejected with a 400 Bad Request error. Supports page-based pagination with default size of 100 and maximum size of 1000.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventFailed`,
		},
	},
});

export const GetApiMonitoringEventMonitoring = meta.story({
	name: "GET /api/tenants/{tenantId}/monitoring/_eventMonitoring",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventMonitoring`,
	),
	args: {
		description: `get Datapipeline event monitoring report`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventMonitoring`,
		},
	},
});

export const GetApiMonitoringEventStatus = meta.story({
	name: "GET /api/tenants/{tenantId}/monitoring/_eventStatus",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventStatus`,
	),
	args: {
		description: `Returns event counts grouped by state (CREATED, SENT, DATAPIPELINE_PROCESSED, DEAD). The 'from' and 'to' timestamps MUST fall within the same calendar day in UTC timezone. Requests spanning multiple days will be rejected with a 400 Bad Request error.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/monitoring/_eventStatus`,
		},
	},
});

export const GetStatusTenantDetails = meta.story({
	name: "GET /status/tenant/{tenantId}/details",
	...urlControls(
		`https://{environment}.reltio.com/status/tenant/{tenantId}/details`,
	),
	args: {
		description: `get Datapipeline Queue Tenant Info`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/status/tenant/{tenantId}/details`,
		},
	},
});

// --- Secrets ---

export const GetApiAdaptersAdapterNameSecrets = meta.story({
	name: "GET /api/tenants/{tenantId}/adapters/{adapterName}/secrets",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
	),
	args: {
		description: `Fetch Secrets`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
		},
	},
});

export const PutApiAdaptersAdapterNameSecrets = meta.story({
	name: "PUT /api/tenants/{tenantId}/adapters/{adapterName}/secrets",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
	),
	args: {
		description: `Store Secrets`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
			body: [
				{
					name: "MY_SECRET",
					value: "new-value",
				},
			],
		},
	},
});

export const PostApiAdaptersAdapterNameSecrets = meta.story({
	name: "POST /api/tenants/{tenantId}/adapters/{adapterName}/secrets",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
	),
	args: {
		description: `Create Secrets`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
			body: [
				{
					name: "MY_SECRET",
					value: "secret-value",
				},
			],
		},
	},
});

export const DeleteApiAdaptersAdapterNameSecrets = meta.story({
	name: "DELETE /api/tenants/{tenantId}/adapters/{adapterName}/secrets",
	...urlControls(
		`https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
	),
	args: {
		description: `Delete Secrets`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/api/tenants/{tenantId}/adapters/{adapterName}/secrets`,
		},
	},
});

// --- Reindex ---

export const PostReltioApiSyncToDataPipeline = meta.story({
	name: "POST /reltio/api/{tenantId}/syncToDataPipeline",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/syncToDataPipeline`,
	),
	args: {
		description: `Reindexes all data in a tenant to DPH, including entities, relations, interactions, matches and merges.Stop and Pause are supported.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/syncToDataPipeline`,
			body: {
				fullReindex: true,
			},
		},
	},
});

// --- Writeback ---

export const GetConfigWriteback = meta.story({
	name: "GET /config/{tenantId}/writeback",
	...urlControls(
		`https://{environment}.reltio.com/config/{tenantId}/writeback`,
	),
	args: {
		description: `get writeback config paramaters`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/config/{tenantId}/writeback`,
		},
	},
});
