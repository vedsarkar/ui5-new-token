import { faker } from "@faker-js/faker";
import preview from "@/.storybook/preview";
import { Button } from "@/components/Button";
import type { Message } from "@/components/Chat";
import { Chat } from "@/components/Chat";
import { TextArea } from "@/components/TextArea";
import { Chat as ChatIcon } from "@/icons/Chat";
import { Popover } from "./Popover";
import cssClasses from "./Popover.module.css";
import styles from "./Stories.module.css";

const meta = preview.meta({
	component: Popover,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	render: () => (
		<Popover trigger={<Button>Actions</Button>}>
			<div role="menu" className={styles.menu}>
				<button role="menuitem" type="button" className={styles.menuItem}>
					Edit
				</button>
				<button role="menuitem" type="button" className={styles.menuItem}>
					Duplicate
				</button>
				<hr className={styles.menuDivider} />
				<button role="menuitem" type="button" className={styles.menuItemDanger}>
					Delete
				</button>
			</div>
		</Popover>
	),
});

faker.seed(42);
const chatMessages: Message[] = Array.from({ length: 20 }, (_, i) => ({
	role: (i % 2 === 0 ? "user" : "assistant") as Message["role"],
	content:
		i % 2 === 0
			? faker.lorem.sentence()
			: faker.lorem.sentences({ min: 1, max: 3 }),
}));

export const AiChat = meta.story({
	render: () => (
		<Popover
			trigger={
				<Button>
					<ChatIcon size="small" /> AI Chat
				</Button>
			}
			header="AI Assistant"
			footer={
				<div
					style={{ width: "100%" }}
					onClickCapture={(e) => e.stopPropagation()}
				>
					<TextArea
						placeholder="Ask a question..."
						data-autofocus
						style={{ maxHeight: "120px" }}
					/>
				</div>
			}
			className={styles.chatPanel}
			positionArea="bottom span-right"
		>
			<Chat messages={chatMessages} />
		</Popover>
	),
});

const positions = [
	"top left",
	"top",
	"top right",
	"left",
	"center",
	"right",
	"bottom left",
	"bottom",
	"bottom right",
] as const;

export const CustomPosition = meta.story({
	render: () => (
		<div className={styles.positionGrid}>
			{positions.map((position) => (
				<Popover
					key={position}
					trigger={<Button>{position}</Button>}
					positionArea={position}
				>
					<p className={styles.text}>{position}</p>
				</Popover>
			))}
		</div>
	),
});
