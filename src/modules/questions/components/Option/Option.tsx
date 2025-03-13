import { IoClose } from "react-icons/io5";

import { MdOutlineSquare } from "react-icons/md";
import Input from "../../../shared/components/Input";
import {
	useDeleteOptionMutation,
	useGetOptionsQuery,
} from "../../data/optionsData/options";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../../../shared/components/Spinner/Spinner";

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

function Option({ option, i, type, questionId }: Props) {
	const { data: existedOptions, isLoading } = useGetOptionsQuery(questionId);
	const [deleteOption] = useDeleteOptionMutation();
	function handleDeleteOption(e: any) {
		e.preventDefault();
		deleteOption(option.id);
	}
	function countOnce(content: string) {
		let count = 0;
		existedOptions?.map((option) => {
			if (option.content === content) count++;
		});
		return count === 1;
	}
	const formikOption = useFormik({
		enableReinitialize: true,
		initialValues: option,
		validationSchema: Yup.object().shape({
			content: Yup.string()
				.required("Option is empty")
				.test("is-unique", "This option already exists", (value) =>
					countOnce(value)
				),
		}),
		onSubmit: (values) => {
			console.log("Option submitted:", values);
		},
	});

	if (isLoading) return <Spinner />;
	return (
		<div className='option' onBlur={(e: any) => formikOption.handleSubmit(e)}>
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
