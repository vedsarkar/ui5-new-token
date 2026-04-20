import { Markdown } from "@/components/Markdown";
import { classNames } from "@/utils/classNames";
import styles from "./Fetcher.module.css";

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
	body?: unknown;
};

export type FetcherResponse = {
	status: FetcherStatus;
	json?: unknown;
};

type FetcherProps = {
	/** Full absolute URL of the API endpoint. */
	url?: string;
	/** Markdown-formatted description of the endpoint. */
	description?: string;
	/** Request sent to the API: HTTP method and optional body payload. */
	request?: FetcherRequest;
	/** Response returned by the API: HTTP status and optional JSON body. */
	response?: FetcherResponse;
};

const STATUS_TEXT: Record<FetcherStatus, string> = {
	"200": "OK",
	"201": "Created",
	"204": "No Content",
	"400": "Bad Request",
	"401": "Unauthorized",
	"403": "Forbidden",
	"404": "Not Found",
	"409": "Conflict",
	"500": "Internal Server Error",
};

const isSuccess = (status: FetcherStatus): boolean => status.startsWith("2");

export const buildCurl = (
	method: FetcherMethod,
	url: string,
	hasBody: boolean,
): string => {
	const lines = [
		`curl -X ${method} \\`,
		`  "${url}" \\`,
		`  -H "Authorization: Bearer {accessToken}" \\`,
		'  -H "Content-Type: application/json"',
	];
	if (hasBody) {
		lines[lines.length - 1] += " \\";
		lines.push("  -d @configuration.json");
	}
	return lines.join("\n");
};

const formatJson = (value: unknown): string => JSON.stringify(value, null, 2);

const codeBlock = (lang: string, body: string): string =>
	`\`\`\`${lang}\n${body}\n\`\`\``;

export const Fetcher = ({
	url = "",
	description,
	request,
	response,
}: FetcherProps) => {
	const method = request?.method ?? "GET";
	const body = request?.body;
	const hasRequestBody = body !== undefined && body !== null;
	const status = response?.status ?? "200";
	const json = response?.json;
	const hasResponseBody = json !== undefined && json !== null;

	return (
		<div className={classNames(styles.root)}>
			<header className={classNames(styles.header)}>
				<span className={classNames(styles.method, styles[`method_${method}`])}>
					{method}
				</span>
				<code className={classNames(styles.path)}>{url}</code>
			</header>

			{description && (
				<div className={classNames(styles.description)}>
					<Markdown>{description}</Markdown>
				</div>
			)}

			<section className={classNames(styles.section)}>
				<h3 className={classNames(styles.sectionTitle)}>Request</h3>
				<Markdown>
					{codeBlock("bash", buildCurl(method, url, hasRequestBody))}
				</Markdown>
			</section>

			<section className={classNames(styles.section)}>
				<h3 className={classNames(styles.sectionTitle)}>Response</h3>
				<div className={classNames(styles.statusRow)}>
					<span
						className={classNames(
							styles.status,
							isSuccess(status) ? styles.statusSuccess : styles.statusError,
						)}
					>
						{status}
					</span>
					<span className={classNames(styles.statusText)}>
						{STATUS_TEXT[status]}
					</span>
				</div>
				{hasResponseBody ? (
					<Markdown>{codeBlock("json", formatJson(json))}</Markdown>
				) : (
					<p className={classNames(styles.empty)}>No response body.</p>
				)}
			</section>
		</div>
	);
};
