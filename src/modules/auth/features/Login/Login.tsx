import { useAppDispatch } from "../../../shared/store";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../../../shared/components/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [submitting, setSubmitting] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			email: "admin@gmail.com",
			password: "12345678",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required("Email is required"),
			password: Yup.string()
				.required("Password is required")
				.min(6, "Password is too short!"),
		}),
		onSubmit: (values) => {
			navigate("/form/questions");
		},
	});

	return (
		<div className='login_feature'>
			<form className='login_feature_container' onSubmit={formik.handleSubmit}>
				<h1 className='title'>Login</h1>

				<div className='login_feature_container_inputs'>
					<Input
						name='email'
						formik={formik}
						variant='secondary'
						placeholder='Enter your email'
						label='Email'
						required={true}
					/>

					<Input
						name='password'
						formik={formik}
						variant='secondary'
						placeholder='Enter your password'
						label='Password'
						type='password'
						required={true}
					/>
				</div>

				<button
					type='submit'
					className='login_feature_container_btn'
					disabled={submitting}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
