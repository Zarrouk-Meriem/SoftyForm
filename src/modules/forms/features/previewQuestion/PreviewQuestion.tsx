// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import { useEffect, useState } from "react";

import Container from "../../../questions/components/Container/Container";
import Input from "../../../shared/components/Input";

import { Rate } from "antd";

import { BiSolidLike } from "react-icons/bi";
import { FaHeart, FaStar } from "react-icons/fa";

import { ConfigProvider } from "antd";

import Dragger from "antd/es/upload/Dragger";

import { message } from "antd";

import PreviewOptions from "../previewOptions/PreviewOptions";
import Spinner from "../../../shared/components/Spinner/Spinner";
import {
	useDeleteFileMutation,
	useUploadFileMutation,
} from "../../data/upload";
import { BsInbox } from "react-icons/bs";

type Props = {
	question: any;
	formik?: any;
	index: number;
};
type FileType =
	| "Image"
	| "Document"
	| "Spreadsheet"
	| "PDF"
	| "Video"
	| "Presentation"
	| "Drawing"
	| "Audio";

const PreviewQuestion = ({ question, formik, index }: Props) => {
	const [uploadFile] = useUploadFileMutation();
	const [starsColor, setStarsColor] = useState("#fadb14");
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);

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
	const getAllowedTypes: () => string = function (): string {
		let typesToAllow: any = [];
		question?.specificTypes?.forEach((type: string) => {
			if (types[type as FileType]) {
				typesToAllow = typesToAllow.concat(types[type as FileType]);
			}
		});
		return typesToAllow.join(", ");
	};
	const [deleteFile] = useDeleteFileMutation();
	function handleRemove(file: any) {
		setFileList(fileList.filter((el: any) => el.uid !== file.uid));
		deleteFile(file);
		return true;
	}

	const types = {
		Image: [
			"image/png",
			"image/jpeg",
			"image/jpg",
			"image/webp",
			"image/gif",
			"image/svg+xml",
		],

		Document: [
			"application/msword", // .doc
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
			"text/plain", // .txt
			"application/rtf", // .rtf
			"application/vnd.google-apps.document", // Google Docs (if applicable)
		],

		Spreadsheet: [
			"application/vnd.ms-excel", // .xls
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
			"application/csv", // .csv
			"text/csv", // alternative CSV
			"application/vnd.google-apps.spreadsheet", // Google Sheets (if applicable)
		],

		PDF: ["application/pdf"],

		Video: [
			"video/mp4",
			"video/webm",
			"video/quicktime", // .mov
			"video/x-msvideo", // .avi
			"video/x-matroska", // .mkv
		],

		Presentation: [
			"application/vnd.ms-powerpoint", // .ppt
			"application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
			"application/vnd.google-apps.presentation", // Google Slides (if applicable)
		],

		Drawing: [
			"application/vnd.google-apps.drawing", // Google Drawings
			"image/svg+xml", // SVG drawings
			"application/postscript", // .ai, .eps
		],

		Audio: [
			"audio/mpeg", // .mp3
			"audio/wav",
			"audio/ogg",
			"audio/webm",
			"audio/aac",
		],
	};

	const handleChange = async (info: any) => {
		setLoading(true);
		if (info.file.status === "done") {
			const file = info.file.originFileObj as File;
			if (question.isSpecificTypes) {
				let typesToAllow: any = [];

				question.specificTypes.forEach((type: any) => {
					if (types[type as FileType]) {
						typesToAllow = typesToAllow.concat(types[type as FileType]);
					}
				});

				if (!typesToAllow.includes(file.type)) {
					message.warning("Type de fichier non valide");
					setLoading(false);
					return;
				}
			}

			const maxSize = 1024 * 1024 * question.maxFileSize;
			if (file.size > maxSize) {
				message.error(
					`La taille du fichier dépasse la limite maximale de ${question.maxFileSize} Mo.`
				);
				setLoading(false);
				return;
			}
			try {
				const { data } = await uploadFile(file);
				console.log(file);
				if (data) {
					setFileList([
						...fileList,
						{ uid: file.uid, name: file.name, type: file.type },
					]);
				}
			} catch (error) {
				message.error(`Upload failed`);
				console.error("Upload failed:", error);
			}
		}

		setLoading(false);
	};
	useEffect(() => {
		formik.setFieldValue(
			`responses[${index}].is_required`,
			question.isRequired
		);
		formik.setFieldValue(`responses[${index}].question_id`, question.id);
		formik.setFieldValue(`responses[${index}].type`, question.type);
		if (question.type === "File Upload")
			formik.setFieldValue(`responses[${index}].file`, fileList);
	}, [fileList]);
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
					<div className='container-header question-header'>
						{question.isRequired && (
							<span className='red-star'>
								<b>*</b>
							</span>
						)}
						<h3 className='question'>{question.question}</h3>
					</div>
					<div className='container-body margin-top'>
						{(question.type === "Dropdown" || question.type === "Checkbox") && (
							<PreviewOptions
								formik={formik}
								question={question}
								questionId={question.id}
								index={index}
							/>
						)}
						{question.type === "Rating" && (
							<div className='rating'>
								<Rate
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
									onChange={(value) => {
										formik.setFieldValue(
											`responses[${index}].question_id`,
											question.id
										);
										formik.setFieldValue(
											`responses[${index}].is_required`,
											question.isRequired
										);
										formik.setFieldValue(
											`responses[${index}].type`,
											question.type
										);
										formik.setFieldValue(`responses[${index}].rate`, value);
									}}
								/>
							</div>
						)}
						{(question.type === "Short Text" ||
							question.type === "Paragraph") && (
							<Input
								className='short-long-input'
								variant='secondary'
								placeholder={
									question.type === "Short Text"
										? "Short answer text"
										: "Long answer text"
								}
								size='sm'
								name={question.type === "Short Text" ? "shortText" : "longText"}
								id={question.type === "Short Text" ? "shortText" : "longText"}
								type='text'
								required={question.isRequired}
								formik={formik}
								question_id={question.id}
								index={index}
							/>
						)}
						{question.type === "File Upload" && (
							<div className='upload'>
								<div className='description'>
									<p>
										Upload {question.maxFileNum}
										{question.isSpecificTypes
											? `supported file: ${allowedTypes}`
											: " files"}
										. Max size: {question.maxFileSize}MB.
									</p>
								</div>

								<Dragger
									name='data'
									accept={question.isSpecificTypes ? getAllowedTypes() : "*"}
									maxCount={question.maxFileNum}
									showUploadList={true}
									onChange={(e) => {
										handleChange(e);
										console.log(e);
									}}
									onDrop={(e) => {
										console.log("Dropped files", e.dataTransfer.files);
									}}
									listType='picture'
									customRequest={({ onSuccess }) => {
										setTimeout(() => {
											onSuccess && onSuccess("ok");
										}, 0);
									}}
									onRemove={handleRemove}
								>
									{!loading ? (
										<BsInbox
											style={{
												width: "5rem",
												height: "5rem",
												color: "rgba(192, 192, 192, 0.487)",
											}}
										/>
									) : (
										<Spinner />
									)}
									<p className='ant-upload-text'>
										Click or drag file to this area to upload
									</p>
								</Dragger>
							</div>
						)}
						{formik.errors.responses?.[index as number] &&
						question.isRequired ? (
							<p className='error-message'>
								{...Object.values(formik.errors.responses?.[index as number])}
							</p>
						) : null}
					</div>
				</div>
			</Container>
		</ConfigProvider>
	);
};

export default PreviewQuestion;
