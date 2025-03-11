import Option from "../Option/Option";
import { useGetOptionsQuery } from "../../data/optionsData/options";
import Spinner from "../../../shared/components/Spinner/Spinner";

type Props = {
	formik: any;
	questionId: any;
};
function Options({ formik, questionId }: Props) {
	const { data, isLoading } = useGetOptionsQuery(questionId);

	if (isLoading) return <Spinner />;

	return (
		<div className='options'>
			{Array.isArray(data) &&
				data.map((option: object, i: any) => (
					<Option
						formik={formik}
						questionId={questionId}
						option={option}
						i={i + 1}
						key={i}
						type={formik.values.type}
					/>
				))}
		</div>
	);
}

export default Options;
