import FormHeader from "../../components/FormHeader/FormHeader";
import Spinner from "../../../shared/components/Spinner/Spinner";

import { useFormik } from "formik";

import Questions from "../../../questions/components/Questions/Questions";
import AddButton from "../../components/AddButton/AddButton";
import { useGetFormsQuery, useUpdateFormMutation } from "../../data/forms";

function Form() {
	const { data: forms, isLoading } = useGetFormsQuery(2);
	const [updateForm] = useUpdateFormMutation();

	const formik = useFormik({
		initialValues: forms?.[0] || {
			id: 0,
			title: "Untitled form",
			description: "",
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log("Form submitted:", values);
			updateForm({ id: values.id, updatedForm: values });
		},
	});
	if (isLoading) return <Spinner />;
	return (
		<form
			onBlur={formik.handleSubmit}
			onSubmit={formik.handleSubmit}
			className='form'
		>
			<FormHeader formik={formik} />
			<AddButton />
			<Questions />
		</form>
	);
}

export default Form;
