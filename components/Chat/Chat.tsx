import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AssistantLoader } from "@/components/AssistantLoader";
import { AssistantMessage } from "@/components/AssistantMessage";
import { Skeleton } from "@/components/Skeleton";
import { UserMessage } from "@/components/UserMessage";
import { classNames } from "@/utils/classNames";
import styles from "./Chat.module.css";
import type { ChatProps, Message } from "./Chat.types";

const NEAR_BOTTOM_THRESHOLD = 80;
const ITEM_HEIGHT = 80;

const isUserMessage = (m: Message) => m.role === "user";

const isAssistantMessage = (m: Message) => m.role === "assistant";

const ChatMessageRow = memo(({ message }: { message: Message }) => {
	if (isUserMessage(message)) {
		return <UserMessage>{message.content}</UserMessage>;
	}
	if (isAssistantMessage(message)) {
		return <AssistantMessage>{message.content}</AssistantMessage>;
	}
	return message.content ?? null;
});

const lastMessageIsFromUser = (messages: Message[]): boolean => {
	if (messages.length === 0) return false;
	const last = messages[messages.length - 1];
	return isUserMessage(last);
};

export const Chat = ({
	messages,
	initialLoading = false,
	autoScroll = true,
	className,
	style,
	...rest
}: ChatProps) => {
	const waitingForAssistant = lastMessageIsFromUser(messages);
	const listWrapperRef = useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [wrapperHeight, setWrapperHeight] = useState(0);
	const isNearBottomRef = useRef(true);

	const totalCount = messages.length;
	const bufferCount = 3;

	const {
		startIndex,
		endIndex,
		totalHeight,
		topSpacerHeight,
		bottomSpacerHeight,
	} = useMemo(() => {
		if (totalCount === 0 || wrapperHeight <= 0) {
			return {
				startIndex: 0,
				endIndex: Math.max(0, totalCount - 1),
				totalHeight: totalCount * ITEM_HEIGHT,
				topSpacerHeight: 0,
				bottomSpacerHeight: 0,
			};
		}
		const visibleCount =
			Math.ceil(wrapperHeight / ITEM_HEIGHT) + 2 * bufferCount;
		const start = Math.max(
			0,
			Math.floor(scrollTop / ITEM_HEIGHT) - bufferCount,
		);
		const end = Math.min(totalCount - 1, start + visibleCount - 1);
		const top = start * ITEM_HEIGHT;
		const bottom = (totalCount - 1 - end) * ITEM_HEIGHT;
		return {
			startIndex: start,
			endIndex: end,
			totalHeight: totalCount * ITEM_HEIGHT,
			topSpacerHeight: top,
			bottomSpacerHeight: bottom,
		};
	}, [totalCount, wrapperHeight, scrollTop]);

	const handleScroll = useCallback(() => {
		const el = listWrapperRef.current;
		if (!el) return;
		setScrollTop(el.scrollTop);
		const nearBottom =
			el.scrollHeight - el.scrollTop - el.clientHeight <= NEAR_BOTTOM_THRESHOLD;
		isNearBottomRef.current = nearBottom;
	}, []);

	const resizeObserver = useMemo(
		() =>
			typeof ResizeObserver !== "undefined"
				? new ResizeObserver((entries) => {
						for (const entry of entries) {
							const height = entry.contentRect?.height ?? 0;
							setWrapperHeight(height);
						}
					})
				: null,
		[],
	);

	useEffect(() => {
		const el = listWrapperRef.current;
		if (!el || !resizeObserver) return;
		resizeObserver.observe(el);
		setWrapperHeight(el.clientHeight);
		return () => resizeObserver.disconnect();
	}, [resizeObserver]);

	// Scroll to bottom when new messages or waiting state change and user is near bottom
	// biome-ignore lint/correctness/useExhaustiveDependencies: messages and waitingForAssistant are derived from props; we must run when they change to auto-scroll
	useEffect(() => {
		const el = listWrapperRef.current;
		if (!el || !autoScroll || !isNearBottomRef.current) return;
		el.scrollTop = el.scrollHeight - el.clientHeight;
	}, [messages, waitingForAssistant, autoScroll]);

	const visibleMessages = useMemo(() => {
		if (totalCount === 0) return messages;
		return messages.slice(startIndex, endIndex + 1);
	}, [messages, totalCount, startIndex, endIndex]);

	const renderListContent = () => {
		if (totalCount > 0) {
			return (
				<>
					{topSpacerHeight > 0 && (
						<div
							className={styles.spacer}
							style={{ height: topSpacerHeight }}
							aria-hidden
						/>
					)}
					{visibleMessages.map((msg, i) => (
						<ChatMessageRow
							key={`${startIndex + i}-${msg.role}`}
							message={msg}
						/>
					))}
					{bottomSpacerHeight > 0 && (
						<div
							className={styles.spacer}
							style={{ height: bottomSpacerHeight }}
							aria-hidden
						/>
					)}
					{waitingForAssistant && (
						<div className={styles.loadingWrapper}>
							<AssistantLoader />
						</div>
					)}
				</>
			);
		}
		return (
			<>
				{messages.map((msg, i) => (
					<ChatMessageRow key={`${i}-${msg.role}`} message={msg} />
				))}
				{waitingForAssistant && (
					<div className={styles.loadingWrapper}>
						<AssistantLoader />
					</div>
				)}
			</>
		);
	};

	return (
		<div
			className={classNames(styles.chatWrapper, className)}
			style={style}
			role="log"
			aria-live="polite"
			aria-label="Chat messages"
			{...rest}
		>
			{initialLoading ? (
				<Skeleton rows={4} label="Loading chat…" />
			) : (
				<div
					ref={listWrapperRef}
					className={styles.listWrapper}
					onScroll={handleScroll}
				>
					<div
						className={classNames(styles.list)}
						style={
							totalCount > 0
								? ({ minHeight: totalHeight } as React.CSSProperties)
								: undefined
						}
					>
						{renderListContent()}
					</div>
				</div>
			)}
		</div>
	);
};
