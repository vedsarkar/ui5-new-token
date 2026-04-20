import type { ComponentProps } from "react";
import { buildCurl, Fetcher } from "@/.storybook/blocks/Fetcher";
import preview from "@/.storybook/preview";
import { fakeFromSchema } from "@/.storybook/utils/fakeFromSchema";
import type { JsonSchemaNode } from "@/.storybook/utils/jsonSchema.types";
import schemaJson from "./schema.json";

const schema = schemaJson as JsonSchemaNode;

const defaultRequestBody = fakeFromSchema(schema, { omitReadOnly: true });
const defaultResponseBody = fakeFromSchema(schema);

type ConfigurationFetcherProps = Omit<ComponentProps<typeof Fetcher>, "url"> & {
	environment?: string;
	tenantId?: string;
};

const buildEndpointUrl = (
	environment: string | undefined,
	tenantId: string | undefined,
): string =>
	`https://${environment || "{environment}"}.reltio.com/reltio/api/${tenantId || "{tenantId}"}/configuration`;

const ConfigurationFetcher = ({
	environment,
	tenantId,
	...rest
}: ConfigurationFetcherProps) => (
	<Fetcher {...rest} url={buildEndpointUrl(environment, tenantId)} />
);

const meta = preview.meta({
	component: ConfigurationFetcher,
	parameters: {
		layout: "padded",
		docs: {
			source: {
				language: "bash",
				transform: (_code, ctx) => {
					const args = ctx.args as ConfigurationFetcherProps;
					const method = args.request?.method ?? "GET";
					const url = buildEndpointUrl(args.environment, args.tenantId);
					const hasBody =
						args.request?.body !== undefined && args.request?.body !== null;
					return buildCurl(method, url, hasBody);
				},
			},
		},
	},
	argTypes: {
		environment: {
			control: "text",
			description: "Reltio environment subdomain (e.g. `dev`, `prod`).",
		},
		tenantId: {
			control: "text",
			description: "Target tenant identifier.",
		},
		request: {
			control: "object",
			description:
				"Request sent to the API: `method` (HTTP verb) and optional `body` payload.",
		},
		response: {
			control: "object",
			description:
				"Response returned by the API: `status` (HTTP code) and optional `json` body.",
		},
		description: { table: { disable: true } },
	},
});

export const GetConfiguration = meta.story({
	name: "GET /configuration",
	args: {
		description: "Retrieves the full L3 configuration for the tenant.",
		request: {
			method: "GET",
		},
		response: {
			status: "200",
			json: defaultResponseBody,
		},
	},
});

export const PutConfiguration = meta.story({
	name: "PUT /configuration",
	args: {
		description:
			"Replaces the entire tenant configuration with the provided body. The request must conform to the L3 schema; server-managed fields (`createdTime`, `updatedTime`, `createdBy`, `updatedBy`) are ignored on input.",
		request: {
			method: "PUT",
			body: defaultRequestBody,
		},
		response: {
			status: "200",
			json: defaultResponseBody,
		},
	},
});
