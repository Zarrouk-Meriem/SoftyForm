import FormHeader from "../../components/FormHeader/FormHeader";
import Spinner from "../../../shared/components/Spinner/Spinner";

import { useFormik } from "formik";
import * as Yup from "yup";

import Questions from "../../../questions/components/Questions/Questions";
import AddButton from "../../components/AddButton/AddButton";
import { useGetFormsQuery, useUpdateFormMutation } from "../../data/forms";
import {
	useGetAllQuestionsQuery,
	useUpdateQuestionMutation,
} from "../../../questions/data/questions";
import { useEffect, useState } from "react";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function Form() {
	const { data: forms, isLoading } = useGetFormsQuery(2);
	const { data: questions, isLoading: isLoadingQuestions } =
		useGetAllQuestionsQuery({});

	const [data, setData] = useState(questions);
	const [addPos, setAddPos] = useState({});

	useEffect(() => {
		if (questions) setData(questions);
	}, [questions]);

	const [updateForm] = useUpdateFormMutation();
	const dataQuestion = questions;
	let newQuestions: any = [];
	dataQuestion?.map(
		(question) => (newQuestions[`${question.id}`] = { ...question })
	);

	const validationSchema = Yup.object().shape({
		id: Yup.number().integer().min(0, "Invalid ID").required("ID is required"),
		title: Yup.string()
			.min(3, "Title must be at least 3 characters")
			.required("Title is required"),
		description: Yup.string()
			.min(5, "Description must be at least 5 characters")
			.nullable(),
	});
	const formik = useFormik({
		initialValues: forms?.[0] || {
			id: 0,
			title: "Untitled form",
			description: "",
		},
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log("Form submitted:", values);
			updateForm({ id: values.id, updatedForm: values });
		},
	});
	const [updateQuestion] = useUpdateQuestionMutation();

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setData((prevItems: any) => {
				const oldIndex = prevItems.findIndex(
					(item: any) => item.id === active.id
				);
				const newIndex = prevItems.findIndex(
					(item: any) => item.id === over.id
				);

				return arrayMove(prevItems, oldIndex, newIndex);
			});
		}
	}

	useEffect(() => {
		data?.map((question, i) => {
			updateQuestion({
				id: question.id,
				updatedQuestion: { order_number: i + 1 },
			});
		});
	}, [data]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	if (isLoading || isLoadingQuestions) return <Spinner />;

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<form
				onBlur={formik.handleSubmit}
				onSubmit={formik.handleSubmit}
				className='form'
			>
				<FormHeader formik={formik} />
				<AddButton addPos={addPos} />
				<Questions questions={data} setAddPos={setAddPos} />
			</form>
		</DndContext>
	);
}

export default Form;

//questions component is the droppable and each question is the draggable
