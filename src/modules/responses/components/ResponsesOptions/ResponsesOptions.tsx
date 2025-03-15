// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import {
	MdOutlineRadioButtonChecked,
	MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { useGetOptionsQuery } from "../../../questions/data/optionsData/options";

import Spinner from "../../../shared/components/Spinner/Spinner";

import { Checkbox } from "antd";

type Props = {
	questionId: any;
	question: any;
	response?: any;
};
function ResponsesOptions({ response, question, questionId }: Props) {
	const { data: options, isLoading } = useGetOptionsQuery(questionId);

	const plainOptions = options?.map((option) => option.content);

	if (isLoading) return <Spinner />;

	return (
		<div className='options'>
			{question.type === "Checkbox" && Array.isArray(options) && (
				<Checkbox.Group
					options={plainOptions}
					value={response?.selectedOptions}
					style={{ flexDirection: "column", gap: "0.6rem" }}
					disabled
				/>
			)}
			{question.type === "Dropdown" && Array.isArray(options) && (
				<div className='options' style={{ color: "silver" }}>
					{options?.map((option) => (
						<div className='option' key={option.id}>
							{Array.isArray(response) ? (
								response?.selectedOptions.find(
									(el: any) => el === option.content
								) ? (
									<MdOutlineRadioButtonChecked />
								) : (
									<MdOutlineRadioButtonUnchecked />
								)
							) : response?.selectedOptions === option.content ? (
								<MdOutlineRadioButtonChecked />
							) : (
								<MdOutlineRadioButtonUnchecked />
							)}
							{option.content}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default ResponsesOptions;
