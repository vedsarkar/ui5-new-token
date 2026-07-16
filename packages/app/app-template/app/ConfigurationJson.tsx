"use client";

import { BusyIndicator, MessageStrip } from "@reltio/design/components";
import type { CSSProperties } from "react";
import {
	type TenantConfiguration,
	useTenantConfiguration,
} from "@/lib/useTenantConfiguration";

const codeBlock: CSSProperties = {
	margin: 0,
	padding: 16,
	overflow: "auto",
	fontFamily: "var(--sapContent_MonospaceFontFamily)",
	fontSize: 13,
	lineHeight: 1.5,
	color: "var(--sapTextColor)",
	background: "var(--sapList_Background)",
	border: "1px solid var(--sapList_BorderColor)",
	borderRadius: 12,
};

/**
 * Renders one field of the selected tenant's business configuration as a plain,
 * pretty-printed JSON block, handling the loading and error states of
 * `useTenantConfiguration` for the caller.
 */
export function ConfigurationJson({
	title,
	field,
}: {
	title: string;
	field: keyof TenantConfiguration;
}) {
	const { data, error, isLoading } = useTenantConfiguration();

	if (isLoading) {
		return <BusyIndicator active delay={0} />;
	}

	if (error) {
		return (
			<MessageStrip design="Negative" hideCloseButton>
				Could not load the tenant configuration: {error}
			</MessageStrip>
		);
	}

	const value = data?.[field] ?? [];

	return (
		<section>
			<h2 style={{ color: "var(--sapTitleColor)" }}>{title}</h2>
			<pre style={codeBlock}>{JSON.stringify(value, null, 2)}</pre>
		</section>
	);
}
