import { Button, ConfigProvider } from "antd";
import { useLocation } from "react-router-dom";
type Props = {
	formik: any;
	setSubmitted: any;
	setTest: any;
};
function FormFooter({ formik, setSubmitted, setTest }: Props) {
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
					onClick={(e) => {
						e.preventDefault();
						setTest((prev: number) => prev + 1);
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
