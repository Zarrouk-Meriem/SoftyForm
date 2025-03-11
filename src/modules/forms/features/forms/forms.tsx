import FormHeader from "../../components/FormHeader/FormHeader";
import Spinner from "../../../shared/components/Spinner/Spinner";

import { useFormik } from "formik";
import * as Yup from "yup";

import Questions from "../../../questions/components/Questions/Questions";
import AddButton from "../../components/AddButton/AddButton";
import { useGetFormsQuery, useUpdateFormMutation } from "../../data/forms";
import { DragDropContext } from "react-beautiful-dnd";
import { useGetAllQuestionsQuery } from "../../../questions/data/questions";
import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Question from "../../../questions/components/Question/Question";

function Form() {
	const { data: forms, isLoading } = useGetFormsQuery(2);
	const { data: questions, isLoading: isLoadingQuestions } =
		useGetAllQuestionsQuery({});

	const [data, setData] = useState(questions);

	useEffect(() => {
		if (questions) setData(questions);
	}, [questions]);

	const [updateForm] = useUpdateFormMutation();
	const dataQuestion = questions;
	let newQuestions: any = [];
	dataQuestion?.map(
		(question) => (newQuestions[`${question.id}`] = { ...question })
	);
	const [state, setState] = useState({
		questions: newQuestions,
		columns: {
			"0": {
				id: 0,
				title: "questions",
				questionIds: questions?.map((question) => `${question.id}`),
			},
		},
		columnOrder: ["0"],
	});
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

	function onDragEnd(result: any) {
		const { destination, source, draggableId } = result;
		console.log(source, destination);
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;
		const column = state.columns["0"];

		const newQuestionIds = Array.from(column.questionIds);

		newQuestionIds.splice(source.index, 1);
		newQuestionIds.splice(destination.index, 0, draggableId);
		const newColumn = {
			...column,
			questionIds: newQuestionIds,
		};
		setState({
			...state,
			columns: {
				...state.columns,
				[newColumn.id]: newColumn,
			},
		});
	}
	//DND
	function handleDragEnd(event) {
		// const { over } = event;
		// If the item is dropped over a container, set it as the parent
		// otherwise reset the parent to `null`
		// setParent(over ? over.id : null);
	}
	if (isLoading || isLoadingQuestions) return <Spinner />;
	return (
		<DndContext onDragEnd={handleDragEnd}>
			<form
				onBlur={formik.handleSubmit}
				onSubmit={formik.handleSubmit}
				className='form'
			>
				<FormHeader formik={formik} />
				<AddButton />
				<Questions questions={data} />
			</form>
		</DndContext>
	);
}

export default Form;

//questions component is the droppable and each question is the draggable
