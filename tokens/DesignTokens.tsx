import { useState } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./DesignTokens.module.css";

export type Token = {
	name: string;
	light: string;
	dark: string;
};

const COLOR_HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const COLOR_FUNC = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\s*\(/i;
const COLOR_KEYWORDS = new Set([
	"transparent",
	"currentcolor",
	"black",
	"white",
	"red",
	"green",
	"blue",
	"yellow",
	"cyan",
	"magenta",
	"gray",
	"grey",
	"silver",
]);

const isColor = (value: string): boolean => {
	const v = value.trim();
	if (!v) return false;
	if (COLOR_HEX.test(v)) return true;
	if (COLOR_FUNC.test(v)) return true;
	return COLOR_KEYWORDS.has(v.toLowerCase());
};

const Sample = ({ value }: { value: string }) => {
	if (!isColor(value)) {
		return <code className={classNames(styles.code)}>{value}</code>;
	}
	return (
		<span
			className={classNames(styles.swatch)}
			style={{ "--_bg": value, background: value } as React.CSSProperties}
			title={value}
		>
			{value}
		</span>
	);
};

export const DesignTokens = ({ tokens }: { tokens: readonly Token[] }) => {
	const [copiedVar, setCopiedVar] = useState<string | null>(null);

	const copy = async (varName: string) => {
		await navigator.clipboard.writeText(`var(${varName})`);
		setCopiedVar(varName);
		setTimeout(() => setCopiedVar(null), 1500);
	};

	return (
		<table className={classNames(styles.table)}>
			<thead>
				<tr>
					<th className={classNames(styles.th, styles.thName)}>CSS variable</th>
					<th className={classNames(styles.th, styles.thValue)}>
						Horizon Morning
					</th>
					<th className={classNames(styles.th, styles.thValue)}>
						Horizon Evening
					</th>
				</tr>
			</thead>
			<tbody>
				{tokens.map(({ name, light, dark }) => {
					const varName = `--${name}`;
					const isCopied = copiedVar === varName;
					return (
						<tr key={name}>
							<td
								className={classNames(styles.variableCell)}
								onClick={() => copy(varName)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") copy(varName);
								}}
								title="Click to copy"
							>
								<code
									className={classNames(
										styles.code,
										isCopied && styles.codeCopied,
									)}
								>
									{isCopied ? "Copied!" : varName}
								</code>
							</td>
							<td className={classNames(styles.sampleCell)}>
								<Sample value={light} />
							</td>
							<td className={classNames(styles.sampleCell)}>
								<Sample value={dark} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
