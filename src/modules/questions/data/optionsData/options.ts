import { api } from "../../../shared/store/services/api";
import { supabase } from "../../../shared/supabase/supabase";

export const optionsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getOptions: builder.query({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("options")
					.select("*")
					.eq("question_id", id);

				if (error) throw error;

				return { data };
			},
			providesTags: [{ type: "options", id: "LIST" }],
		}),
		deleteOption: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("options")
					.delete()
					.eq("id", id);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "options", id: "LIST" }],
		}),
		createOption: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("options")
					.insert([{ content: "new Option", question_id: id }])
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "options", id: "LIST" }],
		}),
		createOther: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("options")
					.insert([{ content: "", question_id: id, other: true }])
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "options", id: "LIST" }],
		}),
		updateOption: builder.mutation({
			queryFn: async ({ id, updatedOption }) => {
				const { data, error } = await supabase
					.from("options")
					.update({ ...updatedOption })
					.eq("id", id)
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "options", id: "LIST" }],
		}),
	}),
});

export const {
	useGetOptionsQuery,
	useDeleteOptionMutation,
	useCreateOptionMutation,
	useCreateOtherMutation,
	useUpdateOptionMutation,
} = optionsApi;
