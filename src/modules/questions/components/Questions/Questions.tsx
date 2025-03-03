// import { setQuestionQuery } from "../../data/questionSlice";
import Spinner from "../../../shared/components/Spinner/Spinner";
import { useGetAllQuestionsQuery } from "../../data/questions";
import Question from "../Question/Question";

const Questions = () => {
	const { data: questions, isLoading } = useGetAllQuestionsQuery({});

	if (isLoading) return <Spinner />;
	return (
		<div className='questions'>
			{questions?.map((question: object, i: number) => (
				<Question key={i} question={question} />
			))}
		</div>
	);
};

export default Questions;
