import Question from "../../components/Question/Question";
// import type { object } from "yup";

const questions = ({ formik }: any) => {
	return (
		<div className='questions'>
			{formik.values.questions.map((question: object, i: number) => (
				<Question key={i} question={question} />
			))}
		</div>
	);
};

export default questions;
