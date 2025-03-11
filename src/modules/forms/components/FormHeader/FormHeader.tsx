import "quill/dist/quill.core.css";
import { useLocation } from "react-router-dom";
import Input from "../../../shared/components/Input";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type Props = {
	formik?: any;
	form?: any;
};
function FormHeader({ formik, form }: Props) {
	const { pathname } = useLocation();
	const isPreview = pathname.split("/")[2] === "preview";

	const pathnameLength = pathname.split("/").length;
	const isResponse = pathname.split("/")[pathnameLength - 1] === "response";
	const editor = useCreateBlockNote();

	if (isPreview || isResponse)
		return (
			<div className='form_header_container '>
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
		<div className='form_header_container active'>
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
				<BlockNoteView
					editor={editor}
					sideMenu={true}
					theme={"light"}
					draggable={false}
					formattingToolbar={true}
					onChange={(value) => console.log(value)}
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
