import { useEffect, useRef } from "react";
import { Close } from "@/icons/Close";
import { classNames } from "@/utils/classNames";
import styles from "./Dialog.module.css";
import type { DialogProps } from "./Dialog.types";

/**
 * Controlled modal dialog built on the native `<dialog>` element.
 *
 * Opens via `showModal()` — provides backdrop, focus trapping, Esc dismiss,
 * and click-outside dismiss automatically. When `header` is provided,
 * a close button is rendered in the top-right corner.
 *
 * **Focus management:** by default, the browser focuses the first focusable
 * element inside the dialog. To override this, add a `data-autofocus`
 * attribute to the desired element — the dialog will focus it after opening.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onClose={() => setOpen(false)} header="Edit">
 *   <TextArea label="Name" data-autofocus />
 * </Dialog>
 * ```
 */
export const Dialog = ({
	open = false,
	onClose,
	header,
	footer,
	children,
	className,
	...rest
}: DialogProps) => {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			ref.current?.classList.add(styles.animated);
		});
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (open && !el.open) {
			el.showModal();
			const target = el.querySelector<HTMLElement>("[data-autofocus]");
			target?.focus();
		} else if (!open && el.open) {
			el.close();
		}
	}, [open]);

	return (
		<dialog
			ref={ref}
			className={classNames(styles.root, className)}
			// @ts-expect-error closedby is not yet in React's type definitions
			closedby="any"
			onClose={onClose}
			{...rest}
		>
			{header && (
				<div className={classNames(styles.header)}>
					<span className={classNames(styles.headerContent)}>{header}</span>
					<button
						type="button"
						className={classNames(styles.closeButton)}
						onClick={onClose}
						aria-label="Close"
					>
						<Close size="medium" />
					</button>
				</div>
			)}
			<div className={classNames(styles.body)}>{children}</div>
			{footer && <div className={classNames(styles.footer)}>{footer}</div>}
		</dialog>
	);
};
