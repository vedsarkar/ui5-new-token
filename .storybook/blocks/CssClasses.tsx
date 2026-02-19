import { useOf } from "@storybook/addon-docs/blocks";
import { useState } from "react";
import styles from "./CssClasses.module.css";

export const CssClasses = () => {
	const [copiedClass, setCopiedClass] = useState<string | null>(null);
	const resolved = useOf("meta");
	if (resolved.type !== "meta") return null;

	const cssMap = resolved.preparedMeta.parameters?.cssClasses as
		| Record<string, string>
		| undefined;
	if (!cssMap) return null;

	const classes = Object.entries(cssMap).map(([local, hashed]) => ({
		local,
		stable: `reltio_${hashed.split("__")[0]}`,
	}));

	if (classes.length === 0) return null;

	const copy = async (selector: string) => {
		await navigator.clipboard.writeText(`.${selector}`);
		setCopiedClass(selector);
		setTimeout(() => setCopiedClass(null), 1500);
	};

	return (
		<>
			<h3>CSS Classes</h3>
			<p>
				Stable class names for external customization. These classes are always
				present on the rendered elements regardless of build hash.
			</p>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Selector</th>
					</tr>
				</thead>
				<tbody>
					{classes.map(({ local, stable }) => {
						const isCopied = copiedClass === stable;
						return (
							<tr key={local}>
								<td>
									<code>{local}</code>
								</td>
								<td
									className={`${styles.selectorCell} ${isCopied ? styles.copied : ""}`}
									onClick={() => copy(stable)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") copy(stable);
									}}
									title="Click to copy"
								>
									<code>{isCopied ? "Copied!" : `.${stable}`}</code>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
