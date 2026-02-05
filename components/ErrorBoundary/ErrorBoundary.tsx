import React from "react";
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
		if (this.state.error) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}
