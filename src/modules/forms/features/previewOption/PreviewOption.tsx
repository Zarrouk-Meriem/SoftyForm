import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

type Props = {
	option:
		| {
				id: number;
				create_at: string;
				content: string;
				question_id: number;
		  }
		| any;

	type: String | "Checkbox" | "Dropdown";
	questionId: any;
};

function PreviewOption({ option, type }: Props) {
	const onChange: CheckboxProps["onChange"] = (e) => {
		console.log(`checked = ${e.target.value}`);
	};
	if (type === "Checkbox")
		return (
			<div className='option'>
				<Checkbox value={option.content} onChange={onChange}>
					{option.content}
				</Checkbox>
			</div>
		);
}
export default PreviewOption;
