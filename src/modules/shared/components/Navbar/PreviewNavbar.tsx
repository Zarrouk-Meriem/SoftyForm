import { useNavigate } from "react-router-dom";
import { useGetFormsQuery } from "../../../forms/data/forms";
import {
	MdLink,
	MdOutlinePublishedWithChanges,
	MdOutlineUnpublished,
} from "react-icons/md";
import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { data: forms, isLoading } = useGetFormsQuery(2);

	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	}, [copied]);
	const navigate = useNavigate();
	if (isLoading) return <Spinner />;
	const { isPublished } = forms?.[0];
	return (
		<div
			style={{
				boxShadow:
					"0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)",
			}}
			className='shared_navbar'
		>
			<div className='shared_navbar_toggler'>
				<div className='shared_navbar_toggler_group'>
					<div onClick={() => navigate("/form/questions")} className='back-btn'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
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
					</div>
					<h3 className='preview-text' style={{ fontWeight: "400" }}>
						Preview mode
					</h3>
				</div>
				<div className='shared_navbar_link'>
					<div className='published'>
						{isPublished ? (
							<p style={{ color: "green" }} className='publishTag'>
								<MdOutlinePublishedWithChanges className='icon' />
								<span className='pub-text'>Published</span>
							</p>
						) : (
							<p style={{ color: "maroon" }} className='publishTag'>
								<MdOutlineUnpublished className='icon' />
								<span className='pub-text'>Unpublished</span>
							</p>
						)}
					</div>
					<div
						className='clipboard'
						style={
							!copied
								? { border: " 1px solid #555" }
								: {
										border: " 1px solid rgba(85, 85, 85, 0.554)",
										color: "green",
									}
						}
						onClick={async () => {
							const valueToCopy = forms?.[0].responderLink;
							await navigator.clipboard.writeText(valueToCopy);
							setCopied(true);
						}}
					>
						{!copied ? (
							<>
								<MdLink className='icon' />
								<span className='copy-text'>copy responder link</span>
							</>
						) : (
							<p>
								<span className='copy-text'>Copied!</span> ✅
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
