import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./LifeCycleActions.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const actionsUrl = `${base}/actions`;
const namedUrl = `${actionsUrl}/{name}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Life Cycle Actions",
});

export default meta;

export const GetActions = meta.story({
	name: "GET /actions",
	...urlControls(actionsUrl),
	args: {
		description:
			"Retrieves the list of all registered Life Cycle Actions (LCAs) for the tenant.",
		request: {
			method: "GET",
			url: actionsUrl,
		},
	},
});

export const RegisterActions = meta.story({
	name: "POST /actions",
	...urlControls(actionsUrl),
	args: {
		description:
			"Registers Life Cycle Actions (LCAs) for the tenant. JAR file must be placed in S3 storage.",
		request: {
			method: "POST",
			url: actionsUrl,
			body: [
				{
					name: "EntityScoreCalculator",
					type: "com.reltio.lca.score.EntityScoreCalculatorAction",
					module: "life-cycle-actions/dev/tenantId/score-calc.jar",
					state: "active",
					description:
						"Calculates score for profiles based on attribute values.",
				},
			],
		},
	},
});

export const GetAction = meta.story({
	name: "GET /actions/{name}",
	...urlControls(namedUrl),
	args: {
		description: "Gets details for the named Life Cycle Action (LCA) object.",
		request: {
			method: "GET",
			url: namedUrl,
		},
	},
});

export const DeleteAction = meta.story({
	name: "DELETE /actions/{name}",
	...urlControls(namedUrl),
	args: {
		description: "Deregisters the specified Life Cycle Action.",
		request: {
			method: "DELETE",
			url: namedUrl,
		},
	},
});

const executeUrl = `${namedUrl}/{hookName}`;

export const ExecuteAction = meta.story({
	name: "POST /actions/{name}/{hookName}",
	...urlControls(executeUrl),
	args: {
		description:
			"Executes a specified Life Cycle Action (LCA) at the given hook for a single object.",
		request: {
			method: "POST",
			url: executeUrl,
			body: {},
		},
	},
});

const batchUrl = `${base}/execute/{hook}`;

export const ExecuteBatch = meta.story({
	name: "POST /execute/{hook}",
	...urlControls(batchUrl),
	args: {
		description:
			"Executes Life Cycle Actions (LCAs) at the specified hook for a list of objects.",
		request: {
			method: "POST",
			url: batchUrl,
			body: [],
		},
	},
});
