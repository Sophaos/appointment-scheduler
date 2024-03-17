import { apiSlice } from "api/api-slice";

export const extendedServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/api/get-services",
        method: "GET",

        body: JSON.stringify({}),
      }),
      providesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: (request) => ({
        url: "/api/update-service",
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
        url: "/api/create-service",
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
        url: "/api/soft-delete-service",
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
