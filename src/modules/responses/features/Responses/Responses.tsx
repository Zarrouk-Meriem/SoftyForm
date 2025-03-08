import { Pagination } from "antd";
import Container from "../../../questions/components/Container/Container";
import { useGetAllQuestionsQuery } from "../../../questions/data/questions";
import { useGetAllResponsesQuery } from "../../data/responses";
import Spinner from "../../../shared/components/Spinner/Spinner";
import ResponsesQuestions from "../../components/ResponsesQuestions/ResponsesQuestions";

const ResponseCreateEdit = () => {
	const { data: submissions, isLoading: isLoadingResponses } =
		useGetAllResponsesQuery({});
	const { data: questions, isLoading: isLoadingQuestions } =
		useGetAllQuestionsQuery({});

	console.log("_____", questions);
	console.log(submissions);
	if (isLoadingQuestions || isLoadingResponses) return <Spinner />;
	return (
		<>
			<Container>
				<div className='container_header'>
					<h1 style={{ fontWeight: "400" }} className='responsesNum'>
						{submissions?.length} responses
					</h1>
					<Pagination simple defaultCurrent={2} total={submissions?.length} />
				</div>
			</Container>

			<div className='container_body'>
				{submissions?.length === 0 && (
					<p style={{ fontWeight: "400", fontSize: "12px", color: "grey" }}>
						No responses. Publish your form to start accepting responses...
					</p>
				)}
				{submissions && (
					<ResponsesQuestions responses={submissions.responses} />
				)}
			</div>
		</>
	);
};

export default ResponseCreateEdit;
