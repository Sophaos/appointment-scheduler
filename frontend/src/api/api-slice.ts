// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./api-const";

export const apiSlice = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.append("Accept", "application/json, text/plain, */*");
      headers.append("Content-Type", "application/json;charset=utf-8");
      return headers;
    },
  }),
  tagTypes: ["Clients", "Appointments", "Experts", "Services"],
  endpoints: () => ({}),
});
