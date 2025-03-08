import { Button, ConfigProvider } from "antd";
import { useLocation } from "react-router-dom";

function FormFooter({ formik }: any) {
	const { pathname } = useLocation();
	const response = pathname.split("/");
	const isResponse = response[response.length - 1] === "response";

	return (
		<div className='form-footer'>
			<ConfigProvider componentSize={"large"}>
				<Button
					onClick={(e: any) => formik.handleSubmit(e)}
					disabled={!isResponse}
					color='purple'
					variant='solid'
				>
					Submit
				</Button>
				<Button onClick={formik.handleReset} color='purple' variant='filled'>
					Clear form
				</Button>
			</ConfigProvider>
		</div>
	);
}

export default FormFooter;
