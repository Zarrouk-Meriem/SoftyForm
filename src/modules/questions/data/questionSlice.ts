import { createSlice } from "@reduxjs/toolkit";
import {
	createQuestion,
	deleteQuestion,
	duplicateQuestion,
	getAllQuestions,
} from "./questionThunk";

interface QuestionsState {
	questions: any[];
	loading: boolean;
	error: string | null;
}

const initialState: QuestionsState = {
	questions: [],
	loading: false,
	error: null,
};
const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			//GET ALL QUESTIONS
			.addCase(getAllQuestions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllQuestions.fulfilled, (state, action) => {
				state.loading = false;
				state.questions = action.payload;
			})
			.addCase(getAllQuestions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			//CREATE QUESTION
			.addCase(createQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.loading = false;
				state.questions = [...state.questions, ...action.payload];
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			//DELETE QUESTION
			.addCase(deleteQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.loading = false;
				// if (!action.payload) return;
				state.questions = state.questions.filter(
					(q) => q.id !== action.payload
				);
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			//DUPLICATE QUESTION
			.addCase(duplicateQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(duplicateQuestion.fulfilled, (state, action) => {
				if (!action.payload) return;
				state.questions = [...state.questions, ...action.payload];
			})
			.addCase(duplicateQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default questionsSlice.reducer;
