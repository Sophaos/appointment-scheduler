/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { Service } from "./service";
import { baseQueryToast } from "shared/utils/toast-utils";

const BASE_URL = "services";

export const extendedServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: (request) => ({
        url: `${BASE_URL}/${request.id}`,
        method: "PATCH",
        body: JSON.stringify({
          id: request.id,
          name: request.name,
          color: request.color,
          duration: request.duration,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The service has been updated successfully.");
      },
      invalidatesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "POST",

        body: JSON.stringify({
          name: request.name,
          color: request.color,
          duration: request.duration,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The service has been created successfully.");
      },
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (request) => ({
        url: `${BASE_URL}/${request.id}`,
        method: "DELETE",

        body: JSON.stringify({
          id: request,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The service has been deleted successfully.");
      },
      invalidatesTags: ["Services"],
    }),
  }),
});

const initialState = {
  isServiceDrawerVisible: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceDrawerVisibility(state, action) {
      state.isServiceDrawerVisible = action.payload;
    },
  },
  selectors: {
    selectIsServiceDrawerVisible: (state) => state.isServiceDrawerVisible,
  },
});

export const { setServiceDrawerVisibility } = serviceSlice.actions;
export const { selectIsServiceDrawerVisible } = serviceSlice.selectors;

export const { useGetServicesQuery, useUpdateServiceMutation, useCreateServiceMutation, useDeleteServiceMutation } = extendedServiceApiSlice;

export const selectServicesResult = extendedServiceApiSlice.endpoints.getServices.select();

export const selectServices = createSelector(selectServicesResult, (servicesResult) => servicesResult?.data ?? []);
