import { useEffect, useState } from "react";

import Container from "../../../questions/components/Container/Container";
import Input from "../../../shared/components/Input";

import { Rate } from "antd";

import { BiSolidLike } from "react-icons/bi";
import { FaHeart, FaStar } from "react-icons/fa";

import { ConfigProvider } from "antd";

import PreviewOptions from "../../../forms/features/previewOptions/PreviewOptions";
import { useFormik } from "formik";

type Props = {
	question: any;
	response: any;
	index?: number;
};
interface FormValues {
	responses: {
		question_id: number;
		textAnswer?: string;
		rate?: number;
		file?: string[];
	}[];
}

const ResponseQuestion = ({ response, question, index }: Props) => {
	const [starsColor, setStarsColor] = useState("#fadb14");
	console.log(response);
	const formik = useFormik<FormValues>({
		enableReinitialize: true,
		initialValues: { responses: [] },

		onSubmit: (values) => {
			console.log("Response submitted:", values);
		},
	});

	useEffect(() => {
		const newColor =
			question.starsKind === "likes"
				? "blue"
				: question.starsKind === "hearts"
					? "red"
					: "#fadb14";

		setStarsColor(newColor);
	}, [question.starsKind]);

	let allowedTypes = "";
	if (question.specificTypes) {
		question.specificTypes.map((type: string, i: number) => {
			if (i !== question.specificTypes.length - 1)
				allowedTypes = allowedTypes + type + ", ";
			else allowedTypes = allowedTypes.slice(0, -1) + " or " + type;
		});
	}

	return (
		<ConfigProvider
			theme={{
				components: {
					Rate: {
						starColor: starsColor,
						starSize: 35,
					},
				},
			}}
		>
			<Container>
				<div>
					<div className='container-header'>
						<h3 className='question'>{question.question}</h3>
					</div>
					<div className='container-body'>
						{(question.type === "Dropdown" || question.type === "Checkbox") && (
							<PreviewOptions
								question={question}
								questionId={question.id}
								index={index}
							/>
						)}
						{question.type === "Rating" && (
							<div className='rating'>
								<Rate
									disabled
									count={question.starsNum * 1 || 5}
									character={
										question.starsKind === "likes" ? (
											<BiSolidLike />
										) : question.starsKind === "hearts" ? (
											<FaHeart />
										) : (
											<FaStar />
										)
									}
								/>
							</div>
						)}
						{(question.type === "Short Text" ||
							question.type === "Paragraph") && (
							<Input
								className='short-long-input'
								variant='secondary'
								defaultValue='hello'
								size='sm'
								name={"textAnswer"}
								type='text'
								question_id={question.id}
								index={index}
								formik={formik}
								disabled
							/>
							// <input type='text' />
						)}
						{question.type === "File Upload" && <div className='upload'></div>}
					</div>
				</div>
			</Container>
		</ConfigProvider>
	);
};

export default ResponseQuestion;
