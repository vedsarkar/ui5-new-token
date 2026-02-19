/// <reference types="vite/client" />
import { useState } from "react";
import { useOf } from "@storybook/addon-docs/blocks";
import styles from "./CssClasses.module.css";

const cssModules = import.meta.glob("../../components/**/*.module.css.json", {
	eager: true,
}) as Record<string, { default: Record<string, string> }>;

export const CssClasses = () => {
	const [copiedClass, setCopiedClass] = useState<string | null>(null);
	const resolved = useOf("meta");
	if (resolved.type !== "meta") return null;

	const name =
		resolved.preparedMeta.component?.displayName ||
		resolved.preparedMeta.component?.name;

	if (!name) return null;

	const matchKey = Object.keys(cssModules).find((key) =>
		key.includes(`/${name}/`),
	);
	if (!matchKey) return null;

	const cssMap = cssModules[matchKey].default;
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
