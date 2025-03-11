// import { setQuestionQuery } from "../../data/questionSlice";

import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Question from "../Question/Question";

const Questions = ({ questions }: any) => {
	if (!questions) return null;

	console.log("****");
	return (
		<div className='questions'>
			<SortableContext
				items={questions.map((q: any) => q.id)}
				strategy={verticalListSortingStrategy}
			>
				{questions?.map((question: object, index: number) => {
					console.log(question);
					return <Question index={index} key={index} question={question} />;
				})}
			</SortableContext>
		</div>
	);
};

export default Questions;
