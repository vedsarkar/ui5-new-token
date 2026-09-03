// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=286950-9373
// source=components/UserMenu/UserMenu.tsx
// component=UserMenu
import figma from "figma";

const instance = figma.selectedInstance;

const userName = instance.getString("✏️ User Name");
const subline = instance.getString("✏️ 1st Subline");

// `UserMenu` is a Reltio wrapper, not a UI5 re-export: it takes a single
// `user` object rather than accounts, and requires `appVersion` and
// `onSignOut`. The design's second subline and its Manage Accounts action have
// no counterpart — the wrapper deliberately models one account.
export default {
	example: figma.code`
<UserMenu
	user={{ username: "${userName}", email: "${subline}" }}
	appVersion={appVersion}
	onSignOut={onSignOut}
/>`,
	imports: ['import { UserMenu } from "@reltio/design/components"'],
	id: "user-menu",
	metadata: { nestable: false },
};
