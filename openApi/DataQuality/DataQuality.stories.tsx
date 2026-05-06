import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./DataQuality.spec.json";

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Data Quality",
});

export default meta;

export const PostDataQualityV1AttributeLevelTimeSeries = meta.story({
	name: "POST /entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/",
	...urlControls(
		`https://{environment}.reltio.com/{tenantId}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/`,
	),
	args: {
		description: `Get Attribute`,
		request: {
			method: "POST",
			url: `https://{environment}.reltio.com/{tenantId}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/`,
			body: {
				attributes: ["FirstName", "LastName"],
				from: 1730000000000,
				to: 1730800000000,
			},
		},
	},
});
