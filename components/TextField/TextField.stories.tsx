import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Email } from "@/icons/Email";
import { Lock } from "@/icons/Lock";
import { Search } from "@/icons/Search";
import { Visibility } from "@/icons/Visibility";
import { TextField } from "./TextField";
import cssClasses from "./TextField.module.css";

const meta = preview.meta({
	component: TextField,
	parameters: {
		layout: "centered",
		cssClasses,
	},
	args: {
		onChange: fn(),
	},
});

export const Default = meta.story({
	render: (args) => {
		const [value, setValue] = useState("Hello world");
		return (
			<TextField
				{...args}
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.clear(input);
		await userEvent.type(input, "New text");

		expect(input).toHaveValue("New text");
		expect(args.onChange).toHaveBeenCalled();
	},
});

export const WithLabel = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Username"
				value={value}
				placeholder="Enter username..."
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		expect(canvas.getByText("Username")).toBeInTheDocument();
		await userEvent.click(canvas.getByText("Username"));
		expect(input).toHaveFocus();
	},
});

export const WithPlaceholder = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				placeholder="Enter your name..."
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Enter your name...");

		expect(input).toBeInTheDocument();
		await userEvent.type(input, "Jane");
		expect(input).toHaveValue("Jane");
	},
});

export const WithHelperText = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Email"
				helperText="We will never share your email"
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(
			canvas.getByText("We will never share your email"),
		).toBeInTheDocument();
	},
});

export const ErrorState = meta.story({
	name: "Error",
	render: (args) => {
		const [value, setValue] = useState("invalid-email");
		return (
			<TextField
				{...args}
				label="Email"
				helperText="Please enter a valid email address"
				error
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(
			canvas.getByText("Please enter a valid email address"),
		).toBeInTheDocument();
	},
});

export const WithStartContent = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				startContent={<Search size="small" />}
				placeholder="Search..."
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const WithEndContent = meta.story({
	render: (args) => {
		const [value, setValue] = useState("secret123");
		return (
			<TextField
				{...args}
				label="Password"
				endContent={<Visibility size="small" />}
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const WithClearIcon = meta.story({
	render: (args) => {
		const [value, setValue] = useState("Some text");
		return (
			<TextField
				{...args}
				label="Search"
				clearable
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");
		const clearButton = canvas.getByRole("button", { name: "Clear" });

		expect(input).toHaveValue("Some text");
		await userEvent.click(clearButton);
		expect(input).toHaveValue("");
	},
});

export const Disabled = meta.story({
	args: {
		label: "Disabled field",
		value: "Cannot edit",
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		expect(input).toBeDisabled();
	},
});

export const Readonly = meta.story({
	args: {
		label: "Read-only field",
		value: "Read-only value",
		readOnly: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		expect(input).toHaveAttribute("readonly");
	},
});

export const Required = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Full name"
				required
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		expect(input).toBeRequired();
		expect(canvas.getByText("Full name")).toBeInTheDocument();
	},
});

export const Password = meta.story({
	render: (args) => {
		const [value, setValue] = useState("secret123");
		return (
			<TextField
				{...args}
				label="Password"
				type="password"
				startContent={<Lock size="small" />}
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const EmailType = meta.story({
	name: "Email",
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Email address"
				type="email"
				startContent={<Email size="small" />}
				placeholder="user@example.com"
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const Maxlength = meta.story({
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Short code"
				helperText="Maximum 10 characters"
				maxLength={10}
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("textbox");

		await userEvent.type(input, "12345678901234");
		expect(input).toHaveValue("1234567890");
	},
});
