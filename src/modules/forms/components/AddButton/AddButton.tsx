import { IoAddCircleOutline } from "react-icons/io5";
import { useCreateQuestionMutation } from "../../../questions/data/questions";

function AddButton() {
	const [createQuestion] = useCreateQuestionMutation();

	return (
		<div onClick={createQuestion} className='create-btn'>
			<IoAddCircleOutline className='add-btn' />
		</div>
	);
}

export default AddButton;
