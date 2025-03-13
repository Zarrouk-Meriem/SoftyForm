import { supabase } from "../../shared/supabase/supabase";
import { api } from "../../shared/store/services/api";

export const formsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation({
			queryFn: async (file: any) => {
				const { data, error } = await supabase.storage
					.from("upload")
					.upload(`${file.name}-${file.uid}`, file);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "data", id: "LIST" }],
		}),
		deleteFile: builder.mutation({
			queryFn: async (file: any) => {
				const { data, error } = await supabase.storage
					.from("upload")
					.remove([`${file.name}-${file.uid}`]);

				if (data) throw error;
				return { data };
			},
			invalidatesTags: [{ type: "data", id: "LIST" }],
		}),
	}),
});

export const { useUploadFileMutation, useDeleteFileMutation } = formsApi;
