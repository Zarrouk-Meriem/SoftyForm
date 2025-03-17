import { useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import Input from "../../../shared/components/Input";
import Options from "../Options/Options";
import { useFormik } from "formik";

import {
	MdOutlineShortText,
	MdOutlineSquare,
	MdOutlineStarBorderPurple500,
} from "react-icons/md";
import { Rate } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiSolidLike } from "react-icons/bi";
import { FaHeart, FaStar } from "react-icons/fa";
import { CgSoftwareUpload } from "react-icons/cg";
import { TbCheckbox } from "react-icons/tb";
import { IoIosArrowDropdown } from "react-icons/io";
import { BsTextParagraph } from "react-icons/bs";
import { Checkbox, Col, ConfigProvider, Row, Select, Switch } from "antd";

import {
	useCreateOptionMutation,
	useGetOptionsQuery,
} from "../../data/optionsData/options";
import {
	useDeleteQuestionMutation,
	useDuplicateQuestionMutation,
	useUpdateQuestionMutation,
} from "../../data/questions";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";

type Props = {
	question: any;
	index?: number;
	isActive?: boolean;
	setActiveQuestionId?: any;
	setAddPos?: any;
	activeId?: any;
};

const Question = ({
	question,
	isActive,
	setActiveQuestionId,
	setAddPos,
	activeId,
}: Props) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useSortable({
			id: question.id,
		});

	const [deleteQuestion] = useDeleteQuestionMutation();
	const [updateQuestion] = useUpdateQuestionMutation();
	const [duplicateQuestion] = useDuplicateQuestionMutation();
	const [createOption, isLoading] = useCreateOptionMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: question,
		validationSchema: Yup.object().shape({
			question: Yup.string().required("Question is required"),
		}),
		onSubmit: (values) => {
			console.log("Question submitted:", values);
			updateQuestion({ id: values.id, updatedQuestion: values });
		},
	});
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();

			console.log(inputRef);
		}
	}, [question]);

	const [starsColor, setStarsColor] = useState("#fadb14");
	const [isSpecific, setIsSpecific] = useState(formik.values.isSpecificTypes);
	const { data: options } = useGetOptionsQuery(question.id);

	useEffect(() => {
		formik.setValues(question);
	}, []);
	useEffect(() => {
		const newColor =
			formik.values.starsKind === "likes"
				? "blue"
				: formik.values.starsKind === "hearts"
					? "red"
					: "#fadb14";

		setStarsColor(newColor);
	}, [formik.values.starsKind]);
	// Function to set this question as active

	const starsOptions = [
		{
			value: "likes",
			label: <BiSolidLike className='icon' style={{ color: "blue" }} />,
		},
		{
			value: "hearts",
			label: <FaHeart className='icon' style={{ color: "red" }} />,
		},
		{
			value: "stars",
			label: <FaStar className='icon' style={{ color: "#fadb14" }} />,
		},
	];
	const generateOptions = () => {
		let options = [];
		for (let i = 0; i < 10; i++) {
			const option = {
				value: i + 1,
				label: i + 1 + "",
			};
			options.push(option);
		}
		return options;
	};
	const starsNumOptions = generateOptions();
	const typeOptions = [
		{
			value: "Short Text",
			label: (
				<div className='option'>
					<MdOutlineShortText className='icon' /> Short Text
				</div>
			),
		},
		{
			value: "Paragraph",
			label: (
				<div className='option'>
					<BsTextParagraph className='icon' /> Paragraph
				</div>
			),
		},
		{
			value: "Dropdown",
			label: (
				<div className='option'>
					<IoIosArrowDropdown className='icon' /> Dropdown
				</div>
			),
		},
		{
			value: "Checkbox",
			label: (
				<div className='option'>
					<TbCheckbox className='icon' /> Checkbox
				</div>
			),
		},
		{
			value: "File Upload",
			label: (
				<div className='option'>
					<CgSoftwareUpload className='icon' /> File Upload
				</div>
			),
		},
		{
			value: "Rating",
			label: (
				<div className='option'>
					<MdOutlineStarBorderPurple500 className='icon' /> Rating
				</div>
			),
		},
	];

	function handleAddOption(e: any) {
		createOption(formik.values.id);
		console.log((e.target as HTMLElement).closest(".option"));
	}

	const style = {
		transform: CSS.Transform.toString(transform),
		animation: isDragging ? "none" : "bounceBack 200ms ease-in-out",
	};

	const handleClick = () => {
		setActiveQuestionId(question.id);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			setAddPos(
				(event.target as HTMLElement)
					.closest(".question")
					?.getBoundingClientRect()
			);
			if (!(event.target as HTMLElement).closest(".question")) {
				setActiveQuestionId(null);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

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
			<div
				id={question.id}
				className={`question  container ${isActive ? "active" : ""} `}
				ref={setNodeRef}
				data-dragging={isDragging}
				{...attributes}
				onSubmit={(e: any) => formik.handleSubmit(e)}
				onBlur={(e: any) => formik.handleSubmit(e)}
				onClick={handleClick}
				style={style}
			>
				<RiDraggable
					className={`drag-icon question-item ${activeId === question.id ? "is-dragging" : ""}`}
					style={{
						cursor:
							activeId === question.id
								? "grabbing !important"
								: "grab !important",
					}}
					{...listeners}
				/>
				<div className='container-header'>
					<Input
						className='question-input'
						variant='secondary'
						placeholder='Question'
						size='sm'
						name='question'
						label=''
						type='text'
						required={false}
						formik={formik}
						ref={inputRef} // Attach the ref to the input field
						disabled={isLoading.isLoading}
					/>
					<Select
						className='container-header_select'
						id='type'
						value={formik.values.type || "Paragraph"}
						onChange={(value) => {
							formik.setFieldValue("type", value || value.value);
						}}
						style={{ width: 400 }}
						options={typeOptions}
						disabled={isLoading.isLoading}
					/>
				</div>
				<div className='container-body'>
					{(formik.values.type === "Dropdown" ||
						formik.values.type === "Checkbox") && (
						<>
							<Options formik={formik} questionId={formik.values.id} />

							<div className='options-adder'>
								{formik.values.type === "Checkbox" && (
									<MdOutlineSquare className='option-icon' />
								)}

								{formik.values.type === "Dropdown" && (
									<p className='option-icon'>
										{`${(options?.length ?? 1) + 1}` || 1}.
									</p>
								)}
								<div
									onClick={handleAddOption}
									style={{ background: "0", color: "grey", fontSize: "12px" }}
									className='add-option'
								>
									Add option
								</div>
							</div>
						</>
					)}
					{formik.values.type === "Rating" && (
						<div className='rating'>
							<div className='selects'>
								<Select
									value={formik.values.starsNum || 5}
									onChange={(value) => formik.setFieldValue("starsNum", value)}
									id='starsNum'
									style={{ width: 55 }}
									options={starsNumOptions}
									disabled={isLoading.isLoading}
								/>
								<Select
									value={formik.values.starsKind}
									onChange={(value) => formik.setFieldValue("starsKind", value)}
									id='starsKind'
									defaultValue={"stars"}
									style={{ width: 60 }}
									options={starsOptions}
									disabled={isLoading.isLoading}
								/>
							</div>

							<Rate
								disabled
								count={formik.values.starsNum * 1 || 5}
								character={
									formik.values.starsKind === "likes" ? (
										<BiSolidLike />
									) : formik.values.starsKind === "hearts" ? (
										<FaHeart />
									) : (
										<FaStar />
									)
								}
							/>
						</div>
					)}
					{(formik.values.type === "Short Text" ||
						formik.values.type === "Paragraph") && (
						<Input
							className='short-long-input'
							variant='secondary'
							placeholder={
								formik.values.type === "Short Text"
									? "Short answer text"
									: "Long answer text"
							}
							size='sm'
							name={
								formik.values.type === "Short Text" ? "text-short" : "text-long"
							}
							type='text'
							required={false}
							formik={formik}
							disabled={true}
						/>
					)}
					{formik.values.type === "File Upload" && (
						<div className='upload'>
							<div className='constraints'>
								<div className='constraint'>
									<p>Allow only specific file types</p>
									<Switch
										checked={formik.values.isSpecificTypes}
										onChange={(value) => {
											formik.setFieldValue("isSpecificTypes", value);
											setIsSpecific(value);
										}}
										className='switcher'
									/>
								</div>
								{isSpecific && (
									<Checkbox.Group
										className='checkboxGroup'
										style={{ width: "100%" }}
										onChange={(change) =>
											formik.setFieldValue("specificTypes", change)
										}
										value={formik.values.specificTypes}
									>
										<Row>
											<Col span={8}>
												<Checkbox value='Document'>Document</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Spreadsheet'>Spreadsheet</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='PDF'>PDF</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Video'>Video</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Presentation'>Presentation</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Drawing'>Drawing</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Image'>Image</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value='Audio'>Audio</Checkbox>
											</Col>
										</Row>
									</Checkbox.Group>
								)}
								<div className='constraint'>
									<p>Maximum number of files</p>
									<Select
										disabled={isLoading.isLoading}
										value={formik.values.maxFileNum}
										className='select-maxNumFile'
										options={[
											{ value: 1, label: "1" },
											{ value: 5, label: "5" },
											{ value: 10, label: "10" },
										]}
										onChange={(value) =>
											formik.setFieldValue("maxFileNum", value)
										}
									/>
								</div>
								<div className='constraint'>
									<p>Maximum file size</p>
									<Select
										disabled={isLoading.isLoading}
										value={formik.values.maxFileSize}
										className='select-maxNumFile'
										options={[
											{ value: 1, label: "1 MB" },
											{ value: 10, label: "10 MB" },
											{ value: 100, label: "100 MB" },
											{ value: 1000, label: "1 GB" },
											{ value: 10000, label: "10 GB" },
										]}
										onChange={(value) =>
											formik.setFieldValue("maxFileSize", value)
										}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='container-footer'>
					<div className='footer'>
						<button
							className='duplicate-btn '
							onClick={(e) => {
								e.preventDefault();
								duplicateQuestion(formik.values);
							}}
						>
							<HiOutlineDuplicate className='duplicate btn' />
						</button>
						<button
							className='delete-btn '
							onClick={(e) => {
								e.preventDefault();
								deleteQuestion(formik.values.id);
							}}
						>
							<FiTrash2 className='delete btn' />
						</button>
						<div className='required'>
							<p>Required</p>
							<Switch
								checked={formik.values.isRequired}
								onChange={(checked) =>
									formik.setFieldValue("isRequired", checked)
								}
								className='switcher'
							/>
						</div>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default Question;
