import React from "react";
import type {
	ErrorBoundaryProps,
	ErrorBoundaryState,
} from "./ErrorBoundary.types";

/** Catches render-time errors from descendants and renders a caller-provided `fallback` instead. */
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
