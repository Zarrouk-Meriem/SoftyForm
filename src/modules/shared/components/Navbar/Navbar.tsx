// import ThemeToggler from "../ThemeToggler/ThemeToggler";
// import LanguageToggler from "../LanguageToggler/LanguageToggler";
import { BsArchive, BsArchiveFill } from "react-icons/bs";
import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { SiFormspree } from "react-icons/si";

import { Link, useLocation, useSearchParams } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import {
	useGetFormsQuery,
	useUpdateFormMutation,
} from "../../../forms/data/forms";
import { IoEyeOutline } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import path from "path";
import PreviewNavbar from "./PreviewNavbar";

const Navbar = () => {
	const [updateForm] = useUpdateFormMutation();
	const { data: forms, isLoading } = useGetFormsQuery(2);

	const [isStarred, setIsStarred] = useState(forms?.[0].isStarred);
	const [isArchived, setIsArchived] = useState(forms?.[0].isArchived);
	const [isPublished, setIsPublished] = useState(forms?.[0].isPublished);

	function handleChange(e: any) {
		updateForm({ id: 2, updatedForm: { ...forms, title: e.target.value } });
	}
	function handleStar() {
		setIsStarred(!isStarred);
	}
	function handleArchive() {
		setIsArchived(!isArchived);
	}

	// const navigate = useNavigate();

	const { pathname } = useLocation();
	const isPreview = pathname.split("/")[2] === "preview";

	if (isPreview) return <PreviewNavbar />;

	return (
		<div className='shared_navbar'>
			<div className='shared_navbar_toggler'>
				<div className='shared_navbar_toggler_group'>
					<h3 className='shared_navbar_toggler_logo'>
						<SiFormspree className='logo' /> Softy Forms
					</h3>
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
						gap: "2rem",
					}}
				>
					{isArchived ? (
						<BsArchiveFill
							onClick={handleArchive}
							className='shared_navbar_toggler_icon'
							style={{ color: "var(--color-purple-600)" }}
						/>
					) : (
						<BsArchive
							onClick={handleArchive}
							className='shared_navbar_toggler_icon'
						/>
					)}
					{isStarred ? (
						<GoStarFill
							onClick={handleStar}
							className='shared_navbar_toggler_icon'
							style={{ color: "var(--color-yellow-300)" }}
						/>
					) : (
						<GoStar
							onClick={handleStar}
							className='shared_navbar_toggler_icon'
						/>
					)}

					<Link to={"/form/preview"} target='_blank'>
						<IoEyeOutline
							// onClick={() => navigate("/form/preview")}
							className='shared_navbar_toggler_icon'
						/>
					</Link>

					{!isPublished ? (
						<Link to={"/form/preview"} onClick={() => setIsPublished(true)}>
							<button className='shared_navbar_toggler_button'>Publish</button>
						</Link>
					) : (
						<Link
							to={"/form/preview"}
							style={{ display: "flex" }}
							className='shared_navbar_toggler_button active'
						>
							Published <TbSettings className='shared_navbar_toggler_icon' />
						</Link>
					)}
				</div>
			</div>
			<div className='shared_navbar_link'>
				<Link className='link' to={"/form/questions"}>
					Questions
				</Link>

				<Link className='link' to={"/form/responses"}>
					Responses
					<span>x</span>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;

// <div className='shared_navbar_toggler_buttons'>
// 	<ThemeToggler />
// 	<LanguageToggler />
// </div>;
