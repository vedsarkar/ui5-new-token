import React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./ErrorBoundary.module.css";
import type {
	ErrorBoundaryProps,
	ErrorBoundaryState,
} from "./ErrorBoundary.types";

/**
 * Reusable React Error Boundary (class component).
 * Catches render-time errors from descendants, renders fallback UI, and optionally calls onError.
 */
export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo): void {
		this.props.onError?.(error, info);
	}

	render(): React.ReactNode {
		if (this.state.hasError && this.state.error) {
			return (
				<div
					className={classNames(styles.root)}
					data-testid="error-boundary-fallback"
				>
					{this.props.fallback}
				</div>
			);
		}
		return (
			<div
				className={classNames(styles.root)}
				data-testid="error-boundary-children"
			>
				{this.props.children}
			</div>
		);
	}
}
