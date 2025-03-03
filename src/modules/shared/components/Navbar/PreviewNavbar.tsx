// import ThemeToggler from "../ThemeToggler/ThemeToggler";
// import LanguageToggler from "../LanguageToggler/LanguageToggler";

// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetFormsQuery } from "../../../forms/data/forms";
import {
	MdOutlinePublishedWithChanges,
	MdOutlineUnpublished,
} from "react-icons/md";
import Spinner from "../Spinner/Spinner";

const Navbar = () => {
	const { data: forms, isLoading } = useGetFormsQuery(2);
	console.log(forms);
	const { isPublished } = forms?.[0];
	const navigate = useNavigate();
	if (isLoading) return <Spinner />;
	return (
		<div className='shared_navbar'>
			<div className='shared_navbar_toggler'>
				<div className='shared_navbar_toggler_group'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						onClick={() => navigate(-1)}
					>
						<g
							fill='none'
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
						>
							<path
								stroke-dasharray='16'
								stroke-dashoffset='16'
								d='M19 12h-13.5'
							>
								<animate
									fill='freeze'
									attributeName='stroke-dashoffset'
									dur='0.2s'
									values='16;0'
								/>
							</path>
							<path
								stroke-dasharray='10'
								stroke-dashoffset='10'
								d='M5 12l5 5M5 12l5 -5'
							>
								<animate
									fill='freeze'
									attributeName='stroke-dashoffset'
									begin='0.2s'
									dur='0.2s'
									values='10;0'
								/>
							</path>
						</g>
					</svg>
					<h3 style={{ fontWeight: "400" }}>Preview mode</h3>
				</div>
				<div className='shared_navbar_link'>
					<div className='published'>
						{isPublished ? (
							<p style={{ color: "green" }} className='publishTag'>
								<MdOutlinePublishedWithChanges />
								Published
							</p>
						) : (
							<p style={{ color: "maroon" }} className='publishTag'>
								<MdOutlineUnpublished />
								Unpublished
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

// <div className='shared_navbar_toggler_buttons'>
// 	<ThemeToggler />
// 	<LanguageToggler />
// </div>;
