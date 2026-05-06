import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./WorkflowAdapter.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Workflow Adapter",
});

export default meta;

// --- Deployments ---

export const GetDeploymentsProcessDefinitionId = meta.story({
	name: "GET /{tenantId}/deployments/{processDefinitionId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/deployments/{processDefinitionId}`,
	),
	args: {
		description: `Retrieves the process definition deployment by the specified process definition id`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/deployments/{processDefinitionId}`,
		},
	},
});

export const PostDeployments = meta.story({
	name: "POST /deployments",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/deployments`,
	),
	args: {
		description: `Deploys the process definition file to create a workflow`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/deployments`,
			body: {
				processDefinitionId: "stewardship-v1",
				jarName: "stewardship.bar",
			},
		},
	},
});

// --- Process Definitions ---

export const GetProcessDefinitions = meta.story({
	name: "GET /{tenantId}/processDefinitions",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions`,
	),
	args: {
		description: `List the deployments by the tenant`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions`,
		},
	},
});

export const GetProcessDefinitionsProcessType = meta.story({
	name: "GET /{tenantId}/processDefinitions/{processType}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}`,
	),
	args: {
		description: `Retrieves the process definition for the specified tenant`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}`,
		},
	},
});

export const DeleteProcessDefinitionsProcessType = meta.story({
	name: "DELETE /{tenantId}/processDefinitions/{processType}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}`,
	),
	args: {
		description: `Deletes the business workflow process definition for the specified tenant`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}`,
		},
	},
});

export const PostProcessDefinitionsProcessTypeHistory = meta.story({
	name: "POST /{tenantId}/processDefinitions/{processType}/history",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}/history`,
	),
	args: {
		description: `Retrieves the deployment history of business process definition`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processDefinitions/{processType}/history`,
			body: {
				limit: 10,
			},
		},
	},
});

// --- Process Instances ---

export const PostProcessInstances = meta.story({
	name: "POST /{tenantId}/processInstances",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances`,
	),
	args: {
		description: `The Workflow service enables processes and tasks management, including the assignment and tracking of tasks`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances`,
			body: {
				processDefinitionKey: "stewardship",
				businessKey: "entities/abc123",
				variables: {
					entityUri: "entities/abc123",
					priority: "HIGH",
				},
			},
		},
	},
});

export const DeleteProcessInstances = meta.story({
	name: "DELETE /{tenantId}/processInstances",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances`,
	),
	args: {
		description: `Terminates the process instances in the background`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances`,
		},
	},
});

export const PostProcessInstancesGenerateFromQuery = meta.story({
	name: "POST /{tenantId}/processInstances/_generateFromQuery",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/_generateFromQuery`,
	),
	args: {
		description: `Starts review processes from the search query`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/_generateFromQuery`,
			body: {
				query: "equals(type,'configuration/entityTypes/Individual')",
				processDefinitionKey: "stewardship",
			},
		},
	},
});

export const PostProcessInstancesSearch = meta.story({
	name: "POST /{tenantId}/processInstances/_search",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/_search`,
	),
	args: {
		description: `Retrieves the details of the process instances for an entity using the specified filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/_search`,
			body: {
				filter: {
					businessKey: "entities/abc123",
				},
				limit: 10,
			},
		},
	},
});

export const GetProcessInstancesProcessInstanceId = meta.story({
	name: "GET /{tenantId}/processInstances/{processInstanceId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}`,
	),
	args: {
		description: `Retrieves the details of the process instances associated with an entity`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}`,
		},
	},
});

export const DeleteProcessInstancesProcessInstanceId = meta.story({
	name: "DELETE /{tenantId}/processInstances/{processInstanceId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}`,
	),
	args: {
		description: `Terminates a process instance using the Process Instance ID in the request`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}`,
		},
	},
});

export const PutProcessInstancesProcessInstanceIdActivate = meta.story({
	name: "PUT /{tenantId}/processInstances/{processInstanceId}/_activate",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_activate`,
	),
	args: {
		description: `Activates a suspended process instance using the Process Instance ID in the request`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_activate`,
		},
	},
});

export const GetProcessInstancesProcessInstanceIdComment = meta.story({
	name: "GET /{tenantId}/processInstances/{processInstanceId}/_comment",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_comment`,
	),
	args: {
		description: `Retrieves the comments of a process instance`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_comment`,
		},
	},
});

export const PutProcessInstancesProcessInstanceIdSuspend = meta.story({
	name: "PUT /{tenantId}/processInstances/{processInstanceId}/_suspend",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_suspend`,
	),
	args: {
		description: `Suspends a specific process instance by specifying the Process Instance ID in the request. Suspending a process instance stops it temporarily until it is activated again. To activate a suspended process instance, you can use the Activate Process Instance API.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processInstances/{processInstanceId}/_suspend`,
		},
	},
});

// --- Tasks ---

