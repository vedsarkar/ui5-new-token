import { useCallback, useEffect, useRef, useState } from "react";

type UseOverflowResult = {
	/** Ref to attach to the scrollable container */
	containerRef: React.RefObject<HTMLElement | null>;
	/** Number of visible items (not overflowing) */
	visibleCount: number;
	/** Whether any items are overflowing */
	hasOverflow: boolean;
};

/**
 * Detects which items overflow a container and reports the visible count.
 *
 * Used by Tabs, Breadcrumbs, and Toolbar to show a "More" button
 * when items don't fit in the available width.
 *
 * @param itemSelector - CSS selector for items to check for overflow
 */
export const useOverflow = (itemSelector: string): UseOverflowResult => {
	const containerRef = useRef<HTMLElement>(null);
	const [visibleCount, setVisibleCount] = useState(Number.POSITIVE_INFINITY);

	const calculateOverflow = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;

		const items = Array.from(
			container.querySelectorAll(itemSelector),
		) as HTMLElement[];
		if (items.length === 0) {
			setVisibleCount(0);
			return;
		}

		const containerRight = container.getBoundingClientRect().right;
		let count = items.length;

		for (let i = items.length - 1; i >= 0; i--) {
			if (items[i].getBoundingClientRect().right <= containerRight) {
				count = i + 1;
				break;
			}
			if (i === 0) count = 0;
		}

		setVisibleCount(count);
	}, [itemSelector]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new ResizeObserver(calculateOverflow);
		observer.observe(container);

		calculateOverflow();

		return () => observer.disconnect();
	}, [calculateOverflow]);

	return {
		containerRef,
		visibleCount,
		hasOverflow: visibleCount < Number.POSITIVE_INFINITY,
	};
};
