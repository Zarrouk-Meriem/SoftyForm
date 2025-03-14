import { HTMLAttributes, useState } from "react";
import eyeOn from "./eyeOn.svg";
import eyeOff from "./eyeOff.svg";
import { useUpdateOptionMutation } from "../../../questions/data/optionsData/options";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
	name: string;
	formik?: any;
	label?: string;
	icon?: string;
	type?: "email" | "text" | "number" | "password";
	variant?:
		| "primary"
		| "info"
		| "success"
		| "danger"
		| "warning"
		| "dark"
		| "secondary"
		| "light";
	size?: "sm" | "md" | "lg" | "xl";
	rounded?: boolean;
	required?: boolean;
	placeholder?: string;
	defaultValue?: string;
	className?: string;
	disabled?: boolean;
	option?: boolean;
	question_id?: number;
	index?: number;
}

const Input: React.FC<IInputProps> = ({
	className,
	formik,
	name,
	label,
	icon,
	variant,
	size,
	rounded,
	type,
	required,
	placeholder,
	defaultValue,
	option,
	question_id,
	index,
	...props
}) => {
	const [updateOption] = useUpdateOptionMutation();
	function handleBlur(e: any) {
		formik.handleBlur(e);
		if (option)
			updateOption({ id: formik.values.id, updatedOption: formik.values });
	}
	function handleChange(e: any) {
		formik.handleChange(e);
		if (index !== undefined)
			formik.setFieldValue(`responses[${index}].question_id`, question_id);
		// console.log(e.target.v);
	}

	return (
		<div className='input-form'>
			<label htmlFor={name} className='label'>
				{label}
				{required && <span className='red-star'> *</span>}
			</label>

			<div
				className={[
					"input-container",
					`input-container-${variant}`,
					`${rounded ? "input-rounded" : ""}`,
				].join(" ")}
			>
				<input
					placeholder={placeholder}
					id={name}
					name={name}
					type={
						type === "text" ? "text" : type === "email" ? "email" : "number"
					}
					className={[className, `input-${size}`, `input-${variant}`].join(" ")}
					onBlur={handleBlur}
					onChange={handleChange}
					value={formik.values[name]}
					onSubmit={formik.handleSubmit}
					defaultValue={defaultValue}
					{...props}
				/>
			</div>

			{formik.touched[name] && formik.errors[name] ? (
				<p className='error-message'>{formik.errors[name]}</p>
			) : null}
		</div>
	);
};

export default Input;
