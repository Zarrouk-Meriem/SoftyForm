type Props = {
	children: any;
	className?: string;
};

const Container = ({ children, className }: Props) => {
	return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
