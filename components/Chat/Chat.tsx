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
		return (
			<AssistantMessage className={styles.assistantMessage}>
				{message.content}
			</AssistantMessage>
		);
	}
	return message.content ?? null;
});

const isScrolledToBottom = (el: HTMLElement) =>
	el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD;

export const Chat = ({
	messages,
	thinking = false,
	initialLoading = false,
	className,
	style,
	...rest
}: ChatProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [showScrollButton, setShowScrollButton] = useState(false);

	const handleScroll = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;
		setShowScrollButton(!isScrolledToBottom(el));
	}, []);

	const scrollToBottom = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;
		el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: re-check scroll position when content changes
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		scrollToBottom();
		setShowScrollButton(!isScrolledToBottom(el));
	}, [thinking]);

	const [topMessages, lastMessage] = useMemo(() => {
		return [messages.slice(0, -1), messages.slice(-1)[0]];
	}, [messages]);

	return (
		<div
			ref={containerRef}
			className={classNames(styles.root, className)}
			style={style}
			role="log"
			aria-live="polite"
			aria-label="Chat messages"
			{...rest}
		>
			{initialLoading ? (
				<>
					<div className={styles.userMessageSkeletonWrapper}>
						<Skeleton
							rows={1}
							style={{ "--reltio-skeleton-row-height": "45px" }}
						/>
					</div>
					<Skeleton rows={4} />
				</>
			) : (
				<>
					{topMessages.map((msg, i) => (
						<ChatMessage
							key={msg.messageId ?? `${i}-${msg.role}`}
							message={msg}
						/>
					))}
					<div className={styles.lastMessageWrapper}>
						<ChatMessage message={lastMessage} />
						{thinking && <AssistantLoader />}
					</div>
				</>
			)}
			{showScrollButton && (
				<button
					type="button"
					className={classNames(styles.scrollToBottom)}
					onClick={scrollToBottom}
					aria-label="Scroll to bottom"
				>
					<KeyboardArrowDown size="small" />
				</button>
			)}
		</div>
	);
};
