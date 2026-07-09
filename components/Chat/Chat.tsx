import { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
import { Icon } from "@ui5/webcomponents-react/Icon";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "@/components/Skeleton";
import navigationDownArrowIcon from "@/icons/sap/navigation-down-arrow";
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

/** Scrollable conversation surface that renders an ordered list of user / assistant messages with auto-scroll and thinking-state UI. */
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
						<div className={classNames(styles.lastMessageWrapper)}>
							{lastMessages.map((msg, i) => (
								<ChatMessage
									key={msg.messageId ?? `${i}-${msg.role}`}
									message={msg}
								/>
							))}
							{thinking && <BusyIndicator active delay={0} />}
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
					<Icon name={navigationDownArrowIcon} />
				</button>
			)}
		</div>
	);
};
