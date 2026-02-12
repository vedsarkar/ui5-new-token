import type React from "react";

/**
 * Props for the ErrorBoundary component.
 */
export type ErrorBoundaryProps = {
	/**
	 * Content to render when no error occurs.
	 */
	children: React.ReactNode;

	/**
	 * Content to render when an error is caught from a descendant.
	 */
	fallback: React.ReactNode;

	/**
	 * Optional callback invoked in componentDidCatch with the caught error and React.ErrorInfo.
	 */
	onError?: (error: Error, info: React.ErrorInfo) => void;
};

/**
 * Internal state for the ErrorBoundary class component.
 */
export type ErrorBoundaryState = {
	hasError: boolean;
	error: Error | null;
};
