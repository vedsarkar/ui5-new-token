import preview from "@/.storybook/preview";
import { apiMetaConfig } from "@/.storybook/utils/apiMetaConfig";
import { urlControls } from "@/.storybook/utils/urlControls";
import spec from "./AddressApis.spec.json";

const base = "https://{environment}.reltio.com/reltio/api/{tenantId}";

// Query parameters are baked into the URL as `{Name}` placeholders so that
// urlControls() picks them up and renders them in the Controls panel just like
// path placeholders. The shared apiMetaConfig URL-substitution pipeline then
// builds the final URL by replacing each `{Name}` with the value the user
// types. Optional parameters left untouched stay as `{Container}` / etc. in
// the curl preview, which doubles as in-place documentation.
const searchUrl = `${base}/address/search?Text={Text}&Container={Container}&Countries={Countries}&Language={Language}&Limit={Limit}`;
const fetchUrl = `${base}/address/fetch?Id={Id}`;

const api = apiMetaConfig({ spec });

const meta = preview.meta({
	...api,
	title: "API/Address APIs",
});

export default meta;

export const SearchAddresses = meta.story({
	name: "GET /address/search",
	...urlControls(searchUrl),
	args: {
		description:
			"Searches for possible addresses matching the given text. Required: Text and Limit. Optional: Container (continuation token from a previous candidate), Countries (comma-separated ISO codes), Language (e.g. en-GB).",
		request: { method: "GET", url: searchUrl },
		Text: "10 Downing Street",
		Limit: "10",
	},
});

export const FetchAddress = meta.story({
	name: "GET /address/fetch",
	...urlControls(fetchUrl),
	args: {
		description:
			"Retrieves the full details for a single candidate address by its provider-specific Id (typically the value returned in a previous /address/search result).",
		request: { method: "GET", url: fetchUrl },
	},
});
