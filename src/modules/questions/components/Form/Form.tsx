import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../shared/store";
import { useNavigate } from "react-router-dom";

type Props = {
	isEdit: boolean;
};

const Form = ({ isEdit }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { todo } = useAppSelector((state) => state.todos);

	let initialValues = {
		id: "",
		title: "",
		description: "",
		completed: false,
	};

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object().shape({
			title: Yup.string().required("Title is required"),
		}),
		onSubmit: (values) => {
			if (isEdit) {
				dispatch(
					updateTodo({ id: String(values?.id || ""), updatedData: values })
				)
					.unwrap()
					.then(() => {
						navigate("/todos");
					});
			} else {
				dispatch(createTodo(values))
					.unwrap()
					.then(() => {
						navigate("/todos");
					});
			}
		},
	});

	const handleRadioChange = (event: { target: { value: string } }) => {
		const value = event.target.value === "true";
		formik.setFieldValue("completed", value);
	};

	useEffect(() => {
		if (todo) {
			formik.setFieldValue("id", todo.id);
			formik.setFieldValue("title", todo.title);
			formik.setFieldValue("description", todo.description);
			formik.setFieldValue("completed", todo.completed);
		}
	}, [todo]);

	return (
		<form className='todo-form' onSubmit={formik.handleSubmit}>
			{todo && <p>ID : {todo?.id}</p>}

			<div>
				<input
					type='text'
					name='title'
					placeholder='Title'
					value={formik?.values.title}
					onChange={formik.handleChange}
				/>
				{formik.touched.title && formik.errors.title ? (
					<small className='error-message'>{formik.errors.title}</small>
				) : null}
			</div>

			<textarea
				name='description'
				placeholder='Description (optional)'
				value={formik?.values.description}
				onChange={formik.handleChange}
				className='non-resizable'
			/>

			<div className='radio-group'>
				<label>
					<input
						type='radio'
						name='completed'
						value='true'
						checked={formik.values.completed === true}
						onChange={handleRadioChange}
					/>
					Completed
				</label>
				<label>
					<input
						type='radio'
						name='completed'
						value='false'
						checked={formik.values.completed === false}
						onChange={handleRadioChange}
					/>
					Not Completed
				</label>
			</div>

			<button type='submit'>Submit</button>
		</form>
	);
};

export default Form;
