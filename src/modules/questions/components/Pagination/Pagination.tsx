import { useAppDispatch, useAppSelector } from "../../../shared/store";
import { setTodoQuery } from "../../data/questionSlice";

const Pagination = () => {
	const dispatch = useAppDispatch();
	const {
		query: { page, limit, total },
	} = useAppSelector((state) => state.todos);

	const totalPages = Math.ceil((total || 0) / limit);

	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLimit = parseInt(e.target.value, 10);
		dispatch(
			setTodoQuery({
				page,
				limit: newLimit,
			})
		);
	};

	const handlePrev = () => {
		dispatch(
			setTodoQuery({
				page: page - 1,
				limit,
			})
		);
	};

	const handleNext = () => {
		dispatch(
			setTodoQuery({
				page: page + 1,
				limit,
			})
		);
	};

	return (
		<div className='pagination'>
			<div>
				<label>Page : </label>

				<select value={limit} onChange={handleLimitChange}>
					<option value='1'>1</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='50'>50</option>
				</select>
			</div>

			<div className='pagination_buttons_container'>
				<div className='pagination_buttons'>
					<button disabled={page === 1} onClick={handlePrev}>
						Prev
					</button>
					<button disabled>{page}</button>
					<button disabled={page === totalPages} onClick={handleNext}>
						Next
					</button>
				</div>
				<p>Total Pages : {totalPages}</p>
			</div>
		</div>
	);
};

export default Pagination;
