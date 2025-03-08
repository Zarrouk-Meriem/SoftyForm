import { questionsApi } from "./questionsApi";

export const {
	useGetAllQuestionsQuery,
	useDeleteQuestionMutation,
	useCreateQuestionMutation,
	useDuplicateQuestionMutation,
	useUpdateQuestionMutation,
} = questionsApi;
