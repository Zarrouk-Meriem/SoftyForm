/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	createApi,
	FetchArgs,
	fetchBaseQuery,
	retry,
} from "@reduxjs/toolkit/query/react";
import { clearTokens, getTokens, setTokens } from "../../utils/token";
import { isValidToken } from "../../utils/isValidToken";
import axios from "axios";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8000",
	prepareHeaders: (headers) => {
		const { access_token } = getTokens();
		if (access_token) {
			headers.set("Authorization", `Bearer ${access_token}`);
		}
		headers.set("Authorization", `Bearer ${access_token}`);
		headers.set("Content-Type", "application/json");
		return headers;
	},
});

const staggeredBaseQueryWithBailOut = retry(
	async (args: string | FetchArgs, api, extraOptions) => {
		const result = await baseQuery(args, api, extraOptions);

		if (result.error) {
			if (result.error.status === 401) {
				const { refresh_token } = getTokens();
				if (refresh_token && isValidToken(refresh_token)) {
					try {
						const response = await axios.get("/api/auth/refresh", {
							headers: {
								Authorization: `Bearer ${refresh_token}`,
							},
						});
						const {
							access_token: new_accessToken,
							refresh_token: new_refresh_token,
						} = response.data.payload;
						setTokens(new_accessToken, new_refresh_token);

						const retryResult = await baseQuery(args, api, extraOptions);
						return retryResult;
					} catch (error) {
						clearTokens();
						return result;
					}
				}
			}
			return retry.fail(result.error?.data);
		}

		return result;
	},
	{
		maxRetries: 3,
	}
);

const baseQueryWithRetry = staggeredBaseQueryWithBailOut;

export const api = createApi({
	reducerPath: "api",
	tagTypes: ["options", "forms", "questions", "data", "responses"],
	baseQuery: baseQueryWithRetry,
	endpoints: () => ({}),
});
