import { api } from '../../shared/store/services/api'

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (params) => ({
        url: `/api/todos`,
        params,
      }),
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    getOneTodo: builder.query({
      query: (id: string) => ({
        url: `/api/todos/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Todos', id }],
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: `/api/todos`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [
          { type: 'Todos', id },
          { type: 'Todos', id: 'LIST' },
        ]
      },
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/api/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useGetOneTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi
