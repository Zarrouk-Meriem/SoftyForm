import { useFormik } from "formik";

import Spinner from "../../../shared/components/Spinner/Spinner";
import FormFooter from "../../components/FormFooter/FormFooter";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useGetFormsQuery } from "../../data/forms";
import PreviewQuestions from "../PreviewQuestions/PreviewQuestions";

import { useCreateResponseMutation } from "../../../responses/data/responses";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Preview() {
	const { data: forms, isLoading: isLoadingForms } = useGetFormsQuery(2);

	// interface Question {
	// 	id: number;
	// 	type:
	// 		| "Short Text"
	// 		| "Paragraph"
	// 		| "Dropdown"
	// 		| "Checkbox"
	// 		| "Rating"
	// 		| "File Upload";
	// 	isRequired?: boolean;
	// 	maxFileSize?: number;
	// 	maxFileNum?: number;
	// 	specificTypes?: string[];
	// }

	interface FormValues {
		responses: {
			question_id: number;
			textAnswer?: string;
			rate?: number;
			file?: string[];
		}[];
	}
	// const getValidationSchema = (questions: Question[]) => {
	// 	return Yup.object().shape({
	// 		responses: Yup.array().of(
	// 			Yup.object().shape({
	// 				question_id: Yup.number().required("Question ID is required"),

	// 				textAnswer: Yup.string().when("type", {
	// 					is: (type: Question["type"]) =>
	// 						type === "Short Text" || type === "Paragraph",
	// 					then: (schema) => schema.required("This field is required"),
	// 					otherwise: (schema) => schema.notRequired(),
	// 				}),

	// 				rate: Yup.number().when("type", {
	// 					is: (type: Question["type"]) => type === "Rating",
	// 					then: (schema) => schema.required("Please provide a rating"),
	// 					otherwise: (schema) => schema.notRequired(),
	// 				}),

	// 				file: Yup.array()
	// 					.of(Yup.string().url("Invalid file URL"))
	// 					.when("type", {
	// 						is: (type: Question["type"]) => type === "File Upload",
	// 						then: (schema) => schema.min(1, "At least one file is required"),
	// 						otherwise: (schema) => schema.notRequired(),
	// 					}),
	// 			})
	// 		),
	// 	});
	// };
	const [submitted, setSubmitted] = useState(false);
	const [createResponse] = useCreateResponseMutation();
	const navigate = useNavigate();
	const form = forms?.[0];
	const formik = useFormik<FormValues>({
		enableReinitialize: true,
		initialValues: { responses: [] },
		// validationSchema: getValidationSchema(questions),
		onSubmit: (values) => {
			console.log("Response submitted:", values);
			toast.success("form has been successfully submitted!");
			createResponse(values);
		},
	});

	if (isLoadingForms) return <Spinner />;
	if (submitted) navigate("./submit");
	return (
		<form className='form'>
			<FormHeader form={form} />
			<PreviewQuestions formik={formik} />
			<FormFooter
				formik={formik}
				submitted={submitted}
				setSubmitted={setSubmitted}
			/>
		</form>
	);
}

export default Preview;