export const GetTasks = meta.story({
	name: "GET /{tenantId}/tasks",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
	),
	args: {
		description: `Retrieves the details of the open/closed tasks for an Object URI based on the URI specified in the request. In addition, you can choose to view the details of the task variables and/or task local variables.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
		},
	},
});

export const PutTasks = meta.story({
	name: "PUT /{tenantId}/tasks",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
	),
	args: {
		description: `Update Tasks API can update due date,process comments, assignee or priority details of a task`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
			body: {
				filter: {},
				updates: {
					dueDate: 1730000000000,
				},
			},
		},
	},
});

export const PostTasks = meta.story({
	name: "POST /{tenantId}/tasks",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
	),
	args: {
		description: `Retrieve open tasks by filter. API retrieves the details of the tasks by using the specified filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks`,
			body: {
				filter: {
					assignee: "alice@example.com",
				},
				limit: 10,
			},
		},
	},
});

export const PostTasksValidate = meta.story({
	name: "POST /{tenantId}/tasks/_validate",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/_validate`,
	),
	args: {
		description: `Validates tasks in the background using a filter in the request`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/_validate`,
			body: {
				filter: {},
			},
		},
	},
});

export const PutTasksWithFilter = meta.story({
	name: "PUT /{tenantId}/tasks/_withFilter",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/_withFilter`,
	),
	args: {
		description: `Update tasks with the specified filter`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/_withFilter`,
			body: {
				filter: {},
				updates: {
					priority: 1,
				},
			},
		},
	},
});

export const GetTasksTaskId = meta.story({
	name: "GET /{tenantId}/tasks/{taskId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}`,
	),
	args: {
		description: `You can retrieve the details of the task based on the Task ID specified in the request. In addition, you can choose to view the details of the task variables and/or task local variables.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}`,
		},
	},
});

export const PutTasksTaskId = meta.story({
	name: "PUT /{tenantId}/tasks/{taskId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}`,
	),
	args: {
		description: `Updates different parameters of an existing task. For example: due date, assignee or priority`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}`,
			body: {
				assignee: "alice@example.com",
				priority: 50,
			},
		},
	},
});

export const PostTasksTaskIdAction = meta.story({
	name: "POST /{tenantId}/tasks/{taskId}/_action",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}/_action`,
	),
	args: {
		description: `Execute a specified action on a task`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}/_action`,
			body: {
				action: "complete",
				variables: {},
			},
		},
	},
});

export const GetTasksTaskIdValidate = meta.story({
	name: "GET /{tenantId}/tasks/{taskId}/_validate",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}/_validate`,
	),
	args: {
		description: `Validates a task specified by Task ID in the request`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/{taskId}/_validate`,
		},
	},
});

export const PostTasksAssignees = meta.story({
	name: "POST /{tenantId}/tasks/assignees",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/assignees`,
	),
	args: {
		description: `Scans the tasks and retrieves all the possible assignee values`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/assignees`,
			body: {
				filter: {},
			},
		},
	},
});

export const PostTasksCreators = meta.story({
	name: "POST /{tenantId}/tasks/creators",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/creators`,
	),
	args: {
		description: `Scans the tasks and retrieves all the possible owner values`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/creators`,
			body: {
				filter: {},
			},
		},
	},
});

export const PostTasksHistory = meta.story({
	name: "POST /{tenantId}/tasks/history",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history`,
	),
	args: {
		description: `Retrieves the details of the tasks by using the specified filters provided user has READ access objects for entities, change requests, or relations any if any of these used task filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history`,
			body: {
				filter: {},
				limit: 10,
			},
		},
	},
});

export const GetTasksHistoryTaskId = meta.story({
	name: "GET /{tenantId}/tasks/history/{taskId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history/{taskId}`,
	),
	args: {
		description: `The response contains the details of the historic task if it exists. In addition, you can also view the content of the task variables.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history/{taskId}`,
		},
	},
});

export const PostTasksHistoryVariables = meta.story({
	name: "POST /{tenantId}/tasks/history/variables",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history/variables`,
	),
	args: {
		description: `Retrieve variable names by filter for closed tasks. API retrieves names of existing variables by using the specified filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/history/variables`,
			body: {
				filter: {},
			},
		},
	},
});

export const PostTasksVariables = meta.story({
	name: "POST /{tenantId}/tasks/variables",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/variables`,
	),
	args: {
		description: `Retrieve variable names by filter. API retrieves names of existing variables by using the specified filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/tasks/variables`,
			body: {
				filter: {},
			},
		},
	},
});

// --- Group Tasks ---

export const PostGroupTasks = meta.story({
	name: "POST /{tenantId}/groupTasks",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/groupTasks`,
	),
	args: {
		description: `Retrieves the details of the group tasks. Group tasks are open tasks where the current user is a possible assignee but not the current assignee`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/groupTasks`,
			body: {
				filter: {},
				limit: 10,
			},
		},
	},
});

export const PutGroupTasksWithFilter = meta.story({
	name: "PUT /{tenantId}/groupTasks/_withFilter",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/groupTasks/_withFilter`,
	),
	args: {
		description: `Update group tasks with the specified filter. Group tasks are open tasks where the current user is a possible assignee but not the current assignee`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/groupTasks/_withFilter`,
			body: {
				filter: {},
				updates: {},
			},
		},
	},
});

