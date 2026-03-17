import type React from "react";
import { useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types";

/**
 * Uncontrolled anchored popover built on the native Popover API and CSS Anchor Positioning.
 *
 * Use the `trigger` prop to provide the element that toggles the popover.
 * Positioning is handled automatically via CSS Anchor Positioning relative
 * to the trigger. Light dismiss (Esc + click outside) is built in.
 *
 * Optional `header` and `footer` props render in fixed areas — only `children`
 * scroll when content overflows.
 *
 * **Auto-close on content click:** clicking any element inside the popover
 * closes it (click bubbles to the root and triggers toggle). This is the
 * expected behavior for menus and action lists. For interactive content
 * (inputs, forms), call `e.stopPropagation()` on the container to prevent
 * auto-close.
 *
 * **Focus management:** add a `data-autofocus` attribute to an element inside
 * the popover to focus it when the popover opens.
 *
 * @example
 * ```tsx
 * <Popover trigger={<Button>Actions</Button>}>
 *   <button onClick={handleEdit}>Edit</button>
 *   <button onClick={handleDelete}>Delete</button>
 * </Popover>
 *
 * // With form content — stopPropagation prevents auto-close
 * <Popover trigger={<Button>Add Note</Button>} header="New Note">
 *   <div onClick={e => e.stopPropagation()}>
 *     <TextArea label="Note" data-autofocus />
 *   </div>
 * </Popover>
 * ```
 */
export const Popover = ({
	trigger,
	positionArea = "bottom",
	onToggle,
	header,
	footer,
	children,
	className,
	style,
	...rest
}: PopoverProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const isOpen = useRef(false);

	const handleToggle = (e: React.SyntheticEvent<HTMLDivElement>) => {
		isOpen.current = (e as unknown as ToggleEvent).newState === "open";
		if (isOpen.current) {
			const target =
				contentRef.current?.querySelector<HTMLElement>("[data-autofocus]");
			target?.focus();
		}
		onToggle?.(e);
	};

	const handleClick = () => {
		if (isOpen.current) {
			contentRef.current?.hidePopover();
		} else {
			contentRef.current?.showPopover();
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: trigger child handles its own keyboard interaction
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper delegates to interactive trigger child
		<span className={classNames(styles.root)} onClick={handleClick}>
			{trigger}
			<div
				ref={contentRef}
				popover="auto"
				className={classNames(styles.container, className)}
				style={{ ...style, positionArea } as React.CSSProperties}
				onToggle={handleToggle}
				{...rest}
			>
				{header && <div className={classNames(styles.header)}>{header}</div>}
				<div className={classNames(styles.body)}>{children}</div>
				{footer && <div className={classNames(styles.footer)}>{footer}</div>}
			</div>
		</span>
	);
};
