import { useGetOptionsQuery } from "../../../questions/data/optionsData/options";

import Spinner from "../../../shared/components/Spinner/Spinner";

import { Checkbox, Select } from "antd";
import { useState } from "react";

type Props = {
	formik?: any;
	questionId: any;
	index?: number;
	question: any;
};
function PreviewOptions({ formik, question, questionId, index }: Props) {
	const [checkedOptions, setCheckedOptions] = useState([]);

	const { data: options, isLoading } = useGetOptionsQuery(questionId);

	interface Option {
		value: string;
		label: string;
	}
	const plainOptions = options?.map((option) => option.content);
	let cascaderOptions: Array<Option> = [];
	options?.map((option) =>
		cascaderOptions.push({ value: option.content, label: option.content })
	);

	if (isLoading) return <Spinner />;

	return (
		<div className='options'>
			{question.type === "Checkbox" && Array.isArray(options) && (
				<Checkbox.Group
					options={plainOptions}
					value={checkedOptions}
					onChange={(values) => {
						setCheckedOptions(values);
						formik.setFieldValue(
							`responses[${index}].question_id`,
							question.id
						);
						formik.setFieldValue(`responses[${index}].selectedOptions`, values);
					}}
					style={{ flexDirection: "column", gap: "0.6rem" }}
				/>
			)}
			{question.type === "Dropdown" && Array.isArray(options) && (
				<Select
					onChange={(value) => {
						formik.setFieldValue(
							`responses[${index}].question_id`,
							question.id
						);
						formik.setFieldValue(`responses[${index}].selectedOptions`, value);
					}}
					style={{ width: 160, height: 50, borderRadius: 0 }}
					options={cascaderOptions}
					placeholder={"select an option"}
				/>
			)}
		</div>
	);
}

export default PreviewOptions;
