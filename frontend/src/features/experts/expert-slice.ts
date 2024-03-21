/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "api/api-slice";

const BASE_URL = "experts";
export const extendedExpertApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.query<any, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Experts"],
    }),
    updateExpert: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "PATCH",
        body: JSON.stringify({
          expertId: request.id,
          nickname: request.nickname,
          serviceIdList: request.serviceIdList.join(";"),
          color: request.color,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
    createExpert: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "POST",

        body: JSON.stringify({
          nickname: request.nickname,
          serviceIdList: request.serviceIdList.join(";"),
          color: request.color,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
    deleteExpert: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "DELETE",
        body: JSON.stringify({
          expertId: request,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
  }),
});

export const { useGetExpertsQuery, useUpdateExpertMutation, useCreateExpertMutation, useDeleteExpertMutation } = extendedExpertApiSlice;
