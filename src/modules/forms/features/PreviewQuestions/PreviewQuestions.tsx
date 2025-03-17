import PreviewQuestion from "../previewQuestion/PreviewQuestion";

const PreviewQuestions = ({ formik, questions }: any) => {
	return (
		<div className='questions'>
			{questions?.map((question: any, i: number) => {
				<PreviewQuestion
					key={question.id}
					question={question}
					formik={formik}
					index={i}
				/>;
			})}
		</div>
	);
};

export default PreviewQuestions;
