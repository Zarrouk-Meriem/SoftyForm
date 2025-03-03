import { IoClose } from "react-icons/io5";

import { MdOutlineSquare } from "react-icons/md";
import Input from "../../../shared/components/Input";
import { useDeleteOptionMutation } from "../../data/optionsData/options";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
	option:
		| {
				id: number;
				create_at: string;
				content: string;
				question_id: number;
		  }
		| any;
	formik: any;
	i: Number;
	type: String | "Checkbox" | "Dropdown";
	questionId: any;
};

function Option({ option, i, type }: Props) {
	const [deleteOption] = useDeleteOptionMutation();
	function handleDeleteOption(e: any) {
		e.preventDefault();
		deleteOption(option.id);
	}
	const formikOption = useFormik({
		enableReinitialize: true,
		initialValues: option,
		validationSchema: Yup.object().shape({
			question: Yup.string().required("Question is required"),
		}),
		onSubmit: (values) => {
			console.log("option submitted:", values);
		},
	});

	if (option.other)
		return (
			<div className='option'>
				<Input
					variant='primary'
					size='sm'
					name={`content`}
					type={"text"}
					formik={formikOption}
					defaultValue={option.content}
					option={true}
				/>

				<IoClose onClick={handleDeleteOption} className='btn close-btn' />
			</div>
		);
	return (
		<div className='option'>
			{type === "Checkbox" && <MdOutlineSquare className='option-icon' />}
			{type === "Dropdown" && <p className='option-icon'>{`${i}`}. </p>}
			<Input
				variant='primary'
				size='sm'
				name={`content`}
				type={"text"}
				formik={formikOption}
				defaultValue={option.content}
				option={true}
			/>

			<IoClose onClick={handleDeleteOption} className='btn close-btn' />
		</div>
	);
}
export default Option;
