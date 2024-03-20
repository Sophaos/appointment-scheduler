/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "api/api-slice";

export const extendedExpertApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.query<any, void>({
      query: () => ({
        url: "/api/get-experts",
        method: "GET",

        body: JSON.stringify({}),
      }),
      providesTags: ["Experts"],
    }),
    updateExpert: builder.mutation({
      query: (request) => ({
        url: "/api/update-expert",
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
        url: "/api/create-expert",
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
        url: "/api/soft-delete-expert",
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
