import { Heading } from "@storybook/addon-docs/blocks";
import type { ReactNode } from "react";
import { styled } from "storybook/theming";

/** Renders a section heading visually identical to the native "STORIES" label
 * that Storybook's `<Stories />` block produces — small, uppercase, muted,
 * with wide letter-spacing.
 *
 * Internally mirrors the `StyledHeading` wrapper used inside
 * `StoriesImpl` in `@storybook/addon-docs/dist/blocks.js` (which is not
 * exported). We layer the same overrides on top of the same base `<Heading>`
 * block to inherit Storybook's theming (font family, muted color, anchor
 * behavior) exactly, instead of approximating the look with hard-coded CSS. */
const StyledHeading = styled(Heading)(({ theme }) => ({
	fontSize: `${theme.typography.size.s2 - 1}px`,
	fontWeight: theme.typography.weight.bold,
	lineHeight: "16px",
	letterSpacing: "0.35em",
	textTransform: "uppercase",
	color: theme.textMutedColor,
	border: 0,
	marginBottom: "12px",
	"&:first-of-type": {
		marginTop: "56px",
	},
}));

type SectionHeadingProps = {
	children: ReactNode;
};

export const SectionHeading = ({ children }: SectionHeadingProps) => (
	<StyledHeading>{children}</StyledHeading>
);
