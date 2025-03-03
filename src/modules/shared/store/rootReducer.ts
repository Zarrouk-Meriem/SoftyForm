import { combineReducers } from "@reduxjs/toolkit";
import { sharedPersistedReducer } from "./persist/sharedPersist";
import { api } from "./services/api";
import authReducer from "../../auth/data/authSlice";
import questionsReducer from "../../questions/data/questionSlice";
import formsReducer from "../../forms/data/formSlice";
import optionsReducer from "../../questions/data/optionsData/optionSlice";

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	shared: sharedPersistedReducer,
	auth: authReducer,
	questions: questionsReducer,
	options: optionsReducer,
	forms: formsReducer,
});

export default rootReducer;
