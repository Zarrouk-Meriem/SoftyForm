// import ThemeToggler from "../ThemeToggler/ThemeToggler";
// import LanguageToggler from "../LanguageToggler/LanguageToggler";
import { BsArchive, BsArchiveFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { SiFormspree } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import {
	useGetFormsQuery,
	useUpdateFormMutation,
} from "../../../forms/data/forms";

import { TbSettings } from "react-icons/tb";
import PreviewNavbar from "./PreviewNavbar";
import { Button, Input, Modal, Popover, Space } from "antd";
import { LuLink } from "react-icons/lu";
import Spinner from "../Spinner/Spinner";
import { FaEye } from "react-icons/fa";
import { useGetAllResponsesQuery } from "../../../responses/data/responses";
const Navbar = () => {
	const { pathname } = useLocation();

	const isResponse =
		pathname.includes("response") && !pathname.includes("responses");
	const isPreview = pathname.includes("preview");

	const originLink = window.location.origin;
	// generating a unique link

	const KEY = uuidv4();
	const UNIQUE_LINK = `${originLink}/form/${KEY}/response`;
	const [updateForm] = useUpdateFormMutation();
	const { data: forms, isLoading } = useGetFormsQuery(2);
	const { data: submissions, isLoading: isLoadingResponses } =
		useGetAllResponsesQuery({});
	const form = forms?.[0];
	const [isStarred, setIsStarred] = useState(form?.isStarred);
	const [isArchived, setIsArchived] = useState(form?.isArchived);
	const [isPublished, setIsPublished] = useState(form?.isPublished);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setIsStarred(form?.isStarred);
		setIsArchived(form?.isArchived);
		setIsPublished(form?.isPublished);
	}, [form]);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setIsPublished(true);
		toast.success("form successfully published!");

		updateForm({
			id: 2,
			updatedForm: {
				...form,
				isPublished: !isPublished ? true : false,
				responderLink: UNIQUE_LINK,
			},
		});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsPublished(false);
	};

	function handleChange(e: any) {
		updateForm({ id: 2, updatedForm: { ...form, title: e.target.value } });
	}
	function handleStar() {
		setIsStarred(!isStarred);
		updateForm({
			id: 2,
			updatedForm: { ...form, isStarred: !isStarred ? true : false },
		});
	}
	function handleArchive() {
		setIsArchived(!isArchived);
		updateForm({
			id: 2,
			updatedForm: { ...form, isArchived: !isArchived ? true : false },
		});
	}

	useEffect(() => {
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	}, [copied]);

	if (isResponse) return;
	if (isPreview) return <PreviewNavbar />;
	if (isLoading || isLoadingResponses) return <Spinner />;
	return (
		<div className='shared_navbar'>
			<Toaster />
			<div className='shared_navbar_toggler'>
				<div className='shared_navbar_toggler_group'>
					<Link to={"/form/questions"}>
						<h3 className='shared_navbar_toggler_logo'>
							<SiFormspree className='logo' /> Softy Forms
						</h3>
					</Link>
					{!isLoading && (
						<input
							value={
								forms?.[0].title !== undefined ? forms[0].title : "Form Title"
							}
							className='form-title'
							onChange={handleChange}
						/>
					)}
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "1.4rem",
					}}
				>
					<Link className='preview-btn' to={"/form/preview"} target='_blank'>
						<FaEye className='shared_navbar_toggler_icon' />
					</Link>
					{isArchived ? (
						<BsArchiveFill
							onClick={handleArchive}
							className='shared_navbar_toggler_icon not-prev-icon'
							style={{ color: "var(--color-purple-800)" }}
						/>
					) : (
						<BsArchive
							onClick={handleArchive}
							className='shared_navbar_toggler_icon not-prev-icon'
						/>
					)}
					{isStarred ? (
						<GoStarFill
							onClick={handleStar}
							className='shared_navbar_toggler_icon not-prev-icon'
							style={{ color: "var(--color-yellow-300)" }}
						/>
					) : (
						<GoStar
							onClick={handleStar}
							className='shared_navbar_toggler_icon not-prev-icon'
						/>
					)}

					{!isPublished ? (
						<Link to={"/form/questions"} onClick={showModal}>
							<button className='shared_navbar_toggler_button'>Publish</button>
						</Link>
					) : (
						<>
							<Popover
								style={{ width: "50rem" }}
								arrow={false}
								placement='bottomRight'
								title={"Copy responder link"}
								content={
									<Space.Compact style={{ width: "100%" }}>
										<Input id='antd-input' defaultValue={UNIQUE_LINK} />
										<Button
											onClick={async () => {
												const valueToCopy = (
													document.getElementById("antd-input") as any
												)?.value;
												await navigator.clipboard.writeText(valueToCopy);
												setCopied(true);
												toast.success("link copied!");
											}}
											color='purple'
											type='primary'
											icon={<LuLink />}
										/>
									</Space.Compact>
								}
							>
								<div
									style={{ display: "flex" }}
									className='shared_navbar_toggler_button active-btn'
								>
									Published{" "}
									<TbSettings className='shared_navbar_toggler_icon' />
								</div>
							</Popover>
						</>
					)}
					<Modal
						title='Publish form'
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						className='modal'
					>
						{/* <Space.Compact style={{ width: "100%" }}>
							<Input id='antd-input' defaultValue={UNIQUE_LINK} />
							<Button
								onClick={async () => {
									const valueToCopy = UNIQUE_LINK;
									await navigator.clipboard.writeText(valueToCopy);
									setCopied(true);
								}}
								color='purple'
								type='primary'
								icon={<LuLink />}
							/>
						</Space.Compact> */}
						{/* {copied && <p>Copied! ✅ </p>} */}
						<h2>Do you want to publish your form?</h2>
						<h4>(form once published could not be unpublished)</h4>
					</Modal>
				</div>
			</div>
			<div className='shared_navbar_link'>
				<Link className='link' to={"/form/questions"}>
					Questions
				</Link>

				<Link className='link' to={"/form/responses/page=1"}>
					Responses
					{submissions && form.isPublished && <span>{submissions.length}</span>}
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
