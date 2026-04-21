import type { ComponentProps } from "react";
import { buildCurl, Fetcher } from "@/.storybook/blocks/Fetcher";
import preview from "@/.storybook/preview";
import sampleJson from "./Metadata.sample.json";

const defaultRequestBody = sampleJson;
const responseBody_200 = sampleJson;
const responseBody_400 = {
	error: "Bad Request",
	message: "The request is invalid.",
};
const responseBody_401 = {
	error: "Unauthorized",
	message: "The request is unauthorized.",
};
const responseBody_403 = {
	error: "Forbidden",
	message: "The request is forbidden.",
};

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
					return buildCurl(method, url, hasBody, args.accessToken);
				},
			},
		},
	},
	argTypes: {
		environment: {
			control: "text",
		},
		tenantId: {
			control: "text",
		},
		accessToken: {
			control: "text",
		},
		request: {
			control: "object",
		},
		description: {
			table: { disable: true },
		},
		response: {
			control: "select",
			options: [
				"200 OK",
				"400 Bad Request",
				"401 Unauthorized",
				"403 Forbidden",
			],
			defaultValue: "200 OK",
			mapping: {
				"200 OK": {
					status: "200",
					json: responseBody_200,
				},
				"400 Bad Request": {
					status: "400",
					json: responseBody_400,
				},
				"401 Unauthorized": {
					status: "401",
					json: responseBody_401,
				},
				"403 Forbidden": {
					status: "403",
					json: responseBody_403,
				},
			},
		},
	},
	args: {
		response: "200 OK",
	},
});

export const GetConfiguration = meta.story({
	name: "GET /configuration",
	args: {
		description: "Retrieves the full L3 configuration for the tenant.",
		request: {
			method: "GET",
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
	},
});
