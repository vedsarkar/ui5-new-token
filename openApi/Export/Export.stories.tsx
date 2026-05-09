import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Export.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Export",
});

export default meta;

// --- Submitters ---

export const PostExportActivities = meta.story({
	name: "POST /export/{tenantId}/activities",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/activities`,
	),
	args: {
		description: `This API exports activities from a tenant, uploads a CSV file or JSON file to the appropriate storage, and sends a link to the exported data (if post-processing is enabled and the partSize parameter was not specified) or a link to the Export Console UI page (in the other cases) to your email address.Note: For details about S3, GCS, or an Azure Storage destination for export, please see Storing Export Results. Only one storage destination can be specified for one export request.By default, the Activity Log Export API returns results for the last four months. To retrieve data for a different time range, specify the filter query parameter for timestamp. For example, by using the filter=gt(timestamp,1560800276000) query, all activities more recent than June 17, 2019, 7:37:56 PM are returned. The timestamp must be mentioned in milliseconds.Note: As a best practice, we recommend that you specify the time period filter when searching/exporting the activity log data.Retention, exporting, and searching against the activity log data is governed by Quotas and Limits. For more information, please see Quotas and Limits.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/activities`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

export const PostExportEntities = meta.story({
	name: "POST /export/{tenantId}/entities",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/entities`,
	),
	args: {
		description: `This API exports entities from a tenant, uploads a CSV file or JSON file to the appropriate storage, and sends a link to the exported data (if post-processing is enabled and the partSize parameter was not specified) or a link to the Export Console UI page (in the other cases) to your email address.Note: For details about S3, GCS, or an Azure Storage destination for export, please see Storing Export Results. Only one storage destination can be specified for one export request.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/entities`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

export const PostExportEntitiesCrosswalksTree = meta.story({
	name: "POST /export/{tenantId}/entities/_crosswalksTree",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/entities/_crosswalksTree`,
	),
	args: {
		description: `This endpoint allows you to export the merge tree data for all entities in a tenant. This is an asynchronous request that returns the IDs of tasks, which export data. Using these IDs you can track the status of these tasks. After completion of the tasks, a link to the result files is sent to the specified email address. The file with the exported data is a multi-line text file and every line has a separate JSON object that stands for one entity merge tree:<Contributor Tree JSON Node><Contributor Tree JSON Node>`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/entities/_crosswalksTree`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

export const PostExportEntitiesSegments = meta.story({
	name: "POST /export/{tenantId}/entities/segments",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/entities/segments`,
	),
	args: {
		description: `This API exports entities from a tenant which are linked to a segment id, uploads a CSV file or JSON file to the appropriate storage, and sends a link to the exported data (if post-processing is enabled and the partSize parameter was not specified) or a link to the Export Console UI page (in the other cases) to your email address.Note: For details about S3, GCS, or an Azure Storage destination for export, please see Storing Export Results. Only one storage destination can be specified for one export request.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/entities/segments`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

export const PostExportHierarchies = meta.story({
	name: "POST /export/{tenantId}/hierarchies",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/hierarchies`,
	),
	args: {
		description: `This API exports hierarchy connections from a tenant, uploads a CSV file or JSON file to the appropriate storage, and sends a link to the exported data or a link to the Export Console UI page (in the other cases) to your email address.Note: For details about S3, GCS, or an Azure Storage destination for export, please see Storing Export Results. Only one storage destination can be specified for one export request.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/hierarchies`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

export const PostExportRelations = meta.story({
	name: "POST /export/{tenantId}/relations",
	...urlControls(
		`https://{environment}.reltio.com/jobs/export/{tenantId}/relations`,
	),
	args: {
		description: `This API exports relations from a tenant, uploads a CSV file or JSON file to the appropriate storage, and sends a link to the exported data (if post-processing is enabled and the partSize parameter was not specified) or a link to the Export Console UI page (in the other cases) to your email address.Note: For details about S3, GCS, or an Azure Storage destination for export, please see Storing Export Results. Only one storage destination can be specified for one export request.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/jobs/export/{tenantId}/relations`,
			body: {
				format: "CSV",
				filter: "equals(type,'configuration/entityTypes/Individual')",
			},
		},
	},
});

// --- Global Tasks ---

export const GetTasks = meta.story({
	name: "GET /tasks",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks`),
	args: {
		description: `This API is available to everyone and returns export tasks for all tenants with the statuses: SCHEDULED - Indicates that the task is ready to be executed.SCHEDULED_POLL - Indicates that the task is rescheduled due to a node failure or waiting for other tasks to complete their work.PROCESSING - Indicates that the task is being executed now.PAUSING - Indicates that the task is preparing to turn into the PAUSED status.PAUSED - Indicates that the task was paused.CANCELING - Indicates that the task is preparing to turn into the CANCELED status.WAITING - Indicates that the task is waiting for other tasks that belong to the same export job.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks`,
		},
	},
});

export const GetTasksTotal = meta.story({
	name: "GET /tasks/_total",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/_total`),
	args: {
		description: `This API is available to everyone and returns the total count of export tasks for all tenants with the following statuses: SCHEDULED - Indicates that the task is ready to be executed.SCHEDULED_POLL - Indicates that the task is rescheduled due to a node failure or waiting for other tasks to complete their work.PROCESSING - Indicates that the task is being executed now.PAUSING - Indicates that the task is preparing to turn into the PAUSED status.PAUSED - Indicates that the task was paused.CANCELING - Indicates that the task is preparing to turn into the CANCELED status.WAITING - Indicates that the task is waiting for other tasks that belong to the same export job.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks/_total`,
		},
	},
});

export const GetTasksTaskId = meta.story({
	name: "GET /tasks/{taskId}",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/{taskId}`),
	args: {
		description: `This API returns the task with the given ID or an error if there is no task with this ID. This task is available to Administrator.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks/{taskId}`,
		},
	},
});

export const GetTasksTaskIdManifest = meta.story({
	name: "GET /tasks/{taskId}/_manifest",
	...urlControls(
		`https://{environment}.reltio.com/jobs/tasks/{taskId}/_manifest`,
	),
	args: {
		description: `This API provides information about the exported files for a particular export task.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks/{taskId}/_manifest`,
		},
	},
});

export const PutTasksTaskIdPause = meta.story({
	name: "PUT /tasks/{taskId}/_pause",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/{taskId}/_pause`),
	args: {
		description: `This API initiates the process of pausing a task with a particular ID.This API is available to the Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/tasks/{taskId}/_pause`,
		},
	},
});

export const PutTasksTaskIdResume = meta.story({
	name: "PUT /tasks/{taskId}/_resume",
	...urlControls(
		`https://{environment}.reltio.com/jobs/tasks/{taskId}/_resume`,
	),
	args: {
		description: `This API resumes paused task with given ID. The task returns to the SCHEDULED tasks queue and then a free node of Export Service starts executing this task.Available to Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/tasks/{taskId}/_resume`,
		},
	},
});

