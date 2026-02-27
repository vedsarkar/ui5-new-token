import type { HtmlProps } from "@/utils/types";

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
export type ChatProps = HtmlProps<
	"div",
	{
		/**
		 * List of messages to display in order. Each message is rendered by type (user → UserMessage, assistant → AssistantMessage).
		 */
		messages: Message[];

		/**
		 * When true, shows the AssistantLoader below the message list to indicate the assistant is generating a response.
		 * Fully controlled from outside — no internal logic derives this state.
		 * @default false
		 */
		thinking?: boolean;

		/**
		 * When true, chat data is initially loading. The Skeleton component is shown in place of the message list until data is available.
		 * @default false
		 */
		initialLoading?: boolean;
	}
>;
