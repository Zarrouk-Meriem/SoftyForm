// import { setQuestionQuery } from "../../data/questionSlice";

import { useAppDispatch } from "../../../shared/store";
import { questionsApi } from "../../data/questionsApi";
import Question from "../Question/Question";
import { useDroppable } from "@dnd-kit/core";

const Questions = ({ questions }: any) => {
	const { isOver, setNodeRef } = useDroppable({
		id: "droppable",
	});
	const style = {
		color: isOver ? "green" : undefined,
	};
	// const dispatch = useAppDispatch();
	// function handleClick() {
	// 	dispatch(
	// 		questionsApi.util.updateQueryData("getAllQuestions", {}, (draft) => {
	// 			if (draft) {
	// 				draft = [];
	// 				alert(JSON.stringify(draft));
	// 			}
	// 		})
	// 	);
	// }

	return (
		<div
			onClick={(e) => console.log(e.target)}
			className='questions'
			ref={setNodeRef}
			style={style}
		>
			{questions?.map((question: object, index: number) => (
				<Question index={index} key={index} question={question} />
			))}

			{/* <Question index={0} key={0} question={questions[0]} />
			<Question index={1} key={1} question={questions[1]} /> */}
		</div>
	);
};

export default Questions;
