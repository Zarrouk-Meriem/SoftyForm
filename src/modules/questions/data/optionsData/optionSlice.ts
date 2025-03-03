import { createSlice } from "@reduxjs/toolkit";
import { getAllOptions } from "./optionThunk";

interface optionsState {
	options: any[];
	loading: boolean;
	error: string | null;
}

const initialState: optionsState = {
	options: [],
	loading: false,
	error: null,
};
const optionSlice = createSlice({
	name: "options",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOptions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllOptions.fulfilled, (state, action) => {
				state.loading = false;
				state.options = action.payload;
			})
			.addCase(getAllOptions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default optionSlice.reducer;
