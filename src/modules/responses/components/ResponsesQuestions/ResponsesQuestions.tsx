import { useGetAllQuestionsQuery } from "../../../questions/data/questions";
import Spinner from "../../../shared/components/Spinner/Spinner";
import PreviewQuestion from "../ResponsesQuestion/ResponseQuestion";

type Response = {
	question_id: number;
	rate?: number;
	shortText?: string;
	longText?: string;
	file?: string[];
	selectedOptions?: [] | "";
};

type Props = {
	responses: Response[];
};

const ResponsesQuestions = ({ responses }: Props) => {
	const { data: questions, isLoading } = useGetAllQuestionsQuery({});

	if (isLoading) return <Spinner />;

	return (
		<div className='questions'>
			{questions?.map(
				(question) =>
					question.question && (
						<PreviewQuestion
							key={question.id}
							response={responses.find((el) => el?.question_id === question.id)}
							question={question}
						/>
					)
			)}
		</div>
	);
};

export default ResponsesQuestions;
