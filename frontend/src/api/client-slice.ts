/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "api/api-slice";

export const extendedClientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: "/api/get-clients",
        method: "POST",

        body: JSON.stringify({}),
      }),
      providesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: (request) => ({
        url: "/api/update-client",
        method: "POST",

        body: JSON.stringify({
          clientId: request.id,
          nickname: request.nickname,
          email: request.email,
          phoneNumber: request.phoneNumber,
          notes: request.notes,
          rating: request.rating,
        }),
      }),
      invalidatesTags: ["Clients"],
    }),
    createClient: builder.mutation({
      query: (request) => ({
        url: "/api/create-client",
        method: "POST",

        body: JSON.stringify({
          nickname: request.nickname,
          phoneNumber: request.phoneNumber,
          email: request.email,
          notes: request.notes,
          rating: request.rating,
        }),
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (request: any) => ({
        url: "/api/soft-delete-client",
        method: "POST",

        body: JSON.stringify({
          clientId: request,
        }),
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const { useGetClientsQuery, useUpdateClientMutation, useCreateClientMutation, useDeleteClientMutation } = extendedClientApiSlice;
