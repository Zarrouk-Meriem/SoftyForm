import { IoAddCircleOutline } from "react-icons/io5";
import { useCreateQuestionMutation } from "../../../questions/data/questions";
type Props = {
	addPos?: {
		right?: number;
		top?: number;
		bottom?: number;
		left?: number;
		width?: number;
		height?: number;
	};
};
function AddButton({
	addPos = {
		top: 120.46875,
		right: 0,
		bottom: 168.46875,
	},
}: Props) {
	const [createQuestion] = useCreateQuestionMutation();
	let { right, top, bottom, left, width } = addPos;

	return (
		<div
			style={
				addPos && top && left && bottom && width
					? {
							right: `${right}px`,
							left: `${width + 8}px`,

							top: `${top - 120}px`,
							bottom: `${bottom}px`,
							transition: "all 0.2s ease-out",
						}
					: {}
			}
			onClick={createQuestion}
			className='create-btn'
		>
			<IoAddCircleOutline className='add-btn' />
		</div>
	);
}

export default AddButton;
