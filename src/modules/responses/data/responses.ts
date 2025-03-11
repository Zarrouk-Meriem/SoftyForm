import { api } from "../../shared/store/services/api";
import { supabase } from "../../shared/supabase/supabase";

export const responsesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllResponses: builder.query({
			queryFn: async () => {
				const { data, error } = await supabase
					.from("submissions")
					.select("*")
					.order("created_at", { ascending: true });

				if (error) throw error;

				return { data };
			},
			providesTags: [{ type: "responses", id: "LIST" }],
		}),
		deleteResponse: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("responses")
					.delete()
					.eq("id", id);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "responses", id: "LIST" }],
		}),

		createResponse: builder.mutation({
			queryFn: async (query) => {
				const { data, error } = await supabase
					.from("submissions")
					.insert(query)
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "responses", id: "LIST" }],
		}),

		updateResponse: builder.mutation({
			queryFn: async ({ id, updatedResponse }) => {
				const { data, error } = await supabase
					.from("responses")
					.update({ ...updatedResponse })
					.eq("id", id)
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "responses", id: "LIST" }],
		}),
	}),
});

export const {
	useDeleteResponseMutation,
	useCreateResponseMutation,
	useUpdateResponseMutation,
	useGetAllResponsesQuery,
} = responsesApi;
