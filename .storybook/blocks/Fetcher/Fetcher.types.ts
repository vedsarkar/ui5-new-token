import type { SchemaNode } from "../../utils/openapi";

export type FetcherMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FetcherStatus =
	| "200"
	| "201"
	| "204"
	| "400"
	| "401"
	| "403"
	| "404"
	| "409"
	| "500";

export type FetcherRequest = {
	method: FetcherMethod;
	/** Full absolute URL of the API endpoint, with all template variables already resolved. */
	url: string;
	body?: unknown | Promise<unknown>;
};

export type FetcherResponse = {
	status: FetcherStatus;
	json?: unknown | Promise<unknown>;
	/** Resolved JSON schema describing the shape of `json`. When present, response keys show description/type on hover. */
	schema?: SchemaNode;
};

export type FetcherProps = {
	/** Markdown-formatted description of the endpoint. */
	description?: string;
	/** Bearer token used for the `Authorization` header. Masked as `***` in the rendered curl. */
	accessToken?: string;
	/** Request sent to the API: HTTP method, URL and optional body payload. */
	request?: FetcherRequest;
	/** Mock response shown until a real request is sent. */
	response?: FetcherResponse;
};
