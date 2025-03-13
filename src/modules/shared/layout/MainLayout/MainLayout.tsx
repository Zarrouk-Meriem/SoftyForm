import { Suspense } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FooterNavbar from "../../components/FooterNavbar/FooterNavbar";

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className='shared_main_layout'>
			<Navbar />

			<div className='shared_main_layout_container'>
				<Suspense>{children}</Suspense>
			</div>
			<FooterNavbar />
		</div>
	);
};

export default MainLayout;
