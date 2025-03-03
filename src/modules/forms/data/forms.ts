import { api } from "../../shared/store/services/api";
import { supabase } from "../../shared/supabase/supabase";

export const formsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getForms: builder.query({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("forms")
					.select("*")
					.eq("id", id);

				if (error) throw error;

				return { data };
			},
			providesTags: [{ type: "forms", id: "LIST" }],
		}),
		deleteForm: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("forms")
					.delete()
					.eq("id", id);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "forms", id: "LIST" }],
		}),
		createForm: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("forms")
					.insert([{ content: "new Form", question_id: id }])
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "forms", id: "LIST" }],
		}),
		updateForm: builder.mutation({
			queryFn: async ({ id, updatedForm }) => {
				const { data, error } = await supabase
					.from("forms")
					.update({ ...updatedForm })
					.eq("id", id)
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "forms", id: "LIST" }],
		}),
	}),
});

export const {
	useGetFormsQuery,
	useDeleteFormMutation,
	useCreateFormMutation,
	useUpdateFormMutation,
} = formsApi;
