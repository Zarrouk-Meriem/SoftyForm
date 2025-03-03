/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { updatedQuestion, questionId } from "./questionTypes";

const supabaseUrl = "https://jqjhjdczamcwscpfhcxi.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllQuestions = createAsyncThunk(
	"getAllQuestions",
	async (_, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase.from("questions").select("*");

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);

export const createQuestion = createAsyncThunk(
	"createQuestion",
	async (_, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("questions")
				.insert({
					form_id: 2,
					type: "Dropdown",
					question: "",
					isRequired: false,
				})
				.select("*");

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
export const updateQuestion = createAsyncThunk(
	"updateQuestion",
	async (
		{ query, questionId }: { query: updatedQuestion; questionId: string },
		{ rejectWithValue }
	) => {
		try {
			const { error } = await supabase
				.from("questions")
				.update(query)
				.eq("id", questionId)
				.single();

			if (error) {
				throw new Error(error.message);
			}
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
export const duplicateQuestion = createAsyncThunk(
	"duplicateQuestion",
	async (query: updatedQuestion, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("questions")
				.insert(query)
				.select("*");

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
export const deleteQuestion = createAsyncThunk(
	"deleteQuestion",
	async (query: questionId, { rejectWithValue }) => {
		try {
			const { error } = await supabase
				.from("questions")
				.delete()
				.eq("id", query);

			if (error) {
				throw new Error(error.message);
			}
		} catch (err: any) {
			return rejectWithValue(err.message);
		}
	}
);