// --- Jobs ---

export const GetJobs = meta.story({
	name: "GET /{tenantId}/jobs",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs`,
	),
	args: {
		description: `Retrieves the active jobs`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs`,
		},
	},
});

export const GetJobsJobId = meta.story({
	name: "GET /{tenantId}/jobs/{jobId}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/{jobId}`,
	),
	args: {
		description: `Retrieves the tenant job using ID`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/{jobId}`,
		},
	},
});

export const PostJobsActions = meta.story({
	name: "POST /{tenantId}/jobs/actions",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/actions`,
	),
	args: {
		description: `Enables to act on tasks using filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/actions`,
			body: {
				filter: {},
				action: "retry",
			},
		},
	},
});

export const PostJobsSyncBusinessProcessData = meta.story({
	name: "POST /{tenantId}/jobs/syncBusinessProcessData",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/syncBusinessProcessData`,
	),
	args: {
		description: `Synchronizes the business process data`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/syncBusinessProcessData`,
			body: {},
		},
	},
});

export const PostJobsSyncStreamingWithGBQ = meta.story({
	name: "POST /{tenantId}/jobs/syncStreamingWithGBQ",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/syncStreamingWithGBQ`,
	),
	args: {
		description: `Read the data from GBQ and stream it to the streaming hub`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/syncStreamingWithGBQ`,
			body: {},
		},
	},
});

export const PostJobsTerminateProcessInstances = meta.story({
	name: "POST /{tenantId}/jobs/terminateProcessInstances",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/terminateProcessInstances`,
	),
	args: {
		description: `Terminates process instances on the tenant using filters`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/terminateProcessInstances`,
			body: {
				filter: {},
			},
		},
	},
});

export const PostJobsUpdateTasks = meta.story({
	name: "POST /{tenantId}/jobs/updateTasks",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/updateTasks`,
	),
	args: {
		description: `Updates due date, process comments, assignee or priority details of tasks using the filter`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jobs/updateTasks`,
			body: {
				filter: {},
			},
		},
	},
});

export const PostJobsSyncActivitiCommentsWithGBQ = meta.story({
	name: "POST /jobs/syncActivitiCommentsWithGBQ",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/jobs/syncActivitiCommentsWithGBQ`,
	),
	args: {
		description: `Read all Activiti comments and stream it to GBQ`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/jobs/syncActivitiCommentsWithGBQ`,
			body: {},
		},
	},
});

// --- JAR Deployments ---

export const GetJarDeployments = meta.story({
	name: "GET /{tenantId}/jarDeployments",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments`,
	),
	args: {
		description: `Retrieves the dynamically deployed tenant JARs`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments`,
		},
	},
});

export const GetJarDeploymentsName = meta.story({
	name: "GET /{tenantId}/jarDeployments/{name}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments/{name}`,
	),
	args: {
		description: `Retrieves the specified dynamically deployed JAR`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments/{name}`,
		},
	},
});

export const DeleteJarDeploymentsName = meta.story({
	name: "DELETE /{tenantId}/jarDeployments/{name}",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments/{name}`,
	),
	args: {
		description: `Deletes the dynamically deployed tenant JAR`,
		request: {
			method: "DELETE",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/jarDeployments/{name}`,
		},
	},
});

export const PostListJars = meta.story({
	name: "POST /{tenantId}/listJars",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/listJars`,
	),
	args: {
		description: `Searches the tenant specific folder on S3 for the list of JARs that could be deployed on the tenant`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/listJars`,
			body: {},
		},
	},
});

// --- Operations ---

export const PostAssignee = meta.story({
	name: "POST /{tenantId}/assignee",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/assignee`,
	),
	args: {
		description: `Retrieves the details of possible assignees for a task`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/assignee`,
			body: {
				taskId: "task-123",
			},
		},
	},
});

export const PostAssigneeExamine = meta.story({
	name: "POST /{tenantId}/assignee/examine",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/assignee/examine`,
	),
	args: {
		description: `Verifies all the requirements of the user must meet to become an assignee of the task, clause by clause`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/assignee/examine`,
			body: {
				taskId: "task-123",
				username: "alice@example.com",
			},
		},
	},
});

export const GetOperations = meta.story({
	name: "GET /{tenantId}/operations",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/operations`,
	),
	args: {
		description: `Retrieves operations that can be done on the tenant as specified in the API request.The response includes the list of operations that can be done on the specified tenant. For example: 'VIEW_TASKS', 'VIEW_PROCESS_DEFINITIONS', 'START_JOB' and so on.`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/operations`,
		},
	},
});

export const GetProcessCount = meta.story({
	name: "GET /{tenantId}/processCount",
	...urlControls(
		`https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processCount`,
	),
	args: {
		description: `Retrieves the number of process instances`,
		request: {
			method: "GET",
			url: `https://{environment}.reltio.com/workflow-adapter/workflow/{tenantId}/processCount`,
		},
	},
});
