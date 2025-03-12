import "quill/dist/quill.core.css";
import { useLocation } from "react-router-dom";
import Input from "../../../shared/components/Input";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";

type Props = {
	formik?: any;
	setAddPos?: any;
	form?: any;
};
function FormHeader({ formik, form }: Props) {
	const { pathname } = useLocation();
	const isPreview = pathname.split("/")[2] === "preview";

	const pathnameLength = pathname.split("/").length;
	const isResponse = pathname.split("/")[pathnameLength - 1] === "response";
	const editor = useCreateBlockNote();

	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest(".form_header_container ")) {
				setIsActive(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);
	if (isPreview || isResponse)
		return (
			<div
				onClick={handleClick}
				className={`form_header_container ${isActive ? "active" : ""} `}
			>
				<div className='form_header_container_input'>
					<h1
						style={{
							fontWeight: "500",
							display: "inline",
						}}
					>
						{form.title}
					</h1>
				</div>
				<div className='form_header_container_input'>
					<h4 style={{ fontWeight: "400", fontSize: "12px" }}>
						{form.description}
					</h4>
				</div>
			</div>
		);
	return (
		<div
			onClick={handleClick}
			className={`form_header_container ${isActive ? "active" : ""} `}
		>
			<div className='form_header_container_input'>
				<Input
					formik={formik}
					variant='primary'
					size='xl'
					name='title'
					label=''
					type='text'
					required={false}
				/>
			</div>
			<div className='form_header_container_input'>
				<Input
					formik={formik}
					variant='secondary'
					size='sm'
					name='description'
					label=''
					type='text'
					required={false}
					placeholder='Form description'
				/>
			</div>
		</div>
	);
}

export default FormHeader;
