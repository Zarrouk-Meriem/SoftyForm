import { useEffect, useState } from "react";

import Container from "../../../questions/components/Container/Container";
import Input from "../../../shared/components/Input";

import { Avatar, List, Rate } from "antd";

import { BiSolidLike } from "react-icons/bi";
import { FaHeart, FaRegFilePdf, FaStar } from "react-icons/fa";

import { ConfigProvider } from "antd";

import { useFormik } from "formik";
import ResponsesOptions from "../ResponsesOptions/ResponsesOptions";
import { LuFileVideo } from "react-icons/lu";

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
							<ResponsesOptions
								question={question}
								questionId={question.id}
								response={response}
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
									value={response?.rate}
								/>
							</div>
						)}
						{(question.type === "Short Text" ||
							question.type === "Paragraph") && (
							<Input
								className='short-long-input'
								variant='secondary'
								value={response?.textAnswer}
								size='sm'
								name={"textAnswer"}
								type='text'
								question_id={question.id}
								index={index}
								formik={formik}
								disabled
							/>
						)}
						{question.type === "File Upload" && (
							<div className='upload'>
								<List
									bordered
									itemLayout='horizontal'
									dataSource={response?.file}
									renderItem={(file) => (
										<List.Item>
											<List.Item.Meta
												avatar={
													file.type.includes("pdf") ? (
														<FaRegFilePdf
															style={{
																color: "var(--danger)",
																height: "3rem",
																width: "3rem",
															}}
														/>
													) : file.type.includes("video") ? (
														<LuFileVideo
															style={{
																color: "violet",
																height: "3rem",
																width: "3rem",
															}}
														/>
													) : (
														<Avatar
															shape='square'
															size={50}
															src={`https://jqjhjdczamcwscpfhcxi.supabase.co/storage/v1/object/public/upload/${file.name}-${file.uid}`}
														/>
													)
												}
												title={
													<a
														href={`https://jqjhjdczamcwscpfhcxi.supabase.co/storage/v1/object/public/upload/${file.name}-${file.uid}`}
													>
														{file.name}
													</a>
												}
												description={file.type}
											/>
										</List.Item>
									)}
								/>
							</div>
						)}
					</div>
				</div>
			</Container>
		</ConfigProvider>
	);
};

export default ResponseQuestion;
