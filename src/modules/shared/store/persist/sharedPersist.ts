import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sharedReducer from "../slices/sharedSlice";

const sharedPersistConfig = {
	key: "shared",
	storage,
	whitelist: ["isSidebarCollapsed"],
};

export const sharedPersistedReducer = persistReducer(
	sharedPersistConfig,
	sharedReducer
);
