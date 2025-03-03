import { createSlice } from "@reduxjs/toolkit";
import { getAllForms } from "./formThunk";

interface FormState {
	forms: any;
	loading: boolean;
	error: string | null;
}

const initialState: FormState = {
	forms: [],
	loading: false,
	error: null,
};

const formSlice = createSlice({
	name: "forms",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllForms.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllForms.fulfilled, (state, action) => {
				state.loading = false;
				state.forms = action.payload;
			})
			.addCase(getAllForms.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default formSlice.reducer;
