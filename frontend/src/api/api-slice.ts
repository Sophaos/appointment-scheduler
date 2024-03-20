// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./api-const";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // TODO: if any auth code goes here
      return headers;
    },
  }),
  tagTypes: ["Clients", "Appointments", "Experts", "Services"],
  endpoints: () => ({}),
});
