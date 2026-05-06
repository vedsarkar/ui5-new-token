import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./Crosswalks.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Crosswalks",
});

export default meta;

export const PostObjectTypeObjectIdCrosswalks = meta.story({
	name: "POST /{objectType}/{objectId}/crosswalks",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks`,
	),
	args: {
		description: `This API adds one or more crosswalks to an object. The request must contain the Object URI and the crosswalk details.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks`,
			body: [
				{
					type: "configuration/sources/Reltio",
					value: "external-id-1",
					sourceTable: "Customers",
				},
			],
		},
	},
});

export const PutObjectTypeObjectIdCrosswalksId = meta.story({
	name: "PUT /{objectType}/{objectId}/crosswalks/{id}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks/{id}`,
	),
	args: {
		description: `As a response, you will get an updated business object`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks/{id}`,
			body: {
				type: "configuration/sources/Reltio",
				value: "external-id-1",
				sourceTable: "Customers",
			},
		},
	},
});

export const PutObjectIdCrosswalksIdAttribute = meta.story({
	name: "PUT /{objectType}/{objectId}/crosswalks/{id}/{attribute}",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks/{id}/{attribute}`,
	),
	args: {
		description: `The attribute's value can be related to the Create Date, Update Date, and Delete Date.`,
		request: {
			method: "PUT",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/{objectType}/{objectId}/crosswalks/{id}/{attribute}`,
			body: {
				type: "configuration/sources/Reltio",
				value: "external-id-1",
				sourceTable: "Customers",
			},
		},
	},
});

export const PostObjectIdCrosswalksIdEndDateAndMoveRelatedRelationXws =
	meta.story({
		name: "POST /entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws",
		...urlControls(
			`https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws`,
		),
		args: {
			description: `The attribute's value can be related to the Delete Date.`,
			request: {
				method: "POST",
				url: `https://{environment}.reltio.com/reltio/api/{tenantId}/entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws`,
				body: {
					newContributor: "configuration/sources/CRM",
					deleteDate: "2026-01-01",
				},
			},
		},
	});
