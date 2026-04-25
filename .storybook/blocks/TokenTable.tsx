import styles from "./TokenTable.module.css";

type TokenTableProps = {
	tokens: Record<string, string>;
};

const isColor = (v: string): boolean =>
	/^#[0-9a-f]{3,8}$/i.test(v) ||
	(/^rgba?\(/.test(v) && v !== "transparent");

const contrastColor = (v: string): string =>
	`oklch(from ${v} clamp(0, calc((.6 - l) * 1000000), 1) 0 0 / 1)`;

export const TokenTable = ({ tokens }: TokenTableProps) => (
	<table className={styles.table}>
		<thead>
			<tr>
				<th className={styles.th}>CSS Variable</th>
				<th className={styles.th}>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.entries(tokens).map(([k, v]) => (
				<tr key={k}>
					<td className={styles.tdName}>--{k}</td>
					<td
						className={styles.tdValue}
						style={
							isColor(v)
								? {
										backgroundColor: v,
										color: contrastColor(v),
									}
								: undefined
						}
					>
						{v}
					</td>
				</tr>
			))}
		</tbody>
	</table>
);
