import { useGetTodosQuery } from "../../data/responses";
import { IQuery } from "../../data/todoTypes";

interface Props {
	query: IQuery | null;
	setQuery: (query: IQuery) => void;
}

const Pagination = ({ query, setQuery }: Props) => {
	const { data } = useGetTodosQuery(query, {
		skip: !query,
	});

	const totalPages = Math.ceil((data?.total || 0) / data?.limit);

	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLimit = parseInt(e.target.value, 10);
		setQuery({
			page: data?.page || 1,
			limit: newLimit,
		});
	};

	const handlePrev = () => {
		setQuery({
			page: data?.page - 1 || 1,
			limit: data?.limit || 10,
		});
	};

	const handleNext = () => {
		setQuery({
			page: data?.page + 1 || 1,
			limit: data?.limit || 10,
		});
	};

	return (
		<div className='pagination'>
			<div>
				<label>Page : </label>

				<select value={data?.limit} onChange={handleLimitChange}>
					<option value='1'>1</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='50'>50</option>
				</select>
			</div>

			<div className='pagination_buttons_container'>
				<div className='pagination_buttons'>
					<button disabled={data?.page === 1} onClick={handlePrev}>
						Prev
					</button>
					<button disabled>{data?.page}</button>
					<button disabled={data?.page === totalPages} onClick={handleNext}>
						Next
					</button>
				</div>
				<p>Total Pages : {totalPages}</p>
			</div>
		</div>
	);
};

export default Pagination;
