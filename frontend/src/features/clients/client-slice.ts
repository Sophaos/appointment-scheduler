/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";

const BASE_URL = "clients";
export const extendedClientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<any, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "PATCH",

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
        url: BASE_URL,
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
        url: BASE_URL,
        method: "DELETE",

        body: JSON.stringify({
          clientId: request,
        }),
      }),
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
