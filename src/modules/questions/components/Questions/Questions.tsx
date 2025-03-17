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
	activeId: any;
};
type Question = {
	id: number;
	created_at: string;
	type: string;
	isRequired: true;
	starsNum: number;
	starsKind: string;
	isSpecificTypes: false;
	specificTypes: Array<string>;
	maxFileNum: number;
	maxFileSize: number;
	form_id: number;
	order_number: number;
	question: string;
};
const Questions = ({ questions, setAddPos, activeId }: Props) => {
	const [activeQuestionId, setActiveQuestionId] = useState(null);
	if (!questions) return null;

	return (
		<div className='questions'>
			<SortableContext
				items={questions.map((q: any) => q.id)}
				strategy={verticalListSortingStrategy}
			>
				{questions?.map((question: Question, index: number) => {
					return (
						<Question
							isActive={activeQuestionId === question.id}
							setActiveQuestionId={setActiveQuestionId}
							index={index}
							key={index}
							question={question}
							setAddPos={setAddPos}
							activeId={activeId}
						/>
					);
				})}
			</SortableContext>
		</div>
	);
};

export default Questions;
