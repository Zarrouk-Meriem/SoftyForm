import { Button, ConfigProvider, Rate } from "antd";
import { useLocation } from "react-router-dom";
type Props = {
	formik: any;
	setSubmitted: any;
	submitted: boolean;
};
function FormFooter({ formik, setSubmitted }: Props) {
	const { pathname } = useLocation();
	const response = pathname.split("/");
	const isResponse = response[response.length - 1] === "response";

	return (
		<div className='form-footer'>
			<ConfigProvider componentSize={"large"}>
				<Button
					onClick={(e: any) => {
						formik.handleSubmit(e);
						setSubmitted(true);
					}}
					disabled={!isResponse || formik.isSubmitting}
					color='purple'
					variant='solid'
				>
					Submit
				</Button>
				<Button
					onClick={() => {
						formik.resetForm({ responses: [] });
						console.log(formik.values);
					}}
					color='purple'
					variant='filled'
				>
					Clear form
				</Button>
			</ConfigProvider>
		</div>
	);
}

export default FormFooter;
