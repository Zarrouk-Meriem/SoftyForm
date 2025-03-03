import { Switch } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";

type Props = {
	onChange: any;
};

const ContainerFooter = ({ onChange }: Props) => {
	return (
		<div className='container-footer'>
			<div className='footer'>
				<HiOutlineDuplicate className='duplicate-btn btn' />
				<FiTrash2 className='delete-btn btn' />
				<div className='required'>
					<p>Required</p>
					<Switch defaultChecked onChange={onChange} className='switcher' />
				</div>
			</div>
		</div>
	);
};

export default ContainerFooter;
