import { useGetFormsQuery } from "../../data/forms";

import Spinner from "../../../shared/components/Spinner/Spinner";
import FormHeaderSubmitted from "../../components/FormHeader/FormHeaderSubmitted";

function PreviewSubmitted() {
	const { data: forms, isLoading: isLoadingForms } = useGetFormsQuery(2);
	const form = forms?.[0];

	if (isLoadingForms) return <Spinner />;
	return (
		<form className='form'>
			<FormHeaderSubmitted form={form} />
		</form>
	);
}

export default PreviewSubmitted;
