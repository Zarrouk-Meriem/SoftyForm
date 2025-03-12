// import { setQuestionQuery } from "../../data/questionSlice";

import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Question from "../Question/Question";
import { useState } from "react";
type Props = {
	questions: any;
	setAddPos?: any;
};
const Questions = ({ questions, setAddPos }: Props) => {
	const [activeQuestionId, setActiveQuestionId] = useState(null);
	if (!questions) return null;

	return (
		<div className='questions'>
			<SortableContext
				items={questions.map((q: any) => q.id)}
				strategy={verticalListSortingStrategy}
			>
				{questions?.map((question: object, index: number) => {
					return (
						<Question
							isActive={activeQuestionId === question.id}
							setActiveQuestionId={setActiveQuestionId}
							index={index}
							key={index}
							question={question}
							setAddPos={setAddPos}
						/>
					);
				})}
			</SortableContext>
		</div>
	);
};

export default Questions;
