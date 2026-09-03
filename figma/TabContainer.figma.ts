// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24850-11169
// source=components/TabContainer
// component=TabContainer
import figma from "figma";

const instance = figma.selectedInstance;

// Figma's Type covers five tab presentations; UI5 has one layout switch,
// Inline against Standard. Only Inline Mode maps — the rest are Standard with
// different tab content, which the Tab template already expresses.
const tabLayout = instance.getEnum("Type", {
	"Inline Mode": "Inline",
	"Icon Only": "Standard",
	"Process Tabs": "Standard",
	"Shell Navigation": "Standard",
	"Filter Tabs": "Standard",
});

const tabs = instance.findConnectedInstances(
	(node) => node.codeConnectId() === "tab",
);
const first = tabs[0]?.executeTemplate().example;
const second = tabs[1]?.executeTemplate().example;
const third = tabs[2]?.executeTemplate().example;

const layoutProp =
	tabLayout === "Standard"
		? ""
		: figma.code`
	tabLayout="${tabLayout}"`;

// Omitted: Overflow (UI5 decides when to collapse), Semantic (a per-Tab
// `design`, handled in the Tab template), Size and Form Factor.
export default {
	example: figma.code`
<TabContainer
	onTabSelect={onTabSelect}${layoutProp}
>${first}${second}${third}
</TabContainer>`,
	imports: ['import { TabContainer } from "@reltio/design/components"'],
	id: "tab-container",
	metadata: { nestable: false },
};
