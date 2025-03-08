// import { setQuestionQuery } from "../../data/questionSlice";
import Spinner from "../../../shared/components/Spinner/Spinner";
import { useGetAllQuestionsQuery } from "../../../questions/data/questions";
import PreviewQuestion from "../previewQuestion/PreviewQuestion";

const PreviewQuestions = ({ formik }: any) => {
	const { data: questions, isLoading } = useGetAllQuestionsQuery({});
	if (isLoading) return <Spinner />;
	return (
		<div className='questions'>
			{questions?.map((question: any, i: number) => (
				<PreviewQuestion
					key={question.id}
					question={question}
					formik={formik}
					index={i}
				/>
			))}
		</div>
	);
};

export default PreviewQuestions;
