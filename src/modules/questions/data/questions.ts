import { api } from "../../shared/store/services/api";
import { supabase } from "../../shared/supabase/supabase";

export const questionsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllQuestions: builder.query({
			queryFn: async () => {
				const { data, error } = await supabase
					.from("questions")
					.select("*")
					.order("created_at", { ascending: false });

				if (error) throw error;

				return { data };
			},
			providesTags: [{ type: "questions", id: "LIST" }],
		}),
		deleteQuestion: builder.mutation({
			queryFn: async (id) => {
				const { data, error } = await supabase
					.from("questions")
					.delete()
					.eq("id", id);

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "questions", id: "LIST" }],
		}),
		createQuestion: builder.mutation({
			queryFn: async () => {
				const { data, error } = await supabase
					.from("questions")
					.insert([
						{
							form_id: 2,
							question: "",
							type: "Dropdown",
						},
					])
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "questions", id: "LIST" }],
		}),
		duplicateQuestion: builder.mutation({
			queryFn: async (query) => {
				const { id, ...rest } = query;

				// Duplicate the question
				const { data: updatedQuestion, error: questionError } = await supabase
					.from("questions")
					.insert([rest])
					.select()
					.single();

				if (questionError) throw questionError;

				// Get all options related to the original question
				const { data: options, error: optionError } = await supabase
					.from("options")
					.select("*")
					.eq("question_id", id);

				if (optionError) throw optionError;

				//  Duplicate the options with the new question ID
				const newOptions = options.map(({ id, ...restOption }) => ({
					...restOption,
					question_id: updatedQuestion.id, // Assign the new question ID to options
				}));

				//  Insert the duplicated options
				const { error: insertOptionsError } = await supabase
					.from("options")
					.insert(newOptions);

				if (insertOptionsError) throw insertOptionsError;

				return {
					data: updatedQuestion,
				};
			},
			invalidatesTags: [{ type: "questions", id: "LIST" }],
		}),

		updateQuestion: builder.mutation({
			queryFn: async ({ id, updatedQuestion }) => {
				const { data, error } = await supabase
					.from("questions")
					.update({ ...updatedQuestion })
					.eq("id", id)
					.select();

				if (error) throw error;

				return { data };
			},
			invalidatesTags: [{ type: "questions", id: "LIST" }],
		}),
	}),
});

export const {
	useGetAllQuestionsQuery,
	useDeleteQuestionMutation,
	useCreateQuestionMutation,
	useDuplicateQuestionMutation,
	useUpdateQuestionMutation,
} = questionsApi;
