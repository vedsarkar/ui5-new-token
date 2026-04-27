import type { ComponentProps } from "react";
import {
	buildCurl,
	Fetcher,
	type FetcherMethod,
	type FetcherStatus,
	STATUS_TEXT,
} from "../blocks/Fetcher";
import { fakeFromOpenApi, fakeFromSchema } from "./fakeFromSchema";
import type { OpenApiSpec } from "./openapi";

type ApiFetcherProps = Omit<ComponentProps<typeof Fetcher>, "url"> & {
	environment?: string;
	tenantId?: string;
};

type ApiMetaOptions = {
	/**
	 * Full endpoint URL template. May contain `{environment}` and `{tenantId}`
	 * placeholders that get substituted from story args at runtime
	 * (e.g. `"https://{environment}.reltio.com/reltio/api/{tenantId}/configuration"`).
	 */
	url: string;
	/** @deprecated Use `spec` instead. URL to the JSON Schema for generating fake response data. */
	schema?: string;
	/** Imported OpenAPI 3.1 spec object. */
	spec?: OpenApiSpec;
	/** Path within the spec used to extract the response schema for fake data (e.g. "/configuration"). */
	defaultPath?: string;
	/** Override or add demo responses. Key: status code, value: JSON body. */
	responses?: Record<string, unknown>;
};

type ApiStoryOptions = {
	/** Display name in Storybook (e.g. "GET /configuration") */
	name: string;
	/** HTTP method */
	method: FetcherMethod;
	/** Markdown description of the endpoint */
	description: string;
	/** Request body. Pass a value or Promise to include it in the request. */
	body?: unknown;
};

const buildEndpointUrl = (
	template: string,
	environment?: string,
	tenantId?: string,
): string =>
	template
		.replaceAll("{environment}", environment || "{environment}")
		.replaceAll("{tenantId}", tenantId || "{tenantId}");

export const apiMetaConfig = ({
	url,
	schema,
	spec,
	defaultPath,
	responses,
}: ApiMetaOptions) => {
	const sampleData = spec
		? fakeFromOpenApi(spec, { path: defaultPath })
		: schema
			? fakeFromSchema(schema)
			: {};

	const defaultResponses: Record<string, unknown> = {
		"200": sampleData,
		"400": { error: "Bad Request", message: "The request is invalid." },
		"401": { error: "Unauthorized", message: "The request is unauthorized." },
		"403": { error: "Forbidden", message: "The request is forbidden." },
	};

	const allResponses = { ...defaultResponses, ...responses };

	const responseMapping: Record<string, { status: string; json: unknown }> = {};
	for (const [status, json] of Object.entries(allResponses)) {
		const statusText = STATUS_TEXT[status as FetcherStatus] ?? "";
		const label = statusText ? `${status} ${statusText}` : status;
		responseMapping[label] = { status, json };
	}

	const responseOptions = Object.keys(responseMapping);

	const ApiFetcher = ({ environment, tenantId, ...rest }: ApiFetcherProps) => (
		<Fetcher {...rest} url={buildEndpointUrl(url, environment, tenantId)} />
	);

	const config = {
		component: ApiFetcher,
		parameters: {
			layout: "padded",
			docs: {
				source: {
					language: "bash",
					transform: (_code: string, ctx: { args: ApiFetcherProps }) => {
						const args = ctx.args;
						const method = args.request?.method ?? "GET";
						const endpointUrl = buildEndpointUrl(
							url,
							args.environment,
							args.tenantId,
						);
						const hasBody =
							args.request?.body !== undefined && args.request?.body !== null;
						return buildCurl(method, endpointUrl, hasBody, args.accessToken);
					},
				},
			},
		},
		argTypes: {
			environment: { control: "text" },
			tenantId: { control: "text" },
			accessToken: { control: "text" },
			request: { control: "object" },
			description: { table: { disable: true } },
			response: {
				control: "select",
				options: responseOptions,
				defaultValue: responseOptions[0],
				mapping: responseMapping,
			},
		},
		// biome-ignore lint/suspicious/noExplicitAny: Storybook `mapping` argType maps this string label to FetcherResponse at runtime
		args: { response: responseOptions[0] } as any,
	} as const;

	return { sampleData, ...config };
};
