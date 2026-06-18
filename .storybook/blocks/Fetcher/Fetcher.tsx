import "@ui5/webcomponents-icons/dist/copy.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import { Button } from "@ui5/webcomponents-react/Button";
import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { Skeleton } from "@/components/Skeleton";
import { classNames } from "@/utils/classNames";
import { JsonTree } from "../JsonTree";
import styles from "./Fetcher.module.css";
import type {
	FetcherMethod,
	FetcherProps,
	FetcherStatus,
} from "./Fetcher.types";

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

const URL_PLACEHOLDER_RE = /\{[^}]+\}/;

const formatJson = (value: unknown): string => JSON.stringify(value, null, 2);

const codeBlock = (lang: string, body: string): string =>
	`\`\`\`${lang}\n${body}\n\`\`\``;

const statusVariant = (
	status: FetcherStatus,
): "success" | "warning" | "error" | "neutral" => {
	if (status.startsWith("2")) return "success";
	if (status.startsWith("4")) return "warning";
	if (status.startsWith("5")) return "error";
	return "neutral";
};

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
	description,
	accessToken,
	request,
	response,
}: FetcherProps) => {
	const { method = "GET", url = "", body } = request ?? {};
	const [isCurlCopied, setIsCurlCopied] = useState(false);
	const [sendState, setSendState] = useState<SendState>({ kind: "idle" });
	const { resolved: resolvedBody, loading: bodyLoading } = useResolved(body);
	const { resolved: resolvedJson, loading: jsonLoading } = useResolved(
		response?.json,
	);
	const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const hasRequestBody = body !== undefined && body !== null;
	const hasUrlPlaceholders = URL_PLACEHOLDER_RE.test(url);
	const curl = buildCurl(method, url, hasRequestBody, accessToken);
	const isSending = sendState.kind === "sending";
	const sendDisabled = isSending || hasUrlPlaceholders || !url || bodyLoading;

	useEffect(
		() => () => {
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		},
		[],
	);

	// Reset to mock whenever the user picks a different response in Storybook controls.
	// biome-ignore lint/correctness/useExhaustiveDependencies: effect intentionally re-runs only on `response` reference change.
	useEffect(() => {
		setSendState({ kind: "idle" });
	}, [response]);

	const copyCurl = async () => {
		await navigator.clipboard.writeText(curl);
		setIsCurlCopied(true);
		if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		copyTimerRef.current = setTimeout(() => setIsCurlCopied(false), 1500);
	};

	const sendRequest = async () => {
		setSendState({ kind: "sending" });
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			"x-target-url": url,
		};
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}
		const init: RequestInit = { method, headers };
		if (hasRequestBody) {
			init.body = JSON.stringify(resolvedBody);
		}
		try {
			const res = await fetch("/api/proxy", init);
			const text = await res.text();
			let parsed: unknown = text || undefined;
			let isJson = false;
			if (text) {
				try {
					parsed = JSON.parse(text);
					isJson = true;
				} catch {
					/* keep raw text */
				}
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

	const live = sendState.kind === "success" ? sendState : null;
	const status = (
		live ? String(live.status) : (response?.status ?? "200")
	) as FetcherStatus;
	const statusText = live
		? live.statusText || STATUS_TEXT[status] || ""
		: (STATUS_TEXT[status] ?? "");
	const responseBody = live ? live.body : resolvedJson;
	const useRawText = !!live && !live.isJson;
	const hasResponseBody = live
		? live.body !== undefined
		: responseBody !== undefined && responseBody !== null;
	const isResponseLoading = isSending || (!live && jsonLoading);

	return (
		<div className={classNames(styles.root)}>
			<header className={classNames(styles.header)}>
				<span className={classNames(styles.badge, styles[`method_${method}`])}>
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
					<Button
						design={isCurlCopied ? "Positive" : "Default"}
						icon={isCurlCopied ? "accept" : "copy"}
						onClick={copyCurl}
						accessibleName={isCurlCopied ? "Copied" : "Copy curl command"}
					>
						{isCurlCopied ? "Copied!" : "Copy"}
					</Button>
					{accessToken ? (
						<Button
							design="Emphasized"
							onClick={sendRequest}
							disabled={sendDisabled}
							loading={isSending}
							tooltip={
								hasUrlPlaceholders
									? "Fill in the URL placeholders to send the request"
									: undefined
							}
						>
							Send
						</Button>
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
				{isResponseLoading ? (
					<Skeleton rows={5} />
				) : sendState.kind === "error" ? (
					<MessageStrip design="Negative" hideCloseButton>
						Request failed: {sendState.message}
					</MessageStrip>
				) : (
					<>
						<div className={classNames(styles.statusRow)}>
							<span
								className={classNames(
									styles.badge,
									styles[`status_${statusVariant(status)}`],
								)}
							>
								{status}
								{statusText ? ` ${statusText}` : ""}
							</span>
							{live ? (
								<span
									className={classNames(styles.badge, styles.kind_live)}
									title="Real response from the upstream API"
								>
									Live
								</span>
							) : (
								<span
									className={classNames(styles.badge, styles.kind_mock)}
									title="Mocked response defined in the story"
								>
									Mock
								</span>
							)}
						</div>
						{hasResponseBody ? (
							useRawText ? (
								<Markdown>
									{codeBlock("text", String(responseBody ?? ""))}
								</Markdown>
							) : response?.schema ? (
								<JsonTree value={responseBody} schema={response.schema} />
							) : (
								<Markdown>
									{codeBlock("json", formatJson(responseBody))}
								</Markdown>
							)
						) : (
							<p className={classNames(styles.empty)}>No response body.</p>
						)}
					</>
				)}
			</section>
		</div>
	);
};
