import { useState } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./ColorTokens.module.css";
import tokenMap from "./token-map.json";

const entries = Object.entries(tokenMap);

const groups = new Map<string, [string, string][]>();
for (const [figma, css] of entries) {
	const group = figma.split("/")[0];
	if (!groups.has(group)) groups.set(group, []);
	const list = groups.get(group);
	if (list) list.push([figma, css]);
}

export const ColorTokens = () => {
	const [copiedVar, setCopiedVar] = useState<string | null>(null);

	const copy = async (text: string) => {
		await navigator.clipboard.writeText(`var(${text})`);
		setCopiedVar(text);
		setTimeout(() => setCopiedVar(null), 1500);
	};

	return (
		<div>
			{[...groups.entries()].map(([group, tokens]) => (
				<div key={group}>
					<h3>{group}</h3>
					<table>
						<thead>
							<tr>
								<th style={{ width: "30%" }}>Figma Token</th>
								<th style={{ width: "40%" }}>CSS Variable</th>
								<th style={{ width: "15%" }}>Light Mode</th>
								<th style={{ width: "15%" }}>Dark Mode</th>
							</tr>
						</thead>
						<tbody>
							{tokens.map(([figma, css]) => {
								const varName = `--reltio-color-${css}`;
								const isCopied = copiedVar === varName;
								return (
									<tr key={figma}>
										<td>{figma}</td>
										<td
											className={styles.variableCell}
											onClick={() => copy(varName)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") copy(varName);
											}}
											title="Click to copy"
										>
											<code
												className={classNames(isCopied && styles.codeCopied)}
											>
												{isCopied ? "Copied!" : varName}
											</code>
										</td>
										<td
											className={styles.sampleCell}
											style={{ backgroundColor: `var(${varName})` }}
										/>
										<td
											data-theme="dark"
											className={styles.sampleCell}
											style={{ backgroundColor: `var(${varName})` }}
										/>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};
