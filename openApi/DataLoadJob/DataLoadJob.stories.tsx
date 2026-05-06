import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataLoadJob.spec.json";

const base = "https://{environment}.reltio.com/dataloader/api/{tenantId}";
const mappingIdUrl = `${base}/_mapping/{mappingId}`;
const bucketIdUrl = `${base}/customBuckets/{id}`;
const projectIdUrl = `${base}/project/{projectId}`;
const sourceIdUrl = `${base}/project/data/source/{sourceId}`;
const jobIdUrl = `${base}/project/job/{jobId}`;
const accountIdUrl = `${base}/storage/_account/{accountId}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Load Job",
});

export default meta;

// --- Mappings ---

export const CreateMapping = meta.story({
	name: "POST /_mapping",
	...urlControls(base),
	args: {
		description: "Creates a new mapping based on the details provided.",
		request: { method: "POST", url: `${base}/_mapping`, body: {} },
	},
});

export const GetMapping = meta.story({
	name: "GET /_mapping/{mappingId}",
	...urlControls(mappingIdUrl),
	args: {
		description: "Retrieves the existing mapping details using an ID.",
		request: { method: "GET", url: mappingIdUrl },
	},
});

export const UpdateMapping = meta.story({
	name: "PUT /_mapping/{mappingId}",
	...urlControls(mappingIdUrl),
	args: {
		description: "Updates existing mapping based on the details provided.",
		request: { method: "PUT", url: mappingIdUrl, body: {} },
	},
});

export const DeleteMapping = meta.story({
	name: "DELETE /_mapping/{mappingId}",
	...urlControls(mappingIdUrl),
	args: {
		description: "Deletes an existing mapping.",
		request: { method: "DELETE", url: mappingIdUrl },
	},
});

export const GetMappings = meta.story({
	name: "GET /_mappings",
	...urlControls(base),
	args: {
		description: "Retrieves all existing mappings.",
		request: { method: "GET", url: `${base}/_mappings` },
	},
});

// --- Custom Buckets ---

export const CreateCustomBuckets = meta.story({
	name: "POST /customBuckets",
	...urlControls(base),
	args: {
		description: "Creates custom buckets.",
		request: { method: "POST", url: `${base}/customBuckets`, body: {} },
	},
});

export const GetCustomBuckets = meta.story({
	name: "GET /customBuckets/{id}",
	...urlControls(bucketIdUrl),
	args: {
		description: "Returns the custom buckets for the provided ID.",
		request: { method: "GET", url: bucketIdUrl },
	},
});

export const UpdateCustomBuckets = meta.story({
	name: "PUT /customBuckets/{id}",
	...urlControls(bucketIdUrl),
	args: {
		description: "Updates the existing custom buckets.",
		request: { method: "PUT", url: bucketIdUrl, body: {} },
	},
});

// --- Projects ---

export const CreateProject = meta.story({
	name: "POST /project",
	...urlControls(base),
	args: {
		description: "Creates job definitions with the provided details.",
		request: { method: "POST", url: `${base}/project`, body: {} },
	},
});

export const GetProject = meta.story({
	name: "GET /project/{projectId}",
	...urlControls(projectIdUrl),
	args: {
		description: "Retrieves existing job definition by ID.",
		request: { method: "GET", url: projectIdUrl },
	},
});

export const UpdateProject = meta.story({
	name: "PUT /project/{projectId}",
	...urlControls(projectIdUrl),
	args: {
		description: "Updates existing job definition.",
		request: { method: "PUT", url: projectIdUrl, body: {} },
	},
});

export const DeleteProject = meta.story({
	name: "DELETE /project/{projectId}",
	...urlControls(projectIdUrl),
	args: {
		description: "Deletes existing job definition by ID.",
		request: { method: "DELETE", url: projectIdUrl },
	},
});

export const GetProjectJobs = meta.story({
	name: "GET /project/{projectId}/jobs",
	...urlControls(projectIdUrl),
	args: {
		description: "Gets jobs for a job definition.",
		request: { method: "GET", url: `${projectIdUrl}/jobs` },
	},
});

export const CreateJob = meta.story({
	name: "POST /project/{projectId}/jobs",
	...urlControls(projectIdUrl),
	args: {
		description: "Creates a job.",
		request: { method: "POST", url: `${projectIdUrl}/jobs`, body: {} },
	},
});

export const CreateAndRunJob = meta.story({
	name: "POST /project/{projectId}/jobs/run",
	...urlControls(projectIdUrl),
	args: {
		description: "Creates and runs a job.",
		request: { method: "POST", url: `${projectIdUrl}/jobs/run`, body: {} },
	},
});

export const GetProjects = meta.story({
	name: "GET /projects",
	...urlControls(base),
	args: {
		description: "Returns existing job definitions matching provided criteria.",
		request: { method: "GET", url: `${base}/projects` },
	},
});

// --- Data Sources ---

export const GetDataSources = meta.story({
	name: "GET /project/data/source",
	...urlControls(base),
	args: {
		description: "Returns source details matching the criteria for the tenant.",
		request: { method: "GET", url: `${base}/project/data/source` },
	},
});

export const CreateDataSource = meta.story({
	name: "POST /project/data/source",
	...urlControls(base),
	args: {
		description: "Creates a new source based on the provided source details.",
		request: { method: "POST", url: `${base}/project/data/source`, body: {} },
	},
});

export const GetDataSource = meta.story({
	name: "GET /project/data/source/{sourceId}",
	...urlControls(sourceIdUrl),
	args: {
		description: "Returns the source details for the provided Source ID.",
		request: { method: "GET", url: sourceIdUrl },
	},
});

export const UpdateDataSource = meta.story({
	name: "PUT /project/data/source/{sourceId}",
	...urlControls(sourceIdUrl),
	args: {
		description: "Updates the existing source details.",
		request: { method: "PUT", url: sourceIdUrl, body: {} },
	},
});

export const DeleteDataSource = meta.story({
	name: "DELETE /project/data/source/{sourceId}",
	...urlControls(sourceIdUrl),
	args: {
		description: "Deletes the source details for the provided Source ID.",
		request: { method: "DELETE", url: sourceIdUrl },
	},
});

// --- Jobs ---

export const GetJob = meta.story({
	name: "GET /project/job/{jobId}",
	...urlControls(jobIdUrl),
	args: {
		description: "Gets job details.",
		request: { method: "GET", url: jobIdUrl },
	},
});

export const UpdateJob = meta.story({
	name: "PUT /project/job/{jobId}",
	...urlControls(jobIdUrl),
	args: {
		description: "Updates a job.",
		request: { method: "PUT", url: jobIdUrl, body: {} },
	},
});

export const DeleteJob = meta.story({
	name: "DELETE /project/job/{jobId}",
	...urlControls(jobIdUrl),
	args: {
		description: "Deletes a job.",
		request: { method: "DELETE", url: jobIdUrl },
	},
});

export const PauseJob = meta.story({
	name: "PUT /project/job/{jobId}/_pause",
	...urlControls(jobIdUrl),
	args: {
		description: "Pauses a running job.",
		request: { method: "PUT", url: `${jobIdUrl}/_pause` },
	},
});

export const SetJobPriority = meta.story({
	name: "PUT /project/job/{jobId}/_priority",
	...urlControls(jobIdUrl),
	args: {
		description: "Sets job priority.",
		request: { method: "PUT", url: `${jobIdUrl}/_priority`, body: {} },
	},
});

export const ResumeJob = meta.story({
	name: "PUT /project/job/{jobId}/_resume",
	...urlControls(jobIdUrl),
	args: {
		description: "Resumes a paused job.",
		request: { method: "PUT", url: `${jobIdUrl}/_resume` },
	},
});

export const StopJob = meta.story({
	name: "PUT /project/job/{jobId}/_stop",
	...urlControls(jobIdUrl),
	args: {
		description: "Stops a running job.",
		request: { method: "PUT", url: `${jobIdUrl}/_stop` },
	},
});

export const DownloadErrors = meta.story({
	name: "GET /project/job/{jobId}/errors",
	...urlControls(jobIdUrl),
	args: {
		description: "Downloads the error file for a job.",
		request: { method: "GET", url: `${jobIdUrl}/errors` },
	},
});

export const DownloadJobSource = meta.story({
	name: "GET /project/job/{jobId}/source",
	...urlControls(jobIdUrl),
	args: {
		description: "Downloads source files as a zip file.",
		request: { method: "GET", url: `${jobIdUrl}/source` },
	},
});

export const GetAllJobs = meta.story({
	name: "GET /project/jobs",
	...urlControls(base),
	args: {
		description: "Returns all existing jobs for a tenant.",
		request: { method: "GET", url: `${base}/project/jobs` },
	},
});

export const GetJobsFacets = meta.story({
	name: "GET /project/jobs/_facets",
	...urlControls(base),
	args: {
		description:
			"Returns requested fields from all existing jobs for a tenant.",
		request: { method: "GET", url: `${base}/project/jobs/_facets` },
	},
});

// --- Storage ---

export const CreateStorageAccount = meta.story({
	name: "POST /storage/_account",
	...urlControls(base),
	args: {
		description: "Creates a storage account.",
		request: { method: "POST", url: `${base}/storage/_account`, body: {} },
	},
});

export const GetStorageAccount = meta.story({
	name: "GET /storage/_account/{accountId}",
	...urlControls(accountIdUrl),
	args: {
		description: "Gets storage account details.",
		request: { method: "GET", url: accountIdUrl },
	},
});

export const UpdateStorageAccount = meta.story({
	name: "PUT /storage/_account/{accountId}",
	...urlControls(accountIdUrl),
	args: {
		description: "Updates a storage account.",
		request: { method: "PUT", url: accountIdUrl, body: {} },
	},
});

export const DeleteStorageAccount = meta.story({
	name: "DELETE /storage/_account/{accountId}",
	...urlControls(accountIdUrl),
	args: {
		description: "Deletes a storage account.",
		request: { method: "DELETE", url: accountIdUrl },
	},
});

export const GetStorageAccounts = meta.story({
	name: "GET /storage/_accounts",
	...urlControls(base),
	args: {
		description: "Retrieves all storage account details.",
		request: { method: "GET", url: `${base}/storage/_accounts` },
	},
});

const uploadUrl = `${base}/storage/{directory}/upload`;

export const UploadFiles = meta.story({
	name: "POST /storage/{directory}/upload",
	...urlControls(uploadUrl),
	args: {
		description: "Uploads files from a local machine to load data.",
		request: { method: "POST", url: uploadUrl },
	},
});

const storageSourceUrl = `${base}/storage/{sourceId}`;

export const RemoveUploadedFile = meta.story({
	name: "DELETE /storage/{sourceId}",
	...urlControls(storageSourceUrl),
	args: {
		description: "Removes the uploaded file from Cloud Storage.",
		request: { method: "DELETE", url: storageSourceUrl },
	},
});

export const ReadSourceFiles = meta.story({
	name: "GET /storage/{sourceId}/read",
	...urlControls(storageSourceUrl),
	args: {
		description: "Reads existing source files.",
		request: { method: "GET", url: `${storageSourceUrl}/read` },
	},
});
