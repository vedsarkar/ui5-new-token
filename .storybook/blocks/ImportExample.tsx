import { useOf } from "@storybook/addon-docs/blocks";
import { useState } from "react";
import styles from "./ImportExample.module.css";

export const ImportExample = () => {
	const [copied, setCopied] = useState(false);
	const resolved = useOf("meta");
	if (resolved.type !== "meta") return null;

	const sourceCode = (
		resolved.preparedMeta.parameters?.docs as
			| { source?: { code?: string } }
			| undefined
	)?.source?.code;

	let importStatement: string;

	if (sourceCode) {
		importStatement = sourceCode;
	} else {
		const component = resolved.preparedMeta.component as
			| (((...args: unknown[]) => unknown) & { displayName?: string })
			| undefined;
		if (!component) return null;

		const name = component.displayName || component.name;
		if (!name) return null;

		importStatement = `import { ${name} } from "@reltio/design/components"`;
	}

	const copy = async () => {
		await navigator.clipboard.writeText(importStatement);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className={styles.root}>
			<code
				className={`${styles.code} ${copied ? styles.copied : ""}`}
				onClick={copy}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") copy();
				}}
				title="Click to copy"
			>
				{copied ? "Copied!" : importStatement}
			</code>
		</div>
	);
};
