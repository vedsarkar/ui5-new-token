import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { Skeleton } from "@/components/Skeleton";
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
	body?: unknown | Promise<unknown>;
};

export type FetcherResponse = {
	status: FetcherStatus;
	json?: unknown | Promise<unknown>;
};

type FetcherProps = {
	/** Full absolute URL of the API endpoint. */
	url?: string;
	/** Markdown-formatted description of the endpoint. */
	description?: string;
	/** Bearer token used for the `Authorization` header. Masked as `***` in the rendered curl. */
	accessToken?: string;
	/** Request sent to the API: HTTP method and optional body payload. */
	request?: FetcherRequest;
	/** Response returned by the API: HTTP status and optional JSON body. */
	response?: FetcherResponse;
};

export const STATUS_TEXT: Record<FetcherStatus, string> = {
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

export const buildCurl = (
	method: FetcherMethod,
	url: string,
	hasBody: boolean,
	accessToken?: string,
): string => {
	const tokenDisplay = accessToken ? "***" : "{accessToken}";
	const lines = [
		`curl -X ${method} \\`,
		`  "${url}" \\`,
		`  -H "Authorization: Bearer ${tokenDisplay}" \\`,
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

function useResolved(value: unknown): { resolved: unknown; loading: boolean } {
	const [state, setState] = useState<{ resolved: unknown; loading: boolean }>(
		() =>
			value instanceof Promise
				? { resolved: undefined, loading: true }
				: { resolved: value, loading: false },
	);

	useEffect(() => {
		if (!(value instanceof Promise)) {
			setState({ resolved: value, loading: false });
			return;
		}
		let cancelled = false;
		setState({ resolved: undefined, loading: true });
		value.then((result) => {
			if (!cancelled) setState({ resolved: result, loading: false });
		});
		return () => {
			cancelled = true;
		};
	}, [value]);

	return state;
}

type SendState =
	| { kind: "idle" }
	| { kind: "sending" }
	| {
			kind: "success";
			status: number;
			statusText: string;
			body: unknown;
			isJson: boolean;
	  }
	| { kind: "error"; message: string };

export const Fetcher = ({
	url = "",
	description,
	accessToken,
	request,
	response,
}: FetcherProps) => {
	const [isCurlCopied, setIsCurlCopied] = useState(false);
	const [sendState, setSendState] = useState<SendState>({ kind: "idle" });
	const { resolved: resolvedBody, loading: bodyLoading } = useResolved(
		request?.body,
	);
	const { resolved: resolvedJson, loading: jsonLoading } = useResolved(
		response?.json,
	);
	const method = request?.method ?? "GET";
	const hasRequestBody = request?.body !== undefined && request?.body !== null;
	const curl = buildCurl(method, url, hasRequestBody, accessToken);
	const hasUrlPlaceholders = url.includes("{") || url.includes("}");
	const isSending = sendState.kind === "sending";
	const sendDisabled = isSending || hasUrlPlaceholders || !url || bodyLoading;

	const copyCurl = async () => {
		await navigator.clipboard.writeText(curl);
		setIsCurlCopied(true);
		setTimeout(() => setIsCurlCopied(false), 1500);
	};

	const sendRequest = async () => {
		setSendState({ kind: "sending" });
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}
		const init: RequestInit = { method, headers };
		if (hasRequestBody) {
			init.body = JSON.stringify(resolvedBody);
		}
		try {
			const res = await fetch(url, init);
			const text = await res.text();
			let parsed: unknown = text;
			let isJson = false;
			if (text) {
				try {
					parsed = JSON.parse(text);
					isJson = true;
				} catch {
					/* keep raw text */
				}
			} else {
				parsed = undefined;
			}
			setSendState({
				kind: "success",
				status: res.status,
				statusText: res.statusText,
				body: parsed,
				isJson,
			});
		} catch (e) {
			setSendState({
				kind: "error",
				message: e instanceof Error ? e.message : "Request failed",
			});
		}
	};

	const liveResponse = sendState.kind === "success";
	const liveStatus = liveResponse ? String(sendState.status) : null;
	const liveStatusText = liveResponse
		? sendState.statusText || STATUS_TEXT[liveStatus as FetcherStatus] || ""
		: null;
	const liveBody = liveResponse ? sendState.body : undefined;
	const liveIsJson = liveResponse ? sendState.isJson : false;

	const status = (liveStatus ?? response?.status ?? "200") as FetcherStatus;
	const statusText = liveStatusText ?? STATUS_TEXT[status] ?? "";
	const json = liveResponse ? liveBody : resolvedJson;
	const isJsonLoading = !liveResponse && jsonLoading;
	const hasResponseBody = liveResponse
		? liveBody !== undefined
		: json !== undefined && json !== null;
	const isStatusSuccess = status.startsWith("2");

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
				<Markdown>{codeBlock("bash", curl)}</Markdown>
				<div className={classNames(styles.actions)}>
					<button
						type="button"
						onClick={copyCurl}
						className={classNames(
							styles.actionButton,
							isCurlCopied && styles.actionButtonSuccess,
						)}
						aria-live="polite"
					>
						{isCurlCopied ? "Copied!" : "Copy"}
					</button>
					{accessToken ? (
						<button
							type="button"
							onClick={sendRequest}
							disabled={sendDisabled}
							className={classNames(
								styles.actionButton,
								styles.actionButtonSend,
							)}
							aria-live="polite"
							title={
								hasUrlPlaceholders
									? "Fill in the URL placeholders to send the request"
									: undefined
							}
						>
							{isSending ? "Sending…" : "Send"}
						</button>
					) : (
						<p className={classNames(styles.actionHint)}>
							To send a real request, add your access token in the Controls
							panel.
						</p>
					)}
				</div>
			</section>

			<section className={classNames(styles.section)}>
				<h3 className={classNames(styles.sectionTitle)}>Response</h3>
				{isSending || isJsonLoading ? (
					<Skeleton rows={5} />
				) : sendState.kind === "error" ? (
					<p className={classNames(styles.error)}>
						Request failed: {sendState.message}
					</p>
				) : (
					<>
						<div className={classNames(styles.statusRow)}>
							<span
								className={classNames(
									styles.status,
									isStatusSuccess ? styles.statusSuccess : styles.statusError,
								)}
							>
								{status}
							</span>
							<span className={classNames(styles.statusText)}>
								{statusText}
							</span>
							{liveResponse ? (
								<span
									className={classNames(styles.badge, styles.badgeLive)}
									title="Real response from the upstream API"
								>
									Live
								</span>
							) : (
								<span
									className={classNames(styles.badge, styles.badgeMock)}
									title="Mocked response defined in the story"
								>
									Mock
								</span>
							)}
						</div>
						{hasResponseBody ? (
							<Markdown>
								{codeBlock(
									liveResponse && !liveIsJson ? "text" : "json",
									liveResponse && !liveIsJson
										? String(json ?? "")
										: formatJson(json),
								)}
							</Markdown>
						) : (
							<p className={classNames(styles.empty)}>No response body.</p>
						)}
					</>
				)}
			</section>
		</div>
	);
};
