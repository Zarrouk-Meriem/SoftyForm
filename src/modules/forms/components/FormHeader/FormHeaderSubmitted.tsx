import { Link } from "react-router-dom";

type Props = {
	form?: any;
};
function FormHeaderSubmitted({ form }: Props) {
	return (
		<div className='form_header_container '>
			<div className='form_header_container_input'>
				<h1
					style={{
						fontWeight: "500",
						display: "inline",
					}}
				>
					{form.title}
				</h1>
			</div>
			<div className='form_header_container_input'>
				<h4 style={{ fontWeight: "400", fontSize: "12px" }}>
					Your response has been recorded.
				</h4>
				<Link to={form.responderLink}>Submit another response</Link>
			</div>
		</div>
	);
}

export default FormHeaderSubmitted;
