// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=175454-1328
// source=components/FileUploader
// component=FileUploader
import figma from "figma";

const instance = figma.selectedInstance;

// Text picks whether Figma shows the empty or filled field. `value` is
// read-only on the real element — the browser owns it — so the filled state is
// shown by the file the user picked rather than by a prop.
const filled = instance.getEnum("Text", {
	Placeholder: false,
	"Uploaded File": true,
});

// Form Factor is content density, set on an ancestor.
export default {
	example: filled
		? figma.code`
<FileUploader onChange={onChange}>
	<Button>{label}</Button>
</FileUploader>`
		: figma.code`
<FileUploader
	placeholder={placeholder}
	onChange={onChange}
>
	<Button>{label}</Button>
</FileUploader>`,
	imports: ['import { FileUploader, Button } from "@reltio/design/components"'],
	id: "file-uploader",
	metadata: { nestable: true },
};
