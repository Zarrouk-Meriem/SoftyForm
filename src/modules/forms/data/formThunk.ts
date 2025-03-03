/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../shared/supabase/supabase";

export const getAllForms = createAsyncThunk(
	"getAllForms",
	async (_, { rejectWithValue }) => {
		try {
			let { data: forms, error } = await supabase.from("forms").select("*");

			if (error) {
				throw new Error(error.message);
			}

			return forms;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
