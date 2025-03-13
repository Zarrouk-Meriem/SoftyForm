import { Pagination } from "antd";
import Container from "../../../questions/components/Container/Container";
import { useGetAllResponsesQuery } from "../../data/responses";
import Spinner from "../../../shared/components/Spinner/Spinner";
import ResponsesQuestions from "../../components/ResponsesQuestions/ResponsesQuestions";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";
import { useGetFormsQuery } from "../../../forms/data/forms";

const ResponseCreateEdit = () => {
	const { data: submissions, isLoading: isLoadingResponses } =
		useGetAllResponsesQuery({});
	const { data: forms, isLoading: isLoadingForms } = useGetFormsQuery(2);
	const form = forms?.[0];
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (submissions) {
			setSearchParams(searchParams);
		}
	}, [submissions]);

	// Pagination
	const index: string | null = searchParams.get("page") || "1";

	if (isLoadingResponses || isLoadingForms) return <Spinner />;
	return (
		<form className='form'>
			<Container className='form_header_container '>
				<div className='form_header'>
					<h1 style={{ fontWeight: "400" }} className='responsesNum'>
						{form.isPublished ? `${submissions?.length} responses` : form.title}
					</h1>
					{form.isPublished && (
						<Pagination
							defaultCurrent={1}
							simple={{ readOnly: true }}
							defaultPageSize={1}
							total={submissions?.length}
							onChange={(page: number) => {
								searchParams.set("page", page + "");
								setSearchParams(searchParams);
							}}
						/>
					)}
					{(submissions?.length === 0 || !form.isPublished) && (
						<p style={{ fontWeight: "400", fontSize: "12px", color: "grey" }}>
							No responses. Publish your form to start accepting responses...
						</p>
					)}
				</div>
			</Container>

			<div className='container-body no-margin-top'>
				{submissions && index && form.isPublished && (
					<ResponsesQuestions
						responses={submissions[Number(index) - 1]?.responses}
					/>
				)}
				{submissions?.[Number(index) - 1] && form.isPublished && (
					<span className='submit-time'>
						Submitted{" "}
						{format(
							submissions?.[Number(index) - 1]?.created_at,
							"yyyy/MM/dd HH:MM"
						)}
					</span>
				)}
			</div>
		</form>
	);
};

export default ResponseCreateEdit;
