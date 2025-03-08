import { MdErrorOutline } from "react-icons/md";

type Props = {
	children: any;
};
function Error({ children }: Props) {
	return (
		<div className='error'>
			<MdErrorOutline />
			{children}
		</div>
	);
}

export default Error;
