import type { ComponentProps } from "react";
import {
	buildCurl,
	Fetcher,
	type FetcherStatus,
	STATUS_TEXT,
} from "../blocks/Fetcher";
import { fakeFromOpenApi } from "./fakeFromSchema";
import type { OpenApiSpec } from "./openapi";

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

export const apiMetaConfig = ({ spec, responses }: ApiMetaOptions) => {
	const sampleData = fakeFromOpenApi(spec);

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
		if (!request) return null;
		return (
			<Fetcher
				request={{ ...request, url: resolveRequestUrl(props) }}
				accessToken={accessToken as string}
				description={description as string}
				response={response}
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

	return { sampleData, ...config };
};
