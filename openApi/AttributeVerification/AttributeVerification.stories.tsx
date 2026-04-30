import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./AttributeVerification.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";
const verifyEntityUrl = `${base}/entities/{id}/attributeVerification/_verify`;
const batchEmailUrl = `${base}/verification/email/_batchVerify`;
const batchPhoneUrl = `${base}/verification/phone/_batchVerify`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Attribute Verification",
	description:
		"Validate email and phone attributes through Reltio's pluggable verification providers. Provides one entity-scoped verifier (runs the configured verifiers on a single entity and persists results) and two batch verifiers (one for emails, one for phone numbers, both accepting an array of input records).",
});

export const VerifyEntity = meta.story({
	name: "POST /entities/{id}/attributeVerification/_verify",
	...urlControls(verifyEntityUrl),
	args: {
		description:
			"Runs attribute verification for the specified entity. Reuses existing valid results (within maxVerificationAge) unless forceVerify is true. If clientFilter is omitted, all applicable verifiers run. Persists verification results on the entity and returns the updated entity.",
		request: {
			method: "POST",
			url: verifyEntityUrl,
			body: {
				forceVerify: true,
				clientFilter: ["Email", "Phone"],
			},
		},
	},
});

export const BatchVerifyEmail = meta.story({
	name: "POST /verification/email/_batchVerify",
	...urlControls(batchEmailUrl),
	args: {
		description:
			"Batch-verifies a list of email addresses without persisting results to any entity. Accepts a JSON array of objects of the shape { email }.",
		request: {
			method: "POST",
			url: batchEmailUrl,
			body: [{ email: "alice@example.com" }, { email: "bob@sample.org" }],
		},
	},
});

export const BatchVerifyPhone = meta.story({
	name: "POST /verification/phone/_batchVerify",
	...urlControls(batchPhoneUrl),
	args: {
		description:
			"Batch-verifies a list of phone numbers without persisting results to any entity. Accepts a JSON array of objects of the shape { phone, ctry? }. phone may be E.164 or national format. If ctry is provided, the number is treated as national; if omitted, it is treated as international.",
		request: {
			method: "POST",
			url: batchPhoneUrl,
			body: [{ phone: "+14155551234" }, { phone: "020 7946 0958", ctry: "GB" }],
		},
	},
});
