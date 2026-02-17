import type React from "react";

export type DividerProps = {
	className?: string;
	style?: React.CSSProperties & {
		"--reltio-divider-color"?: string;
		"--reltio-divider-thickness"?: string;
		"--reltio-divider-spacing"?: string;
	};
} & Omit<React.ComponentPropsWithoutRef<"hr">, "className" | "style">;
