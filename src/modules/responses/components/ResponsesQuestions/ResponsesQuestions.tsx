import { useGetAllQuestionsQuery } from "../../../questions/data/questions";
import Spinner from "../../../shared/components/Spinner/Spinner";
import PreviewQuestion from "../ResponsesQuestion/ResponseQuestion";

type Response = {
	question_id: number;
	rate?: number;
	textAnswer?: string;
	file?: string[];
};

type Props = {
	responses: Response[]; // Ensure it's typed as an array of Response objects
};

const ResponsesQuestions = ({ responses }: Props) => {
	console.log(responses);
	// Check if responses are defined and ensure it's an array
	const responseMap = (responses || []).reduce(
		(acc: Record<number, Response>, item: Response) => {
			if (item?.question_id !== undefined) {
				acc[item.question_id] = item;
			}
			return acc;
		},
		{} as Record<number, Response>
	);
	const { data: questions, isLoading } = useGetAllQuestionsQuery({});

	if (isLoading) return <Spinner />;

	return (
		<div className='questions'>
			{questions?.map((question) => (
				<PreviewQuestion
					key={question.id}
					response={responseMap[question.id]}
					question={question}
				/>
			))}
		</div>
	);
};

export default ResponsesQuestions;
