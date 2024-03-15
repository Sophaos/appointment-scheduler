import { apiSlice } from "api/api-slice";

export const extendedTechnicianApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTechnicians: builder.query({
      query: () => ({
        url: "/api/get-experts",
        method: "POST",

        body: JSON.stringify({}),
      }),
      providesTags: ["Experts"],
    }),
    updateTechnician: builder.mutation({
      query: (request) => ({
        url: "/api/update-expert",
        method: "POST",

        body: JSON.stringify({
          technicianId: request.id,
          nickname: request.nickname,
          serviceIdList: request.serviceIdList.join(";"),
          color: request.color,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
    createTechnician: builder.mutation({
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
    deleteTechnician: builder.mutation({
      query: (request) => ({
        url: "/api/soft-delete-expert",
        method: "POST",
        body: JSON.stringify({
          technicianId: request,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
  }),
});

export const { useGetTechniciansQuery, useUpdateTechnicianMutation, useCreateTechnicianMutation, useDeleteTechnicianMutation } = extendedTechnicianApiSlice;
