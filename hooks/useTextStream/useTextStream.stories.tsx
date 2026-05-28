import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { expect, waitFor } from "storybook/test";
import preview from "@/.storybook/preview";
import {
	httpErrorHandler,
	networkErrorHandler,
	rawSseHandler,
	sseHandler,
} from "@/test-utils";
import readme from "./README.md?raw";
import { useTextStream } from "./useTextStream";
import type {
	TextStreamEvent,
	UseTextStreamOptions,
} from "./useTextStream.types";

const MOCK_URL = "/api/agent-flow/stream";

const conversationId = faker.string.uuid();
const messageId = faker.string.uuid();

const msg = (delta: string): TextStreamEvent => ({
	type: "message",
	conversation_id: conversationId,
	message_id: messageId,
	delta,
});

const done = (content: string): TextStreamEvent => ({
	type: "done",
	conversation_id: conversationId,
	message_id: messageId,
	content,
	error: null,
});

const words = faker.lorem.words(20).split(" ");
const messages = words.map((word, i) => msg(i === 0 ? word : ` ${word}`));
const fullText = words.join(" ");

const stringify = (value: unknown) =>
	JSON.stringify(value, (_, v) => (v instanceof Error ? v.message : v), 2);

const UseTextStreamDemo = (props: UseTextStreamOptions) => {
	const { send, event, ...state } = useTextStream(props);
	const [log, setLog] = useState<TextStreamEvent[]>([]);

	useEffect(() => {
		setTimeout(() => {
			send({});
		}, 1000);
	}, [send]);

	useEffect(() => {
		if (event) setLog((prev) => [...prev, event]);
	}, [event]);

	return (
		<>
			<h4>State</h4>
			<pre data-testid="state">{stringify({ ...state, event })}</pre>
			<h4>Event Log</h4>
			<pre data-testid="log">{stringify(log)}</pre>
		</>
	);
};

const getState = (el: HTMLElement) =>
	JSON.parse(el.querySelector("[data-testid=state]")?.textContent ?? "{}");

const getLog = (el: HTMLElement): TextStreamEvent[] =>
	JSON.parse(el.querySelector("[data-testid=log]")?.textContent ?? "[]");

const waitForDone = (el: HTMLElement) =>
	waitFor(() => expect(getState(el).status).toBe("done"), { timeout: 5000 });

const waitForError = (el: HTMLElement) =>
	waitFor(() => expect(getState(el).status).toBe("error"), { timeout: 5000 });

const meta = preview.meta({
	component: UseTextStreamDemo,
	tags: ["test"],
	parameters: {
		// Hook stories demonstrate runtime behaviour (events, state, network),
		// not visual UI, so the dual-theme decorator adds no value here.
		dualTheme: false,
		// Hooks have no visual surface — skip Chromatic snapshots for every
		// story produced from this meta.
		chromatic: { disableSnapshot: true },
		docs: {
			description: {
				component: readme,
			},
		},
	},
	args: {
		url: MOCK_URL,
		method: "POST",
		headers: { "Content-Type": "application/json" },
	},
	argTypes: {
		url: {
			description: "Request URL. Required when no custom fetcher is provided.",
			control: "text",
		},
		fetcher: {
			description:
				"Custom fetch function for the stream request. When provided, `url` is passed through but not required.",
		},
		method: {
			description: "HTTP method (from RequestInit).",
			control: "text",
		},
		headers: {
			description: "HTTP headers (from RequestInit).",
			control: "object",
		},
	},
});

export default meta;

export const MessageStream = meta.story({
	parameters: {
		msw: {
			handlers: [sseHandler(MOCK_URL, [...messages, done(fullText)], 100)],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe(fullText);
		expect(state.error).toBeNull();
	},
});

export const ErrorInEvent = meta.story({
	parameters: {
		msw: {
			handlers: [
				sseHandler(
					MOCK_URL,
					[
						msg("Generating"),
						msg(" response"),
						msg("..."),
						{
							type: "done",
							conversation_id: conversationId,
							message_id: messageId,
							content: "",
							error: "Internal model error: context length exceeded",
						},
					],
					100,
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe("");
		expect(state.event.error).toBe(
			"Internal model error: context length exceeded",
		);
		expect(state.error).toBeNull();
	},
});

export const HttpError = meta.story({
	parameters: {
		msw: {
			handlers: [httpErrorHandler(MOCK_URL, 500)],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForError(canvasElement);
		const state = getState(canvasElement);
		expect(state.error).toBe("HTTP 500");
	},
});

export const NetworkError = meta.story({
	parameters: {
		msw: {
			handlers: [networkErrorHandler(MOCK_URL)],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForError(canvasElement);
		const state = getState(canvasElement);
		expect(state.error).toBeTruthy();
	},
});

export const StreamCutOff = meta.story({
	parameters: {
		msw: {
			handlers: [
				sseHandler(
					MOCK_URL,
					[msg("This stream"), msg(" ends"), msg(" abruptly")],
					100,
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe("This stream ends abruptly");
		expect(state.error).toBeNull();
	},
});

export const ContentMidStream = meta.story({
	parameters: {
		msw: {
			handlers: [
				sseHandler(
					MOCK_URL,
					[
						msg("Draft: "),
						msg("hello"),
						msg(" wor"),
						{ ...done("hello world — corrected by server") },
						msg(" (extra delta after content)"),
					],
					100,
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe(
			"hello world — corrected by server (extra delta after content)",
		);
	},
});

export const UnknownEventTypes = meta.story({
	parameters: {
		msw: {
			handlers: [
				sseHandler(
					MOCK_URL,
					[
						{ type: "status", status: "thinking" },
						msg("Working"),
						msg(" on it"),
						{ type: "tool_call", name: "search", args: { q: "test" } },
						msg("..."),
						done("Working on it..."),
					],
					100,
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe("Working on it...");
		const log = getLog(canvasElement);
		expect(log.some((e) => e.type === "status")).toBe(true);
		expect(log.some((e) => e.type === "tool_call")).toBe(true);
	},
});

export const MalformedSsePrefix = meta.story({
	parameters: {
		msw: {
			handlers: [
				rawSseHandler(
					MOCK_URL,
					[
						`data: ${JSON.stringify(msg("Hello"))}`,
						`event: ${JSON.stringify(msg(" skipped"))}`,
						`id: 123`,
						`retry: 5000`,
						`data: ${JSON.stringify(msg(" world"))}`,
						`data: ${JSON.stringify(done("Hello world"))}`,
					],
					100,
				),
			],
		},
	},
	play: async ({ canvasElement }) => {
		await waitForDone(canvasElement);
		const state = getState(canvasElement);
		expect(state.text).toBe("Hello world");
		const log = getLog(canvasElement);
		expect(log.some((e) => e.delta === " skipped")).toBe(false);
	},
});
