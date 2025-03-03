import Container from "../../../questions/components/Container/Container";

const ResponseCreateEdit = () => {
	return (
		<>
			<Container>
				<div className='container_header'>
					<h1 style={{ fontWeight: "400" }} className='responsesNum'>
						X responses
					</h1>
				</div>
			</Container>
			<Container>
				<div className='container_body'>
					<p style={{ fontWeight: "400", fontSize: "12px", color: "grey" }}>
						No responses. Publish your form to start accepting responses...
					</p>
				</div>
			</Container>
		</>
	);
};

export default ResponseCreateEdit;
