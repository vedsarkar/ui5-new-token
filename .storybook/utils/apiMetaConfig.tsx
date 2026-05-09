import { type ComponentProps, useMemo } from "react";
import {
	buildCurl,
	Fetcher,
	type FetcherResponse,
	type FetcherStatus,
	STATUS_TEXT,
} from "../blocks/Fetcher";
import { fakeFromOpenApi } from "./fakeFromSchema";
import { getResponseSchema, type OpenApiSpec, resolveSchema } from "./openapi";

type ApiFetcherProps = ComponentProps<typeof Fetcher> & {
	[key: string]: unknown;
};

type ApiMetaOptions = {
	/** Imported OpenAPI 3.1 spec object. */
	spec: OpenApiSpec;
	/** Override or add mock response bodies. Keys are HTTP status codes (e.g. `"200"`, `"404"`). */
	responses?: Record<string, unknown>;
};

const extractUrlVariables = (template: string): string[] => {
	const matches = template.matchAll(/\{(\w+)\}/g);
	return [...new Set([...matches].map((m) => m[1]))];
};

const buildEndpointUrl = (
	template: string,
	variables: Record<string, string | undefined>,
): string => {
	let result = template;
	for (const [key, value] of Object.entries(variables)) {
		result = result.replaceAll(`{${key}}`, value || `{${key}}`);
	}
	return result;
};

/**
 * Maps a story's full URL template (e.g. `https://{environment}.reltio.com/reltio/api/{tenantId}/configuration`)
 * to an OpenAPI path key from `spec.paths` (e.g. `/api/{tenantId}/configuration`)
 * by longest-suffix match. The URL's query string and fragment are stripped
 * before matching so endpoints with `?queryParam={Value}` placeholders still
 * resolve to their bare spec path. Returns `null` when no path matches.
 */
const findSpecPath = (
	spec: OpenApiSpec,
	urlTemplate: string,
): string | null => {
	const pathOnly = urlTemplate.split(/[?#]/, 1)[0];
	const keys = Object.keys(spec.paths ?? {});
	let best: string | null = null;
	for (const key of keys) {
		if (pathOnly.endsWith(key) && (!best || key.length > best.length)) {
			best = key;
		}
	}
	return best;
};

export const apiMetaConfig = ({ spec, responses }: ApiMetaOptions) => {
	// Default sample is generated from the first schema in `components.schemas`
	// and only used as a fallback for stories whose URL template does not match
	// any spec path. Stories whose path resolves to a real schema get a fresh
	// fake body generated per-render in `ApiFetcher`, matching the actual schema.
	const fallbackSample = fakeFromOpenApi(spec);

	const userOverriddenStatuses = new Set(Object.keys(responses ?? {}));

	const defaultResponses: Record<string, unknown> = {
		"200": fallbackSample,
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

	const resolveRequestUrl = (args: ApiFetcherProps): string => {
		const template = args.request?.url ?? "";
		const vars: Record<string, string | undefined> = {};
		for (const key of extractUrlVariables(template)) {
			vars[key] = args[key] as string | undefined;
		}
		return buildEndpointUrl(template, vars);
	};

	const ApiFetcher = (props: ApiFetcherProps) => {
		const { request, accessToken, description, response } = props;
		const responseStatus = response?.status;
		const requestMethod = request?.method;
		const requestUrlTemplate = request?.url;

		const enrichedResponse = useMemo<FetcherResponse | undefined>(() => {
			if (!response || !requestUrlTemplate || !requestMethod) return response;
			const specPath = findSpecPath(spec, requestUrlTemplate);
			if (!specPath) return response;
			const raw = getResponseSchema(
				spec,
				specPath,
				requestMethod,
				responseStatus,
			);
			if (!raw) return response;

			// Schema for hover descriptions (skip if the caller already supplied one)
			const schema = response.schema ?? resolveSchema(spec, raw);

			// Per-story fake body matching this endpoint's actual schema.
			// Skip when the caller explicitly overrode the response body for
			// this status via the `responses` option.
			const json =
				responseStatus && !userOverriddenStatuses.has(responseStatus)
					? fakeFromOpenApi(spec, {
							path: specPath,
							method: requestMethod,
							statusCode: responseStatus,
						})
					: response.json;

			return { ...response, schema, json };
		}, [response, requestUrlTemplate, requestMethod, responseStatus, spec]);

		if (!request) return null;
		return (
			<Fetcher
				request={{ ...request, url: resolveRequestUrl(props) }}
				accessToken={accessToken as string}
				description={description as string}
				response={enrichedResponse}
			/>
		);
	};

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
						const endpointUrl = resolveRequestUrl(args);
						const hasBody =
							args.request?.body !== undefined && args.request?.body !== null;
						return buildCurl(
							method,
							endpointUrl,
							hasBody,
							args.accessToken as string,
						);
					},
				},
			},
		},
		argTypes: {
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

	return config;
};
