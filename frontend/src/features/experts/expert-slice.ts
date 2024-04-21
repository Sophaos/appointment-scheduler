/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { Expert } from "./expert";
import { EntityOption } from "shared/types/entity-option";

const BASE_URL = "experts";
export const extendedExpertApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.query<Expert[], void>({
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
          id: request.id,
          nickname: request.nickname,
          // serviceIdList: request.serviceIdList.join(";"),
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
          // serviceIdList: request.serviceIdList.join(";"),
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
          id: request,
        }),
      }),
      invalidatesTags: ["Experts"],
    }),
  }),
});

const initialState = {
  isExpertDrawerVisible: false,
};

export const expertSlice = createSlice({
  name: "expert",
  initialState,
  reducers: {
    setExpertDrawerVisibility(state, action) {
      state.isExpertDrawerVisible = action.payload;
    },
  },
  selectors: {
    selectIsExpertDrawerVisible: (state) => state.isExpertDrawerVisible,
  },
});

export const { setExpertDrawerVisibility } = expertSlice.actions;
export const { selectIsExpertDrawerVisible } = expertSlice.selectors;

export const { useGetExpertsQuery, useUpdateExpertMutation, useCreateExpertMutation, useDeleteExpertMutation } = extendedExpertApiSlice;

export const selectExpertsResult = extendedExpertApiSlice.endpoints.getExperts.select();

export const selectExperts = createSelector(selectExpertsResult, (expertsResult) => expertsResult?.data ?? []);

export const selectExpertOptions = createSelector(selectExperts, (experts) =>
  experts?.map(
    (c) =>
      ({
        id: c.id,
        label: c.nickname,
      } as EntityOption)
  )
);
