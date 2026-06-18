export type Relationship =
	| "endorsed"
	| "backlog"
	| "experimental"
	| "deprecated"
	| "excluded"
	| "reltio-only"
	| "reltio-replacement";

export type Ui5Status = "stable" | "experimental" | "deprecated";

export type ReltioMode = "1:1" | "renamed" | "wrapper" | "custom";

export type Ui5Side = {
	status: Ui5Status;
	url: string;
};

export type ReltioSide = {
	mode: ReltioMode;
	url: string | null;
};

export type ComponentEntry = {
	name: string;
	category: string;
	relationship: Relationship;
	ui5: Ui5Side | null;
	reltio: ReltioSide | null;
	note?: string;
};

export type StatusFilter =
	| "all"
	| "endorsed"
	| "backlog"
	| "experimental"
	| "deprecated"
	| "excluded"
	| "reltio";
