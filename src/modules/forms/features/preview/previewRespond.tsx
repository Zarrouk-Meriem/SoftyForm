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
			shortText?: string;
			longText?: string;
			rate?: number;
			data?: string[];
			selectedOptions?: string[] | string;
		}[];
	}

	const [submitted, setSubmitted] = useState(false);
	const [createResponse] = useCreateResponseMutation();
	const { data: questions, isLoading: isLoadingQuestions } =
		useGetAllQuestionsQuery({});

	const getValidationSchema = Yup.object().shape({
		responses: Yup.array().of(
			Yup.object().shape({
				shortText: Yup.string().when(["type", "is_required"], {
					is: (type: string, is_required: boolean) =>
						type === "Short Text" && is_required,
					then: (schema) =>
						schema
							.max(10, "Please shorten your answer")
							.required("This field is empty"),
					otherwise: (schema) => schema.notRequired(),
				}),

				longText: Yup.string().when(["type", "is_required"], {
					is: (type: string, is_required: boolean) =>
						type === "Paragraph" && is_required,
					then: (schema) =>
						schema
							.min(5, "Your answer is too short")
							.required("This field is empty"),
					otherwise: (schema) => schema.notRequired(),
				}),

				rate: Yup.number()
					.nullable()
					.when(["type", "is_required"], {
						is: (type: string, is_required: boolean) =>
							type === "Rating" && is_required,
						then: (schema) => schema.required("Please provide a rating"),
						otherwise: (schema) => schema.notRequired(),
					}),

				data: Yup.array()
					.of(
						Yup.object().shape({
							name: Yup.string().required("File name is required"),
							uid: Yup.string().required("File UID is required"),
						})
					)
					.when(["type", "is_required"], {
						is: (type: string, is_required: boolean) =>
							type === "File Upload" && is_required,
						then: (schema) =>
							schema
								.min(1, "At least one file is required")
								.required("This field is required"),
						otherwise: (schema) => schema.notRequired(),
					}),

				selectedOptions: Yup.mixed().test(
					"dropdown-or-checkbox",
					"Please select at least one option",
					(value, context) => {
						const { type, is_required } = context.parent;

						if (!is_required) return true;

						if (type === "Dropdown") {
							return typeof value === "string" && value.length > 0;
						}

						if (type === "Checkbox") {
							return Array.isArray(value) && value.length > 0;
						}

						return true;
					}
				),
			})
		),
	});

	const navigate = useNavigate();
	const form = forms?.[0];
	const formik = useFormik<FormValues>({
		enableReinitialize: true,
		initialValues: { responses: [] },
		validationSchema: getValidationSchema,
		onSubmit: (values) => {
			console.log("Response submitted:", values);
			toast.success("form has been successfully submitted!");

			{
				createResponse(values);
				if (submitted) navigate("./submit");
			}
		},
	});

	const [test, setTest] = useState(0);

	if (isLoadingForms || isLoadingQuestions) return <Spinner />;
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
