import type React from "react";

/**
 * User message payload for Chat. Renders via UserMessage component.
 */
export type UserChatMessage = {
	type: "user";
	content?: string | null;
};

/**
 * Assistant message payload for Chat. Renders via AssistantMessage component.
 */
export type AssistantChatMessage = {
	type: "assistant";
	content?: string | null;
};

/**
 * Union of known chat message types. Extensible: add new variants (e.g. system, tool)
 * by extending this type and the message renderer in Chat.tsx.
 */
export type ChatMessage = UserChatMessage | AssistantChatMessage;

/**
 * Message received from the API.
 */
export type Message = {
	messageId?: string;
	role: "user" | "assistant" | "system";
	content: string;
	timestamp?: Date;
	createdAt?: string;
};

/**
 * Props for the Chat component
 */
export type ChatProps = {
	/**
	 * List of messages to display in order. Each message is rendered by type (user → UserMessage, assistant → AssistantMessage).
	 */
	messages: Message[];

	/**
	 * When true, chat data is initially loading. The Skeleton component is shown in place of the message list until data is available.
	 * @default false
	 */
	initialLoading?: boolean;

	/**
	 * When true, automatically scrolls to the bottom when new messages are added and user is near bottom.
	 * @default true
	 */
	autoScroll?: boolean;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Inline styles (e.g. for CSS variable overrides)
	 */
	style?: React.CSSProperties;
} & Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children" | "className" | "style"
>;
