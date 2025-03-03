/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { questionId } from "../questionTypes";

const supabaseUrl = "https://jqjhjdczamcwscpfhcxi.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllOptions = createAsyncThunk(
	"getAllOptions",
	async (query: questionId, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("options")
				.select()
				.eq("question_id", query);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const createOption = createAsyncThunk(
	"createOption",
	async (query: questionId, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("options")
				.insert({ content: "new option", question_id: query })
				.select();

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
// export const updateQuestion = createAsyncThunk(
// 	"updateQuestion",
// 	async (
// 		{ query, questionId }: { query: updatedOption; questionId: string },
// 		{ rejectWithValue }
// 	) => {
// 		try {
// 			const { error } = await supabase
// 				.from("questions")
// 				.update(query)
// 				.eq("id", questionId)
// 				.single();

// 			if (error) {
// 				throw new Error(error.message);
// 			}
// 		} catch (err: any) {
// 			return rejectWithValue(err.message);
// 		}
// 	}
// );
