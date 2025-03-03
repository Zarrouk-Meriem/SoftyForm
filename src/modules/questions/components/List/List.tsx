import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/store";
import { deleteTodo, getAllQuestions } from "../../data/questionThunk";

const List = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { todos, query } = useAppSelector((state) => state.todos);

	const handleUpdate = (id?: string) => {
		if (!id) return;
		navigate(`/todos/edit/${id}`);
	};

	const handleDelete = (id?: string) => {
		if (!id) return;
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this item?"
		);
		if (isConfirmed) {
			dispatch(deleteTodo(id))
				.unwrap()
				.then(() => {
					dispatch(
						deleteTodo({
							page: query.page,
							limit: query.limit,
						})
					);
				})
				.catch((err: any) => {
					console.error(err);
					alert("something went wrong");
				});
		}
	};

	return (
		<table className='todos-table'>
			<thead>
				<tr>
					<th className='header-cell'>#</th>
					<th className='header-cell'>Title</th>
					<th className='header-cell'>Description</th>
					<th className='header-cell'>Status</th>
					<th className='header-cell'>Action</th>
				</tr>
			</thead>

			<tbody>
				{todos?.map((todo) => (
					<tr className='table-row' key={todo.id}>
						<td className='table-cell'>{todo.id}</td>
						<td className='table-cell'>{todo.title}</td>
						<td className='table-cell'>{todo.description}</td>
						<td
							className={`table-cell ${todo.completed ? "status-completed" : "status-pending"}`}
						>
							{todo.completed ? "Completed" : "Pending"}
						</td>
						<td className='table-cell btn_container'>
							<button
								className='btn btn_update'
								onClick={() => handleUpdate(todo?.id)}
							>
								Update
							</button>
							<button
								className='btn btn_delete'
								onClick={() => handleDelete(todo?.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default List;
