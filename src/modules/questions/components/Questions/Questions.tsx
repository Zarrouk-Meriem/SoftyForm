// import { setQuestionQuery } from "../../data/questionSlice";
import { Droppable } from "react-beautiful-dnd";
import Spinner from "../../../shared/components/Spinner/Spinner";
import { useGetAllQuestionsQuery } from "../../data/questions";
import Question from "../Question/Question";

const Questions = () => {
	const { data: questions, isLoading } = useGetAllQuestionsQuery({});

	if (isLoading) return <Spinner />;
	return (
		<Droppable droppableId='2'>
			{(provided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className='questions'
				>
					{provided.placeholder}
					{questions?.map((question: object, index: number) => (
						<Question index={index} key={index} question={question} />
					))}
				</div>
			)}
		</Droppable>
	);
};

export default Questions;
