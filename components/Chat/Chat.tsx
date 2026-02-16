import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AssistantLoader } from "@/components/AssistantLoader";
import { Skeleton } from "@/components/Skeleton";
import { KeyboardArrowDown } from "@/icons/KeyboardArrowDown";
import { classNames } from "@/utils/classNames";
import styles from "./Chat.module.css";
import type { ChatProps, Message } from "./Chat.types";
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";

const SCROLL_THRESHOLD = 100;

const isUserMessage = (m: Message) => m.role === "user";

const isAssistantMessage = (m: Message) => m.role === "assistant";

const ChatMessage = memo(({ message }: { message: Message }) => {
	if (isUserMessage(message)) {
		return (
			<UserMessage className={styles.userMessage}>
				{message.content}
			</UserMessage>
		);
	}
	if (isAssistantMessage(message)) {
		return <AssistantMessage>{message.content}</AssistantMessage>;
	}
	return <>{message.content ?? null}</>;
});

const isScrolledToBottom = (el: HTMLElement) =>
	el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD;

/**
 * Scrollable chat window that renders a conversation between a user and an AI assistant.
 *
 * **Loading behavior (`initialLoading → false`):**
 * The last user message is pinned to the top edge of the visible chat area;
 * all subsequent assistant messages are displayed below it.
 *
 * **Thinking behavior (`thinking → true`):**
 * The chat automatically scrolls to the last user message and shows
 * a loader (AssistantLoader) directly beneath it, indicating the assistant
 * is generating a response.
 */
export const Chat = ({
	messages,
	thinking = false,
	initialLoading = false,
	className,
	...rest
}: ChatProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showScrollButton, setShowScrollButton] = useState(false);

	const handleScroll = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;
		setShowScrollButton(!isScrolledToBottom(el));
	}, []);

	const scrollToBottom = useCallback(
		(behavior: "smooth" | "instant" = "smooth") => {
			const el = containerRef.current;
			if (!el) return;
			el.scrollTo({ top: el.scrollHeight, behavior });
		},
		[],
	);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		scrollToBottom("instant");
		setShowScrollButton(!isScrolledToBottom(el));
	}, [scrollToBottom]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		if (thinking) {
			scrollToBottom("smooth");
		}
	}, [thinking, scrollToBottom]);

	const [topMessages, lastMessages] = useMemo(() => {
		if (messages.length <= 2) return [messages, []];
		const lastUserMessageIndex = messages.findLastIndex(isUserMessage);
		return [
			messages.slice(0, lastUserMessageIndex),
			messages.slice(lastUserMessageIndex),
		];
	}, [messages]);

	return (
		<div
			ref={containerRef}
			className={classNames(styles.root, className)}
			role="log"
			aria-live="polite"
			aria-label="Chat messages"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard-focusable (WCAG 2.1.1)
			tabIndex={0}
			{...rest}
		>
			{initialLoading ? (
				<Skeleton rows={5} />
			) : (
				<>
					{topMessages.map((msg, i) => (
						<ChatMessage
							key={msg.messageId ?? `${i}-${msg.role}`}
							message={msg}
						/>
					))}
					{lastMessages.length > 0 && (
						<div className={styles.lastMessageWrapper}>
							{lastMessages.map((msg, i) => (
								<ChatMessage
									key={msg.messageId ?? `${i}-${msg.role}`}
									message={msg}
								/>
							))}
							{thinking && <AssistantLoader />}
						</div>
					)}
				</>
			)}
			{showScrollButton && (
				<button
					type="button"
					className={classNames(styles.scrollToBottom)}
					onClick={() => scrollToBottom("smooth")}
					aria-label="Scroll to bottom"
				>
					<KeyboardArrowDown size="small" />
				</button>
			)}
		</div>
	);
};
