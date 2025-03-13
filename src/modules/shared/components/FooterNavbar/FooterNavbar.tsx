// import ThemeToggler from "../ThemeToggler/ThemeToggler";
// import LanguageToggler from "../LanguageToggler/LanguageToggler";
import { BsArchive, BsArchiveFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";

import { Link, useLocation } from "react-router-dom";
import {
	useGetFormsQuery,
	useUpdateFormMutation,
} from "../../../forms/data/forms";

import Spinner from "../Spinner/Spinner";
import { FaEye } from "react-icons/fa";

import { useCreateQuestionMutation } from "../../../questions/data/questions";

import { IoMdAddCircle } from "react-icons/io";
const FooterNavbar = () => {
	const { pathname } = useLocation();
	const [createQuestion] = useCreateQuestionMutation();

	const isResponse =
		pathname.includes("response") && !pathname.includes("responses");

	const [updateForm] = useUpdateFormMutation();
	const { data: forms, isLoading } = useGetFormsQuery(2);

	const form = forms?.[0];
	const [isStarred, setIsStarred] = useState(form?.isStarred);
	const [isArchived, setIsArchived] = useState(form?.isArchived);

	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setIsStarred(form?.isStarred);
		setIsArchived(form?.isArchived);
	}, [form]);

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

	if (isLoading) return <Spinner />;
	return (
		<div className='bg'>
			<div className='shared_footer_navbar'>
				<Link className='preview-btn' to={"/form/preview"} target='_blank'>
					<FaEye className='shared_footer_navbar_toggler_icon' />
				</Link>
				{isArchived ? (
					<BsArchiveFill
						onClick={handleArchive}
						className='shared_footer_navbar_toggler_icon not-prev-icon'
						style={{ color: "var(--color-purple-800)" }}
					/>
				) : (
					<BsArchive
						onClick={handleArchive}
						className='shared_footer_navbar_toggler_icon not-prev-icon'
					/>
				)}
				{isStarred ? (
					<GoStarFill
						onClick={handleStar}
						className='shared_footer_navbar_toggler_icon not-prev-icon'
						style={{ color: "var(--color-yellow-300)" }}
					/>
				) : (
					<GoStar
						onClick={handleStar}
						className='shared_footer_navbar_toggler_icon not-prev-icon'
					/>
				)}

				<IoMdAddCircle
					onClick={createQuestion}
					className='add-btn shared_footer_navbar_toggler_icon'
				/>
			</div>
		</div>
	);
};

export default FooterNavbar;
{
	/* {!isLoading && (
						<input
							value={
								forms?.[0].title !== undefined ? forms[0].title : "Form Title"
							}
							className='form-title'
							onChange={handleChange}
						/>
					)} */
}
