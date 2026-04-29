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
});

// Value states
export const ValueStateError = meta.story({
	name: "Error",
	render: (args) => {
		const [value, setValue] = useState("invalid-email");
		return (
			<TextField
				{...args}
				label="Email"
				valueState="Error"
				valueStateMessage="Please enter a valid email address"
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

export const ValueStateWarning = meta.story({
	name: "Warning",
	render: (args) => {
		const [value, setValue] = useState("weak-password");
		return (
			<TextField
				{...args}
				label="Password"
				valueState="Warning"
				valueStateMessage="Password strength is weak"
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const ValueStateSuccess = meta.story({
	name: "Success",
	render: (args) => {
		const [value, setValue] = useState("john.doe@example.com");
		return (
			<TextField
				{...args}
				label="Email"
				valueState="Success"
				valueStateMessage="Email is available"
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
	},
});

export const ValueStateInformation = meta.story({
	name: "Information",
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<TextField
				{...args}
				label="Username"
				valueState="Information"
				valueStateMessage="Username must be 3-20 characters"
				value={value}
				onChange={(e, v) => {
					setValue(v);
					args?.onChange?.(e, v);
				}}
			/>
		);
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
