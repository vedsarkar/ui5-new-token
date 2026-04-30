import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./FileBasedSearch.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/File Based Search",
	description:
		'Upload a file with a list of values to a private bucket so it can be referenced as input to subsequent searches against entity attributes (e.g. "find entities whose externalId is in this 10,000-item list").',
});

export const PostValueList = meta.story({
	name: "POST /valueList",
	...urlControls(
		`https://{environment}.reltio.com/reltio/api/{tenantId}/valueList`,
	),
	args: {
		description: `This API allows to upload a file with a list of values to internal cloud storage to use this file in the search filter later. It also provides temporary direct access to the file via presigned URL.Note: Only TXT and CSV file extensions are supported. CSV file must contain only one column without a header.Limitation for supported file size is 10MB or 5000 values.`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/reltio/api/{tenantId}/valueList`,
			body: {
				values: ["external-id-1", "external-id-2", "external-id-3"],
			},
		},
	},
});
