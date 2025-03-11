import { Button, ConfigProvider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {
	formik: any;
	setSubmitted: any;
	submitted: boolean;
};
function FormFooter({ formik, setSubmitted }: Props) {
	const { pathname } = useLocation();
	const response = pathname.split("/");
	const isResponse = response[response.length - 1] === "response";
	const navigate = useNavigate();
	return (
		<div className='form-footer'>
			<ConfigProvider componentSize={"large"}>
				<Button
					onClick={(e: any) => {
						formik.handleSubmit(e);
						setSubmitted(true);
						navigate("");
					}}
					disabled={!isResponse || formik.isSubmitting}
					color='purple'
					variant='solid'
				>
					Submit
				</Button>
				<Button
					onClick={(e) => {
						formik.resetForm(e);
						console.log("form clicked");
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