export const PutTasksTaskIdStop = meta.story({
	name: "PUT /tasks/{taskId}/_stop",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/{taskId}/_stop`),
	args: {
		description: `This API initiates the process of stopping a task with a particular ID. This API is available to the Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/tasks/{taskId}/_stop`,
		},
	},
});

export const GetTasksHistory = meta.story({
	name: "GET /tasks/history",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/history`),
	args: {
		description: `This API is available to Administrator and returns export tasks for all tenants with the following statuses: CANCELED - Indicates that the task was canceled.COMPLETED - Indicates that the task was completed.FAILED - Indicates that an error occurred during execution of a task.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks/history`,
		},
	},
});

export const GetTasksHistoryTotal = meta.story({
	name: "GET /tasks/history/_total",
	...urlControls(`https://{environment}.reltio.com/jobs/tasks/history/_total`),
	args: {
		description: `This API is available to Administrator and returns the total count of export tasks for all tenants with the following statuses: CANCELED - Indicates that the task was canceled.COMPLETED - Indicates that the task was completed.FAILED - Indicates that an error occurred during execution of a task.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/tasks/history/_total`,
		},
	},
});

// --- Tenant Tasks ---

export const GetTasks2 = meta.story({
	name: "GET /{tenantId}/tasks",
	...urlControls(`https://{environment}.reltio.com/jobs/{tenantId}/tasks`),
	args: {
		description: `This API is available to Administrator and Tenant's Administrator and returns export tasks for the specified tenant with the statuses: SCHEDULED - Indicates that the task is ready to be executed.SCHEDULED_POLL - Indicates that the task is rescheduled due to a node failure or waiting for other tasks to complete their work.PROCESSING - Indicates that the task is being executed now.PAUSING - Indicates that the task is preparing to turn into the PAUSED status.PAUSED - Indicates that the task was paused.CANCELING - Indicates that the task is preparing to turn into the CANCELED status.WAITING - Indicates that the task is waiting for other tasks that belong to the same export job.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks`,
		},
	},
});

