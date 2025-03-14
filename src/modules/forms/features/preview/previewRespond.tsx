import { useFormik } from "formik";

import Spinner from "../../../shared/components/Spinner/Spinner";
import FormFooter from "../../components/FormFooter/FormFooter";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useGetFormsQuery } from "../../data/forms";
import PreviewQuestions from "../PreviewQuestions/PreviewQuestions";

import { useCreateResponseMutation } from "../../../responses/data/responses";
import { useState } from "react";
import * as Yup from "yup";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../../questions/data/questions";

function Preview() {
	const { data: forms, isLoading: isLoadingForms } = useGetFormsQuery(2);

	interface FormValues {
		responses: {
			question_id: number;
			textAnswer?: string;
			rate?: number;
			file?: string[];
		}[];
	}

	const [submitted, setSubmitted] = useState(false);
	const [createResponse] = useCreateResponseMutation();
	const { data: questions, isLoading: isLoadingQuestions } =
		useGetAllQuestionsQuery({});
	interface Question {
		id: number;
		type:
			| "Short Text"
			| "Paragraph"
			| "Dropdown"
			| "Checkbox"
			| "Rating"
			| "File Upload";
		isRequired?: boolean;
		maxFileSize?: number;
		maxFileNum?: number;
		specificTypes?: string[];
	}

	const getValidationSchema = Yup.object().shape({
		responses: Yup.array().of(
			Yup.object().shape({
				textAnswer: Yup.string().required("isRequired!"),

				rate: Yup.number().nullable().required("provide a rate please!"),
				data: Yup.array()
					.of(
						Yup.object().shape({
							name: Yup.string(),
							uid: Yup.string(),
						})
					)
					.min(1, "At least one file is required")
					.required("This field is required"),
			})
		),
	});
	console.log(getValidationSchema);
	const navigate = useNavigate();

	const form = forms?.[0];
	const formik = useFormik<FormValues>({
		enableReinitialize: true,
		initialValues: { responses: [] },
		//fix
		validationSchema: getValidationSchema,
		onSubmit: (values) => {
			console.log("Response submitted:", values);
			toast.success("form has been successfully submitted!");
			createResponse(values);
		},
	});
	console.log(formik.errors);

	const [test, setTest] = useState(0);

	if (isLoadingForms || isLoadingQuestions) return <Spinner />;
	if (submitted) navigate("./submit");
	return (
		<form className='form'>
			<FormHeader form={form} />
			<PreviewQuestions key={test} questions={questions} formik={formik} />
			<FormFooter
				formik={formik}
				setTest={setTest}
				setSubmitted={setSubmitted}
			/>
		</form>
	);
}

export default Preview;
