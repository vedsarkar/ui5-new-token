import type React from "react";
import { useCallback, useRef } from "react";

type UseKeyboardNavigationOptions = {
	/** CSS selector for focusable items within the container */
	itemSelector: string;
	/** Whether navigation wraps around at boundaries */
	wrap?: boolean;
	/** Orientation affects which arrow keys are used */
	orientation?: "horizontal" | "vertical" | "both";
};

/**
 * Roving tabindex keyboard navigation for lists, menus, tabs, and other collections.
 *
 * Implements the WAI-ARIA roving tabindex pattern:
 * - Only the active item has tabindex="0", all others have tabindex="-1"
 * - Arrow keys move focus between items
 * - Home/End jump to first/last item
 *
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export const useKeyboardNavigation = ({
	itemSelector,
	wrap = true,
	orientation = "vertical",
}: UseKeyboardNavigationOptions) => {
	const containerRef = useRef<HTMLElement>(null);

	const getItems = useCallback((): HTMLElement[] => {
		if (!containerRef.current) return [];
		return Array.from(containerRef.current.querySelectorAll(itemSelector));
	}, [itemSelector]);

	const focusItem = useCallback((items: HTMLElement[], index: number) => {
		for (const item of items) {
			item.setAttribute("tabindex", "-1");
		}
		const target = items[index];
		if (target) {
			target.setAttribute("tabindex", "0");
			target.focus();
		}
	}, []);

	const onKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const items = getItems();
			if (items.length === 0) return;

			const currentIndex = items.indexOf(document.activeElement as HTMLElement);
			if (currentIndex === -1) return;

			const isVertical = orientation === "vertical" || orientation === "both";
			const isHorizontal =
				orientation === "horizontal" || orientation === "both";

			let nextIndex = currentIndex;

			switch (event.key) {
				case "ArrowDown":
					if (!isVertical) return;
					nextIndex = currentIndex + 1;
					break;
				case "ArrowUp":
					if (!isVertical) return;
					nextIndex = currentIndex - 1;
					break;
				case "ArrowRight":
					if (!isHorizontal) return;
					nextIndex = currentIndex + 1;
					break;
				case "ArrowLeft":
					if (!isHorizontal) return;
					nextIndex = currentIndex - 1;
					break;
				case "Home":
					nextIndex = 0;
					break;
				case "End":
					nextIndex = items.length - 1;
					break;
				default:
					return;
			}

			event.preventDefault();

			if (wrap) {
				nextIndex = (nextIndex + items.length) % items.length;
			} else {
				nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
			}

			focusItem(items, nextIndex);
		},
		[getItems, focusItem, wrap, orientation],
	);

	return { containerRef, onKeyDown };
};
