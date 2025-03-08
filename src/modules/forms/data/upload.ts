import { supabase } from "../../shared/supabase/supabase";
import { api } from "../../shared/store/services/api";
import { v4 as uuidv4 } from "uuid";

export const formsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation({
			queryFn: async (file: any) => {
				const { data, error } = await supabase.storage
					.from("upload")
					.upload(`${file.name}-${uuidv4()}`, file);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "data", id: "LIST" }],
		}),
	}),
});

export const { useUploadFileMutation } = formsApi;
