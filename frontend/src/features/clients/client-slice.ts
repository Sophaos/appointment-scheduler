/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { Client } from "./client";
import { baseQueryToast } from "shared/utils/toast-utils";

const BASE_URL = "clients";
export const extendedClientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: (request) => ({
        url: `${BASE_URL}/${request.id}`,
        method: "PATCH",
        body: JSON.stringify({
          id: request.id,
          nickname: request.nickname,
          firstName: request.firstName,
          lastName: request.lastName,
          phoneNumber: request.phoneNumber,
          email: request.email,
          note: request.note,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The client has been updated successfully.");
      },
      invalidatesTags: ["Clients"],
    }),
    createClient: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "POST",

        body: JSON.stringify({
          nickname: request.nickname,
          firstName: request.firstName,
          lastName: request.lastName,
          phoneNumber: request.phoneNumber,
          email: request.email,
          note: request.note,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The client has been created successfully.");
      },
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (request: any) => ({
        url: `${BASE_URL}/${request.id}`,
        method: "DELETE",
        body: JSON.stringify({
          id: request,
        }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        baseQueryToast(queryFulfilled, "The client has been deleted successfully.");
      },
      invalidatesTags: ["Clients"],
    }),
  }),
});

const initialState = {
  isClientDrawerVisible: false,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientDrawerVisibility(state, action) {
      state.isClientDrawerVisible = action.payload;
    },
  },
  selectors: {
    selectIsClientDrawerVisible: (state) => state.isClientDrawerVisible,
  },
});

export const { setClientDrawerVisibility } = clientSlice.actions;
export const { selectIsClientDrawerVisible } = clientSlice.selectors;

export const { useGetClientsQuery, useUpdateClientMutation, useCreateClientMutation, useDeleteClientMutation } = extendedClientApiSlice;

export const selectClientsResult = extendedClientApiSlice.endpoints.getClients.select();

export const selectClients = createSelector(selectClientsResult, (clientsResult) => clientsResult?.data ?? []);
