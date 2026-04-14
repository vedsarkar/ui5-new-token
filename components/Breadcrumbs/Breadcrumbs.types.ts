import type { ReactNode } from "react";
import type { HtmlProps } from "@/utils/types";

export type BreadcrumbsProps = HtmlProps<
	"nav",
	{
		children?: ReactNode;
	}
>;

export type BreadcrumbProps = HtmlProps<
	"a",
	{
		href?: string;
		children?: ReactNode;
	}
>;
