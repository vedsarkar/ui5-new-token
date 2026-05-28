import type React from "react";
import preview from "@/.storybook/preview";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const meta = preview.meta({
	component: ErrorBoundary,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
});

export default meta;

// Normal render (children render without error)
export const NormalRender = meta.story({
	args: {
		children: <p>This content renders normally when no error occurs.</p>,
		fallback: <p>Fallback would show here if an error occurred.</p>,
	},
});

// Fallback on error (child that throws during render, fallback is shown)
function ThrowOnRender(): React.ReactElement {
	throw new Error("Intentional render error for Storybook demo");
}

export const FallbackOnError = meta.story({
	render: () => (
		<ErrorBoundary
			fallback={
				<p role="alert">Something went wrong. This is the fallback UI.</p>
			}
		>
			<ThrowOnRender />
		</ErrorBoundary>
	),
});

// onError callback (demonstrate callback invoked with error and info)
export const OnErrorCallback = meta.story({
	render: () => (
		<ErrorBoundary
			fallback={
				<p role="alert">
					Error was caught. onError was invoked with the error and
					componentStack.
				</p>
			}
			onError={(_error, _info) => {
				// Callback is invoked from componentDidCatch when a descendant throws
			}}
		>
			<ThrowOnRender />
		</ErrorBoundary>
	),
});
