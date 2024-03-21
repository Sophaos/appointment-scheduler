/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "api/api-slice";

const BASE_URL = "services";

export const extendedServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<any, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "PATCH",

        body: JSON.stringify({
          serviceId: request.id,
          name: request.name,
          color: request.color,
        }),
      }),
      invalidatesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "POST",

        body: JSON.stringify({
          name: request.name,
          color: request.color,
        }),
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "DELETE",

        body: JSON.stringify({
          serviceId: request,
        }),
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const { useGetServicesQuery, useUpdateServiceMutation, useCreateServiceMutation, useDeleteServiceMutation } = extendedServiceApiSlice;