export const GetTasksTotal2 = meta.story({
	name: "GET /{tenantId}/tasks/_total",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/_total`,
	),
	args: {
		description: `This API is available to the Administrator or the Tenant's Administrator and returns the total count of export tasks for the specified tenant with the following statuses: SCHEDULED - Indicates that the task is ready to be executed.SCHEDULED_POLL - Indicates that the task is rescheduled due to a node failure or waiting for other tasks to complete their work.PROCESSING - Indicates that the task is being executed now.PAUSING - Indicates that the task is preparing to turn into the PAUSED status.PAUSED - Indicates that the task was paused.CANCELING - Indicates that the task is preparing to turn into the CANCELED status.WAITING - Indicates that the task is waiting for other tasks that belong to the same export job.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/_total`,
		},
	},
});

export const GetTasksTaskId2 = meta.story({
	name: "GET /{tenantId}/tasks/{taskId}",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}`,
	),
	args: {
		description: `This API returns the task with the given ID or an error if there is no task with this ID. This task is available to Administrator and the Tenant's Administrator.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}`,
		},
	},
});

export const PutTasksTaskIdPause2 = meta.story({
	name: "PUT /{tenantId}/tasks/{taskId}/_pause",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_pause`,
	),
	args: {
		description: `This API initiates the process of pausing a task with a particular ID for the specified tenant. This API is available to the Administrator and the Tenant's Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_pause`,
		},
	},
});

export const PutTasksTaskIdResume2 = meta.story({
	name: "PUT /{tenantId}/tasks/{taskId}/_resume",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_resume`,
	),
	args: {
		description: `This API resumes paused task with given ID for specified tenant. The task returns to the SCHEDULED tasks queue and then a free node of Export Service starts executing this task.Available to Administrator and the Tenant's Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_resume`,
		},
	},
});

export const PutTasksTaskIdStop2 = meta.story({
	name: "PUT /{tenantId}/tasks/{taskId}/_stop",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_stop`,
	),
	args: {
		description: `This API initiates the process of stopping a task with a particular ID for the specified tenant. This API is available to the Administrator and the Tenant's Administrator.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/{taskId}/_stop`,
		},
	},
});

export const GetTasksHistory2 = meta.story({
	name: "GET /{tenantId}/tasks/history",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/history`,
	),
	args: {
		description: `This API is available to Administrator and Tenant's Administrator and returns export tasks for the specified tenant with the following statuses: CANCELED - Indicates that the task was canceled.COMPLETED - Indicates that the task was completed.FAILED - Indicates that an error occurred during execution of a task.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/history`,
		},
	},
});

export const GetTasksHistoryTotal2 = meta.story({
	name: "GET /{tenantId}/tasks/history/_total",
	...urlControls(
		`https://{environment}.reltio.com/jobs/{tenantId}/tasks/history/_total`,
	),
	args: {
		description: `This API is available to Administrator and Tenant's Administrator and returns the total count of export tasks for the specified tenant with the following statuses: CANCELED - Indicates that the task was canceled.COMPLETED - Indicates that the task was completed.FAILED - Indicates that an error occurred during execution of a task.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/jobs/{tenantId}/tasks/history/_total`,
		},
	},
});
