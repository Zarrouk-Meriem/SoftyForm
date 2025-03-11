import { Pagination } from "antd";
import Container from "../../../questions/components/Container/Container";
import { useGetAllResponsesQuery } from "../../data/responses";
import Spinner from "../../../shared/components/Spinner/Spinner";
import ResponsesQuestions from "../../components/ResponsesQuestions/ResponsesQuestions";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";

const ResponseCreateEdit = () => {
	const { data: submissions, isLoading: isLoadingResponses } =
		useGetAllResponsesQuery({});

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (submissions) {
			setSearchParams(searchParams);
		}
	}, [submissions]);

	// Pagination
	const index: string | null = searchParams.get("page") || "1";

	if (isLoadingResponses) return <Spinner />;
	return (
		<>
			<Container>
				<div className='form_header'>
					<h1 style={{ fontWeight: "400" }} className='responsesNum'>
						{submissions?.length} responses
					</h1>
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
				</div>
			</Container>

			<div className='container-body'>
				{submissions?.length === 0 && (
					<p style={{ fontWeight: "400", fontSize: "12px", color: "grey" }}>
						No responses. Publish your form to start accepting responses...
					</p>
				)}
				{submissions && index && (
					<ResponsesQuestions
						responses={submissions[Number(index) - 1].responses}
					/>
				)}
				{submissions?.[Number(index) - 1] && (
					<span className='submit-time'>
						Submitted{" "}
						{format(
							submissions?.[Number(index) - 1]?.created_at,
							"yyyy/MM/dd HH:MM"
						)}
					</span>
				)}
			</div>
		</>
	);
};

export default ResponseCreateEdit;
