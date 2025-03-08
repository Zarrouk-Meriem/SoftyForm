import { useNavigate } from "react-router-dom";
import { useDeleteTodoMutation, useGetTodosQuery } from "../../data/responses";
import { ITodo } from "../../../questions/data/questionTypes";
import { IQuery } from "../../data/todoTypes";

interface Props {
	query: IQuery | null;
}

const List = ({ query }: Props) => {
	const navigate = useNavigate();

	const { data } = useGetTodosQuery(query, {
		skip: !query,
	});
	const [deleteTodo] = useDeleteTodoMutation();

	const handleUpdate = (id?: string | undefined) => {
		if (!id) return;
		navigate(`/todos-rtk/edit/${id}`);
	};

	const handleDelete = (id?: string | undefined) => {
		if (!id) return;
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this item?"
		);
		if (isConfirmed) {
			deleteTodo({ id });
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
				{data?.data?.map((todo: ITodo) => (
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
								onClick={() => handleUpdate(todo?.id?.toString())}
							>
								Update
							</button>
							<button
								className='btn btn_delete'
								onClick={() => handleDelete(todo?.id?.toString())}
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
