import { useEffect } from "react";
import NProgress from "accessible-nprogress";
import "accessible-nprogress/dist/accessible-nprogress.css";

interface ILazyLoadProps {
	showSpinner?: boolean;
}

const LazyLoad: React.FC<ILazyLoadProps> = ({ showSpinner = false }) => {
	// Default value assigned here
	useEffect(() => {
		NProgress.configure({ showSpinner });
		NProgress.start();

		return () => {
			NProgress.done();
		};
	}, [showSpinner]); // Adding `showSpinner` as a dependency to avoid stale closures

	return null;
};

export default LazyLoad;
